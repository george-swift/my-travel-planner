import styled from "styled-components";
import { theme } from "../../styles";

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  word-wrap: break-word;
  background-color: ${theme.colors.white};
  background-clip: border-box;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.125);
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  text-decoration: none;

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 600px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Figure = styled.figure`
  width: 100%;
  height: 200px;
  margin: 0;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);

  img {
    max-width: 100%;
    height: 100%;
  }
`;

export const Content = styled.div`
  flex: 1 1 auto;
  padding: 1rem 1rem;
  color: ${theme.colors.darkGrey};

  h3 {
    font-size: 1.2rem;
    line-height: 1.2;
  }

  p {
    margin-bottom: 1rem;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    align-tems: center;
    margin-top: 0.5rem;
  }

  .description {
    font-size: 0.85rem;
  }
`;
