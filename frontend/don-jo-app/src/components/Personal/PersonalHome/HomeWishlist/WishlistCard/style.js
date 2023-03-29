import styled from "styled-components";

export const Container = styled.div`
  min-height: 7.625rem;
  padding: 0.75rem;
  background-color: var(--color-background);
  border-radius: 0.5rem;
  width: 100%;
  margin-bottom: 0.75rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
  align-items: center;
`;

export const Img = styled.div`
  width: 3.75rem;
  height: 3.75rem;
  background-size: cover;
  background-image: ${(props) => {
    return props.imgPath === ""
      ? "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJtcqqYSIbVJbT4MV6mWW50ICsYn3azyn0w&usqp=CAU)"
      : "url(" + props.imgPath + ")";
  }};
  margin-right: 0.75rem;
  border-radius: 0.5rem;
`;

export const TitleText = styled.div`
  font-size: 0.875rem;
`;

export const GaugeBarContainer = styled.div`
  position: relative;
  height: 0.375rem;
  margin-bottom: 0.375rem;
`;

export const GaugeBarBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 0.375rem;
  background-color: var(--color-modal);
  border-radius: 0.25rem;
`;

export const GaugeBarActive = styled.div`
  position: absolute;
  width: ${(props) => props.percentage}%;
  max-width: 100%;
  height: 0.375rem;
  background-color: ${(props) => {
    return props.color === "" ? "var(--color-primary)" : props.color;
  }};
  border-radius: 0.25rem;
`;

export const AmountContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  font-size: 0.875rem;
`;

export const CollectedAmount = styled.div`
  font-family: "RobotoMedium";
`;

export const TotalAmount = styled.div`
  margin-left: auto;
`;

export const Unit = styled.div`
  font-size: 0.75rem;
  margin-left: 0.125rem;
  color: #999999;
`;
