import styled from "styled-components";
import { theme } from "../../styles";

const PlacePickerSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding-top: 3rem;
  padding-bottom: 4rem;
  min-height: 500px;

  & > [class^="col-"] {
    width: 100%;
    max-width: 100%;
    flex-shrink: 0;
  }

  @media (min-width: 600px) {
    & > [class^="col-"] {
      width: 50%;
      flex: 0 0 auto;
    }

    [class^="PlaceCard"] {
      height: 100%;
    }
  }

  h2 {
    font-size: calc(1.2rem + 0.65vw);

    @media (max-width: 600px) {
      font-size: calc(1.55rem + 0.9vw);
      text-align: center;
    }
  }

  p:not([class="description"]),
  label {
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  p {
    margin-bottom: 0.6rem;
    font-weight: 600;
    color: ${theme.colors.grey};
  }

  label {
    display: flex;
    align-items: center;
    text-transform: capitalize;
    margin-bottom: 0.5rem;
  }

  .radio-group {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    gap: 5px;

    @media (max-width: 576px) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  input {
    width: 1rem;
    height: 1rem;
    margin: 0.5rem 0.8rem 0.5rem 0;

    @media (max-width: 500px) {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  button {
    margin-top: 1rem;
    border: 1px solid ${theme.colors.lightGrey};

    & + button {
      margin-left: 1rem;
      background-color: ${theme.colors.white};
      color: ${theme.colors.darkGrey};

      &:hover,
      &:focus {
        background-color: ${theme.colors.offWhite};
      }
    }
  }

  @media (max-width: 500px) {
    label,
    label.span {
      font-size: 0.9rem;
    }
  }
`;

export default PlacePickerSection;
