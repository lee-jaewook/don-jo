import React from "react";
import { useTabs } from "../../../hooks/useTabs";
import DashBoardTab from "../DashBoardTab";
import ItemsSettings from "./ItemsSettings";
import ItemsSupporter from "./ItemsSupporter";

const allTab = [
  {
    index: 0,
    name: "Supporters",
    component: <ItemsSupporter />,
  },
  {
    index: 1,
    name: "Setting",
    component: <ItemsSettings />,
  },
];

const DashBoardItems = () => {
  const { currentItem, changeItem } = useTabs(0, allTab);
  return (
    <div>
      <DashBoardTab currentItem={currentItem} changeItem={changeItem} />
      {currentItem.component}
    </div>
  );
};

export default DashBoardItems;
