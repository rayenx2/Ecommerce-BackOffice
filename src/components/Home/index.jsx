import styled, { css } from "styled-components";

import image from "./image.png";
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
        <Image src={image} />
        <Paragraph>Please, take a look at our </Paragraph>
        <Paragraph blue>Categories | Products</Paragraph>
        <Paragraph>sections instead 🤖</Paragraph>
      </Container>
    </>
  );
};

export default Home;
