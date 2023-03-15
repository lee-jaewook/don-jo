import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 35rem;
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
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
`;

export const Type = styled.div`
  margin-left: 0.75rem;
`;

export const Card = styled.div`
  width: 100%;
  background-color: var(--color-modal);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem 1.75rem 1.5rem;

  /* 임시 영역 설정 */
  min-height: 500px;
`;
