import { useState } from "react";
import { EventBus, login } from "../utilities";
import {
  Button,
  LoginForm,
  Modal,
  ModalContent,
  ModalDialog,
} from "./styles/AuthFormStyles";

const AuthForm = () => {
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setIsErrorShown(false);
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const closeModal = () => EventBus.emit("closeAuthModal");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      closeModal();
    } catch (e) {
      console.error("📣: AuthForm -> e", e);
      setIsErrorShown(true);
    }
  };

  return (
    <Modal>
      <ModalDialog>
        <ModalContent>
          <div className="modal-header">
            <h5>Account Information</h5>
            <span role="button" onClick={closeModal}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <LoginForm onSubmit={onSubmit}>
              <div className="field-group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johndoe@email.com"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="field-group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              {isErrorShown && <p>Something went wrong!</p>}

              <Button type="submit">Login</Button>
            </LoginForm>
          </div>
        </ModalContent>
      </ModalDialog>
    </Modal>
  );
};

export default AuthForm;
