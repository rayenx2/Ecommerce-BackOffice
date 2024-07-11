// index.jsx (or your React component)
import { useState } from "react";
import styles from "./styles.module.scss";
import { updateProduct } from '../../api/api'; // Adjust import path as needed
import { MdCreate, MdDeleteSweep, MdOutlineDoneOutline } from "react-icons/md";

const ProductsList = ({ item, deleteElement, reloadItems }) => {
  const [formData, setFormData] = useState({
    id:item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    categoryId: item.category.id,
    images: item.images && item.images.length > 0 ? [item.images[0]] : [""],
  });
  const [showForm, setShowForm] = useState(false);

  const handleForm = (input, e) => {
    let inputValue = e.target.value;

    if (input === "price" || input === "categoryId") {
      inputValue = parseInt(inputValue, 10); // Parse integer
    }

    if (input === "images") {
      inputValue = [inputValue];
    }

    setFormData({
      ...formData,
      [input]: inputValue,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(item.id, formData); // Call your API function with item.id and formData
      setShowForm(false);
      reloadItems(); // Reload items after successful update
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error state or notify user
    }
  };

  

  

 

  return (
    <div className={styles.main}>
      {item.images && item.images.length > 0 && (
        <img className={styles.image} src={item.images[0]} alt="product" />
      )}
      <li className={styles.listItem}>{item.title}</li>
      <div className={styles.buttons}>
        <button onClick={() => deleteElement(item.id)}>
          <MdDeleteSweep />
        </button>
        <button onClick={() => setShowForm(!showForm)}>
          <MdCreate />
        </button>
      </div>
      {showForm && (
        <form onSubmit={(e) => submitForm(e)}>
          <div>
            <p>Title:</p>
            <input
              value={formData.title}
              onChange={(e) => handleForm("title", e)}
              type="text"
            />
          </div>
          <div>
            <p>Price:</p>
            <input
              value={formData.price}
              onChange={(e) => handleForm("price", e)}
              type="text"
            />
          </div>
          <div>
            <p>Description:</p>
            <input
              value={formData.description}
              onChange={(e) => handleForm("description", e)}
              type="text"
            />
          </div>
          <div>
            <p>ID:</p>
            <input
              value={formData.categoryId}
              onChange={(e) => handleForm("categoryId", e)}
              type="text"
            />
          </div>
          <div>
            <p>Image:</p>
            <input
              value={formData.images[0]}
              onChange={(e) => handleForm("images", e)}
              type="text"
            />
          </div>
          <button type="submit">
            <MdOutlineDoneOutline />
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductsList;
