import styled from "styled-components";
export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 6.25rem;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.deleted ? "#EFEFEF" : "white")};
  border-radius: 0.5rem;
  padding: 0 1.25rem;
  margin-bottom: 0.75rem;
`;

export const ItemInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ItemImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 0.5rem;
  margin-right: 0.75rem;
  object-fit: cover;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
`;

export const Title = styled.h1``;

export const InfoText = styled.label`
  font-size: ${(props) => props.size || "1rem"};

  &:last-child {
    margin-top: 0.25rem;
  }
`;

export const Unit = styled.label`
  font-size: 0.875rem;
  line-height: 1rem;
  color: var(--color-text-secondary);
  margin-left: 0.125rem;
`;

export const Count = styled.label`
  width: 7.25rem;
  display: flex;
  align-items: center;
  font-family: "RobotoMedium";
  font-size: 1rem;
  line-height: 1.1875rem;
`;
