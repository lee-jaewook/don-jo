import * as S from "./style";
import RecentSupportBlock from "./RecentSupportBlock";
import ShowMoreButton from "../../../Common/ShowMoreButton";
import { useState, useEffect } from "react";
import { supportApi } from "../../../../api/support";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const HomeRecentSupport = ({ isOwner }) => {
  const [pageNum, setPageNum] = useState(0);
  const PAGE_SIZE = 5;
  const TYPE = "all";
  const [supportList, setSupportList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  //현재 페이지의 멤버 지갑주소 정보
  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  ).toLowerCase();

  const getSupportList = async () => {
    try {
      const { data } = await supportApi.getSupportList(
        pageMemberAddress,
        pageNum,
        PAGE_SIZE,
        TYPE
      );
      setPageNum((prev) => prev + 1);
      setHasMore(data.hasMore);
      setSupportList((prev) => [...prev, ...(data.supportList || [])]);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (!!pageMemberAddress) getSupportList();
  }, [pageMemberAddress]);

  const handleOnClickShowMoreButton = () => {
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

HomeRecentSupport.propTypes = {
  isOwner: PropTypes.bool,
};
