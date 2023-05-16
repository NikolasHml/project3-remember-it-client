
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
      // Request to the server's endpoint `/auth/login` returns a response
      // with the JWT string ->  response.data.authToken
        console.log('JWT token', response.data.authToken );

        // Save the token in the localstorage
        storeToken(response.data.authToken);
      
        // Verify the token by sending a req to the server's JWT validation
        // endpoint
        authenticateUser(); 
        navigate('/profile');     
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (
    <div className="containerSignupAndLogin">
      <h1>Enter your second brain right here</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>I need this Email you gave me</label>
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

        <button type="submit" className="signupOrLoginButton">Alright, ready to enter!</button>
      </form>
      { errorMessage && <p className="errorMessage">{errorMessage}</p> }

      <p className="alreadyUserOrNeedSignupText">Never been here before, you say? Hit that&nbsp; 
            <Link to={"/signup"}>
                <span className="changeTextColor">Sign Up</span> 
            </Link>
         , my friend!</p>
      
    </div>
  )
}

export default LoginPage;
