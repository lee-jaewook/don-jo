import * as S from "./style";
import ProfileImg from "../../../../Common/ProfileImg";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ContractModal from "../../../../Common/Modal/ContractModal";

const RecentSupportBlock = ({ supportContent, isOwner }) => {
  const [supportText, setSupportText] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isShowReplyInput, setIsShowReplyInput] = useState(false);
  const [commentInputText, setCommentInputText] = useState(""); //댓글 입력
  const [isShowContractModal, setIsShowContractModal] = useState(false);

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
      case "item":
        setSupportText(" buys from ");
        setEmoji("📁");
        break;
    }
  }, []);

  useEffect(() => {
    console.log("supportText", supportText);
    console.log("emoji", emoji);
  }, [supportText, emoji]);

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
        <S.RepresentContainer
          onClick={() => {
            setIsShowContractModal(true);
          }}
        >
          <S.ProfileImgContainer
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ProfileImg
              width={3}
              src={supportContent.fromMember.fromMemberProfileImagePath}
              to={`/${supportContent.fromMember.fromMemberPageName}`}
            />
          </S.ProfileImgContainer>
          <S.TitleWrapper>
            <S.TitleContent>
              <S.Nickname>
                {supportContent.fromMember.fromMemberNickname}
              </S.Nickname>
              &nbsp;
              {supportText}
              &nbsp;
              <S.Nickname>
                {supportContent.toAddress.toMemberNickname}
              </S.Nickname>
            </S.TitleContent>
            {isOwner && !!supportContent.replyMsg === true && (
              <S.ReplyBtn
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShowReplyInput((prev) => !prev);
                }}
              >
                {isShowReplyInput ? "Close" : "Reply"}
              </S.ReplyBtn>
            )}
          </S.TitleWrapper>
          <S.EmojiWrapper>
            <label style={{ marginLeft: "0.5rem" }}>{emoji}</label>
          </S.EmojiWrapper>
        </S.RepresentContainer>
        {isOwner && isShowReplyInput && (
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
              to={`/${supportContent.fromMember.pageName}`}
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
      {!!supportContent.replyMsg && (
        <S.CommentContainer>
          <S.ProfileImgContainer>
            <ProfileImg
              width={3}
              src={supportContent.toAddress.toMemberProfileImagePath}
            />
          </S.ProfileImgContainer>
          <div>
            <S.Nickname>{supportContent.toAddress.toMemberNickname}</S.Nickname>
            <S.Comment>{supportContent.replyMsg}</S.Comment>
          </div>
        </S.CommentContainer>
      )}
      <S.Line />
      {isShowContractModal && (
        <ContractModal
          handleSetShowModal={setIsShowContractModal}
          supportContent={supportContent}
        />
      )}
    </div>
  );
};

export default RecentSupportBlock;

RecentSupportBlock.propTypes = {
  supportContent: PropTypes.shape({
    uid: PropTypes.number.isRequired,
    supportType: PropTypes.string.isRequired,
    fromMember: PropTypes.shape({
      fromMemberAddress: PropTypes.string.isRequired,
      fromMemberNickname: PropTypes.string.isRequired,
      fromMemberPageName: PropTypes.string.isRequired,
      fromMemberProfileImagePath: PropTypes.string,
    }).isRequired,
    toAddress: PropTypes.shape({
      toMemberAddress: PropTypes.string.isRequired,
      toMemberNickname: PropTypes.string.isRequired,
      toMemberProfileImagePath: PropTypes.string,
    }),
    sendMsg: PropTypes.string,
  }).isRequired,
  isOwner: PropTypes.bool,
};
