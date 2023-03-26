import * as S from "./style";
import { FiEdit } from "react-icons/fi";
import ExternalLink from "../../components/Personal/ExternalLink";
import { useEffect, useRef, useState } from "react";
import PersonalContent from "../../components/Personal/PersonalContent";
import FullScreenModal from "../../components/Common/Modal/FullScreenModal";
import IntroductionEdit from "../../components/Personal/IntroductionEdit";
import MDEditor from "@uiw/react-md-editor";
import { Desktop } from "../../components/Common/Template";
import { memberApi } from "../../api/member";
import defaultProfileImg from "../../assets/img/common/app-logo.svg";
import { useParams } from "react-router-dom";
import { fileApi } from "../../api/file";

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

  const PROFILE_TYPE = "img/profile";
  const BACKGROUND_TYPE = "img/background";
  const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

  const profileRef = useRef(null);
  const backgroundImgRef = useRef(null);

  // 변경 div 클릭 시 해당 input 작동
  const handleBgImgUpload = () => {
    console.log("배사 변경");
    backgroundImgRef.current.click();
  };
  const handleProfileImgUpload = () => {
    console.log("프사 변경");
    profileRef.current.click();
  };

  //이미지 올리기
  const uploadBackgroundImg = async (e) => {
    console.log("배경이미지 업로드");
    const file = e.target.files[0];
    try {
      const { data } = await fileApi.uploadFile(file, BACKGROUND_TYPE);
      //배경사진 수정 API 나오면 붙이기
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const uploadProfileImg = async (e) => {
    console.log("프로필이미지 업로드");
    const file = e.target.files[0];
    try {
      const { data } = await fileApi.uploadFile(file, PROFILE_TYPE);
      //프로필 사진 수정 API 나오면 붙이기
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <S.Container>
      <S.FileInput
        ref={backgroundImgRef}
        type="file"
        accept="image/*"
        defaultValue=""
        onChange={uploadBackgroundImg}
      />
      <S.FileInput
        ref={profileRef}
        type="file"
        accept="image/*"
        defaultValue=""
        onChange={uploadProfileImg}
      />

      <S.BackgroundImg
        src={memberInfoItemData.backgroundImgPath}
        onMouseOver={() => setIsBackgroundHover(true)}
        onMouseOut={() => setIsBackgroundHover(false)}
      >
        {loginUser.pageName === pageName && isBackgroundHover && (
          <S.BackgroundImgEdit>
            <S.EditIcon onClick={handleBgImgUpload}>
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
              <S.EditIcon onClick={handleProfileImgUpload}>
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
          pageNickname={memberInfoItemData.nickname}
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
