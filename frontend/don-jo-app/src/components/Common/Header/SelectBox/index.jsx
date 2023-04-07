import { useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";

const SelectBox = ({ metamaskLogin, walletConnectLogin }) => {
  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <S.SelectBox onClick={() => setIsDropdown((prev) => !prev)}>
      <S.Label>Start</S.Label>
      {isDropdown && (
        <S.SelectOptions>
          <S.Option onClick={metamaskLogin}>Metamask</S.Option>
        </S.SelectOptions>
      )}
    </S.SelectBox>
  );
};

export default SelectBox;

SelectBox.propTypes = {
  metamaskLogin: PropTypes.func,
  walletConnectLogin: PropTypes.func,
};
