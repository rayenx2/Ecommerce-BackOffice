import CategoryForm from "../CategoryForm";
import styles from "./styles.module.scss";

const Modal = ({ setShowModal, data, getData }) => {
  return (
    <div className={styles.addCover}>
      <div className={styles.addModal}>
        <CategoryForm
          data={data}
          getData={getData}
          setShowModal={setShowModal}
        />
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>
  );
};

export default Modal;
