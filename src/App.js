import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Question1 from "./pages/Question1";
import styled from "styled-components";

const App = () => {
  return (
    <BrowserRouter>
      {/* 여기에 네비게이션 두시면 됩니다. */}
      <MainContainer>
        <Routes>
          <Route exact path="/" element={<Question1 />} />
          {/* <Route exact path="/" element={<Index />} /> */}
        </Routes>
      </MainContainer>
    </BrowserRouter>
  );
};
const MainContainer = styled.main`
    width:100%;
    height: 100vh;
    display:flex;
    justify-content: left;
    /* align-items: center; */
`;
export default App;
