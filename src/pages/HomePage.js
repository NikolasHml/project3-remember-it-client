import brainHomepage from "../images/pngbrain.com.png"
import arrowOneHomepage from "../images/arrow1Homepage.png"
import arrowTwoHomepage from "../images/arrow2Homepage.png"
import Navbar from "../components/Navbar"

function HomePage() {
    return (
        <div >
            <header>
                <Navbar />
            </header>
            <h1 className="titleHomepage">Remember it!</h1>
            <h1 className="welcomeTextHomepage">Welcome to your second brain, fella!</h1>
            <img className="pngBrain" src={brainHomepage} alt="comic brain gives thumbs up" width="300" />
            <div className="firstContainerHomepage">
                <img className="arrowOneHomepage" src={arrowOneHomepage} alt="comic arrow to the right" />
                <p className="whatIsThisButton">What is this?</p>
                <h1 className="memberTextHomepage">Become a Re<span className="changeMemberColor">Member</span></h1>
                <img className="arrowTwoHomepage" src={arrowTwoHomepage} alt="comic arrow to the left" />
            </div>
            <div className="secondContainerHomepage"> 
            </div>
                <button type="submit" className="rememberSignUp">Sign Up</button>
           
        </div>
    )
}

export default HomePage