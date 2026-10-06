// Include React as a dependency
import React from "react";

var router = require("react-router");
var browserHistory = router.browserHistory;

// Include the Helper (for the saved recall)
import helpers from "../utils/helpers.js";
import GoogleLogin from 'react-google-login';


var Link = require("react-router").Link;

// styling for input fields
var inputStyle = {
  borderColor: "#FFB74D",
  borderWidth: "2px",
  borderStyle: "solid"
}

var buttonStyle = {
  display: "block",
  margin: "auto",
  backgroundColor: "#009191", 
  border: "none", 
  height: "40px",
  width: "180px",
  color: "white",
  borderRadius: "5px",
  fontFamily: "Roboto Condensed",
  letterSpacing: "1px",
  marginBottom: "5px"
}


var headingStyle = {
  fontFamily: "Roboto Condensed",
  textAlign: "center"
}

var textStyle = {
  fontFamily: "Roboto Condensed",
}

var gloginStyle = {
  display: "block",
  margin: "auto",
  backgroundColor: "#F46C6C", 
  border: "none", 
  height: "40px",
  width: "180px",
  color: "white",
  borderRadius: "5px",
  fontFamily: "Roboto Condensed",
  letterSpacing: "1px"
}

var logoStyle = {
  display: "block",
  margin: "auto"
}


// Create the Main component
class Registration extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
      registered: false,
      isAuth: this.props.isAuth
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  //Getting The Inputs Values & Use It To Update The State.
  handleChange(event) {
    let state = {};
    state[event.target.id] = $.trim(event.target.value);
    this.setState(state);

  }

  handleSignup(event) {
    event.preventDefault();
    console.log(this.state.repassword);
    if (this.state.password === this.state.repassword) {
      //Sending The User's email and password using helpers file.
      helpers.regNewuser(this.state.email.toLowerCase(), this.state.password).then((Response) => {
        //Getting the new user data through the Response & Use It To Update The State.
        console.log(Response);
        if (Response.data.message) {
          this.setState({
            message: Response.data.message,
            registered: false
          });
        } else if (Response.data.id) {
          this.setState({
            id: Response.data.id,
            email: Response.data.email,
            registered: true,
            isAuth: true

          });
          this.props.setParent(this.state);
          console.log("state here!!!!!!!!!!!!!" + this.state)
          this.handleRedirect();
        }

      });
    } else {
      console.log("The password not matches please try again");
      this.setState({ error: "The password not matches please try again" })
    }
  }

  handleLoginBtn() {
    browserHistory.replace("/Login");
  }

  //Google Response Here!!!
  responseGoogle(response) {
    console.log(response.profileObj.email);
    console.log(response.profileObj.googleId);
    this.setState({
      email: response.profileObj.email,
      g_id: response.profileObj.googleId
    });
    //Sending The User's email and password using helpers file.
    helpers.regNewuser(response.profileObj.email, response.profileObj.googleId).then((Response) => {
      //Getting the new user data through the Response & Use It To Update The State.
      console.log(Response);
      if (Response.data.id) {
        this.setState({
          id: Response.data.id,
          email: Response.data.email,
          registered: true,
          isAuth: true
        });
        this.props.setParent(this.state)
        this.handleRedirect();
        // browserHistory.push("/Login");
      } else {
        //Sending The User's email and password using helpers file.
        helpers.userLogin(response.profileObj.email, response.profileObj.googleId).then((logResponse) => {
          //Getting the new user data through the Response & Use It To Update The State.
          console.log(logResponse);
          this.setState({
            id: logResponse.data.id,
            email: logResponse.data.email,
            loggedin: true,
            isAuth: true
          });
          this.props.setParent(this.state)
          this.handleRedirect();

        });
      }
    });

  }


  handleRedirect() {
    if (this.state.registered) {
      browserHistory.replace("/Edit")
    } else if (this.state.loggedin) {
      browserHistory.replace("/Nearby")
    }

  }

  handelErrors() {
    if (this.state.message) { return (<div className="alert alert-danger" role="alert">{this.state.message}</div>) }
    if (this.state.error) { return (<div className="alert alert-danger" role="alert">{this.state.error}</div>) }
  }

  //Our render method. Utilizing a few helper methods to keep this logic clean
  render() {
    console.log(this.state.id + " && " + this.state.email);

    return (
      <div className="mainContainer">
        <div className="container">
        <img style={logoStyle} src="./img/pawinpaw-logo.png" />
          <h2 style={headingStyle}>REGISTER</h2>
          <br/>
          {/* Login fields */}
          <div className="row">
            <div className="col-sm-8 col-xs-8 col-sm-offset-2 col-xs-offset-2">
              {/*error message*/}
              {this.handelErrors()}
              <form onSubmit={this.handleSignup}>
                <div className="form-group">
                  <label style={textStyle} htmlFor="email">Email address</label>
                  <input type="email" value={this.state.email} style={inputStyle} className="form-control" id="email" placeholder="Email" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label style={textStyle} htmlFor="password">Password</label>
                  <input type="password" value={this.state.password} style={inputStyle} className="form-control" id="password" placeholder="Password" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label style={textStyle} htmlFor="Repassword"> Re-enter Password</label>
                  <input type="password" value={this.state.repassword} style={inputStyle} className="form-control" id="repassword" placeholder="Password" onChange={this.handleChange} />
                </div>
                <br/>
                <button type="submit" onClick={this.handleSignup} style={buttonStyle}>REGISTER</button>
                {/* <input type="image" onClick={this.handleSignup} style={buttonStyle} src="./img/Register.png"/> */}
                <br/><br/>
             
                <h4 style={headingStyle}>Already have an account?</h4>
                {/* <input type="image" onClick={this.handleLoginBtn} style={buttonStyle} src="./img/Login.png"/> */}
                <button type="submit" onClick={this.handleLoginBtn} style={buttonStyle}>LOG IN</button>
                {/*Google LogIn*/}
                <GoogleLogin style={gloginStyle} clientId="280548920560-u13cbso5e0b21ouc0aqokmf7rlfvt4po.apps.googleusercontent.com"
                  buttonText="Continue With Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                ></GoogleLogin>
              </form>
            </div>
          </div>
        </div>

      </div>
    )
  }
};

// Export the module back to the route
export default Registration;
