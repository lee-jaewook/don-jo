import styled from "styled-components";

export const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 48rem) {
    max-width: unset;
  }
`;

export const Title = styled.label`
  font-family: "RobotoMedium";
  font-size: 24px;
`;

export const AddressWrapper = styled.div`
  margin: 25px 0;
  padding: 10px;
  border: 1px solid var(--color-text-third);
  border-radius: 5px;
  width: 100%;
`;

export const BasicButtonWrapper = styled.div`
  width: 12.5rem;
`;
