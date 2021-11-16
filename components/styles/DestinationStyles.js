import styled from "styled-components";

export const Container = styled.section`
  padding-top: 1rem;
  padding-bottom: 3rem;

  h2 {
    font-size: calc(1rem + 0.65vw);

    @media (max-width: 600px) {
      font-size: calc(1.5rem + 0.9vw);
      text-align: center;
    }
  }

  p:not([class="description"]) {
    text-align: center;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 24px;
`;
