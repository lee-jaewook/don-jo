import * as S from "./style";
import HomeRecentSupport from "./HomeRecentSupport";
import HomeDonation from "./HomeDonation";
import HomeWishlist from "./HomeWishlist";

const PersonalHome = () => {
  return (
    <S.Container>
      <HomeRecentSupport />
      <S.Wrapper>
        <HomeDonation />
        <HomeWishlist />
      </S.Wrapper>
    </S.Container>
  );
};

export default PersonalHome;
