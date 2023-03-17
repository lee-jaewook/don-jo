import React from "react";
import BasicTitle from "../../Common/BasicTitle";
import GeneratorItem from "./GeneratorItem";
import * as S from "./style";
import { generatorData } from "../../../data/dashboard";

const DashBoardButtons = () => {
  return (
    <S.ButtonsWrapper>
      <BasicTitle text="Buttons" />
      <div>
        {generatorData &&
          generatorData.length > 0 &&
          generatorData.map((item, index) => (
            <GeneratorItem
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
      </div>
    </S.ButtonsWrapper>
  );
};

export default DashBoardButtons;
