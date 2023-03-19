import * as S from "./style";
import MDEditor from "@uiw/react-md-editor";
import BasicButton from "../../Common/BasicButton";
import { useState } from "react";
import PropTypes from "prop-types";

const IntroductionEdit = ({ handleSetShowModal }) => {
  const [md, setMd] = useState("");

  const handleOnClick = () => {
    console.log(md, "등록");
    handleSetShowModal(false);
  };

  return (
    <S.Container>
      <MDEditor height={865} value={md} onChange={setMd}></MDEditor>
      <S.BasicButtonWrapper>
        <BasicButton
          text="Submit"
          handleOnClickButton={handleOnClick}
          color="black"
          isBackground={true}
        />
      </S.BasicButtonWrapper>
    </S.Container>
  );
};

export default IntroductionEdit;

IntroductionEdit.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
};
