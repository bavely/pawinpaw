// Include React as a dependency
import React from "react";
import ReactDOM from "react-dom";
import helpers from "../utils/helpers.js";
// import { PhotoSwipe } from 'react-photoswipe';
// import { PhotoSwipeGallery } from 'react-photoswipe';

import PropTypes from 'prop-types';
var Link = require("react-router").Link;

var buttonStyle = {
    height: "100px",
    // whitespace: "pre",
    marginBottom: "20px"
}

var textStyle = {
    fontFamily: "Roboto Condensed",
    textAlign: "center",
    paddingRight: "5px"
}

var infoStyle = {
    fontFamily: "Roboto Condensed",
}

var displayStyle = {
    display: "inline",
}

var floatRight = {
    float: "right"
}

var floatLeft = {
    float: "left"
}

var clearFloats = {
    clear: "both"
}

var paddingStyle = {
    paddingBottom: "10px",
    marginTop: "0px"
}

var backButton = {
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

var uploadStyle = {
    display: "block",
    margin: "auto",
    width: "75%"
}

class Nearby extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleLikeClick = this.handleLikeClick.bind(this);
        this.handlePassClick = this.handlePassClick.bind(this);
        this.handleBackBtn = this.handleBackBtn.bind(this);
        this.handleImgClick = this.handleImgClick.bind(this);
        this.renderCurrentCard = this.renderCurrentCard.bind(this);
        this.renderProfile = this.renderProfile.bind(this);

        this.state = {
            showProfile: false,
            nearbyUsers: [],
            count: 0
        };
    }

    componentWillMount() {
        if (this.props.zipcode) {
            helpers.findNear(this.props.zipcode, this.props.id).then((res) => {
                this.setState({
                    nearbyUsers: res.data
                })
            })
        }
    }

    handleLikeClick() {
        helpers.matchRequest(this.props.id, this.state.nearbyUsers[this.state.count].id, true);
        this.setState({
            count: this.state.count + 1
        });
    }

    handlePassClick() {
        helpers.matchRequest(this.props.id, this.state.nearbyUsers[this.state.count].id, false);
        this.setState({
            count: this.state.count + 1
        });
    }

    handleBackBtn() {
        this.setState({
            showProfile: false
        })
    }

    handleImgClick() {
        this.setState({
            showProfile: true
        })
    }

    renderCurrentCard() {

        return (
            <div>
                <h2 style={Object.assign({}, textStyle, paddingStyle)}>Hold My Paw?</h2>
                <img style={uploadStyle} src={this.state.nearbyUsers[this.state.count].photo_url ? this.state.nearbyUsers[this.state.count].photo_url : "./img/NoImgAvailable.png"} onClick={this.handleImgClick} />
                <h3 style={textStyle}>{this.state.nearbyUsers[this.state.count].name ? this.state.nearbyUsers[this.state.count].name : "?"}, {this.state.nearbyUsers[this.state.count].age ? this.state.nearbyUsers[this.state.count].age : "?"} </h3>

                {/* Pass Button */}
                <input type="image" onClick={this.handlePassClick} style={Object.assign({}, buttonStyle, floatLeft)} src="./img/Pass.png" />
                {/* Like Button */}
                <input type="image" onClick={this.handleLikeClick} style={Object.assign({}, buttonStyle, floatRight)} src="./img/Like.png" />
            </div>

        )
    }

    renderProfile() {
        console.log(this.state.nearbyUsers[this.state.count]);

        return (
            <div>
                <img style={uploadStyle} src={this.state.nearbyUsers[this.state.count].photo_url} />
                <h2 style={textStyle}>{this.state.nearbyUsers[this.state.count].name}, {this.state.nearbyUsers[this.state.count].age} </h2>
                <hr />
                <div className="form-group">
                    <label htmlFor="breed" style={textStyle}> Breed: </label>
                    {this.state.nearbyUsers[this.state.count].breed}
                </div>
                <div className="form-group">
                    <label htmlFor="likes" style={textStyle}> Likes: </label>
                    {this.state.nearbyUsers[this.state.count].likes}
                </div>
                <div className="form-group">
                    <label htmlFor="dislikes" style={textStyle}> Dislikes: </label>
                    {this.state.nearbyUsers[this.state.count].dislikes}
                </div>
                <div className="form-group">
                    <label htmlFor="favTreat" style={textStyle}> Favorite Treats: </label>
                    {this.state.nearbyUsers[this.state.count].favTreat}
                </div>
                <div className="form-group">
                    <label htmlFor="zipcode" style={textStyle}> Zip Code: </label>
                    {this.state.nearbyUsers[this.state.count].zipcode}
                </div>

                <button style={backButton} type="submit" onClick={this.handleBackBtn}>Back</button>
            </div>
        )
    }

    render() {

        if (this.state.nearbyUsers[this.state.count]) {
            return (
                <div className='layout-page'>
                    <main className='layout-main'>
                        <div className='container'>
                            {this.state.showProfile ? this.renderProfile() : this.renderCurrentCard()}
                        </div>
                    </main>
                </div>
            );
        } else {
            return (
                <div className='layout-page'>
                    <main className='layout-main'>
                        <div className='container'>
                            <img width="30%" style={uploadStyle} src="./img/No-dogs.jpg" />
                            <h2 style={textStyle}>No more nearby users...</h2>
                        </div>
                    </main>
                </div>
            )
        }
    }
}

// Export the module back to the route
export default Nearby;
