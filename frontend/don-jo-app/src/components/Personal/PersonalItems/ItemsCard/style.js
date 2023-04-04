import styled from "styled-components";

export const Container = styled.div`
  width: 17.875rem;
  margin-bottom: 0.6875rem;
  background-color: var(--color-modal);
  border-radius: 1.25rem;

  @media screen and (max-width: 48rem) {
    width: 100%;
    margin-bottom: unset;
  }
`;

export const ItemImg = styled.div`
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
  background-size: cover;
  background-image: ${(props) => {
    return props.imgPath === ""
      ? "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJtcqqYSIbVJbT4MV6mWW50ICsYn3azyn0w&usqp=CAU)"
      : "url(https://don-jo.s3.ap-northeast-2.amazonaws.com/" +
          props.imgPath +
          ")";
  }};
  width: 100%;
  height: 11.25rem;
`;

export const DescriptionContainer = styled.div`
  border-bottom-left-radius: 1.25rem;
  border-bottom-right-radius: 1.25rem;
  width: 100%;
  height: 8.9375rem;
  padding: 1.25rem;
`;

export const Title = styled.div`
  margin-bottom: 0.625rem;
`;

export const Description = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 1.25rem;
  color: var(--color-text-secondary);
`;

export const PriceBtnContainer = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Price = styled.div`
  font-family: "RobotoMedium";
`;

export const Unit = styled.div`
  margin-left: 0.125rem;
  font-size: 0.875rem;
  color: #999999;
`;

export const BuyBtn = styled.button`
  margin-left: auto;
  width: 5rem;
  height: 2.5rem;
  font-size: 1rem;
  line-height: 1.188rem;
  border-radius: 1.5rem;
  font-family: "RobotoMedium";
  color: white;
  border: 0.0625rem solid;

  border-color: ${(props) =>
    props.color ? props.color : "2px solid var(--color-primary)"};
  background-color: ${(props) =>
    props.color ? props.color : "var(--color-primary)"};

  &:hover {
    border-color: ${(props) =>
      props.color ? props.color : "var(--color-primary)"};
    color: ${(props) => (props.color ? props.color : "var(--color-primary)")};
    background-color: white;
  }

  //버튼 비활성화 되었을 경우
  ${(props) =>
    props.disabled &&
    `
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
    `}
`;
