import styles from "./styles.module.scss";
import { MdReplay } from "react-icons/md";
import EditBtn from "../EditBtn";
import DeleteBtn from "../DeleteBtn";

const Table = ({ categoriesState, getData, loading }) => {
  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <button className={styles.refreshBtn} onClick={() => getData()}>
          <MdReplay />
        </button>
      </div>
      {loading ? (
        "loading..."
      ) : (
        <div className={styles.content}>
          {categoriesState.map((item) => (
            <div className={styles.itemDiv} key={item.id}>
              
              
              <h4 id="title">{item.name}</h4>
              <div className={styles.buttons}>
                <EditBtn
                  id="editBtn"
                  getData={getData}
                  data={{ name: item.name, image: item.image, id: item.id }}
                />

                <DeleteBtn getData={getData} id={item.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Table;
