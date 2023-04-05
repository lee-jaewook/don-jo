import styled from "styled-components";
import { Button } from "../../BasicButton/style";

export const ContentWrap = styled.div`
  width: 100%;
  min-width: 17.5rem;
  padding-bottom: 1rem;
`;

export const RequiredInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
`;

export const CancleButton = styled(Button)`
  width: 30%;
`;

export const LoginButton = styled(Button)`
  width: 30%;
  float: right;
`;