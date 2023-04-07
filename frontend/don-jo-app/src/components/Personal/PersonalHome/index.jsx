import * as S from "./style";
import HomeRecentSupport from "./HomeRecentSupport";
import HomeDonation from "./HomeDonation";
import HomeWishlist from "./HomeWishlist";
import { Mobile } from "../../Common/Template";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";

//데스크탑이거나 태블릿일 경우
const DesktopTablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 769 });
  return isTablet ? children : null;
};

const PersonalHome = ({ donationSettingData, wishListData, isOwner }) => {
  return (
    <S.Container>
      <DesktopTablet>
        <HomeRecentSupport isOwner={isOwner} />
        <S.Wrapper>
          <HomeDonation
            donationSettingData={donationSettingData}
            isOwner={isOwner}
          />
          <HomeWishlist wishListData={wishListData} />
        </S.Wrapper>
      </DesktopTablet>

      <Mobile>
        <HomeDonation
          donationSettingData={donationSettingData}
          isOwner={isOwner}
        />
        <HomeRecentSupport isOwner={isOwner} />
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
  isOwner: PropTypes.bool,
};
