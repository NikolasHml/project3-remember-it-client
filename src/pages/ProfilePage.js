import { Link }  from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function ProfilePage() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <div>
            <h1>Hello my friend</h1>
            <p>{ user && user.name }</p>
            <p>Here are your memories</p>
            <div>
            <>
                <Link to="/signup">
                    <button className="buttonsHomepage extraSignup">Sign Up</button>
                </Link>        
            </>
            </div>
        </div>
    )
}

export default ProfilePage;