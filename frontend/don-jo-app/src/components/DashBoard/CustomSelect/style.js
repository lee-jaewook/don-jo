import styled from "styled-components";

export const SelectBox = styled.div`
  position: relative;
  /* display: flex;
  align-items: center; */
  align-self: center;
  text-align: center;
  cursor: pointer;
  width: 100%;
  padding: 8px;
  height: 2.75rem;
  border-radius: 0.5rem;
  background-color: white;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  &::before {
    content: "⌵";
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    color: #49c181;
    font-size: 20px;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;

export const Icon = styled.div``;

export const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 2.75rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 90px;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 8px;
  background-color: #222222;
  color: #fefefe;
`;

export const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;
