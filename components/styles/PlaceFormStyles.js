import styled from "styled-components";
import { ModalDialog } from "./AuthFormStyles";
import { mixins, theme } from "../../styles";

export const Dialog = styled(ModalDialog)`
  height: calc(100% - 1rem);

  [class$="body"] {
    overflow-y: auto;
  }

  @media (min-width: 576px) {
    height: calc(100% - 3.5rem);
  }

  @media (min-width: 800px) {
    width: 500px;
  }
`;

export const PlaceFormStyles = styled.form`
  color: ${theme.colors.darkGrey};

  .input-group {
    display: flex;
    flex-direction: column-reverse;

    & + .input-group {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }

  h6,
  label {
    font-size: 0.75rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  label[for="img"] {
    ${mixins.flexBetween}
  }

  label[datatype="tags"] {
    display: flex;
    align-items: center;
    text-transform: capitalize;
    font-weight: 400;

    & + label[datatype="tags"] {
      margin-left: 0.3rem;
    }
  }

  input:not([type="radio"]),
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-family: ${theme.fonts.inter};
    font-size: 0.9rem;
    background-color: ${theme.colors.lightGrey};
    border: none;
    caret-color: ${theme.colors.darkBlue};

    &:placeholder-shown {
      color: ${theme.colors.lightGrey};
    }

    &:focus {
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.darkGrey};
      outline: 0;
    }
  }

  input:required + label:after {
    content: "*";
    font-size: 2.1em;
    position: relative;
    top: 6px;
    display: inline-flex;
    margin-left: 0.2ch;
    transition: color 1s;
  }

  input:required:invalid + label:after {
    color: ${theme.colors.red};
  }

  input:required:valid + label:after {
    color: ${theme.colors.green};
  }

  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border-radius: 0;
  }

  small {
    font-style: italic;
    color: ${theme.colors.red};
  }

  .row {
    display: flex;
    flex-wrap: wrap;

    & + .row {
      flex-direction: column;
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }

  .col {
    position: relative;
    width: 100%;
    max-width: 100%;
    flex: 1 0 0%;
    padding-right: 0.5rem;

    & + .col {
      padding-left: 0.5rem;
      padding-right: 0;
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  .dropdown-arrow {
    position: absolute;
    right: 0.75rem;
    top: 55%;
    pointer-events: none;
  }

  .category {
    margin-bottom: 0.45rem;
    text-transform: uppercase;
    font-size: 0.75rem;
    color: ${theme.colors.grey};
  }

  button {
    min-width: 100px;

    & + button {
      margin-left: 1rem;
    }
  }

  .delete-btn {
    background-color: ${theme.colors.white};
    color: ${theme.colors.darkGrey};
    border: 1px solid ${theme.colors.darkGrey};

    &:hover {
      background-color: ${theme.colors.red};
      color: ${theme.colors.white};
      border: none;
    }
  }
`;
