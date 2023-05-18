import { Link }  from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import brainImage from "../images/pngbrain.com.png"
import addNewStuffImage from "../images/addnewstufflogo.png"

function ProfilePage() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <div className="firstContainerProfile">
            <h1>Hello my friend...</h1>
            <h1>...Wait...Ah</h1>
            <h2 className="username changeTextColor">{ user && user.name }</h2>
            <p className="questionProfile">What do you want to do?</p>
            <div className="secondContainerProfile">
                <Link to="/memory">
                    <button className="buttonsHomepage buttonsProfile">Check out my memory</button>
                </Link>
                <img src={brainImage} alt="comic brain" className="profileImages brainImage"/>
                <img src={addNewStuffImage} alt="wing writing on page" className="profileImages" />  
                <Link to="/addmemory">
                    <button className="buttonsHomepage buttonsProfile addButton">Add new stuff</button>
                </Link>   
            </div>
        </div>
    )
}

export default ProfilePage;