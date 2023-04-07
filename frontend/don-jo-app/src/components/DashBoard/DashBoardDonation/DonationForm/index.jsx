import React, { useEffect, useState } from "react";
import * as S from "./style";
import BasicTitle from "../../../Common/BasicTitle";
import EmojiPicker from "emoji-picker-react";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown.js";
import BasicInput from "../../../Common/BasicInput";
import BasicButton from "../../../Common/BasicButton";
import BasicTextarea from "../../../Common/BasicTextarea";
import { supportApi } from "../../../../api/support";
import sendToastMessage from "../../../../utils/sendToastMessage";

const DonationForm = () => {
  const PricePerData = [1, 2, 3, 4, 5];
  const [isShowEmojiPicker, setShowEmojiPicker] = useState(false);
  const [result, setResult] = useState({});
  const { donationEmoji, donationName, pricePerDonation, thankMsg } = result;

  const handleSetShowEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const handleOnChangeInput = (e) => {
    const { id, value } = e.target;
    setResult({
      ...result,
      [id]: value,
    });
  };

  const handleOnChangeCurrentPrice = (e) => {
    const { value } = e.target;
    setResult({ ...result, pricePerDonation: Number(value) });
  };

  const handleOnClickEmoji = (item) => {
    setResult({
      ...result,
      donationEmoji: item.emoji,
      donationName: item.names[0],
    });

    setShowEmojiPicker(false);
  };

  const handleOnClickButton = async () => {
    if (!donationEmoji || !donationName || !thankMsg) {
      sendToastMessage("🚫 Please enter all settings.");
      return;
    }

    try {
      await supportApi.updateDonationSettings(result);
      sendToastMessage("✨ Saved successfully.");
    } catch (error) {
      sendToastMessage("[Save failed]: Contact your administrator.", "error");
    }
  };

  const getDonationSettingsData = async () => {
    try {
      const { data } = await supportApi.getDonationSettings();
      setResult(data);
    } catch (error) {
      console.log("[Dashboard] getDonationSettingsData()... ", error);
    }
  };

  useEffect(() => {
    getDonationSettingsData();
  }, []);

  return (
    <S.FormWrapper>
      <S.RequiredInputWrapper>
        <BasicTitle text="Choose your Emoji" />
        <S.RequiredIcon>*</S.RequiredIcon>
      </S.RequiredInputWrapper>
      <S.FormDescription>
        Replace "{donationName}" with anything you like.
      </S.FormDescription>
      <S.EmojiSettingWrapper>
        <S.EmojiButton onClick={handleSetShowEmojiPicker}>
          {donationEmoji}
          <FiChevronDown size="16px" />
        </S.EmojiButton>
        <BasicInput
          id="donationName"
          type="text"
          value={donationName || ""}
          handleOnChangeValue={handleOnChangeInput}
        />
        {isShowEmojiPicker && (
          <S.EmojiPickerModal>
            <EmojiPicker onEmojiClick={handleOnClickEmoji} />
          </S.EmojiPickerModal>
        )}
      </S.EmojiSettingWrapper>

      <S.RequiredInputWrapper>
        <BasicTitle text="Price per Donation" />
        <S.RequiredIcon>*</S.RequiredIcon>
      </S.RequiredInputWrapper>
      <S.FormDescription>
        Change the default price of a "{donationName}" to an amount of your
        choice.
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
                onChange={handleOnChangeCurrentPrice}
                checked={item === pricePerDonation}
              />
              <S.RadioLabel htmlFor={`dollar${item}`}>${item}</S.RadioLabel>
            </S.RadioWrapper>
          ))}
      </S.RadioGroup>
      <S.RequiredInputWrapper>
        <BasicTitle text="Thank you message" />
        <S.RequiredIcon>*</S.RequiredIcon>
      </S.RequiredInputWrapper>
      <S.FormDescription>
        This will be visible after the payment and in the receipt email. Write a
        personable thank you message, and include any rewards if you like.
      </S.FormDescription>

      <BasicTextarea
        id="thankMsg"
        placeholder="Send message"
        handleOnChangeValue={handleOnChangeInput}
        value={thankMsg}
      />

      <S.ButtonWrapper>
        <BasicButton
          text="Save"
          handleOnClickButton={handleOnClickButton}
          color="var(--color-primary)"
        />
      </S.ButtonWrapper>
    </S.FormWrapper>
  );
};

export default DonationForm;
