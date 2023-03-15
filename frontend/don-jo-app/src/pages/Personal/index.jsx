import * as S from "./style";
import { FiEdit } from "react-icons/fi";

const Personal = () => {
  //로그인 유저 더미 데이터
  const loginUser = {
    memgerAddress: "memberaddress",
    // memgerAddress: "aa",
    nickname: "",
  };

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
    socialList: [
      "https://www.youtube.com/@SamsungKorea",
      "https://github.com/taebong1012",
      "https://velog.io/@taebong1012",
    ],
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

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
              <S.NumSupporter>
                {pageOwner.numSupporters
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </S.NumSupporter>
              supporter
            </S.SupporterContainer>

            {/* 페이지 주인의 social link가 없을 경우에는 노출 X */}
            {pageOwner.socialList.length !== 0 && (
              <S.ExternalLinkContainer></S.ExternalLinkContainer>
            )}

            <S.IntroductionContainer>
              {/* 로그인한 유저와 페이지 주인이 같다면 edit 버튼 표시 */}
              {loginUser.memgerAddress === pageOwner.memberAddress && (
                <S.IntroductionEdit>
                  <FiEdit />
                </S.IntroductionEdit>
              )}
              <S.Introduction>{pageOwner.introduction}</S.Introduction>
            </S.IntroductionContainer>
          </S.UserInfo>
          <S.Contents></S.Contents>
        </S.ContentsContainer>
      </S.Wrapper>
    </S.Container>
  );
};

export default Personal;
