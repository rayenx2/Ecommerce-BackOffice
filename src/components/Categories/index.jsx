import { useEffect, useState } from "react";
import { GET } from "../../libs/HTTP";
import { MdAdd } from "react-icons/md";
import Modal from "../Modal";
import styles from "./styles.module.scss";
import Table from "../Table";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const categoriesStateObj = {
    categories: [],
    loading: true,
  };

  const [categoriesState, setCategoriesState] = useState(categoriesStateObj);

  const getData = () => {
    setCategoriesState({ ...categoriesState, loading: true });
    GET("categories").then((data) =>
      setCategoriesState({
        loading: false,
        categories: data,
      })
    );
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.main}>
      <h1 id="categories">Categories</h1>
      {showModal && <Modal getData={getData} setShowModal={setShowModal} />}
      <button className={styles.addBtn} onClick={() => setShowModal(true)}>
        <MdAdd />
      </button>

      <Table
        categoriesState={categoriesState.categories}
        loading={categoriesState.loading}
        getData={getData}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default Categories;
