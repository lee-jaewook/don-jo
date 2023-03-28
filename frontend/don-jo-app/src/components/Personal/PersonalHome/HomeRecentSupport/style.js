import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 35rem;
  margin-right: 1rem;

  @media screen and (max-width: 48rem) {
    margin-bottom: 2.5rem;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;

  @media screen and (max-width: 48rem) {
    flex-direction: column;
    align-items: unset;
  }
`;

export const Title = styled.div`
  font-family: RobotoBold;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
`;

export const Typecontainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.75rem;

  & > div:first-child {
    margin-left: 0;
  }

  @media screen and (max-width: 48rem) {
    margin-left: unset;
  }
`;

export const Type = styled.div`
  margin-left: 0.75rem;
`;

export const Card = styled.div`
  width: 100%;
  background-color: var(--color-modal);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem 1.75rem 1.5rem;
  padding: 1.25rem 0.75rem 1rem 0.75rem;
`;

export const Nothing = styled.div`
  width: 100%;
  height: 18.75rem;
  border-radius: 1.25rem;
  background-color: var(--color-modal);
  font-family: "RobotoMedium";
  font-size: 1.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
