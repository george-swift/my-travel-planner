import Link from "next/link";
import PropTypes from "prop-types";
import { MdTravelExplore } from "react-icons/md";
import { EventBus } from "../utilities";
import { NavStyles, Button } from "./styles/NavStyles";

const Nav = ({ authed }) => (
  <NavStyles>
    <div className="fluid-container">
      <Link href="/">
        <a className="brand">
          <MdTravelExplore />
          Travel Hunter
        </a>
      </Link>
      <div>
        <Button onClick={() => EventBus.emit("addPlace")}>Add Place</Button>

        {authed && (
          <Button onClick={() => EventBus.emit("logout")}>Logout</Button>
        )}
      </div>
    </div>
  </NavStyles>
);

Nav.propTypes = {
  authed: PropTypes.bool.isRequired,
};

export default Nav;
