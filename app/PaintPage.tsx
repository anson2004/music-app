import React from "react";
import MainContainer from "./components/MainContainer";
import Paint from "./components/Paint";

const PaintPage = () => {
  return (
    <MainContainer>
      <Paint imageSource={require('../assets/paint/paint1.jpg')} />
    </MainContainer>
  );
};

export default PaintPage;
