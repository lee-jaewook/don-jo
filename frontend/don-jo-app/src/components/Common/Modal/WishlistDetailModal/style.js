import styled from "styled-components";

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    padding-bottom: 2rem;
  }
`;

export const WishlistContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const wishlistImg = styled.img`
  width: 11.25rem;
  height: 11.25rem;
  background-color: #d9d9d9;
  border-radius: 1.25rem;
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

export const Content = styled.div`
  max-width: 24.5rem;
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
  @media (max-width: 768px) {
    margin-left: 0rem;
  }
`;

export const Title = styled.h1`
  font-size: 1rem;
  line-height: 1.1875rem;
  margin-bottom: 0.75rem;
`;
export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
`;
export const PriceInputWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const PriceInput = styled.input`
  width: 100%;
  max-width: 16.75rem;
  height: 2.75rem;
  border-radius: 0.5rem;
  outline: none;
  border-color: transparent;
  text-align: end;
  padding-right: 0.75rem;
  margin-right: 0.5rem;
`;

export const Price = styled.p`
  font-family: "RobotoBold";
  font-size: 1.125rem;
  line-height: 1.3125rem;
`;
export const Eth = styled.label`
  font-family: "RobotoRegular";
  font-size: 0.75rem;
  line-height: 0.875rem;
  color: var(--color-text-third);
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 2.5rem;
  background-color: transparent;
  margin: ${(props) =>
    props.isDashboard ? "2rem 0rem 0rem 0rem" : "2rem 0rem 3.75rem 0rem"};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 1rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.isDashboard ? "var(--color-modal)" : "white"};
`;

export const ProgressState = styled.div`
  width: ${(props) => `${props.currentState}%` || "0%"};
  height: 1rem;
  border-radius: 1rem;
  background-color: var(--color-primary);
`;

export const AmountWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 0.5rem;
  justify-content: space-between;
`;

export const ProgressAmount = styled.label`
  font-family: ${(props) =>
    props.isAllAmount ? "RobotoRegular" : "RobotoMedium"};
  font-size: 1rem;
  line-height: 1rem;
`;

export const ButtonWrapper = styled.div`
  width: 17.5rem;
  margin: 2.5rem auto 0rem auto;
`;

export const DeleteButton = styled.button`
  position: absolute;
  bottom: 0rem;
  left: 0rem;
  color: var(--color-text-secondary);
  @media (max-width: 768px) {
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;
