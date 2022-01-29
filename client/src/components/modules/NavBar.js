import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

const GOOGLE_CLIENT_ID = "398328809993-2qcr90geuucv50luba0b0v6sv0vubmuh.apps.googleusercontent.com";

const NavBar = ({ userId, handleLogin, handleLogout }) => {
    return(
        <nav className="NavBar-container">
            <div className="u-inlineBlock u-bold">
                {/* <a href="/">Wiki Manual</a> */}
                <Link to="/" className="NavBar-link  NavBar-left NavBar-title">WikiManual</Link> {/* put link as home page*/}
            </div>
        <div className="NavBar-right">
        {userId ? (
            <>
            <Link to="/Profile" className="NavBar-link u-bold">Profile </Link> {/*put link as profile page*/}

            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={handleLogout}
              onFailure={(err) => console.log(err)}
            />            
            </>
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={handleLogin}
              onFailure={(err) => console.log(err)}
            />
          )}
        </div>
          
            
        </nav>
        
    );
};

export default NavBar;