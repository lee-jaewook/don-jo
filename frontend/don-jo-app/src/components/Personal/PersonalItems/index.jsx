import * as S from "./style";
import ItemCard from "./ItemsCard";
import { itemList } from "./dummyData";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import AddItemModal from "../../Common/Modal/AddItemModal";
import { useSelector } from "react-redux";

const PersonalItems = () => {
  //로그인 유저의 지갑주소 정보
  const loginUserMemberAddress = useSelector(
    (state) => state.web3.walletAddress
  );

  //현재 페이지의 멤버 지갑주소 정보
  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  ).toLowerCase();

  //로그인 유저가 페이지 주인인지 확인
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    setIsOwner(pageMemberAddress === loginUserMemberAddress);
  }, []);

  const [isOpenAddItemModal, setIsOpenAddItemModal] = useState(false);

  return (
    <S.Container>
      <S.Title>This is my Items</S.Title>
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
      {isOpenAddItemModal && (
        <AddItemModal handleSetShowModal={setIsOpenAddItemModal} />
      )}
    </S.Container>
  );
};

export default PersonalItems;
