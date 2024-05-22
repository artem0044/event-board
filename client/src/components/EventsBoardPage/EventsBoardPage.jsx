import { useEffect, useState } from "react";
import EventCard from "../EventCard/EventCard";
import styles from "./EventsBoardPage.module.css";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";

const EventsBoardPage = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await fetch(`https://eventboard-6yuf.onrender.com/api/getEvents/${currentPage}/${selectedSort}`);
      let { events: newEvents, totalPages } = await res.json();


      setEvents(prevEvents => currentPage === 1 ? newEvents : [...prevEvents, ...newEvents]);
      setHasMore(currentPage < totalPages);
      setLoading(false);
    }

    fetchData();
  }, [currentPage, selectedSort]);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + document.documentElement.scrollTop) + 1 >= document.documentElement.offsetHeight && hasMore) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);


  const handleSortChange = (e) => {
    setCurrentPage(1);
    setEvents([]);
    setSelectedSort(e.target.value);
  }

  return (
    <div>
      <div className={styles.Header}>
        <h1 className={styles.headerText}>Events</h1>
        <div className={styles.filterContainer}>
          <label htmlFor="dropdown">Sort by:</label>
          <select value={selectedSort} onChange={handleSortChange} className={styles.filterSelection} id="dropdown" name="dropdown">
            <option value="">Select value ...</option>
            <option value="title">title</option>
            <option value="event date">event date</option>
            <option value="organizer">organizer</option>
          </select>
        </div>
      </div>
      <div className={styles.eventCardCont}>
        {events.map(({ title, description, _id: eventId }) => <EventCard key={title} prop={{ title, description, eventId }} />)}
      </div>
      {loading && <Loading />}
      {!loading && !hasMore && <p className={styles.eventMessage}>No more events to load.</p>}
    </div>
  );
}

export default EventsBoardPage;