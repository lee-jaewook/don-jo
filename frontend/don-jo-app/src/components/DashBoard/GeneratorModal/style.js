import styled from "styled-components";

export const PreViewWrap = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  height: 120px;
  background-color: black;
  border-radius: 1.25rem;
  position: relative;
`;

export const PreView = styled.div`
  position: absolute;
  left: 5rem;
  top: 2.25rem;
  background-color: white;
  border-radius: 1.5rem;
  height: 3rem;
  width: calc(100% - 156px);
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;
