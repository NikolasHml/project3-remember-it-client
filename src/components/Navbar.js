import { Link }  from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function Navbar () {
    // Subscribe to the AuthContext to gain access to the values
    // from AuthContext.Provider "value" prop
    const { isLoggedIn, user } = useContext(AuthContext);

    // Update the rendering logic to display different content depending
    // on whether the user is logged in or not
    return (
        <nav>

        {!isLoggedIn && (
            <header>
                <Link to="/login">
                    <span className="navbar">Login</span>  {/* checken ob ganze navbar jetzt klickbar ist */}
                </Link>
            </header>      
        )}

        {isLoggedIn && (
            <header>
                <Link to="/">
                    <span className="navbar">Logout</span>  
                </Link>
            </header> 
        )}

    </nav>
    )
}

export default Navbar;