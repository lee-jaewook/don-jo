import styled, { css } from "styled-components";

export const SelectBox = styled.div`
  position: relative;
  align-self: center;
  text-align: center;
  margin-bottom: 0.75rem;
  cursor: pointer;
  width: 100%;
  height: 2.75rem;
  border-radius: 0.5rem;
  background-color: white;
  border: ${(props) =>
    props.isDropdown ? "1px solid rgba(1, 0, 0, 1)" : "none"};

  ${(props) =>
    props.isBefore &&
    css`
      &::before {
        content: "⌵";
        position: absolute;
        top: 0.5rem;
        right: 1rem;
        color: var(--text-color-third);
        font-size: 1.25rem;
      }
    `}
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  font-size: 1rem;
  text-align: center;
  height: 2.75rem;
  font-style: ${(props) => props.fontStyle};
`;

export const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 3rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 0.5rem;
  background-color: var(--color-modal);
  color: var(--color-text);
  z-index: 1;
`;

export const Option = styled.li`
  display: flex;
  padding-left: 0.75rem;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  height: 2.75rem;
  border-radius: 0.5rem;
  padding: 0.375rem 0.5rem;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: var(--color-placeholder);
    font-weight: 600;
  }
`;
