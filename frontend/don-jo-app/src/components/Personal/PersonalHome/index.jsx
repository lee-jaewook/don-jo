import * as S from "./style";
import HomeRecentSupport from "./HomeRecentSupport";
import HomeDonation from "./HomeDonation";
import HomeWishlist from "./HomeWishlist";
import { Mobile } from "../../Common/Template";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

//데스크탑이거나 태블릿일 경우
const DesktopTablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 769 });
  return isTablet ? children : null;
};

const PersonalHome = ({ donationSettingData, wishListData }) => {
  return (
    <S.Container>
      <DesktopTablet>
        <HomeRecentSupport />
        <S.Wrapper>
          <HomeDonation donationSettingData={donationSettingData} />
          <HomeWishlist wishListData={wishListData} />
        </S.Wrapper>
      </DesktopTablet>

      <Mobile>
        <HomeDonation donationSettingData={donationSettingData} />
        <HomeRecentSupport />
        <HomeWishlist wishListData={wishListData} />
      </Mobile>
    </S.Container>
  );
};

export default PersonalHome;

PersonalHome.propTypes = {
  donationSettingData: PropTypes.shape({
    donationEmoji: PropTypes.string.isRequired,
    donationName: PropTypes.string.isRequired,
    pricePerDonation: PropTypes.number,
    thankMsg: PropTypes.string.isRequired,
  }).isRequired,
  wishListData: PropTypes.array,
};
