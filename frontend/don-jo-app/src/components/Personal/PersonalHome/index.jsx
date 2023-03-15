import * as S from "./style";
import HomeRecentSupport from "./HomeRecentSupport";
import HomeDonation from "./HomeDonation";

const PersonalHome = () => {
  return (
    <S.Container>
      <HomeRecentSupport />
      <S.Wrapper>
        <HomeDonation />
      </S.Wrapper>
    </S.Container>
  );
};

export default PersonalHome;
