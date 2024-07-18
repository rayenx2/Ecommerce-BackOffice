import { useEffect, useState } from "react";
import { findAllCategories } from "../../api/api"; // Adjust import path as needed
import { MdAdd } from "react-icons/md";
import Modal from "../Modal";
import styles from "./styles.module.scss";
import Table from "../Table";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoriesState, setCategoriesState] = useState({
    categories: [],
    loading: true,
  });

  const getData = async () => {
    try {
      setCategoriesState({ ...categoriesState, loading: true });
      const data = await findAllCategories();
      setCategoriesState({
        loading: false,
        categories: data,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Handle error state or show error message
      setCategoriesState({
        ...categoriesState,
        loading: false,
      });
    }
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
