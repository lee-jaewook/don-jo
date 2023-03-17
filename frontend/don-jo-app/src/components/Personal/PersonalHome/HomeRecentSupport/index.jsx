import * as S from "./style";
import RecentSupportBlock from "./RecentSupportBlock";
import { supportList } from "./dummyData";


const HomeRecentSupport = () => {
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
      </S.Card>
    </S.Container>
  );
};

export default HomeRecentSupport;
