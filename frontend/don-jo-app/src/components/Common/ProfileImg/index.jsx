import * as S from "./style";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileImg = ({ width, src, to }) => {
  return (
    <Link to={to === undefined ? "#" : to}>
      <S.Circle width={width} src={src} />
    </Link>
  );
};

export default ProfileImg;

ProfileImg.propTypes = {
  width: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  to: PropTypes.string,
};
