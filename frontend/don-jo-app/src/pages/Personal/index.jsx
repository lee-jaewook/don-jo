import * as S from "./style";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import ExternalLink from "../../components/Personal/ExternalLink";
import { useEffect, useRef, useState, useMemo } from "react";
import PersonalContent from "../../components/Personal/PersonalContent";
import FullScreenModal from "../../components/Common/Modal/FullScreenModal";
import IntroductionEdit from "../../components/Personal/IntroductionEdit";
import MDEditor from "@uiw/react-md-editor";
import { Desktop } from "../../components/Common/Template";
import { memberApi } from "../../api/member";
import { useNavigate, useParams } from "react-router-dom";
import { fileApi } from "../../api/file";
import { useDispatch, useSelector } from "react-redux";
import { updateMemberInfo } from "../../stores/memberInfo";
import { setProfileImg } from "../../stores/member";
import { colorSet } from "../../data/dashboard";

const PROFILE_TYPE = "img/profile";
const BACKGROUND_TYPE = "img/background";

const Personal = () => {
  const { pageName, itemId } = useParams();
  const navigate = useNavigate();

  const [isOwner, setIsOwner] = useState(false);
  const [wishListData, setWishListData] = useState([]);
  const [isProfileHover, setIsProfileHover] = useState(false);
  const [isBackgroundHover, setIsBackgroundHover] = useState(false);
  const [isShowIntroductionEdit, setIsShowIntroductionEdit] = useState(false);

  const isLogin = useSelector((state) => state.member.isLogIn);

  const dispatch = useDispatch();
  const memberInfoItemData = useSelector((state) => state.memberInfo);
  const loginUserAddress = useSelector(
    (state) => state.member.walletAddress
  ).toLowerCase();

  const [donationSettingData, setDonationSettingData] = useState({
    donationEmoji: "",
    donationName: "",
    pricePerDonation: 0,
    thankMsg: "",
  });
  const memoizedPersonalContent = useMemo(() => {
    return (
      <PersonalContent
        donationSettingData={donationSettingData}
        wishListData={wishListData}
        isOwner={isOwner}
        itemId={itemId}
      />
    );
  }, [donationSettingData, wishListData, isOwner, itemId]);

  const getPageInfo = async () => {
    try {
      const { status, data } = await memberApi.getPageInfo(pageName);
      if (status === 204) {
        navigate("/");
        return;
      } else {
        dispatch(updateMemberInfo(data.memberInfoItem));
        setDonationSettingData(data.donationSetting);
        setWishListData(data.wishList);
      }
    } catch (error) {
      console.log("[Personal Page] getPageInfo()... ", error);
    }
  };

  //로그인 유저가 페이지 주인인지 확인
  useEffect(() => {
    if (loginUserAddress !== "") {
      setIsOwner(
        memberInfoItemData.memberAddress.toLowerCase() === loginUserAddress
      );
    }

    const root = document.documentElement;
    root.style.setProperty(
      "--color-primary",
      colorSet[memberInfoItemData.themeColor]
    );
  }, [memberInfoItemData, isLogin]);

  useEffect(() => {
    getPageInfo();
  }, []);

  const profileRef = useRef(null);
  const backgroundImgRef = useRef(null);

  // 변경 div 클릭 시 해당 input 작동
  const handleBgImgUpload = () => {
    backgroundImgRef.current.click();
  };
  const handleProfileImgUpload = () => {
    profileRef.current.click();
  };

  //이미지 올리기
  const uploadBackgroundImg = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("multipartFile", file);

    try {
      const { data } = await fileApi.uploadFile(formData, BACKGROUND_TYPE);
      await memberApi.updateUserBackground(data);
      getPageInfo();
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const uploadProfileImg = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("multipartFile", file);

    try {
      const { data } = await fileApi.uploadFile(formData, PROFILE_TYPE);
      await memberApi.updateUserProfile(data);
      dispatch(setProfileImg({ profileImagePath: data }));
      getPageInfo();
    } catch (error) {
      console.log("[Personal Page] uploadProfileImg()...  ", error);
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
        {isOwner && isBackgroundHover && (
          <S.BackgroundImgEdit>
            <S.EditIcon onClick={handleBgImgUpload}>
              <FiEdit color="white" size={20.35} />
            </S.EditIcon>
          </S.BackgroundImgEdit>
        )}
      </S.BackgroundImg>
      <S.ProfileImgContainer>
        <S.ProfileImg
          src={memberInfoItemData.profileImgPath}
          onMouseOver={() => setIsProfileHover(true)}
          onMouseOut={() => setIsProfileHover(false)}
        >
          {isOwner && isProfileHover && (
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
            <S.IntroductionContainer
              isShow={isOwner || memberInfoItemData.introduction ? true : false}
            >
              {/* 로그인한 유저와 페이지 주인이 같다면 edit 버튼 표시 */}
              {isOwner && (
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
                ></MDEditor.Markdown>
              </S.Introduction>
            </S.IntroductionContainer>
          </Desktop>
        </S.UserInfo>
        {/* <PersonalContent
          donationSettingData={donationSettingData}
          wishListData={wishListData}
          isOwner={isOwner}
          itemId={itemId}
        /> */}
        {memoizedPersonalContent}
      </S.ContentsContainer>

      {isShowIntroductionEdit && (
        <FullScreenModal
          handleSetShowModal={setIsShowIntroductionEdit}
          children={
            <IntroductionEdit
              handleSetShowModal={setIsShowIntroductionEdit}
              getPageInfo={getPageInfo}
            />
          }
        />
      )}
    </S.Container>
  );
};

export default Personal;
