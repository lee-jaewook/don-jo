import * as S from "./style";
import ProfileImg from "../../../../Common/ProfileImg";
import { useEffect, useState } from "react";


//현재 로그인한 유저 더미 데이터
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
  introduction:
    "This is Example introduction. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. This is Example introduction. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
  numSupporters: 16000,
  socialList: [
    "https://www.youtube.com/@SamsungKorea",
    "https://velog.io/@taebong1012",
    "https://github.com/taebong1012",
  ],
};

const RecentSupportBlock = ({ supportContent }) => {
  const baseURL = "http://localhost:3000/";
  const [supportText, setSupportText] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isShowReplyInput, setIsShowReplyInput] = useState(false);
  const [commentInputText, setCommentInputText] = useState(""); //댓글 입력

  useEffect(() => {
    switch (supportContent.supportType) {
      case "donation":
        setSupportText("donates to ");
        setEmoji("💰");
        break;
      case "wishlist":
        setSupportText(" supports  ");
        setEmoji("🙏");
        break;
      case "items":
        setSupportText(" buys from ");
        setEmoji("📁");
        break;
    }
  }, []);

  //댓글 입력 반영
  const handleOnChangeInput = (e) => {
    setCommentInputText(e.target.value);
  };

  //댓글 등록
  const doRegistComment = () => {
    console.log({ commentInputText }, "댓글 등록");
    setIsShowReplyInput(false);
  };

  return (
    <div>
      {/* 누가 누구에게 어떠한 후원을 했는지 노출 */}
      <S.Container>
        <S.RepresentContainer>
          <S.ProfileImgContainer>
            <ProfileImg
              width={3}
              src={supportContent.fromMember.profileImgPath}
              to={baseURL + supportContent.fromMember.pageName}
            />
          </S.ProfileImgContainer>
          <S.TitleWrapper>
            <S.TitleContent>
              <S.Nickname>{supportContent.fromMember.nickname}</S.Nickname>
              &nbsp;
              {supportText}
              &nbsp;
              <S.Nickname>{pageOwner.nickname}</S.Nickname>
            </S.TitleContent>
            {loginUser.memberAddress === pageOwner.memberAddress &&
              Object.keys(supportContent.comments).length === 0 && (
                <S.ReplyBtn
                  onClick={() => {
                    setIsShowReplyInput((prev) => !prev);
                  }}
                >
                  {isShowReplyInput ? "Close" : "Reply"}
                </S.ReplyBtn>
              )}
          </S.TitleWrapper>
          <span style={{ marginLeft: "auto" }}>{emoji}</span>
        </S.RepresentContainer>
        {loginUser.memberAddress === pageOwner.memberAddress &&
          isShowReplyInput && (
            <S.InputContainer>
              <S.ReplyInput handleOnChangeValue={handleOnChangeInput} />
              <S.RegistBtn onClick={doRegistComment}>Regist</S.RegistBtn>
            </S.InputContainer>
          )}
      </S.Container>
      {/* 서포트 메세지가 있을 경우 노출 */}
      {supportContent.sendMsg !== "" && (
        <S.CommentContainer>
          <S.ProfileImgContainer>
            <ProfileImg
              width={3}
              src={supportContent.fromMember.profileImgPath}
              to={baseURL + supportContent.fromMember.pageName}
            />
          </S.ProfileImgContainer>
          <div>
            <S.Nickname>{supportContent.fromMember.nickname}</S.Nickname>
            <S.Comment>{supportContent.sendMsg}</S.Comment>
            <S.SupportMsgText>Support message</S.SupportMsgText>
          </div>
        </S.CommentContainer>
      )}
      {/* 해당 후원에 댓글이 있을 경우 노출 */}
      {Object.keys(supportContent.comments).length !== 0 && (
        <S.CommentContainer>
          <S.ProfileImgContainer>
            <ProfileImg width={3} src={pageOwner.profileImgPath} />
          </S.ProfileImgContainer>
          <div>
            <S.Nickname>{pageOwner.nickname}</S.Nickname>
            <S.Comment>{supportContent.comments.content}</S.Comment>
          </div>
        </S.CommentContainer>
      )}
      <S.Line />
    </div>
  );
};

export default RecentSupportBlock;
