import * as S from "./style";
import ItemCard from "./ItemsCard";
import { useEffect, useState } from "react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import AddItemModal from "../../Common/Modal/AddItemModal";
import { useSelector, useDispatch } from "react-redux";
import ShowMoreButton from "../../Common/ShowMoreButton";
import { itemApi } from "../../../api/items";
import PropTypes from "prop-types";
import ItemDetailModal from "../../Common/Modal/ItemDetailModal";
import { useNavigate, useParams } from "react-router";
import { PulseLoader } from "react-spinners";
import { setRefreshItemStatus } from "../../../stores/items";

const PAGE_SIZE = 6;

const PersonalItems = ({ isOwner, itemId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageName } = useParams();
  const [isShowDetailModal, setIsShowDetailModal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isShowDetailModal) {
      navigate(`/${pageName}`);
      document.body.style.overflow = "auto";
    }
  }, [isShowDetailModal]);

  const ItemIdParamsExist = () => {
    if (itemId) {
      return (
        <ItemDetailModal
          uid={itemId}
          handleSetShowModal={setIsShowDetailModal}
          handleOnClickButton={() => {
            // 클릭했을 시 buy 되게끔
          }}
        />
      );
    }
  };

  //현재 페이지의 멤버 지갑주소 정보
  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  ).toLowerCase();

  const refreshItemStatus = useSelector(
    (state) => state.items.refreshItemStatus
  );
  const [pageNum, setPageNum] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [hasMore, setIsEnd] = useState(false);
  const [isOpenAddItemModal, setIsOpenAddItemModal] = useState(false);

  const getItemList = async (isUpdated = false) => {
    try {
      if (pageMemberAddress !== "") {
        const { data } = await itemApi.getItemList(
          pageMemberAddress,
          isUpdated ? 0 : pageNum,
          PAGE_SIZE
        );

        if (isUpdated) {
          setItemList(data.itemList || []);
          setPageNum(1);
        } else {
          setItemList((prev) => [...prev, ...(data.itemList || [])]);
          setPageNum((prev) => prev + 1);
        }

        setIsEnd(data.hasMore);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const refreshItemtList = async () => {
    const { data } = await itemApi.getItemList(
      pageMemberAddress,
      0,
      PAGE_SIZE * pageNum
    );
    setItemList(data.itemList);
  };

  useEffect(() => {
    if (refreshItemStatus) {
      refreshItemtList();
      dispatch(setRefreshItemStatus(false));
    }
  }, [refreshItemStatus]);

  useEffect(() => {
    getItemList();
  }, [pageMemberAddress]);

  const handleOnClickShowMoreButton = () => {
    getItemList();
  };

  const OwnerOrHasItemList = () => {
    return (
      <S.CardContainer>
        <ItemIdParamsExist />
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

        {itemList.map((item) => {
          if (!item.closed) {
            return <ItemCard key={item.id} item={item} isOwner={isOwner} />;
          } else {
            return null;
          }
        })}
      </S.CardContainer>
    );
  };

  const Nothing = () => {
    return <S.Nothing>There's no items 🥲</S.Nothing>;
  };

  const Contents = () => {
    return (
      <>
        {isOwner || itemList.length !== 0 ? (
          <OwnerOrHasItemList />
        ) : (
          <Nothing />
        )}

        {hasMore && (
          <ShowMoreButton handleOnClickButton={handleOnClickShowMoreButton} />
        )}

        {isOpenAddItemModal && (
          <AddItemModal
            handleSetLoading={setIsLoading}
            handleSetShowModal={() => {
              setIsOpenAddItemModal(false);
              getItemList(true);
              document.body.style.overflow = "auto";
            }}
          />
        )}
      </>
    );
  };

  const Loading = () => {
    return (
      <S.LoadingContainer>
        <PulseLoader color="var(--color-primary)" />
      </S.LoadingContainer>
    );
  };

  return (
    <S.Container>
      <S.Title>This is my Items</S.Title>

      {isLoading ? <Loading /> : <Contents />}
    </S.Container>
  );
};

export default PersonalItems;

PersonalItems.propTypes = {
  isOwner: PropTypes.bool,
};
