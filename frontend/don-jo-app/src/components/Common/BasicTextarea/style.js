import styled from "styled-components";

export const Textarea = styled.textarea`
  width: ${(props) => (props.width ? props.width + "rem" : "100%")};
  height: ${(props) => (props.height ? props.height : "4.5")}rem;
  padding: 0.75rem;
  border: 0.0625rem solid transparent;
  border-radius: 0.5rem;
  background-color: white;
  margin-bottom: 0.75rem;
  font-size: 1rem;

  &:hover {
    border: 0.0625rem solid var(--color-primary);
  }

  ${(props) =>
    props.disabled &&
    `
    background-color: var(--color-disabled);
    cursor: not-allowed;
    pointer-events: none;

    ::placeholder {
      color: #BBBBBB;
    }
  `}
`;
