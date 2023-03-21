import React from "react";
import { useTabs } from "../../../hooks/useTabs";
import DashBoardTab from "../DashBoardTab";
import DonationForm from "./DonationForm";
import DonationSupporter from "./DonationSupporter";

const allTab = [
  {
    index: 0,
    name: "Supporters",
    component: <DonationSupporter />,
  },
  {
    index: 1,
    name: "Setting",
    component: <DonationForm />,
  },
];

const DashBoardDonation = () => {
  const { currentItem, changeItem } = useTabs(0, allTab);
  return (
    <div>
      <DashBoardTab currentItem={currentItem} changeItem={changeItem} />
      {currentItem.component}
    </div>
  );
};

export default DashBoardDonation;
