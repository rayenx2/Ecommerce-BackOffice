import styles from "./styles.module.scss";
import { MdCreate } from "react-icons/md";
import EditModal from "./../EditModal";
import { useState } from "react";

const EditBtn = ({ data, getData }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <EditModal getData={getData} data={data} setShowModal={setShowModal} />
      )}

      <button onClick={() => setShowModal(true)} className={styles.main}>
        <MdCreate />
      </button>
    </>
  );
};

export default EditBtn;
