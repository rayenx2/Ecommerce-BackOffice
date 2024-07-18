import CategoryForm from "../CategoryForm";
import styles from "./styles.module.scss";

const Modal = ({ setShowModal, data, getData }) => {
  return (
    <div className={styles.addCover} role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
      <div className={styles.addModal}>
        <h2 id="modalTitle">Add a Category</h2>
        <CategoryForm
          data={data}
          getData={getData}
          setShowModal={setShowModal}
        />
        <button onClick={() => setShowModal(false)} aria-label="Close modal">
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
