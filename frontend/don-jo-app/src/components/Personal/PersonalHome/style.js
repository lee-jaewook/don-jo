import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 48rem) {
    flex-direction: column;
    max-width: 20.625rem;
    align-items: center;
    margin: 0 auto;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 18.75rem;
  margin-left: auto;
`;
