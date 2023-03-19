import * as S from "./style";
import PersonalTab from "../PersonalTab";
import { useTabs } from "../../../hooks/useTabs";
import PersonalHome from "../PersonalHome";
import PersonalItems from "../PersonalItems";

const allTab = [
  {
    index: 0,
    name: "Home",
    component: <PersonalHome />,
  },
  {
    index: 1,
    name: "Items",
    component: <PersonalItems />,
  },
  {
    index: 2,
    name: "Wishlist",
    component: <>위시리스트</>,
  },
];

const PersonalContent = () => {
  const { currentItem, changeItem } = useTabs(0, allTab);
  return (
    <S.Container>
      <PersonalTab currentItem={currentItem} changeItem={changeItem} />
      {currentItem.component}
    </S.Container>
  );
};

export default PersonalContent;
