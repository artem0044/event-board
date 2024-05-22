import styles from "../ParticipantsPage/ParticipantsPage.module.css"

const ParticipantCard = ({ prop: { name, email } }) => {
	return (
		<div className={styles.participantCard}>
			<p className={styles.text}>{name}</p>
			<p className={`${styles.text} ${styles.smaller}`}>{email}</p>
		</div>
	);
}

export default ParticipantCard;