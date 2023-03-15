import styled from "styled-components";

export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 812px;
  height: 160px;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: white;
  padding: 20px;
`;

export const ItemImg = styled.div`
  width: 160px;
  height: 120px;
  border-radius: 8px;
  background-color: #ddd;
  margin-right: 12px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 460px;
`;

export const Title = styled.h1``;

export const Description = styled.label``;

export const generateButton = styled.button`
  font-family: "RobotoMedium";
  width: 120px;
  height: 48px;
  border-radius: 24px;
  border: 2px solid black;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
`;
