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
    console.log(">>>>", supportText);
  }, []);

  return (
    <div>
      <S.Container>
        <S.RepresentContainer>
          <div style={{ marginRight: "0.5rem" }}>
            <ProfileImg
              width={3}
              src={supportContent.fromMember.profileImgPath}
              to={baseURL + supportContent.fromMember.pageName}
            />
          </div>
          <S.Title>
            <div style={{ fontFamily: "RobotoMedium" }}>
              {supportContent.fromMember.nickname}
            </div>
            <div>
              &nbsp;
              {supportText}
              &nbsp;
            </div>
            <div style={{ fontFamily: "RobotoMedium" }}>
              {pageOwner.nickname}
            </div>
            <div style={{ marginLeft: "auto" }}>{emoji}</div>
          </S.Title>
        </S.RepresentContainer>
      </S.Container>
      <S.Line />
    </div>
  );
};

export default RecentSupportBlock;
