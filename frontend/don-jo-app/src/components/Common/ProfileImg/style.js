import styled from "styled-components";
import { Link } from "react-router-dom";
import defaultProfile from "../../../assets/img/common/default-profile.svg";

const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

export const Circle = styled.div`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.width}rem;

  border-radius: 50%;

  background-size: cover;
  background-image: url("${(props) => props.src}");
  background-image: ${(props) =>
    props.isLocalSrc
      ? `url(${props.src})`
      : props.src === ""
      ? `url(${defaultProfile})`
      : `url(${S3URL + props.src})`};
`;

export const LinkCustom = styled(Link)`
  cursor: ${(props) => (props.to === "#" ? "default" : "cursor")};
`;
