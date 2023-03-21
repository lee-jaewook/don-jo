import * as S from "./style";
import HomeRecentSupport from "./HomeRecentSupport";
import HomeDonation from "./HomeDonation";
import HomeWishlist from "./HomeWishlist";
import { Mobile } from "../../Common/Template";
import { useMediaQuery } from "react-responsive";

//데스크탑이거나 태블릿일 경우
const DesktopTablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 769 });
  return isTablet ? children : null;
};

const PersonalHome = () => {
  return (
    <S.Container>
      <DesktopTablet>
        <HomeRecentSupport />
        <S.Wrapper>
          <HomeDonation />
          <HomeWishlist />
        </S.Wrapper>
      </DesktopTablet>

      <Mobile>
        <HomeDonation />
        <HomeRecentSupport />
        <HomeWishlist />
      </Mobile>
    </S.Container>
  );
};

export default PersonalHome;
