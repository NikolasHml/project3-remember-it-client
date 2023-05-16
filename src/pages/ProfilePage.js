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
                <Link to="/memory">
                    <button className="buttonsHomepage extraSignup">Your memory</button>
                </Link>
                <Link to="/addmemory">
                    <button className="buttonsHomepage extraSignup">Add new stuff</button>
                </Link>     
            </div>
        </div>
    )
}

export default ProfilePage;