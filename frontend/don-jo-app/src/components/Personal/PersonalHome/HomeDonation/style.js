import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
`;

export const Title = styled.div`
  font-family: RobotoBold;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
`;

export const Card = styled.div`
  width: 100%;
  background-color: var(--color-modal);
  border-radius: 1.25rem;
  padding: 1.875rem 1.5rem 2rem 1.5rem;
`;

export const ImojiContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Imoji = styled.div`
  font-size: 3.125rem;
  margin-bottom: 0.875rem;
`;

export const ImojiTitle = styled.div`
  font-family: RobotoBold;
  font-size: 1.25rem;
`;

export const CounterContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const CountInput = styled.input`
  width: 100%;
  max-width: 9.75rem;
  height: 2.75rem;
  padding-right: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background-color: white;
  margin-bottom: 0.75rem;
  text-align: right;
  font-size: 1rem;

  &:hover {
    border: 1px solid var(--color-primary);
  }

  ${(props) =>
    props.disabled &&
    `
    background-color: var(--color-disabled);
    cursor: not-allowed;
    pointer-events: none;
    color: #BBBBBB;
  `}

  @media screen and (max-width: 48rem) {
    max-width: unset;
  }
`;

export const RoundBtn = styled.button`
  cursor: pointer;
  border-radius: 100%;
  width: 2.5rem;
  min-width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 2px solid var(--color-primary);
  margin-left: 0.25rem;

  ${(props) =>
    props.disabled &&
    `
    background-color: var(--color-disabled);
    cursor: not-allowed;
    pointer-events: none;
    border-color: var(--color-disabled);
  `}
`;

export const RoundBtnWrapper = styled.div`
  display: flex;
  margin-left: 0.5rem;
`;

export const BasicButtonWrapper = styled.div`
  margin-top: 0.75rem;
`;
