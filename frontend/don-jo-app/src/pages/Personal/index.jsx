import * as S from "./style";
import { FiEdit } from "react-icons/fi";
import ExternalLink from "../../components/Personal/ExternalLink";
import { useEffect, useState } from "react";
import PersonalContent from "../../components/Personal/PersonalContent";
import FullScreenModal from "../../components/Common/Modal/FullScreenModal";
import IntroductionEdit from "../../components/Personal/IntroductionEdit";
import MDEditor from "@uiw/react-md-editor";
import { Desktop } from "../../components/Common/Template";
import { memberApi } from "../../api/member";
import defaultProfileImg from "../../assets/img/common/app-logo.svg";
import { useParams } from "react-router-dom";

const Personal = () => {
  //로그인 유저 더미 데이터
  const loginUser = {
    nickname: "taehyun",
    pageName: "taebong",
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const { pageName } = useParams();

  const [isBackgroundHover, setIsBackgroundHover] = useState(false);
  const [isProfileHover, setIsProfileHover] = useState(false);
  const [isShowIntroductionEdit, setIsShowIntroductionEdit] = useState(false);

  const [donationSettingData, setDonationSettingData] = useState({
    donationEmoji: "",
    donationName: "",
    pricePerDonation: 0,
    thankMsg: "",
  });
  const [memberInfoItemData, setMemberInfoItemData] = useState({
    backgroundImgPath: null,
    introduction: null,
    memberAddress: "",
    nickname: "",
    numSupporters: 0,
    profileImgPath: "",
    socialList: ["", "", ""],
    themeColor: 1,
  });
  const [wishListData, setWishListData] = useState([]);

  const getPageInfo = async () => {
    try {
      const { data } = await memberApi.getPageInfo(pageName);
      setMemberInfoItemData(data.memberInfoItem);
      setDonationSettingData(data.donationSetting);
      setWishListData(data.wishList);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getPageInfo();
  }, []);

  return (
    <S.Container>
      <S.BackgroundImg
        src={memberInfoItemData.backgroundImgPath}
        onMouseOver={() => setIsBackgroundHover(true)}
        onMouseOut={() => setIsBackgroundHover(false)}
      >
        {loginUser.pageName === pageName && isBackgroundHover && (
          <S.BackgroundImgEdit>
            <S.EditIcon>
              <FiEdit color="white" size={20.35} />
            </S.EditIcon>
          </S.BackgroundImgEdit>
        )}
      </S.BackgroundImg>
      <S.ProfileImgContainer>
        <S.ProfileImg
          src={
            memberInfoItemData.profileImgPath === ""
              ? defaultProfileImg
              : memberInfoItemData.profileImgPath
          }
          onMouseOver={() => setIsProfileHover(true)}
          onMouseOut={() => setIsProfileHover(false)}
        >
          {loginUser.pageName === pageName && isProfileHover && (
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
          <S.Nickname>{memberInfoItemData.nickname}</S.Nickname>
          <S.SupporterContainer>
            <S.NumSupporter>
              {memberInfoItemData.numSupporters
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </S.NumSupporter>
            supporter
          </S.SupporterContainer>
          <ExternalLink socialList={memberInfoItemData.socialList} />
          <Desktop>
            <S.IntroductionContainer>
              {/* 로그인한 유저와 페이지 주인이 같다면 edit 버튼 표시 */}
              {loginUser.pageName === pageName && (
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
                  source={memberInfoItemData.introduction}
                  data-color-mode="light"
                ></MDEditor.Markdown>
              </S.Introduction>
            </S.IntroductionContainer>
          </Desktop>
        </S.UserInfo>
        <PersonalContent
          donationSettingData={donationSettingData}
          wishListData={wishListData}
        />
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
