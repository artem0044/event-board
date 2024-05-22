import styles from './Pagination.module.css';

const Pagination = ({ props: { setEvents, selectedSort, setSelectedSort, setCurrentPage, currentPage, totalPages } }) => {

  // const navigate = (i) => {
  //   setSelectedSort(selectedSort);
  //   setEvents([]);
  //   setCurrentPage(i)
  // }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        className={`${styles.pageNumber} ${i === currentPage ? styles.active : ''}`}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageNav}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pages}
      <button
        className={styles.pageNav}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};


export default Pagination;