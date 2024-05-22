import axios from 'axios';
import eventModel from './models/eventModel.js';

let pageNumber = 1
let shouldFetch = true;

const fetchEvents = async () => {
  const response = await axios(`https://api.seatgeek.com/2/venues?per_page=12&page=${pageNumber}&client_id=NDE3Mzg5OTR8MTcxNjMyMTU2My4wNjAyNTM2`);
  const events = response.data.venues;

  if (events.length === 0) {
    shouldFetch = false;
    return;
  }

  for (let eventData of events) {
    const event = new eventModel({
      title: eventData.name,
      description: `It will take place in state of ${eventData.state} in  ${eventData.city} at ${eventData.address}.`,
      eventDate: new Date(eventData.access_method?.created_at).valueOf() || Date.now(),
      organizer: eventData.city,
    });

    await event.save();
  }

  pageNumber++
}

const INTERVAL_MS = 18000000 ; // 5 hours

const startFetching = async () => {
  await fetchEvents();
  if (shouldFetch) {
    setTimeout(startFetching, INTERVAL_MS);
  }
}

export default startFetching;