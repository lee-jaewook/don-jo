import React, { useState, useEffect } from "react";
import * as S from "./style";
import LogInModal from "../../components/LogIn";
import GeneratorModal from "../../components/DashBoard/GeneratorModal";

const Intro = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpMOodalOpen, setIsSignUpModalOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsLoginModalOpen((prev) => !prev)}>
        눌러주세요
      </button>
      {isLoginModalOpen && (
        <LogInModal isModelOpen={setIsLoginModalOpen}></LogInModal>
      )}
      <div></div>
      <button onClick={setIsGeneratorOpen}>저는 슬퍼요</button>
      {isGeneratorOpen && <GeneratorModal isModalOpen={setIsGeneratorOpen} />}
    </div>
  );
};

export default Intro;
