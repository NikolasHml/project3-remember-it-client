import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleName = (e) => setName(e.target.value)

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Creating an object representing reqbody
        const requestBody = { email, password, name }

        // Make an axios req to API
        // if POST req successful, rediret to login page
        // if error, set the error message in the state
        axios.post(`${API_URL}/auth/signup`, requestBody)
            .then((response) => {
                navigate("/login");
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };

    return(
        <div className="containerSignupAndLogin">
            <h1>Sign up here for your second brain</h1>

            <form onSubmit={handleSignupSubmit}>
                <label>I need one of those Emails</label>
                <input 
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail} 
                />

                <label>Your top secret Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                 />

                <label>What's your Name, my friend?</label>
                <input 
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleName}
                />

                <button type="submit" className="signupOrLoginButton">Alright, sign me up!</button>
            </form>

            { errorMessage && <p className="errorMessage">{ errorMessage }</p>}

            <p className="alreadyUserOrNeedSignupText">Been here before, you say? Hit that&nbsp;   
                <Link to={"/login"}> 
                    <span className="changeTextColor"> Login</span>
                </Link> 
             , my friend!</p>
        </div>

    )
}

export default SignupPage