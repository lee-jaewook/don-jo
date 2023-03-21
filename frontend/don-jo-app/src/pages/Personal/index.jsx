import * as S from "./style";
import { FiEdit } from "react-icons/fi";
import ExternalLink from "../../components/Personal/ExternalLink";
import { useState } from "react";
import PersonalContent from "../../components/Personal/PersonalContent";
import FullScreenModal from "../../components/Common/Modal/FullScreenModal";
import IntroductionEdit from "../../components/Personal/IntroductionEdit";
import MDEditor from "@uiw/react-md-editor";
import { Desktop } from "../../components/Common/Template";

const Personal = () => {
  //로그인 유저 더미 데이터
  const loginUser = {
    memberAddress: "memberaddress",
    nickname: "taehyun",
  };

  //해당 페이지 사람 더미 데이터
  const pageOwner = {
    memberAddress: "memberaddress",
    profileImgPath:
      "https://img.insight.co.kr/static/2023/01/06/700/img_20230106141320_ai905341.webp",
    backgroundImgPath:
      "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/Q5WX26BXPG3CB5COPKO6AU2P54.png",
    nickname: "Robert Downey Jr.",
    introduction: `# Its me

Hi, My name is Robert Downy Jr.

> This is my personal page for sponsorship.

Please take a look at my work and send me a message of support. 

—————
- item 1
- item 2
- item 3  
—————

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`


**Thank you.**

![image](https://i.ytimg.com/vi/FZhIEzWjb5w/maxresdefault.jpg)`,
    numSupporters: 16000,
    socialList: [
      "https://www.youtube.com/@SamsungKorea",
      "https://velog.io/@taebong1012",
      "https://github.com/taebong1012",
    ],
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [isBackgroundHover, setIsBackgroundHover] = useState(false);
  const [isProfileHover, setIsProfileHover] = useState(false);
  const [isShowIntroductionEdit, setIsShowIntroductionEdit] = useState(false);

  return (
    <S.Container>
      <S.BackgroundImg
        src={pageOwner.backgroundImgPath}
        onMouseOver={() => setIsBackgroundHover(true)}
        onMouseOut={() => setIsBackgroundHover(false)}
      >
        {loginUser.memberAddress === pageOwner.memberAddress &&
          isBackgroundHover && (
            <S.BackgroundImgEdit>
              <S.EditIcon>
                <FiEdit color="white" size={20.35} />
              </S.EditIcon>
            </S.BackgroundImgEdit>
          )}
      </S.BackgroundImg>
      <S.ProfileImgContainer>
        <S.ProfileImg
          src={pageOwner.profileImgPath}
          onMouseOver={() => setIsProfileHover(true)}
          onMouseOut={() => setIsProfileHover(false)}
        >
          {loginUser.memberAddress === pageOwner.memberAddress &&
            isProfileHover && (
              <S.ProfileImgEdit>
                <S.EditIcon>
                  <FiEdit color="white" size={20.35} />
                </S.EditIcon>
              </S.ProfileImgEdit>
            )}
        </S.ProfileImg>
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
          <ExternalLink socialList={pageOwner.socialList} />
          <Desktop>
            <S.IntroductionContainer>
              {/* 로그인한 유저와 페이지 주인이 같다면 edit 버튼 표시 */}
              {loginUser.memberAddress === pageOwner.memberAddress && (
                <S.IntroductionEdit
                  onClick={() => {
                    setIsShowIntroductionEdit(true);
                  }}
                >
                  <FiEdit style={{ cursor: "pointer" }} />
                </S.IntroductionEdit>
              )}
              <S.Introduction>
                <MDEditor.Markdown
                  source={pageOwner.introduction}
                ></MDEditor.Markdown>
              </S.Introduction>
            </S.IntroductionContainer>
          </Desktop>
        </S.UserInfo>
        <PersonalContent />
      </S.ContentsContainer>

      {isShowIntroductionEdit && (
        <FullScreenModal
          handleSetShowModal={setIsShowIntroductionEdit}
          children={
            <IntroductionEdit handleSetShowModal={setIsShowIntroductionEdit} />
          }
        />
      )}
    </S.Container>
  );
};

export default Personal;
