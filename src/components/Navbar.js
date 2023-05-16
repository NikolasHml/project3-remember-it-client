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
                        <Dropdown.Item href="/profile">{ user && user.name }</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="/memory">Your Memory</Dropdown.Item>
                        <Dropdown.Item href="/addmemory">add new stuff</Dropdown.Item>
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