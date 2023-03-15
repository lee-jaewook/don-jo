import React from "react";
import { useTabs } from "../../../hooks/useTabs";
import DashBoardTab from "../DashBoardTab";
import WishlistSettings from "./WishlistSettings";
import WishlistSupporter from "./WishlistSupporter";

const allTab = [
  {
    index: 0,
    name: "Supporters",
    component: <WishlistSupporter />,
  },
  {
    index: 1,
    name: "Setting",
    component: <WishlistSettings />,
  },
];

const DashBoardWishlist = () => {
  const { currentItem, changeItem } = useTabs(0, allTab);
  return (
    <div>
      <DashBoardTab currentItem={currentItem} changeItem={changeItem} />
      {currentItem.component}
    </div>
  );
};

export default DashBoardWishlist;
