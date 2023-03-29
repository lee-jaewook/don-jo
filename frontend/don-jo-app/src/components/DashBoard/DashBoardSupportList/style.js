import styled from "styled-components";

export const SupportListWrapper = styled.div`
  width: 100%;
  background-color: var(--color-modal);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    padding: 2rem 1.25rem;
  }
`;

export const SupportListHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  background-color: transparent;
  @media (max-width: 1280px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const EmojiList = styled.ul`
  list-style: none;
  background-color: transparent;
  margin-bottom: 0.75rem;
`;

export const EmojiItem = styled.li`
  display: inline-block;
  margin-right: 0.75rem;
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  line-height: 0.875rem;

  &:last-child {
    margin-right: 0rem;
  }
`;

export const SupportList = styled.div`
  width: 100%;
  background-color: transparent;
  margin-top: ${(props) => (props.length > 0 ? "0.75rem" : "0rem")};
`;

export const Message = styled.p`
  width: 100%;
  font-size: 1rem;
  color: var(--color-text-secondary);
  background-color: transparent;
  text-align: center;
  line-height: 6.25rem;
`;
