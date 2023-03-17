import styled from "styled-components";

export const Line = styled.div`
  width: 100%;
  height: 0px;
  border: 0.0625rem solid var(--color-background-secondary);
  margin: 1.5rem 0;
`;

export const Container = styled.div`
  /* border: 1px solid blue; */
  width: 100%;
`;

export const RepresentContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

export const ReplyBtnWrapper = styled.div`
  border: 1px solid red;
  position: absolute;
  top: 1.5rem;
`;

export const ReplyBtn = styled.button`
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  margin-bottom: ;
`;
