import "./App.css";
import Header from "./components/Header";
import MainContainer from "./components/Container";
import { useState,useEffect } from "react";
import { CategoryContext } from "./components/context/CategoryContext";
import { findAllCategories } from "./api/api";

function App() {
  const [category, setCategory]=useState([])

  
  useEffect(() => {
    // Fetch categories from API when the component mounts
    const fetchCategories = async () => {
      try {
        const categories = await findAllCategories();
        setCategory(categories);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{category,setCategory} }>
    <div className="App">
      <Header />
      <MainContainer />
    </div>
    </CategoryContext.Provider>
  );
}

export default App;
