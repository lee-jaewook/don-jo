import React, { useState } from "react";
import BasicInput from "../../Common/BasicInput";
import SelectBox from "../../Common/SelectBox";
import BasicModal from "../../Common/Modal/BasicModal";
import BasicTitle from "../../Common/BasicTitle";
import CustomSelect from "../CustomSelect";
import * as S from "./style";

/**
 * 플러그인 생성기 컴포넌트
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {boolean} props.isSearch - searchValue에 Default 값 적용 여부
 * @param {function} props.isModalOpen - Modal을 닫을 때 호출될 콜백 함수
 * @returns {JSX.Element} - 렌더링 결과
 */

const GeneratorModal = ({ isSearchDefault, isModalOpen }) => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(() => e.target.value);
  };

  const children = () => {
    return (
      <>
        <S.PreViewWrap>
          <S.PreView></S.PreView>
        </S.PreViewWrap>
        <BasicTitle text="Text" />
        <S.GridBox>
          <SelectBox />
          <BasicInput
            type="text"
            value={title}
            handleOnChangeValue={handleTitleChange}
            placeholder="Plz give me money"
          />
        </S.GridBox>
        <BasicTitle text="Color" />
        {/* <CustomSelect /> */}
        <BasicTitle text="Font" />
        {/* <CustomSelect /> */}
        <BasicTitle text="Search Items" />
        <CustomSelect />
      </>
    );
  };

  return (
    <div>
      <BasicModal
        width={26.25}
        sort={true}
        isModalOpen={isModalOpen}
        children={children()}
      />
    </div>
  );
};

export default GeneratorModal;
