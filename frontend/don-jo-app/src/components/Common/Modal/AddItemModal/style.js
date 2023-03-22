import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  @media (min-width: 53.75rem) {
    width: 53.75rem;
  }
`;

export const ContentWrap = styled.div`
  width: 100%;
  padding-bottom: 3rem;
`;

export const BasicInputWrap = styled.div`
  width: 15rem;
`;

export const BasicInput = styled.input`
  width: 15rem;
  height: 2.75rem;
  padding-right: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background-color: white;
  margin-bottom: 0.75rem;
  border: 0.0625rem solid transparent;
  text-align: right;
  &:hover {
    border-color: black;
  }
`;

export const SeparationContainer = styled.div`
  /* width: 16.75rem; */
  width: ${(props) => `${props.width}rem`};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UnitWrap = styled.div`
  width: 2rem;
  margin-bottom: 0.75rem;
  padding-left: 0.5rem;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;

  color: #999999;
`;

export const ImageSizeInfo = styled.div`
  padding-bottom: 1.5rem;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 0.875remx;
  line-height: 1.25rem;
  color: #222222;
`;

export const AddButton = styled.button`
  width: 17.875rem;
  height: 11.25rem;
  border: 0.125rem dashed #d2d2d2;
  border-radius: 0.5rem;

  &:hover {
    background-color: white;
  }
`;

export const AddIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--color-text);
  margin: 0 auto;
`;

export const FileUploadButton = styled.input`
  display: none;
`;
