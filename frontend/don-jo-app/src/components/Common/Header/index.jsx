import * as S from "./style";
import { ProfileImg } from "../ProfileImg";

export const Header = () => {
  return (
    <S.HeaderContainer>
      <S.Header>
        <S.Logo />
        <S.GuideSelect></S.GuideSelect>
        <S.ProfileImgContainer>
          <ProfileImg />
        </S.ProfileImgContainer>
      </S.Header>
    </S.HeaderContainer>
  );
};
