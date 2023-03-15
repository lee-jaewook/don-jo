import React, { useEffect, useState } from "react";
import { useInput } from "../../../../hooks/useInput";
import BasicTitle from "../../../Common/BasicTitle";
import EmojiPicker from "emoji-picker-react";
import { FiChevronDown } from "react-icons/fi";
import * as S from "./style";
import BasicInput from "../../../Common/BasicInput";
import BasicButton from "../../../Common/BasicButton";
const DonationForm = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("💕"); // user별 default emoji 설정
  const [emojiName, onChangeEmojiName] = useInput("Heart"); // user별 default emoji 이름 설정
  const [currentPrice, onChangeCurrentPrice] = useInput("1"); //// user별 default 가격 설정
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

  useEffect(() => {
    console.log(currentPrice);
  }, [currentPrice]);

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
        <S.RadioWrapper>
          <S.RadioButton
            id="dollar1"
            type="radio"
            name="price"
            value="1"
            onChange={onChangeCurrentPrice}
            defaultChecked
          />
          <S.RadioLabel htmlFor="dollar1">$1</S.RadioLabel>
        </S.RadioWrapper>
        <S.RadioWrapper>
          <S.RadioButton
            id="dollar2"
            type="radio"
            name="price"
            value="2"
            onChange={onChangeCurrentPrice}
          />
          <S.RadioLabel htmlFor="dollar2">$2</S.RadioLabel>
        </S.RadioWrapper>
        <S.RadioWrapper>
          <S.RadioButton
            id="dollar3"
            type="radio"
            name="price"
            value="3"
            onChange={onChangeCurrentPrice}
          />
          <S.RadioLabel htmlFor="dollar3">$3</S.RadioLabel>
        </S.RadioWrapper>
        <S.RadioWrapper>
          <S.RadioButton
            id="dollar4"
            type="radio"
            name="price"
            value="4"
            onChange={onChangeCurrentPrice}
          />
          <S.RadioLabel htmlFor="dollar4">$4</S.RadioLabel>
        </S.RadioWrapper>
        <S.RadioWrapper>
          <S.RadioButton
            id="dollar5"
            type="radio"
            name="price"
            value="5"
            onChange={onChangeCurrentPrice}
          />
          <S.RadioLabel htmlFor="dollar5">$5</S.RadioLabel>
        </S.RadioWrapper>
      </S.RadioGroup>
      <BasicTitle text="Thank you message" />
      <S.FormDescription>
        This will be visible after the payment and in the receipt email. <br />
        Write a personable thank you message, and include any rewards if you
        like.
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
