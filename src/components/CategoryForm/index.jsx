import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../context/CategoryContext"; // Adjust path as needed
import { createCategory, updateCategory } from "../../api/api"; // Adjust import path as needed
import { MdCreate, MdOutlineDoneOutline } from "react-icons/md";
import styles from "./styles.module.scss";

const CategoryForm = ({ setShowModal, getData, data }) => {
  const { category,setCategory } = useContext(CategoryContext); // Assuming CategoryContext provides category data
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
      });
      setEdit(true);
    } else {
      setForm({
        name: "",
      });
      setEdit(false);
    }
    // eslint-disable-next-line
  }, [data]);

  const handleForm = (input, e) => {
    setForm({
      ...form,
      [input]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await createCategory(form);
      if (response) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const editForm = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCategory(data.id, form);
      if (response) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className={styles.modal}>
      <form>
        <input
          placeholder="Category Name"
          type="text"
          value={form.name}
          onChange={(e) => handleForm("name", e)}
          required
        />
        {edit ? (
          <button type="submit" onClick={(e) => editForm(e)}>
            <MdCreate />
          </button>
        ) : (
          <button type="submit" onClick={(e) => submitForm(e)} className={styles.validateButton} >
            <MdOutlineDoneOutline />
          </button>
        )}
      </form>
    </div>
  );
};

export default CategoryForm;
