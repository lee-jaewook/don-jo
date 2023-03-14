import * as S from "./style";
import ProfileImg from "../ProfileImg";
import SelectBox from "../SelectBox";

const Header = () => {
  //임시 프로필 이미지 주소
  const src =
    "https://file.mk.co.kr/meet/neds/2022/10/image_readtop_2022_867768_16645834155184067.jpeg";

  return (
    <S.HeaderContainer>
      <S.Header>
        <S.Logo />
        <S.GuideSelect>
          <SelectBox />
        </S.GuideSelect>
        <S.ProfileImgContainer>
          <ProfileImg width={2.5} src={src} />
        </S.ProfileImgContainer>
      </S.Header>
    </S.HeaderContainer>
  );
};

export default Header;
