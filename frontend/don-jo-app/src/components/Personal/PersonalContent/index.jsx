import * as S from "./style";
import PersonalTab from "../PersonalTab";
import { useTabs } from "../../../hooks/useTabs";
import PersonalHome from "../PersonalHome";
import PersonalItems from "../PersonalItems";
import PersonalWishlist from "../PersonalWishlist";
import PropTypes from "prop-types";

const PersonalContent = ({
  donationSettingData,
  wishListData,
  pageNickname,
}) => {
  const allTab = [
    {
      index: 0,
      name: "Home",
      component: (
        <PersonalHome
          donationSettingData={donationSettingData}
          wishListData={wishListData}
          pageNickname={pageNickname}
        />
      ),
    },
    {
      index: 1,
      name: "Items",
      component: <PersonalItems />,
    },
    {
      index: 2,
      name: "Wishlist",
      component: <PersonalWishlist />,
    },
  ];

  const { currentItem, changeItem } = useTabs(0, allTab);

  return (
    <S.Container>
      <PersonalTab currentItem={currentItem} changeItem={changeItem} />
      {currentItem.component}
    </S.Container>
  );
};

export default PersonalContent;

PersonalContent.propTypes = {
  donationSettingData: PropTypes.shape({
    donationEmoji: PropTypes.string.isRequired,
    donationName: PropTypes.string.isRequired,
    pricePerDonation: PropTypes.number.isRequired,
    thankMsg: PropTypes.string.isRequired,
  }).isRequired,
  wishListData: PropTypes.array,
  pageNickname: PropTypes.string.isRequired,
};
