import * as S from "./style";
import HomeRecentSupport from "./HomeRecentSupport";
import HomeDonation from "./HomeDonation";
import HomeWishlist from "./HomeWishlist";
import { Desktop, Tablet, Mobile } from "../../Common/Template";

const PersonalHome = () => {
  return (
    <S.Container>
      <Desktop>
        <HomeRecentSupport />
        <S.Wrapper>
          <HomeDonation />
          <HomeWishlist />
        </S.Wrapper>
      </Desktop>

      <Tablet>
        <HomeRecentSupport />
        <S.Wrapper>
          <HomeDonation />
          <HomeWishlist />
        </S.Wrapper>
      </Tablet>

      <Mobile>
        <HomeDonation />
        <HomeRecentSupport />
        <HomeWishlist />
      </Mobile>
    </S.Container>
  );
};

export default PersonalHome;
