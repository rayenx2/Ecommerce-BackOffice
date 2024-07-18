import styled, { css } from "styled-components";
import { findAllCategories } from "../../api/api";
import image from "./image.png";
import React ,{useState,useEffect}from "react";
const Container = styled.div`
  margin-top: 20px;
  background-color: white;
  border-radius: 20px;
  width: 100%;
  min-height: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 200px;
`;
const TitleDiv = styled.div``;
const Title = styled.h1`
  color: gray;
  ${(props) =>
    props.blue &&
    css`
      color: lightblue;
    `}
`;

const Paragraph = styled.h3`
  color: gray;
  ${(props) =>
    props.blue &&
    css`
      color: lightblue;
    `}
`;

const Home = () => {
  
    const [categorieStore, setCategorieStore] = useState([]);
  
    // Function to fetch categories from API
    const fetchCategories = async () => {
      try {
        const categoriesData = await findAllCategories();
        setCategorieStore(categoriesData); // Update state with fetched categories
        window.localStorage.setItem("categoryStore", JSON.stringify(categoriesData)); // Save to local storage
      } catch (error) {
        console.error('Error fetching categories:', error.message);
        // Handle error state or notify user
      }
    };
  
    useEffect(() => {
      // Retrieve and parse data from local storage when the component mounts
      const storedData = window.localStorage.getItem("catStore");
      if (storedData) {
        setCategorieStore(JSON.parse(storedData));
      } else {
        // Fetch categories from API if not found in local storage
        fetchCategories();
      }
    }, []);
  return (
    <>
      <h1> Home</h1>

      <Container>
        <TitleDiv>
          <Title>
            Sorry! <br></br>This
          </Title>
          <Title blue>Home Page</Title>
          <Title>is currently under construction!</Title>
        </TitleDiv>
        <ul>
        {categorieStore.map((category, index) => (
          <li key={index}>{category.name}</li>
        ))}
      </ul>
        <Image src={image} />
        <Paragraph>Please, take a look at our </Paragraph>
        <Paragraph blue>Categories | Products</Paragraph>
        <Paragraph>sections instead 🤖</Paragraph>

      </Container>
    </>
  );
};

export default Home;
