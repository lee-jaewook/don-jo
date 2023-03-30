import * as S from "./style";
import PropTypes from "prop-types";
import { useEffect } from "react";

const ProfileImg = ({ width, src, to, isLocalSrc = false }) => {
  useEffect(() => {
    console.log("src??", src);
  }, [src]);

  return (
    <S.LinkCustom to={to === undefined ? "#" : to}>
      <S.Circle width={width} src={src} isLocalSrc={isLocalSrc} />
    </S.LinkCustom>
  );
};

export default ProfileImg;

ProfileImg.propTypes = {
  width: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  to: PropTypes.string,
  isLocalSrc: PropTypes.bool,
};
