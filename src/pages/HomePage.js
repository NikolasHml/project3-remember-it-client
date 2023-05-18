import brainHomepage from "../images/pngbrain.com.png"
import arrowOneHomepage from "../images/arrow1Homepage.png"
import arrowTwoHomepage from "../images/arrow2Homepage.png"
import { Link } from "react-router-dom"
// import { useContext } from "react";
// import { AuthContext } from "../context/auth.context";

function HomePage() {

    // const { isLoggedIn, user } = useContext(AuthContext);

    return (
        <div >
            <h1 className="titleHomepage">Remember it!</h1>
            <h1 className="welcomeTextHomepage">Welcome to your second brain, my friend!</h1>
            <img className="pngBrain" src={brainHomepage} alt="comic brain gives thumbs up" width="300" />
            <div className="firstContainerHomepage">
                <img className="arrowOneHomepage" src={arrowOneHomepage} alt="comic arrow to the right" />
                <>
                    <Link to="/whatisthis">
                        <button className="buttonsHomepage extraWhatIsThis">What is this?</button>
                    </Link>
                </>
                <h1 className="memberTextHomepage">Become a Re<span className="changeTextColor">Member</span></h1>
                <img className="arrowTwoHomepage" src={arrowTwoHomepage} alt="comic arrow to the left" />
            </div>

            <>
                <Link to="/signup">
                    <button className="buttonsHomepage extraSignup">Sign Up</button>
                </Link>        
            </>
        </div>
    )
}

export default HomePage