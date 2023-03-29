import * as S from "./style";
import ItemCard from "./ItemsCard";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import AddItemModal from "../../Common/Modal/AddItemModal";
import { useSelector } from "react-redux";
import ShowMoreButton from "../../Common/ShowMoreButton";
import { itemApi } from "../../../api/items";
import PropTypes from "prop-types";

const PersonalItems = ({ isOwner }) => {
  //현재 페이지의 멤버 지갑주소 정보
  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  ).toLowerCase();

  const [isOpenAddItemModal, setIsOpenAddItemModal] = useState(false);

  const [pageNum, setPageNum] = useState(0);
  const PAGE_SIZE = 6;
  const [itemList, setItemList] = useState([]);
  const [hasMore, setIsEnd] = useState(false);

  const getItemList = async () => {
    const { data } = await itemApi.getItemList(
      pageMemberAddress,
      pageNum,
      PAGE_SIZE
    );
    setPageNum((prev) => prev + 1);
    setItemList((prev) => [...prev, ...(data.itemList || [])]);
    setIsEnd(data.hasMore);
  };

  useEffect(() => {
    getItemList();
  }, []);

  const handleOnClickShowMoreButton = () => {
    console.log("Show More");
    getItemList();
  };

  const OwnerOrHasItemList = () => {
    return (
      <S.CardContainer>
        {isOwner && (
          <S.AddCard
            onClick={() => {
              setIsOpenAddItemModal(true);
            }}
          >
            <S.IconWrapper>
              <FiPlus color="white" size={30} />
            </S.IconWrapper>
          </S.AddCard>
        )}

        {itemList.map((item, i) => {
          return <ItemCard key={i} item={item} isOwner={isOwner} />;
        })}
      </S.CardContainer>
    );
  };

  const Nothing = () => {
    return <S.Nothing>There's no items 🥲</S.Nothing>;
  };

  return (
    <S.Container>
      <S.Title>This is my Items</S.Title>
      {isOwner || itemList.length !== 0 ? <OwnerOrHasItemList /> : <Nothing />}

      {hasMore && (
        <ShowMoreButton handleOnClickButton={handleOnClickShowMoreButton} />
      )}

      {isOpenAddItemModal && (
        <AddItemModal
          handleSetShowModal={setIsOpenAddItemModal}
          whichApiChoose={true}
        />
      )}
    </S.Container>
  );
};

export default PersonalItems;

PersonalItems.propTypes = {
  isOwner: PropTypes.bool,
};
