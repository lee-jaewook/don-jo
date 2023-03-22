import styled from "styled-components";

export const Title = styled.h1`
  font-family: "RobotoBold";
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
`;

export const ProgressContainer = styled.div`
  border-radius: 0.75rem;
  background-color: var(--color-background);
  /* width: 100%; */
  min-width: 34.875rem;
  height: 10.4375rem;
  margin-bottom: 2rem;
`;

export const InfoContainer = styled.div`
  border: 1px solid green;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const Type = styled.h2`
  font-family: "RobotoMedium";
  font-size: 1.25rem;
  border: 1px solid red;
  color: var(--color-text-secondary);
  min-width: 8.75rem;
`;

export const TextContainer = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Text = styled.label``;
