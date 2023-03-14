import * as S from "./style";

const Personal = () => {
  //해당 페이지 사람 더미 데이터
  const pageOwner = {
    memberAddress: "memberaddress",
    profileImgPath:
      "https://img.insight.co.kr/static/2023/01/06/700/img_20230106141320_ai905341.webp",
    backgroundImgPath:
      "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/Q5WX26BXPG3CB5COPKO6AU2P54.png",
    nickname: "Robert Downey Jr.",
    introduction:
      "This is Example introduction. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. This is Example introduction. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    numSupporters: 16000,
    socialList: ["", "", ""],
  };

  return (
    <S.Container>
      <S.BackgroundImg src={pageOwner.backgroundImgPath}></S.BackgroundImg>
      <S.Wrapper>
        <S.ProfileImgContainer>
          <S.ProfileImg src={pageOwner.profileImgPath} />
        </S.ProfileImgContainer>
        <S.ContentsContainer>
          <S.UserInfo>
            <S.Nickname>{pageOwner.nickname}</S.Nickname>
            <S.SupporterContainer>
              <S.NumSupporter>{pageOwner.numSupporters}</S.NumSupporter>
              supporter
            </S.SupporterContainer>
            <S.ExternalLinkContainer></S.ExternalLinkContainer>
            <S.IntroductionContainer>
              {pageOwner.introduction}
            </S.IntroductionContainer>
          </S.UserInfo>
          <S.Contents></S.Contents>
        </S.ContentsContainer>
      </S.Wrapper>
    </S.Container>
  );
};

export default Personal;
