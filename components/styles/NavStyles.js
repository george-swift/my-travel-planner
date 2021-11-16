import styled from "styled-components";
import { theme, mixins } from "../../styles";

const { colors, transition } = theme;

export const NavStyles = styled.nav`
  ${mixins.flexBetween};
  flex-wrap: wrap;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 56px;
  padding: 0.5rem 0;
  background-color: ${colors.darkBlue};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  z-index: 1;

  .fluid-container {
    ${mixins.flexBetween};
    flex-wrap: inherit;
    width: 100%;
    padding: 0 1.5rem;
  }

  .brand {
    ${mixins.flexCenter};
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-weight: bold;
    font-size: 1.225rem;
    color: ${colors.lightGrey};

    svg {
      margin-right: 0.5rem;
    }

    &:hover {
      color: ${colors.white};
    }
  }

  button + button {
    margin-left: 1rem;
  }
`;

export const ButtonStyle = styled.button`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  color: ${colors.white};
  border-radius: 0.25rem;
  transition: ${transition};
`;

export const Button = styled(ButtonStyle)`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.offWhite};
  font-size: 0.85rem;

  &:hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.darkBlue};
  }
`;
