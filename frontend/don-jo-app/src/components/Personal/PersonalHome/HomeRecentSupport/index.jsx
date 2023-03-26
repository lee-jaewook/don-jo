import * as S from "./style";
import RecentSupportBlock from "./RecentSupportBlock";
import { supportList } from "../dummyData";
import ShowMoreButton from "../../../Common/ShowMoreButton";

const HomeRecentSupport = () => {
  const handleOnClickShowMore = () => {
    console.log("show more");
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
      <S.Card>
        {supportList.map((supportContent, i) => {
          return <RecentSupportBlock key={i} supportContent={supportContent} />;
        })}
        <ShowMoreButton handleOnClickButton={handleOnClickShowMore} />
      </S.Card>
    </S.Container>
  );
};

export default HomeRecentSupport;
