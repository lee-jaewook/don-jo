import * as S from "./style";
import PropTypes from "prop-types";

const ProfileImg = ({ width, src, to }) => {
  return <S.Circle width={width} src={src} to={to} />;
};

export default ProfileImg;

ProfileImg.propTypes = {
  width: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  to: PropTypes.string,
};
