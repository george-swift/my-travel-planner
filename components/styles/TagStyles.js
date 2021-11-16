import styled from "styled-components";
import { theme } from "../../styles";

const { colors } = theme;

const TagStyles = styled.span`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${colors.lightGrey};
  color: ${colors.ash};
  border-radius: 5px;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 0.75rem;

  svg {
    margin-right: 0.35rem;
  }
`;

export default TagStyles;
