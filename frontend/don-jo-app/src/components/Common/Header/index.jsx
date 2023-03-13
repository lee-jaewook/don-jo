import * as S from "./style";
import { ProfileImg } from "../ProfileImg";
import { SelectBox } from "../SelectBox";

export const Header = () => {
  return (
    <S.HeaderContainer>
      <S.Header>
        <S.Logo />
        <S.GuideSelect>
          <SelectBox />
        </S.GuideSelect>
        <S.ProfileImgContainer>
          <ProfileImg />
        </S.ProfileImgContainer>
      </S.Header>
    </S.HeaderContainer>
  );
};
