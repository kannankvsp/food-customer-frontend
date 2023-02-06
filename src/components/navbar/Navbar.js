import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
//------------images-------------
import logo from "../../images/logo.jpg";
import avatar from "../../images/avatar.svg";
import login_bg from "../../images/login_bg.avif";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
//--------------icons------------
import { FiChevronDown } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
//-----------------css-------------
import "./navbar.css";
//-----------------material UI-------------
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
//--------------------profile dropdown---------
const ExpandMore = styled(props => {
  const { expand, ...other } = props;
  return <FiChevronDown {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

function Navbar() {
  const user = useSelector(state => state.user.value);
  const navigate = useNavigate();
  //------------Hooks for material UI for profile-------------
  //----------------------------------------------------------
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //-------------Hooks for HambugerMenu---------------------------
  //---------------------------------------------------
  const [state, setState] = React.useState({
    right: false
  });
  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    setExpanded(!expanded);
  };

  const list = anchor =>
    <Box>
      <List>
        <div className="MenuSliderCollapseContainer">
          <div className="MenuSliderCollapseWrapper">
            {/* -----------profile container in mobile slider----------
          ---------------------------------------------------------- */}
            <div>
              <div
                className="MobileProfileContainer"
                onClick={handleExpandClick}
              >
                <img src={login_bg} />
                <div className="MobileProfileText">
                  <p>
                    {user.name}
                  </p>
                </div>
              </div>
              <div className="MobileCenterItems">
                <Link className="link" to="/profile">
                  <Button variant="contained">Profile</Button>
                </Link>
                <Link className="link" to="/home">
                  <Button variant="contained">Home</Button>
                </Link>
                <Link className="link" to="/cart">
                  <Button variant="contained">Cart</Button>
                </Link>
                <Link className="link" to="/services">
                  <Button variant="contained">Services</Button>
                </Link>
                <Link className="link" to="/contact-us">
                  <Button variant="contained">Contact Us</Button>
                </Link>
              </div>
            </div>
            <div className="MobileLogout">
              <Link className="link">
                <Button variant="contained">
                  <FiLogOut className="logoutIcon" />Log out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </List>
    </Box>;

  return (
    <div>
      <div className="navbar_main_cont">
        <div className="navbar_cont">
          {/*------logo------ */}

          <img src={logo} className="logo" />

          {/* ---------Hamburger Menu------------- */}

          <div className="HamburgerMenuContainer">
            <HiOutlineBars3BottomRight
              className="HamburgerMenu"
              onClick={toggleDrawer("right", true)}
            />
          </div>
          <Drawer
            anchor="right"
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>

          {/*------list items ------ */}

          <div className="list_items">
            <ul>
              <li>
                <Link to="/home" id="nav_item">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" id="nav_item">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/services" id="nav_item">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact-us" id="nav_item">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/*-----profile container------- */}

          <div className="profile_cont" onClick={handleExpandClick}>
            <img src={avatar} />
            <p>
              {user.name}
            </p>
            <ExpandMore expand={expanded}>
              <FiChevronDown />
            </ExpandMore>
          </div>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            id="profile_collapse"
          >
            <div>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <Link to="/profile" className="link">
                      <ListItemText primary="Profile " />
                    </Link>
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary="Logout "
                      onClick={() => navigate("/")}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
