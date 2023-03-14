import styled from "styled-components";

export const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 860px;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 40px;
`;

export const Tabs = styled.ul`
  width: 100%;
  list-style: none;
  border-bottom: 2px solid #eaeaea;
`;
export const TabItem = styled.li`
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
  margin: 0 20px;
  font-family: ${(props) => props.current && "RobotoMedium"};
  color: ${(props) =>
    props.current ? "var(--color-text)" : "var(--color-text-secondary)"};

  &:first-child {
    margin-left: 0px;
  }
`;

export const Indicator = styled.hr`
  position: absolute;
  bottom: -10px;
  width: 100%;
  border: 2px solid var(--color-text);
  border-radius: 4px;
  opacity: ${(props) => (props.current ? 1 : 0)};
`;
