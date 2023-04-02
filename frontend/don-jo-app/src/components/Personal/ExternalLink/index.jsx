import * as S from "./style";
import { IoIosLink } from "@react-icons/all-files/io/IoIosLink.js";
import { IoLogoBehance } from "@react-icons/all-files/io5/IoLogoBehance.js";
import { IoLogoCodepen } from "@react-icons/all-files/io5/IoLogoCodepen";
import { IoLogoDropbox } from "@react-icons/all-files/io5/IoLogoDropbox";
import { IoLogoFacebook } from "@react-icons/all-files/io5/IoLogoFacebook";
import { IoLogoGithub } from "@react-icons/all-files/io5/IoLogoGithub";
import { IoLogoGitlab } from "@react-icons/all-files/io5/IoLogoGitlab";
import { IoLogoInstagram } from "@react-icons/all-files/io5/IoLogoInstagram";
import { IoLogoLinkedin } from "@react-icons/all-files/io5/IoLogoLinkedin";
import { IoLogoPinterest } from "@react-icons/all-files/io5/IoLogoPinterest";
import { IoLogoTiktok } from "@react-icons/all-files/io5/IoLogoTiktok";
import { IoLogoTumblr } from "@react-icons/all-files/io5/IoLogoTumblr";
import { IoLogoTwitter } from "@react-icons/all-files/io5/IoLogoTwitter";
import { IoLogoYoutube } from "@react-icons/all-files/io5/IoLogoYoutube";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ExternalLink = () => {
  const website = [
    {
      name: "behance",
      logo: <IoLogoBehance size={28} />,
    },
    {
      name: "codepen",
      logo: <IoLogoCodepen size={28} />,
    },
    {
      name: "dropbox",
      logo: <IoLogoDropbox size={28} />,
    },
    {
      name: "facebook",
      logo: <IoLogoFacebook size={28} />,
    },
    {
      name: "github",
      logo: <IoLogoGithub size={28} />,
    },
    {
      name: "gitlab",
      logo: <IoLogoGitlab size={28} />,
    },
    {
      name: "instagram",
      logo: <IoLogoInstagram size={28} />,
    },
    {
      name: "linkedin",
      logo: <IoLogoLinkedin size={28} />,
    },
    {
      name: "pinterest",
      logo: <IoLogoPinterest size={28} />,
    },
    {
      name: "tiktok",
      logo: <IoLogoTiktok size={28} />,
    },
    {
      name: "tumblr",
      logo: <IoLogoTumblr size={28} />,
    },
    {
      name: "twitter",
      logo: <IoLogoTwitter size={28} />,
    },
    {
      name: "youtube",
      logo: <IoLogoYoutube size={28} />,
    },
    {
      name: "",
      logo: <IoIosLink size={28} />,
    },
  ];

  const [iconList, setIconList] = useState([]);
  const socialList = useSelector((state) => state.memberInfo.socialList);

  //해당 사이트에 맞는 로고 저장
  const matchLogo = () => {
    const tmp = [];

    for (let socialListIndex in socialList) {
      if (socialList[socialListIndex] !== "") {
        for (let websiteIndex in website) {
          if (
            socialList[socialListIndex].includes(website[websiteIndex].name)
          ) {
            tmp.push(website[websiteIndex].logo);
            break;
          }
        }
      }
    }
    setIconList(tmp);
  };

  useEffect(() => {
    matchLogo();
  }, [socialList]);

  const handleOpenNewTab = (url) => {
    window.open(url);
  };

  return (
    <div>
      {iconList.length !== 0 ? (
        <S.Container>
          {iconList.map((icon, i) => {
            return (
              <S.IconContainer
                key={i}
                onClick={() => {
                  handleOpenNewTab(socialList[i]);
                }}
              >
                {icon}
              </S.IconContainer>
            );
          })}
        </S.Container>
      ) : null}
    </div>
  );
};

export default ExternalLink;
