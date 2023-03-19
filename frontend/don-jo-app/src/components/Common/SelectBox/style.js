import styled from "styled-components";

export const SelectBox = styled.div`
  /* min-width: ${(props) => props.width || "4.125"}rem; */
  min-width: 2rem;
  height: 1.5625rem;
  display: flex;
  align-items: center;
  position: relative;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-family: "RobotoMedium";
`;

export const Icon = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 0.3rem;
`;

export const SelectOptions = styled.ul`
  max-height: 300px;
  min-width: ${(props) => props.width || "12"}rem;
  z-index: 1;
  overflow-y: auto;
  position: absolute;
  top: 1.5625rem;
  right: 0rem;
  font-family: RobotoMedium;
  font-size: 1.25rem;
  border-radius: 1.25rem;
  background-color: var(--color-background);
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.25);
`;

export const Option = styled.li`
  padding: 1.2rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: var(--color-background-secondary);
  }
`;
