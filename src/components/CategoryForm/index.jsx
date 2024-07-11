import { useEffect, useState } from "react";
import { POST, PUT } from "../../libs/HTTP";
import { MdCreate, MdOutlineDoneOutline } from "react-icons/md";
import styles from "./styles.module.scss";

const CategoryForm = ({ setShowModal, getData, data }) => {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
        image: data.image,
      });
      setEdit(true);
    }
    // eslint-disable-next-line
  }, []);

  const handleForm = (input, e) => {
    setForm({
      ...form,
      [input]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    POST("categories", form).then((data) => {
      if (data.status === 201) {
        setShowModal(false);
        getData();
      }
    });
  };

  const editForm = (e) => {
    e.preventDefault();
    PUT("categories", form, "/" + data.id).then((data) => {
      if (data.status === 200) {
        setShowModal(false);
        getData();
      }
    });
  };

  return (
    <div className={styles.modal}>
      <form>
        <input
          placeholder="Category Name"
          type="text"
          value={form.name}
          onChange={(e) => handleForm("name", e)}
        />
        <input
          placeholder="Category Image(URL)"
          type="text"
          value={form.image}
          onChange={(e) => handleForm("image", e)}
        />

        {edit ? (
          <button type="submit" onClick={(e) => editForm(e)}>
            <MdCreate />
          </button>
        ) : (
          <button type="submit" onClick={(e) => submitForm(e)}>
            <MdOutlineDoneOutline />{" "}
          </button>
        )}
      </form>
    </div>
  );
};

export default CategoryForm;
