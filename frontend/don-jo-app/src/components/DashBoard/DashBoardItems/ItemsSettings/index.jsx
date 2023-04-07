import React, { useState, useEffect } from "react";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import BasicTitle from "../../../Common/BasicTitle";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus.js";
import ListItem from "./ListItem";
import ShowMoreButton from "../../../Common/ShowMoreButton";
import ItemDetailModal from "../../../Common/Modal/ItemDetailModal";
import AddItemModal from "../../../Common/Modal/AddItemModal";
import { itemApi } from "../../../../api/items";
import { setCurrentItem } from "../../../../stores/items";
import DashboardLoading from "../../DashboardLoading";

const PAGE_SIZE = 6;
const ItemsSettings = () => {
  const dispatch = useDispatch();
  const memberAddress = useSelector((state) => state.member.walletAddress);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isShowItemModal, setShowItemModal] = useState(false);
  const [uid, setUid] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [result, setResult] = useState([]);
  const [hasMore, setIsEnd] = useState(false);
  const [isClickedEdit, setClickedEdit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleGetMyItemList = async (type) => {
    try {
      const {
        data: { itemList, hasMore },
      } = await itemApi.getItemList(
        memberAddress,
        type === "update" ? 0 : pageNum,
        PAGE_SIZE
      );
      setPageNum((prev) => prev + 1);

      if (type === "update") {
        setResult(itemList);
        setPageNum(1);
      } else {
        setResult((prev) => [...prev, ...(itemList || [])]);
      }
      setIsEnd(hasMore);
    } catch (error) {
      console.log("[Dashboard] handleGetMyItemList()... ", error);
    }
  };

  const handleAddItemModalOpen = () => {
    setShowItemModal(false);
    setIsAddItemModalOpen(false);
    handleGetMyItemList("update");
    setClickedEdit(false);
    document.body.style.overflow = "auto";
  };

  const handleShowItemDetailModal = () => {
    setShowItemModal(true);
  };

  useEffect(() => {
    handleGetMyItemList();
    const addButton = document.getElementById("add-button");

    if (!addButton) return;

    addButton.addEventListener("click", () => {
      setIsAddItemModalOpen((prev) => !prev);
      dispatch(setCurrentItem({}));
    });
  }, []);

  useEffect(() => {
    if (!isClickedEdit) {
      dispatch(setCurrentItem({}));
    }
  }, [isClickedEdit]);

  return (
    <S.SettingWrapper>
      <S.AddButton id="add-button">
        <S.AddIcon>
          <FiPlus size="32px" color="white" />
        </S.AddIcon>
      </S.AddButton>
      <BasicTitle text="Items List" />
      {isLoading && <DashboardLoading />}
      {isAddItemModalOpen && !isLoading && (
        <AddItemModal
          isModify={isClickedEdit}
          handleSetShowModal={handleAddItemModalOpen}
          handleSetLoading={setLoading}
        />
      )}
      {result && result.length > 0 ? (
        result.map((item) => (
          <ListItem
            key={item.id}
            uid={item.id}
            setUid={setUid}
            imgPath={item.imgPath}
            supportCount={item.salesCount}
            title={item.title}
            price={item.price}
            deleted={item.deleted}
            totalAmount={item.salesAmount.toString()}
            handleShowItemDetailModal={handleShowItemDetailModal}
          />
        ))
      ) : (
        <S.Message>There are no items registered.</S.Message>
      )}
      {hasMore && <ShowMoreButton handleOnClickButton={handleGetMyItemList} />}

      {isShowItemModal && (
        <ItemDetailModal
          uid={uid}
          isDashboard={true}
          handleSetShowModal={() => {
            handleGetMyItemList("update");
            setShowItemModal(false);
          }}
          handleOnClickButton={() => {
            setClickedEdit(true);
            setIsAddItemModalOpen(true);
            setShowItemModal(false);
          }}
        />
      )}
    </S.SettingWrapper>
  );
};

export default ItemsSettings;
