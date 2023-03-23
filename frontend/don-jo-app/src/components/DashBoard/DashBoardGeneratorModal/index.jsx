import React, { useState, useEffect } from "react";
import * as S from "./style";
import PropTypes from "prop-types";

import { colorSet } from "../../../data/dashboard";

import BasicButton from "../../Common/BasicButton";
import BasicInput from "../../Common/BasicInput";
import BasicModal from "../../Common/Modal/BasicModal";
import BasicTitle from "../../Common/BasicTitle";
import CustomSelect from "../DashBoardCustomSelect";
import EmojiPicker from "emoji-picker-react";
import { useInput } from "../../../hooks/useInput";
import { FiChevronDown } from "react-icons/fi";

// import Web3 from "web3";
import { useSelector, useProvider } from "react-redux";
import ApplicationHandler from "../../../contracts/ApplicationHandler.json";
/**
 * 플러그인 생성기 컴포넌트
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {boolean} props.isSearchDefault - searchValue에 Default 값 적용 여부
 * @param {function} props.isModalOpen - Modal을 닫을 때 호출될 콜백 함수
 * @param {boolean} props.isItemsRequired - searchItems 컴포넌트는 필수 여부
 * @returns {JSX.Element} - 렌더링 결과
 */

const DashBoardGeneratorModal = ({
  isSearchDefault,
  isModalOpen,
  isItemsRequired = true,
}) => {
  //////////////// Test /////////////////////

  // const web3 = useSelector((state) => state.web3.web);
  // const address = "0x6c3ea1dD30BEb9B449272d393693A47727a5dF12";
  // const valueInWei = web3.utils.toWei("0.000003", "ether");

  // const myWallet = useSelector((state) => state.web3.walletAddress);
  // const myContract = new web3.eth.Contract(
  //   ApplicationHandler.abi, // abi 설정
  //   "0xc45694392A301B63a1FD0A1b2762521915a78f44" // contract 주소
  // );

  // const tx = myContract.methods.callBasicDonation(
  //   "0x6c3ea1dD30BEb9B449272d393693A47727a5dF12"
  // );
  // window.ethereum
  //   .request({
  //     method: "eth_sendTransaction",
  //     params: [
  //       {
  //         from: myWallet,
  //         to: "0x6c3ea1dD30BEb9B449272d393693A47727a5dF12",
  //         value: valueInWei,
  //         gas: "20000",
  //         data: tx.encodeABI(),
  //       },
  //     ],
  //   })
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  ///////////////////////////////////////////

  const [title, setTitle] = useState("");
  const [colorIndex, setColorIndex] = useState("#F02C7E"); // 사용자의 현재 테마 색상 설정
  const [selectedEmoji, setSelectedEmoji] = useState("💕"); // user별 default emoji 설정
  const [emojiName, onChangeEmojiName] = useInput("Heart"); // user별 default emoji 이름 설정

  const [isShowEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleSetShowEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const handleOnClickEmoji = (item) => {
    console.log(item);
    setSelectedEmoji(item.emoji);
    onChangeEmojiName(item.names[0]);
    setShowEmojiPicker(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleGeneratePlugIn = () => {};

  return (
    <div>
      <BasicModal width={26.25} handleSetShowModal={isModalOpen}>
        <S.PreViewWrap>
          <S.PreView></S.PreView>
        </S.PreViewWrap>

        <S.ContentWrap>
          <BasicTitle text="Text" />
          <S.EmojiSettingWrapper>
            <S.GridBox>
              <S.EmojiButton onClick={handleSetShowEmojiPicker}>
                {selectedEmoji}
                <FiChevronDown size="16px" />
              </S.EmojiButton>
              <BasicInput
                type="text"
                value={title}
                handleOnChangeValue={handleTitleChange}
              />
            </S.GridBox>
            {isShowEmojiPicker && (
              <S.EmojiPickerModal>
                <EmojiPicker onEmojiClick={handleOnClickEmoji} />
              </S.EmojiPickerModal>
            )}
          </S.EmojiSettingWrapper>
        </S.ContentWrap>

        <S.ContentWrap>
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

        <S.ButtonWrap>
          <S.ButtonContent>
            <BasicButton
              text="Generate"
              handleOnClickButton={handleGeneratePlugIn}
              isBackground={true}
              isDisabled={false}
              color="black"
            />
          </S.ButtonContent>
        </S.ButtonWrap>
      </BasicModal>
    </div>
  );
};

export default DashBoardGeneratorModal;

DashBoardGeneratorModal.propTypes = {
  isSearchDefault: PropTypes.bool,
  isModalOpen: PropTypes.func.isRequired,
  isItemsRequired: PropTypes.bool,
};
