import { Link }  from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import MenuIcon from "../images/ThreeBarsMenuIconround.png"
import Dropdown from "react-bootstrap/Dropdown"


function Navbar () {
    // Subscribe to the AuthContext to gain access to the values
    // from AuthContext.Provider "value" prop
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    // Update the rendering logic to display different content depending
    // on whether the user is logged in or not
    return (
        <nav>

        {!isLoggedIn && (
            <header className="navbar versionNotLoggedIn">
                <Link to="/login" className="changeTextColor">
                    <span>Login</span> 
                </Link>
            </header>      
        )}

        {isLoggedIn && (
            <header className="navbar versionLoggedIn">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="menuIcon">
                        <img src={MenuIcon} alt="MenuIcon" className="menuIcon"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>{ user && user.name }</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Link to="/" className="changeTextColor">
                    <span onClick={logOutUser}>Logout</span>  
                </Link>
            </header> 
        )}

    </nav>
    )
}

export default Navbar;