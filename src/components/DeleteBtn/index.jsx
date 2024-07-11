import styles from "./styles.module.scss";
import { MdDeleteSweep } from "react-icons/md";
import { DELETE } from "../../libs/HTTP";

const DeleteBtn = ({ id, getData }) => {
  const deleteElement = () => {
    DELETE("categories", "/" + id).then((data) => {
      console.log(data);
      getData();
    });
  };
  return (
    <button onClick={() => deleteElement()} className={styles.main}>
      <MdDeleteSweep />
    </button>
  );
};

export default DeleteBtn;
