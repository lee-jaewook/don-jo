import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  max-width: 54.375rem; // 900 - 40
  min-height: calc(100vh - 120px);
  background-color: transparent;
  margin: 2.5rem 2.5rem 0rem 0rem;
  @media (max-width: 1280px) {
    margin: 0 auto;
  }
`;
