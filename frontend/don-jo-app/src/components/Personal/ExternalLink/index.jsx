import * as S from "./style";
import PropTypes from "prop-types";
import { IoIosLink } from "react-icons/io";
import {
  IoLogoBehance,
  IoLogoCodepen,
  IoLogoDropbox,
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoGitlab,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoPinterest,
  IoLogoTiktok,
  IoLogoTumblr,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io5";
import { useEffect, useState } from "react";

const ExternalLink = ({ socialList }) => {
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

  //해당 사이트에 맞는 로고 저장
  const matchLogo = () => {
    for (let socialListIndex in socialList) {
      if (socialList[socialListIndex] !== "") {
        for (let websiteIndex in website) {
          if (
            socialList[socialListIndex].includes(website[websiteIndex].name)
          ) {
            setIconList((prev) => [...prev, website[websiteIndex].logo]);
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    matchLogo();
  }, []);

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

ExternalLink.propTypes = {
  socialList: PropTypes.array,
};
