import styled, { css } from "styled-components";

export const SelectBox = styled.div`
  position: relative;
  align-self: center;
  text-align: center;
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
        color: #49c181;
        font-size: 1.25rem;
      }
    `}
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  padding-left: 12px;
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
  border-radius: 8px;
  background-color: transparent;
  color: var(--color-text);
`;

export const Option = styled.li`
  display: flex;
  padding-left: 12px;
  align-items: center;
  text-align: center;
  font-size: 16px;
  height: 2.75rem;
  border-radius: 8px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: var(--color-placeholder);
    font-weight: 600;
  }
`;
