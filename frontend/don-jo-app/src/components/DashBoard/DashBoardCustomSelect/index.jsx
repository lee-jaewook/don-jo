import React, { useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";

/**
 * 플러그인 생성기 - SelectBox 컴포넌트
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {Array} props.data - Option에 들어갈 데이터 배열
 * @param {string} props.fontStyle - SelectBox에 적용될 fontStyle
 * @param {boolean} props.isBefore - CSS의 가상 요소 중 하나인 ::before 사용 여부
 * @param {string} props.selectValue - Select한 값
 * @param {func} props.handleOptionChange - Select값 변경시 호출할 함수
 * @returns {JSX.Element}
 */

const datum = [
  { name: "About Tesla" },
  { name: "About Samsung" },
  { name: "About Apple" },
  { name: "About Google" },
  { name: "About Lotte" },
];

const CustomSelect = ({
  data = datum,
  fontStyle,
  selectValue,
  isBefore,
  handleOptionChange,
}) => {
  const [isDropdown, setIsDropdown] = useState(false);

  const handleDropDownChange = () => {
    setIsDropdown((prev) => !prev);
  };
  return (
    <S.SelectBox
      onClick={handleDropDownChange}
      isDropdown={isDropdown}
      isBefore={isBefore}
    >
      <S.Label fontStyle={fontStyle}>{selectValue}</S.Label>
      <S.SelectOptions show={isDropdown}>
        {data.map((datum, index) => (
          <S.Option key={index} value={datum.name} onClick={handleOptionChange}>
            {datum.name}
          </S.Option>
        ))}
      </S.SelectOptions>
    </S.SelectBox>
  );
};

export default CustomSelect;

CustomSelect.propTypes = {
  data: PropTypes.array,
  fontStyle: PropTypes.string,
  isBefore: PropTypes.bool,
};

CustomSelect.defaultProps = {
  data: datum,
  isBefore: true,
  fontStyle: "RobotoRegular",
};
