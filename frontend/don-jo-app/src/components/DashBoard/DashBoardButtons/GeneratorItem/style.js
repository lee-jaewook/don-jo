import styled from "styled-components";

export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 50.75rem;
  height: 10rem;
  align-items: center;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  background-color: white;
  padding: 1.25rem;
  @media (max-width: 768px) {
    flex-direction: column;
    height: unset;
  }
`;

export const ItemImg = styled.div`
  width: 10rem;
  min-width: 10rem;
  height: 7.5rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  margin-right: 0.75rem;
  @media (max-width: 768px) {
    width: 100%;
    height: 13.4375rem;
    margin-right: 0rem;
    margin-bottom: 0.75rem;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 28.75rem;
  flex: 1;
`;

export const Title = styled.h1`
  font-family: "RobotoMedium";
  line-height: 1.1875rem;
`;

export const Description = styled.label`
  font-family: "RobotoRegular";
  line-height: 1.5rem;
  color: var(--color-text-secondary);
`;

export const GenerateButton = styled.button`
  font-family: "RobotoMedium";
  width: 7.5rem;
  height: 3rem;
  border-radius: 1.5rem;
  border: 0.125rem solid var(--color-primary);
  font-size: 1rem;
  line-height: 1.1875rem;
  text-align: center;
  margin-left: 1.25rem;
  color: var(--color-primary);
  padding: 0 1.6875rem;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0.75rem;
    margin-left: 0rem;
  }

  &:hover {
    border: transparent;
    color: white;
    background-color: var(--color-primary);
  }
`;
