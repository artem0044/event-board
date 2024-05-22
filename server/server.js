import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectToDB from './db.js';
import mockedEvents from './mockedEvents.js';
import eventModel from './models/eventModel.js';
import participantModel from './models/participantModel.js';

import startFetching from './intervalFetching.js';

const app = express();
const PORT = process.env.PORT || 3001;


connectToDB();

const checkCollection = async () => {
  const count = await eventModel.countDocuments({});

  if (!count) {
    for (let mockedEvent of mockedEvents) {
      const newEvent = new eventModel(mockedEvent);
      await newEvent.save();
    };
  }
}

checkCollection();

startFetching();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening port ${PORT}`)
});

app.get('/api/getEvents/:currentPage/:selectedSort?', async (req, res) => {
  const { currentPage, selectedSort } = req.params;
  const page = parseInt(currentPage) || 1;
  const limit = 12;
  const pageToSkip = (page - 1) * limit;

  const totalEvents = await eventModel.countDocuments({});

  // const sortOptions = {
  //   title: { title: 1 },
  //   eventDate: { eventDate: 1 },
  //   organizer: { organizer: 1 }
  // };

  // const events = await eventModel.find({}).sort(sortOptions[selectedSort]).skip(pageToSkip).limit(limit);
  let eventsQuery = eventModel.find({}).skip(pageToSkip).limit(limit);

  if (selectedSort === 'title') {
    eventsQuery = eventsQuery.sort({ title: 1 });
  } else if (selectedSort === 'eventDate') {
    eventsQuery = eventsQuery.sort({ event_date: 1 });
  } else if (selectedSort === 'organizer') {
    eventsQuery = eventsQuery.sort({ organizer: 1 });
  }

  const events = await eventsQuery.exec();

  res.json({
    events,
    totalPages: Math.ceil(totalEvents / limit)
  });
});

app.post('/api/createUser', async (req, res) => {
  const { name, email, birthDate, source, eventId, registrationDate } = req.body;
  console.log(registrationDate);
  const newParticipant = new participantModel({
    name,
    email,
    birthDate,
    source,
    eventId,
    registrationDate,
  });

  await newParticipant.save();

  res.sendStatus(200);
});

app.get('/api/getEventUsers/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const { title } = await eventModel.findOne({ _id: eventId });
  const participants = await participantModel.find({ eventId });

  const registrationsPerDay = await participantModel.aggregate([
    {
      $project: {
        year: { $year: { $toDate: "$registrationDate" } },
        month: { $month: { $toDate: "$registrationDate" } },
        day: { $dayOfMonth: { $toDate: "$registrationDate" } }
      }
    },
    {
      $group: {
        _id: { year: "$year", month: "$month", day: "$day" },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
    }
  ]);

  res.json({
    registrationsPerDay,
    eventTitle: title,
    participants,
  });
});