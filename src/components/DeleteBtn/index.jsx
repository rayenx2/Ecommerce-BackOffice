import styles from "./styles.module.scss";
import { MdDeleteSweep } from "react-icons/md";
import { deleteCategory } from "../../api/api"; // Adjust import path as needed

const DeleteBtn = ({ id, getData }) => {
  const deleteElement = async () => {
    try {
      await deleteCategory(id);
      getData(); // Refresh data after successful deletion
    } catch (error) {
      console.error("Error deleting category:", error);
      // Handle error state or notify user
    }
  };

  return (
    <button onClick={deleteElement} className={styles.main}>
      <MdDeleteSweep />
    </button>
  );
};

export default DeleteBtn;
