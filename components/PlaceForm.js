import { useState } from "react";
import PropTypes from "prop-types";
import { MdArrowDropDownCircle } from "react-icons/md";
import { EventBus, addPlace, deletePlace } from "../utilities";
import { TagRadioGroup } from "../components";
import { Modal, ModalContent, Button } from "./styles/AuthFormStyles";
import { Dialog, PlaceFormStyles } from "./styles/PlaceFormStyles";

const PlaceForm = ({ isEditing, placeToEdit, authed }) => {
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [inputs, setInputs] = useState(placeToEdit);

  const handleChange = (e) => {
    setIsErrorShown(false);

    setInputs((inputs) => {
      const { name, value } = e.target;
      const isTag = value.substr(0, 4) === "tag-";

      if (!isTag) return { ...inputs, [name]: value };

      const tagVal = isTag ? value.substr(4) : "";

      const tags = {
        type: name === "type" ? tagVal : inputs.tags.type,
        temperature: name === "temperature" ? tagVal : inputs.tags.temperature,
        flight: name === "flight" ? tagVal : inputs.tags.flight,
      };

      return { ...inputs, tags };
    });
  };

  const closeModal = () => EventBus.emit("closePlaceModal");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPlace(inputs);
      closeModal();
    } catch (e) {
      console.error("📣: PlaceForm -> e", e);
      setIsErrorShown(true);
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this place?")) return;

    try {
      await deletePlace(inputs);
      closeModal();
    } catch (e) {
      console.error("📣: PlaceForm -> e", e);
      setIsErrorShown(true);
    }
  };

  return (
    <Modal>
      <Dialog>
        <ModalContent>
          <div className="modal-header">
            <h5>{isEditing ? "Edit Place Information" : "Add New Place"}</h5>
            <span role="button" onClick={closeModal}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <PlaceFormStyles onSubmit={onSubmit}>
              <div className="input-group">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ibiza, Spain"
                  value={inputs.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-group">
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Perfect summer destination"
                  value={inputs.description}
                  onChange={handleChange}
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="input-group">
                <input
                  id="img"
                  name="img"
                  type="url"
                  placeholder="https://images.unsplash.com/photo-xyz"
                  value={inputs.img}
                  onChange={handleChange}
                />
                <label htmlFor="img">
                  <span>Image Url</span>
                  {inputs.img && (
                    <span>
                      <a
                        href={inputs.img}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Preview
                      </a>
                    </span>
                  )}
                </label>
              </div>
              <div className="row">
                <div className="col input-group">
                  <select
                    id="visited"
                    name="visited"
                    defaultValue={inputs.visited}
                    onBlur={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div className="dropdown-arrow">
                    <MdArrowDropDownCircle />
                  </div>
                  <label htmlFor="visited">Been there?</label>
                </div>
                <div className="col input-group">
                  <input
                    id="visitedDate"
                    name="visitedDate"
                    type="text"
                    placeholder="01/01/2021"
                    value={inputs.visitedDate}
                    onChange={handleChange}
                  />
                  <label htmlFor="visitedDate">Visited Date</label>
                </div>
              </div>
              <div className="row">
                <h6>Tags</h6>
                <TagRadioGroup
                  handleChange={handleChange}
                  defaultOptions={inputs.tags}
                />
              </div>

              {isErrorShown && <small>Oops! Something went wrong</small>}

              {authed ? (
                <>
                  {isEditing && (
                    <Button className="delete-btn" onClick={onDelete}>
                      Delete
                    </Button>
                  )}

                  <Button type="submit">
                    {isEditing ? "Save Changes" : "Add"}
                  </Button>
                </>
              ) : (
                <Button onClick={() => EventBus.emit("login")}>
                  Sign In to Edit
                </Button>
              )}
            </PlaceFormStyles>
          </div>
        </ModalContent>
      </Dialog>
    </Modal>
  );
};

PlaceForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  placeToEdit: PropTypes.object.isRequired,
  authed: PropTypes.bool.isRequired,
};

export default PlaceForm;
