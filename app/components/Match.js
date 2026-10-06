// Include React as a dependency
import React from "react";
import helpers from "../utils/helpers.js";

var Link = require("react-router").Link;
var router = require("react-router");
var browserHistory = router.browserHistory;

// Styling
var textStyle = {
    fontFamily: "Roboto Condensed",
    textAlign: "center",
    paddingRight: "5px"
}

var infoStyle = {
    fontFamily: "Roboto Condensed",
    fontWeight: "bold",
    textAlign: "center",

}

var uploadStyle = {
    display: "block",
    margin: "auto",
    width: "60%",
    marginTop: "10px"
}

var doneButton = {
    display: "inline-block",
    margin: "auto",
    backgroundColor: "#009191",
    border: "none",
    height: "40px",
    width: "180px",
    color: "white",
    borderRadius: "5px",
    fontFamily: "Roboto Condensed",
    letterSpacing: "1px",
    marginBottom: "5px",
    float: "left"
}

var unmatchButton = {
    display: "inline-block",
    margin: "auto",
    backgroundColor: "#D62C1A",
    border: "none",
    height: "40px",
    width: "180px",
    color: "white",
    borderRadius: "5px",
    fontFamily: "Roboto Condensed",
    letterSpacing: "1px",
    marginBottom: "5px",
    float: "right"

}


// Create the Main component
class Match extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            matchProfiles: [],
            matchClicked: false,

            id: "",
            name: "",
            age: "",
            breed: "",
            likes: "",
            dislikes: "",
            favTreat: "",
            zipcode: "",
            photoUrl: "",
            photo_publicid: "",
            email: ""
        };

        this.showMatchInfo = this.showMatchInfo.bind(this);
        this.handleDoneBtn = this.handleDoneBtn.bind(this);
        this.handleUnmatch = this.handleUnmatch.bind(this);
    }

    // When this component mounts, get all user's matches and set it to state
    componentDidMount() {
        helpers.findMatches(this.props.id)
            // helpers.findMatches(1)
            .then((matchProfiles) => {
                this.setState({ matchProfiles: matchProfiles.data });
                console.log("matches", matchProfiles);
            })
            .catch(function (err) {
                console.error('err', err);
            });
    }

    // // This code handles the clicking on a match
    showMatchInfo(event) {
        console.log(event.target.dataset);
        console.log("event", event.target.dataset['photourl']);

        this.setState({
            matchClicked: true,

            id: event.target.dataset['id'],
            name: event.target.dataset['name'],
            age: event.target.dataset['age'],
            breed: event.target.dataset['breed'],
            likes: event.target.dataset['likes'],
            dislikes: event.target.dataset['dislikes'],
            favTreat: event.target.dataset['favtreat'],
            zipcode: event.target.dataset['zipcode'],
            photoUrl: event.target.dataset['photourl'],
            email: event.target.dataset['email']
        })
    }

    handleDoneBtn() {
        this.setState({
            matchClicked: false
        })
    }

    handleUnmatch() {
        helpers.unmatchUser(this.props.id, this.state.id)
            .then((response) => {

                helpers.findMatches(this.props.id)
                    .then((matchProfiles) => {
                        this.setState({ matchProfiles: matchProfiles.data, matchClicked: false });
                    })
                    .catch(function (err) {
                        console.error('err', err);
                    });

            })
            .catch(function (err) {
                console.error('err', err);
            });
    }

    renderMatchSwitch() {
        if (this.state.matchProfiles[0]) {
            return this.renderMatches()
        } else {
            return this.renderEmpty()
        }
    }

    renderEmpty() {
        return (
            <div className='layout-page'>
                <main className='layout-main'>
                    <div className='container'>
                        <h2 style={textStyle}>No matches yet...</h2>
                    </div>
                </main>
            </div>
        )
    }

    renderMatches() {
        // console.log("full");

        return this.state.matchProfiles.map((currentValue, index) => {
            console.log(currentValue);
            return (

                <div className="row" key={currentValue.id}>
                    <div className="col-sm-12">
                        <img style={uploadStyle} src={currentValue.photo_url ? currentValue.photo_url : "./img/NoImgAvailable.png"} onClick={this.showMatchInfo} data-name={currentValue.name} data-age={currentValue.age} data-breed={currentValue.breed} data-likes={currentValue.likes} data-dislikes={currentValue.dislikes} data-favTreat={currentValue.favTreat} data-zipcode={currentValue.zipcode} data-photourl={currentValue.photo_url} data-email={currentValue.email} data-id={currentValue.id} />
                        <h3 style={textStyle}>{currentValue.name ? currentValue.name : "?"}, {currentValue.age ? currentValue.age : "?"}</h3>
                        <hr />
                    </div>
                </div>

            )

        })


    }

    renderData() {

        return (
            <form>

                <img style={uploadStyle} src={this.state.photoUrl ? this.state.photoUrl : "./img/NoImgAvailable.png"} />

                <h3 style={infoStyle}>
                    {this.state.name ? this.state.name : "?"}, {this.state.age ? this.state.age : "?"}
                </h3>

                <hr />

                <div className="form-group">
                    <label htmlFor="breed" style={textStyle}> Breed: </label>
                    {this.state.breed}
                </div>
                <div className="form-group">
                    <label htmlFor="likes" style={textStyle}> Likes: </label>
                    {this.state.likes}
                </div>
                <div className="form-group">
                    <label htmlFor="dislikes" style={textStyle}> Dislikes: </label>
                    {this.state.dislikes}
                </div>
                <div className="form-group">
                    <label htmlFor="favTreat" style={textStyle}> Favorite Treats: </label>
                    {this.state.favTreat}
                </div>
                <div className="form-group">
                    <label htmlFor="zipcode" style={textStyle}> Zip Code: </label>
                    {this.state.zipcode}
                </div>
                <div className="form-group">
                    <label htmlFor="email" style={textStyle}> Contact Me: </label>
                    {this.state.email}
                </div>

                <button style={doneButton} onClick={this.handleDoneBtn} type="button">Done</button>
                <button style={unmatchButton} onClick={this.handleUnmatch} type="button" className="btn btn-danger">Unmatch</button>
            </form>
        )
    }

    // Our render method. Utilizing a few helper methods to keep this logic clean
    render() {
        return (
            <div className="container">
                {this.state.matchClicked ? this.renderData() : this.renderMatchSwitch()}
            </div>
        )
    }
};

// Export the module back to the route
export default Match;
