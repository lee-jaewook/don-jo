import React from "react";
import BasicTitle from "../../../Common/BasicTitle";
const DonationForm = () => {
  const handleOnClickEditEmoji = () => {};
  return (
    <div>
      <BasicTitle text="Choose your Emoji" />
      <p>Replace “cookie” with anything you like.</p>
      <button onClick={handleOnClickEditEmoji}>이모지박스</button>
    </div>
  );
};

export default DonationForm;
