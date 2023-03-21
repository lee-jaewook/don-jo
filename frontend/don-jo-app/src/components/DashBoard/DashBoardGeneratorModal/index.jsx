import React, { useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";

import { colorSet } from "../../../data/dashboard";

import BasicInput from "../../Common/BasicInput";
import BasicModal from "../../Common/Modal/BasicModal";
import BasicTitle from "../../Common/BasicTitle";
import CustomSelect from "../DashBoardCustomSelect";

import { useSelector, useDispatch } from "react-redux";
import ApplicationHandler from "../../../contracts/ApplicationHandler.json";

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

  // test 용

  const web3 = useSelector((state) => state.web3.web3);
  console.log(web3.eth);
  const myContract = new web3.eth.Contract(
    ApplicationHandler.abi,
    "0xdBEeDa3fB7d11CC14638A8994b16db785Db0B7d8"
  );

  // 지갑주소
  myContract.methods
    .callBasicDonation("0x6c3ea1dD30BEb9B449272d393693A47727a5dF12")
    .send({
      from: "0x0964fB71FB405f75fd95bAe71825Cc2d697E4eE9",
      to: "0x6c3ea1dD30BEb9B449272d393693A47727a5dF12",
      value: 1000000,
    })
    .on("receipt", (receipt) => {
      console.log("트랜잭션이 완료되었습니다.", receipt);
    })
    .on("error", (error) => {
      console.error("트랜잭션 실행 중 오류가 발생했습니다.", error);
    });
  /////////////////////////////////////////////////////////////////////

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
