import React from "react";
import BasicTitle from "../../Common/BasicTitle";
import GeneratorItem from "./GeneratorItem";
import * as S from "./style";
const DashBoardButtons = () => {
  return (
    <S.ButtonsWrapper>
      <BasicTitle text="Buttons" />
      <div>
        <GeneratorItem />
        <GeneratorItem />
        <GeneratorItem />
      </div>
    </S.ButtonsWrapper>
  );
};

export default DashBoardButtons;
