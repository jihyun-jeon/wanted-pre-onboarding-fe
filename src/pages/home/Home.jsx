import React from "react";
import styled from "styled-components";
import variables from "../../styles/variables";

const Home = () => {
  return (
    <StyledHome>
      <h1>hello</h1>
    </StyledHome>
  );
};

const StyledHome = styled.div`
  ${variables.flex()}
  height: 200px;
  background-color: aliceblue;
  h1 {
    color: red;
  }
`;

export default Home;
