import React from "react";
import PropTypes from "prop-types";
import WishlistItem from "../WishlistItem";
import * as S from "./style";
import { wishlist } from "../../../data/common";

const Wishlist = ({ Wishlist = wishlist, isDashboard, handleSetShowModal }) => {
  return (
    <S.WishlistContainer isDashboard={isDashboard}>
      {Wishlist && Wishlist.length > 0 ? (
        Wishlist.map((item) => (
          <WishlistItem
            key={item.uid}
            isDashboard={isDashboard}
            uid={item.uid}
            imgPath={item.imgPath}
            title={item.title}
            description={item.description}
            collectedAmount={item.collectedAmount}
            totalAmount={item.totalAmount}
            handleSetShowModal={handleSetShowModal}
          />
        ))
      ) : (
        <S.Message>There are no registered wishlist.</S.Message>
      )}
    </S.WishlistContainer>
  );
};

export default Wishlist;

Wishlist.propTypes = {
  Wishlist: PropTypes.array,
  isDashboard: PropTypes.bool,
  handleSetShowModal: PropTypes.func,
};
