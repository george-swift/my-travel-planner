import styled from "styled-components";
import { mixins, theme } from "../../styles";
import { ButtonStyle } from "./NavStyles";

export const Modal = styled.div`
  ${mixins.flexCenter};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalDialog = styled.div`
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;

  @media (min-width: 576px) {
    max-width: 500px;
  }
`;

export const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: ${theme.colors.offWhite};
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);

  [class$="header"] {
    ${mixins.flexBetween};
    flex-shrink: 0;
    padding: 0.75rem 1.5rem 0.5rem;
    border-bottom: 1px solid #dee2e6;

    h5 {
      font-size: 1.45rem;
      line-height: 1.5;
      margin-bottom: 0;
    }

    span {
      margin-left: 2rem;
      color: ${theme.colors.grey};
      font-size: 28px;
      line-height: 1.5;
      font-weight: 600;

      &:hover,
      &:focus {
        color: ${theme.colors.black};
        cursor: pointer;
      }
    }
  }

  [class$="body"] {
    position: relative;
    flex: 1 1 auto;
    padding: 1.5rem;
  }
`;

export const LoginForm = styled.form`
  color: ${theme.colors.darkGrey};

  .field-group {
    display: flex;
    flex-direction: column-reverse;

    & + .field-group {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }

  label {
    font-size: 0.75rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    background-color: ${theme.colors.lightGrey};
    border: none;
    caret-color: ${theme.colors.darkBlue};

    &:placeholder-shown {
      color: ${theme.colors.lightGrey};
    }

    &:focus {
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.lightGrey};
      outline: 0;
    }
  }

  p {
    font-size: 0.65rem;
    font-style: italic;
    color: ${theme.colors.red};
  }
`;

export const Button = styled(ButtonStyle)`
  margin-bottom: 1.5rem;
  background-color: ${theme.colors.darkBlue};
  font-size: 1rem;
  border: none;

  &:hover,
  &:focus {
    background-color: ${theme.colors.lightBlue};
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
`;
