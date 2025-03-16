import React from "react";
import MainContainer from "../component/MainContainer";
import Paint from "../component/Paint";

const PaintPage = () => {
  return (
    <MainContainer>
      <Paint imageSource={require('../assets/paint/paint1.jpg')} />
    </MainContainer>
  );
};

export default PaintPage;
