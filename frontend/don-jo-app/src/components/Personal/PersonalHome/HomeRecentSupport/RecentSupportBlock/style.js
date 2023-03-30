import styled from "styled-components";

export const Line = styled.div`
  width: 100%;
  height: 0px;
  border: 0.0625rem solid var(--color-background-secondary);
  margin: 1.5rem 0;
`;

export const Container = styled.div`
  cursor: pointer;
  width: 100%;
  margin-bottom: 1.5625rem;
`;

export const RepresentContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0.375rem;
  border-radius: 12px;

  &:hover {
    background-color: var(--color-background-secondary);
  }
`;

export const ProfileImgContainer = styled.div`
  margin-right: 0.5rem;
`;

export const TitleWrapper = styled.div`
  width: 100%;
`;

export const EmojiWrapper = styled.div`
  margin-left: auto;
`;

export const TitleContent = styled.div`
  width: 100%;
`;

export const Nickname = styled.span`
  font-family: RobotoMedium;
`;

export const ReplyBtn = styled.button`
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--color-text-secondary);
  }
`;

export const ModifyBtn = styled.button`
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  margin-top: 0.2rem;

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--color-text-secondary);
  }
`;

export const DeleteBtn = styled.button`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.2rem;
  margin-left: 0.8rem;

  &:hover {
    text-decoration: underline;
    text-decoration-color: red;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const ModifyInputContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
`;

export const InputContainer = styled.div`
  margin-left: 3.5rem;
  margin-top: 0.5rem;
  display: flex;
`;

export const BasicInputWrapper = styled.div`
  width: 100%;
`;

export const ReplyInput = styled.input`
  width: 100%;
  max-width: 15rem;
  height: 2.75rem;
  padding-left: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background-color: white;
  border: 1px solid transparent;
  &:hover {
    border-color: var(--color-primary);
  }
  &:focus {
    border-color: var(--color-primary);
  }
`;

export const RegistBtn = styled.button`
  margin-left: 0.5rem;
  width: 5rem;
  height: 2.75rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.188rem;
  border-radius: 1.5rem;
  font-family: "RobotoMedium";
  border: 0.125rem solid;
  border-color: ${(props) =>
    props.color ? props.color : "2px solid var(--color-primary)"};
  color: ${(props) => (props.color ? props.color : "var(--color-primary)")};
  background-color: white;

  &:hover {
    background-color: ${(props) =>
      !props.color ? "var(--color-primary)" : props.color};
    border-color: ${(props) =>
      !props.color ? "var(--color-primary)" : props.color};
    color: white;
  }
`;

export const CommentContainer = styled.div`
  width: 100%;
  margin-left: 1.5rem;
  margin-top: 1rem;
  display: flex;
`;

export const Comment = styled.div`
  margin-top: 0.375rem;
  margin-bottom: 0.25rem;
`;

export const SupportMsgText = styled.div`
  font-size: 0.75rem;
  color: #999999;
`;
