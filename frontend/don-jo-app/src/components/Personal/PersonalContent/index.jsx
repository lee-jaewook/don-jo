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
  isOwner,
  itemId,
}) => {
  const allTab = [
    {
      index: 0,
      name: "Home",
      component: (
        <PersonalHome
          donationSettingData={donationSettingData}
          wishListData={wishListData}
          isOwner={isOwner}
        />
      ),
    },
    {
      index: 1,
      name: "Items",
      component: (
        <PersonalItems
          isOwner={isOwner}
          itemId={itemId ? Number(itemId) : null}
        />
      ),
    },
    {
      index: 2,
      name: "Wishlist",
      component: <PersonalWishlist isOwner={isOwner} />,
    },
  ];

  const { currentItem, changeItem } = useTabs(itemId ? 1 : 0, allTab);

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
  isOwner: PropTypes.bool,
  itemId: PropTypes.string,
};
