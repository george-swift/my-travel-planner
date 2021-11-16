import PropTypes from "prop-types";
import { defaultTags } from "../utilities";

const TagRadioGroup = ({ handleChange, defaultOptions }) => {
  const categories = Object.keys(defaultTags);

  return (
    <div className="radio-group">
      {categories.length &&
        categories.map((type) => {
          const options = Object.keys(defaultTags[type]);

          return (
            <div key={type}>
              <p className="category">{type}</p>
              <div className="row">
                {options.length &&
                  options.map((tag, i) => (
                    <label key={i} datatype="tags">
                      <input
                        type="radio"
                        name={type}
                        onChange={handleChange}
                        value={`tag-${tag}`}
                        defaultChecked={
                          defaultOptions ? defaultOptions[type] === tag : false
                        }
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

TagRadioGroup.propTypes = {
  handleChange: PropTypes.func.isRequired,
  defaultOptions: PropTypes.object,
};

export default TagRadioGroup;
