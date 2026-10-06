import React from "react";
import helpers from "../utils/helpers.js";

var Link = require("react-router").Link;
var router = require("react-router");
var browserHistory = router.browserHistory;

var navStyle = {
  backgroundColor: "#009191",
}

var centerAlign = {
  textAlign: "center"
}

// Create the Main component
class Main extends React.Component {


  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      id: "",
      isAuth: false,

      name: "",
      photo_url: "",
      photo_publicid: "",
      age: "",
      zipcode: "",
      breed: "",
      likes: "",
      dislikes: "",
      favTreat: ""

    };

    this.setParent = this.setParent.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  setParent(props) {
    console.log("New Main State:");
    console.log(props);

    this.setState({
      id: props.id,
      email: props.email,
      isAuth: props.isAuth,

      name: props.name,
      photo_url: props.photo_url,
      photo_publicid: props.photo_publicid,
      age: props.age,
      zipcode: props.zipcode,
      breed: props.breed,
      likes: props.likes,
      dislikes: props.dislikes,
      favTreat: props.favTreat
    });
  }

  handleLogout() {
    this.setState({
      id: "",
      email: "",
      isAuth: false,

      name: "",
      photo_url: "",
      photo_publicid: "",
      age: "",
      zipcode: "",
      breed: "",
      likes: "",
      dislikes: "",
      favTreat: ""
    })
    browserHistory.replace("/Login")
  }

  renderNavLogin() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/Login" data-toggle="collapse" data-target=".navbar-collapse.in" style={centerAlign}>Login</Link></li>
        <li><Link to="/Registration" data-toggle="collapse" data-target=".navbar-collapse.in" style={centerAlign}>Register</Link></li>
      </ul>
    )
  }

  renderNavHome() {
    return (
      
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/Edit" data-toggle="collapse" data-target=".navbar-collapse.in" style={centerAlign}>Profile</Link></li>
        <li><Link to="/Match" data-toggle="collapse" data-target=".navbar-collapse.in" style={centerAlign}>Matches</Link></li>
        <li><Link to="/Nearby" data-toggle="collapse" data-target=".navbar-collapse.in" style={centerAlign}>Nearby</Link></li>
        <li><Link to="/Login" data-toggle="collapse" data-target=".navbar-collapse.in" style={centerAlign} onClick={this.handleLogout}>Logout</Link></li>
        
      </ul>
    )
  }

  renderLogo() {
    return (
      <img height="55px" src="./img/pawinpaw-logo.png"/>
    )
  }
  
  render() {

    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        setParent: this.setParent,
        id: this.state.id,
        email: this.state.email,
        isAuth: this.state.isAuth,

        name: this.state.name,
        photo_url: this.state.photo_url,
        photo_publicid: this.state.photo_publicid,
        age: this.state.age,
        zipcode: this.state.zipcode,
        breed: this.state.breed,
        likes: this.state.likes,
        dislikes: this.state.dislikes,
        favTreat: this.state.favTreat
      })
    );

    console.log(this.state.email + "  " + this.state.id)
    return (
      // We can only render a single div. So we need to group everything inside of this main-container one
      <div className="main-container">
        <nav className="navbar navbar-default navbar-expand-xxl" role="navigation" style={navStyle}>
          <div className="container-fluid">
            <div className="navbar-header">
            {this.state.isAuth ? this.renderLogo() : null}
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-ex1-collapse"
              >
              

                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
           
            <div className="collapse navbar-collapse navbar-ex1-collapse">

              {/* Using <Link> in place of <a> and "to" in place of "href" */}
              {this.state.isAuth ? this.renderNavHome() : this.renderNavLogin()}

            </div>
          </div>
        </nav>
        {/* Here we will deploy the sub components */}
        {/* These sub-components are getting passed as this.props.children */}
        {/* {this.props.children} */}
        {childrenWithProps}

      </div>
    );
  }
};

// Export the module back to the route
export default Main;
