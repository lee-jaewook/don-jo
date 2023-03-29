import * as S from "./style";
import RecentSupportBlock from "./RecentSupportBlock";
import ShowMoreButton from "../../../Common/ShowMoreButton";
import { useState, useEffect } from "react";
import { supportApi } from "../../../../api/support";
import { useSelector } from "react-redux";

const HomeRecentSupport = () => {
  const [pageNum, setPageNum] = useState(0);
  const PAGE_SIZE = 5;
  const TYPE = "all";
  const [supportList, setSupportList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

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

  const getSupportList = async () => {
    // !!!!API 다시 나오면 세팅 후 부착!!!!!
    const { data } = await supportApi.getSupportList(
      pageMemberAddress,
      pageNum,
      PAGE_SIZE,
      TYPE
    );
    setPageNum((prev) => prev + 1);
    setSupportList((prev) => [...prev, ...(data.supportList || [])]);
    setHasMore(data.hasMore);
  };

  useEffect(() => {
    if (!!pageMemberAddress) getSupportList();
  }, [pageMemberAddress]);

  const handleOnClickShowMoreButton = () => {
    console.log("Show More");
    getSupportList();
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
      {supportList.length !== 0 ? (
        <S.Card>
          {supportList.map((supportContent, i) => {
            return (
              <RecentSupportBlock
                key={i}
                supportContent={supportContent}
                isOwner={isOwner}
              />
            );
          })}

          {hasMore && (
            <ShowMoreButton handleOnClickButton={handleOnClickShowMoreButton} />
          )}
        </S.Card>
      ) : (
        <S.Nothing>There's no Recent Support 😥</S.Nothing>
      )}
    </S.Container>
  );
};

export default HomeRecentSupport;
