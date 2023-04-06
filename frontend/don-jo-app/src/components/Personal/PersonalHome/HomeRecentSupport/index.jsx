import * as S from "./style";
import RecentSupportBlock from "./RecentSupportBlock";
import ShowMoreButton from "../../../Common/ShowMoreButton";
import { useState, useEffect } from "react";
import { supportApi } from "../../../../api/support";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { PulseLoader } from "react-spinners";
import { setDonationStatus } from "../../../../stores/donation";

const HomeRecentSupport = ({ isOwner }) => {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(0);
  const PAGE_SIZE = 5;
  const TYPE = "all";
  const [supportList, setSupportList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const donationStatus = useSelector((state) => state.donation.donationStatus);

  //현재 페이지의 멤버 지갑주소 정보
  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  ).toLowerCase();

  const getSupportList = async (init) => {
    setIsLoading(true);
    try {
      const { data } = await supportApi.getSupportList(
        pageMemberAddress,
        init ? 0 : pageNum,
        PAGE_SIZE,
        TYPE
      );
      setPageNum(init ? 0 : pageNum + 1);
      setHasMore(data.hasMore);
      if (init) {
        setSupportList(data.supportList || []);
      } else {
        setSupportList((prev) => [...prev, ...(data.supportList || [])]);
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSupportList = async () => {
    const { data } = await supportApi.getSupportList(
      pageMemberAddress,
      0,
      PAGE_SIZE * pageNum + 1,
      TYPE
    );
    setSupportList(data.supportList);
    dispatch(setDonationStatus(false));
  };

  useEffect(() => {
    if (donationStatus) {
      setTimeout(() => {
        refreshSupportList();
      }, 0);
    }
  }, [donationStatus]);

  useEffect(() => {
    if (!!pageMemberAddress) getSupportList();
  }, [pageMemberAddress]);

  const handleOnClickShowMoreButton = () => {
    getSupportList();
  };

  //댓글 달린 블럭 교체하기
  const handleReflectReply = async (supportTransactionHash) => {
    const { data } = await supportApi.getSupportDetail(supportTransactionHash);
    const updatedSupportList = supportList.filter((support) => {
      if (support.transactionHash === supportTransactionHash) {
        support = data;
      }
      return support;
    });
    setSupportList(updatedSupportList);
  };

  const [changedSupportTransactionHash, setChangedSupportTransactionHash] =
    useState("");

  useEffect(() => {
    if (changedSupportTransactionHash !== "") {
      const supportTransactionHash = changedSupportTransactionHash;
      setChangedSupportTransactionHash("");
      handleReflectReply(supportTransactionHash);
    }
  }, [changedSupportTransactionHash]);

  const Contents = () => {
    return (
      <>
        {supportList.length !== 0 ? (
          <S.Card>
            {supportList.map((supportContent, i) => {
              return (
                <RecentSupportBlock
                  key={i}
                  supportContent={supportContent}
                  isOwner={isOwner}
                  supportListLength={supportList.length}
                  num={i}
                  setChangedSupportTransactionHash={
                    setChangedSupportTransactionHash
                  }
                />
              );
            })}

            {hasMore && (
              <ShowMoreButton
                handleOnClickButton={handleOnClickShowMoreButton}
              />
            )}
          </S.Card>
        ) : (
          <S.Nothing>There's no Recent Support 😥</S.Nothing>
        )}
      </>
    );
  };

  const Loading = () => {
    return (
      <S.Nothing>
        <PulseLoader color="var(--color-primary)" />
      </S.Nothing>
    );
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>Recent Support</S.Title>
        <S.Typecontainer>
          <S.Type>🙏 Wishlist</S.Type>
          <S.Type>💰 Donation</S.Type>
          <S.Type>📁 Items</S.Type>
        </S.Typecontainer>
      </S.TitleContainer>
      {isLoading ? <Loading /> : <Contents />}
    </S.Container>
  );
};

export default HomeRecentSupport;

HomeRecentSupport.propTypes = {
  isOwner: PropTypes.bool,
};
