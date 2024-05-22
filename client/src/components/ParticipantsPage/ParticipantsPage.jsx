import { useEffect, useState, useRef } from "react";
import ParticipantCard from "../ParticipantCard/ParticipantCard";
import styles from "./ParticipantsPage.module.css";
import { useLocation } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Loading from "../Loading/Loading";

const ParticipantsPage = () => {
  const { state: { eventId } } = useLocation();
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [participantValue, setParticipantValue] = useState('');
  const [participantCountPerDay, setParticipantCountPerDay] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://eventboard-6yuf.onrender.com/api/getEventUsers/${eventId}`);
        const { eventTitle, participants, registrationsPerDay } = await res.json();

        const dates = registrationsPerDay.map(({ _id: dateObj }) => {
          const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
          return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        });
        const counts = registrationsPerDay.map(({ count }) => count);

        setParticipantCountPerDay({ dates, counts });
        setParticipants(participants);
        setEventTitle(eventTitle)
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const barFormat = {
    labels: participantCountPerDay.dates,
    datasets: [
      {
        label: 'Registrations per Day',
        data: participantCountPerDay.counts,
        fill: false,
        backgroundColor: '#3fc0e5',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const editedValue = participantValue.trim().toLowerCase();
    const filteredParticipants = participants.filter(participant => {
      return participant.name.trim().toLowerCase().includes(editedValue) || participant.email.trim().toLowerCase().includes(editedValue)
    });
    setFilteredParticipants(filteredParticipants);
  }, [participantValue, participants]);


  return (
    <div>
      <h1>{eventTitle} participants</h1>
      {loading ?
        <Loading />
        :
        participants.length ?
          <div className={styles.searchContainer}>
            <div className={styles.barCont}>
              <input value={participantValue} onChange={(e) => setParticipantValue(e.target.value)} placeholder="search ..." className={styles.searchInp} type="text" />
              <div className={styles.bar}>
                <Bar data={barFormat} />
              </div>
            </div>
            <div className={styles.participantsCardCont}>
              {filteredParticipants.map(({ name, email, _id }) => <ParticipantCard key={_id} prop={{ name, email }} />)}
            </div>
          </div>
          :
          <h3 className={styles.warning}>There is no participants yet.</h3>
      }
    </div>
  );
}

export default ParticipantsPage;