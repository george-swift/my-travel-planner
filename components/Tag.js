import PropTypes from "prop-types";
import { FaTag } from "react-icons/fa";
import TagStyles from "./styles/TagStyles";

const Tag = ({ tag, isFlight }) => (
  <TagStyles>
    <FaTag />
    <span>
      {tag}
      {isFlight && " Flight"}
    </span>
  </TagStyles>
);

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  isFlight: PropTypes.bool,
};

export default Tag;
