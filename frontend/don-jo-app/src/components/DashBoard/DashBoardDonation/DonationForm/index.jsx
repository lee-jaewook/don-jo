import React, { useState } from "react";
import { useInput } from "../../../../hooks/useInput";
import BasicTitle from "../../../Common/BasicTitle";
import EmojiPicker from "emoji-picker-react";
import { FiChevronDown } from "react-icons/fi";
import * as S from "./style";
import BasicInput from "../../../Common/BasicInput";
import BasicButton from "../../../Common/BasicButton";

const DonationForm = () => {
  const PricePerData = [1, 2, 3, 4, 5];
  const [selectedEmoji, setSelectedEmoji] = useState("💕"); // user별 default emoji 설정
  const [emojiName, onChangeEmojiName] = useInput("Heart"); // user별 default emoji 이름 설정
  const [currentPrice, onChangeCurrentPrice] = useInput(1); //// user별 default 가격 설정
  const [thankMessage, onChangeThankMessage] = useInput(""); // user별 default emoji 이름 설정
  const [isShowEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleSetShowEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const handleOnClickEmoji = (item) => {
    console.log(item);
    setSelectedEmoji(item.emoji);
    onChangeEmojiName(item.names[0]);
    setShowEmojiPicker(false);
  };

  const handleOnClickButton = () => {
    console.log("save donation settings");
  };

  return (
    <S.FormWrapper>
      <BasicTitle text="Choose your Emoji" />
      <S.FormDescription>
        Replace "{emojiName}" with anything you like.
      </S.FormDescription>
      <S.EmojiSettingWrapper>
        <S.EmojiButton onClick={handleSetShowEmojiPicker}>
          {selectedEmoji}
          <FiChevronDown size="16px" />
        </S.EmojiButton>
        <BasicInput
          type="text"
          value={emojiName}
          handleOnChangeValue={onChangeEmojiName}
        />
        {isShowEmojiPicker && (
          <S.EmojiPickerModal>
            <EmojiPicker onEmojiClick={handleOnClickEmoji} />
          </S.EmojiPickerModal>
        )}
      </S.EmojiSettingWrapper>

      <BasicTitle text="Price per Donation" />
      <S.FormDescription>
        Change the default price of a coffee to an amount of your choice.
      </S.FormDescription>

      <S.RadioGroup>
        {PricePerData &&
          PricePerData.map((item) => (
            <S.RadioWrapper key={`${item}`}>
              <S.RadioButton
                id={`dollar${item}`}
                type="radio"
                name="price"
                value={item}
                onChange={onChangeCurrentPrice}
                defaultChecked={item === currentPrice}
              />
              <S.RadioLabel htmlFor={`dollar${item}`}>${item}</S.RadioLabel>
            </S.RadioWrapper>
          ))}
      </S.RadioGroup>
      <BasicTitle text="Thank you message" />
      <S.FormDescription>
        This will be visible after the payment and in the receipt email. Write a
        personable thank you message, and include any rewards if you like.
      </S.FormDescription>
      <BasicInput
        type="text"
        placeholder="Send message"
        value={thankMessage}
        handleOnChangeValue={onChangeThankMessage}
      />

      <S.ButtonWrapper>
        <BasicButton
          text="Save"
          handleOnClickButton={handleOnClickButton}
          color="black"
        />
      </S.ButtonWrapper>
    </S.FormWrapper>
  );
};

export default DonationForm;
