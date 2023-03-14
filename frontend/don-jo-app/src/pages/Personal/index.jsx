import * as S from "./style";

const Personal = () => {
  //해당 페이지 사람 더미 데이터
  const member = {
    member_address: "",
    profileImgPath:
      "https://img.insight.co.kr/static/2023/01/06/700/img_20230106141320_ai905341.webp",
    backgroundImgPath:
      "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/Q5WX26BXPG3CB5COPKO6AU2P54.png",
  };

  return (
    <S.Container>
      <S.BackgroundImg src={member.backgroundImgPath}></S.BackgroundImg>
      <S.Wrapper>
        <S.ProfileImgContainer>
          <S.ProfileImg src={member.profileImgPath} />
        </S.ProfileImgContainer>
        <S.Contents></S.Contents>
      </S.Wrapper>
    </S.Container>
  );
};

export default Personal;
