import { Link } from 'react-router-dom';
import styles from './EventCard.module.css';

const EventCard = ({ prop: { description, title, eventId } }) => {

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventInfo}>
        <h4>{title}</h4>
        <p className={styles.descrip}>{description}</p>
      </div>
      <div className={styles.eventSubscription}>
        <Link className={styles.link} to='/RegistrationPage' state={{ eventId }} >subscription</Link>
        <Link className={styles.link} to='/ParticipantPage' state={{ eventId }} >view</Link>
      </div>
    </div>
  );
}

export default EventCard;