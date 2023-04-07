import * as S from "./style";
import MDEditor from "@uiw/react-md-editor";
import BasicButton from "../../Common/BasicButton";
import { useState } from "react";
import PropTypes from "prop-types";
import { memberApi } from "../../../api/member";
import { useSelector } from "react-redux";

const IntroductionEdit = ({ handleSetShowModal, getPageInfo }) => {
  const originIntroduction = useSelector(
    (state) => state.memberInfo.introduction
  );
  const [md, setMd] = useState(originIntroduction);

  const updateIntroduction = async () => {
    try {
      await memberApi.updateUserIntroduction(md);
      getPageInfo();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleOnClick = () => {
    updateIntroduction();
    handleSetShowModal(false);
    document.body.style.overflow = "auto";
  };

  return (
    <S.Container>
      <MDEditor height={600} value={md || ""} onChange={setMd} />
      <S.BasicButtonWrapper>
        <BasicButton
          text="Submit"
          handleOnClickButton={handleOnClick}
          color="var(--color-primary)"
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
