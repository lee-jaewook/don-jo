import * as S from "./style";

export const SelectBox = () => {
  return (
    <S.SelectBox>
      <S.Label>currentValue</S.Label>
      <S.SelectOptions>
        <S.Option>option1</S.Option>
        <S.Option>option2</S.Option>
        <S.Option>option3</S.Option>
      </S.SelectOptions>
    </S.SelectBox>
  );
};
