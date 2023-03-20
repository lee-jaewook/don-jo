import React, { useState } from "react";
import BasicInput from "../../Common/BasicInput";
// import SelectBox from "../../Common/SelectBox";/
import BasicModal from "../../Common/Modal/BasicModal";
import BasicTitle from "../../Common/BasicTitle";
import CustomSelect from "../DashBoardCustomSelect";
import PropTypes from "prop-types";
import * as S from "./style";
import { colorSet } from "../../../data/dashboard";

/**
 * 플러그인 생성기 컴포넌트
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {boolean} props.isSearchDefault - searchValue에 Default 값 적용 여부
 * @param {function} props.isModalOpen - Modal을 닫을 때 호출될 콜백 함수
 * @param {boolean} props.isItemsRequired - searchItems 컴포넌트는 필수 여부
 * @returns {JSX.Element} - 렌더링 결과
 */

const GeneratorModal = ({
  isSearchDefault,
  isModalOpen,
  isItemsRequired = false,
}) => {
  const [title, setTitle] = useState("");
  const [colorIndex, setColorIndex] = useState("#F02C7E"); // 사용자의 현재 테마 색상 설정

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <BasicModal width={26.25} sort={true} handleSetShowModal={isModalOpen}>
        <S.PreViewWrap>
          <S.PreView></S.PreView>
        </S.PreViewWrap>

        <S.ContentWrap>
          {/* Text Component */}
          <BasicTitle text="Text" />
          <S.GridBox>
            {/* <SelectBox /> */}
            <BasicInput
              type="text"
              value={title}
              handleOnChangeValue={handleTitleChange}
              placeholder="Plz give me money"
            />
          </S.GridBox>
        </S.ContentWrap>

        <S.ContentWrap>
          {/* Color Component */}
          <BasicTitle text="Color" />
          <S.ColorPalette>
            {colorSet &&
              colorSet.length > 0 &&
              colorSet.map((color, index) => (
                <S.Color
                  type="radio"
                  name="color"
                  key={color}
                  value={color}
                  defaultChecked={color === colorIndex}
                  onChange={(e) => setColorIndex(e.target.value)}
                />
              ))}
          </S.ColorPalette>
        </S.ContentWrap>

        <S.ContentWrap>
          {/* Font Component */}
          <BasicTitle text="Font" />
          <CustomSelect isBefore={true} />
        </S.ContentWrap>

        <S.ContentWrap>
          {/* SearchItems Component */}
          {isItemsRequired && (
            <>
              <BasicTitle text="Search Items" />
              <CustomSelect isBefore={false} />
            </>
          )}
        </S.ContentWrap>
      </BasicModal>
    </div>
  );
};

export default GeneratorModal;

GeneratorModal.propTypes = {
  isSearchDefault: PropTypes.bool,
  isModalOpen: PropTypes.func.isRequired,
  isItemsRequired: PropTypes.bool,
};
