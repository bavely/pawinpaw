// Include React as a dependency
import React from "react";
import helpers from "../utils/helpers.js";
import Dropzone from 'react-dropzone';

var Link = require("react-router").Link;
var router = require("react-router");
var browserHistory = router.browserHistory;

var inputStyle = {
  borderColor: "#FFB74D",
  borderWidth: "2px",
  borderStyle: "solid"
}

var buttonStyle = {
  height: "50px",
  display: "inline-block", 
  margin: "10px"
}

var centerImages = {
  textAlign: "center"
}

var textStyle = {
  fontFamily: "Roboto Condensed",
  textAlign:"center",
  paddingRight: "5px"
}

var dropzoneStyle = {
  display: "block",
  margin: "auto",
  width: "220px",
  height: "220px",
  borderColor: "black",
  borderStyle: "dashed",
  borderWidth: "2px"
}

var uploadStyle = {
  display: "block", 
  margin: "auto",
  width: "75%",
  border: "none"
}

var infoStyle = {
  fontFamily: "Roboto Condensed",
  fontWeight: "bold",
  textAlign: "center"

}



// Create the Main component
class Edit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      age: this.props.age,
      breed: this.props.breed,
      likes: this.props.likes,
      dislikes: this.props.dislikes,
      favTreat: this.props.favTreat,
      zipcode: this.props.zipcode,
      photoUrl: this.props.photo_url,
      photo_publicid: this.props.photo_publicid,

      missingFields: false,
      editClicked: true,
      saveClicked: false,

      // image files accepted and rejected from file upload dropzone
      accepted: [],
      rejected: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.displayForm  = this.displayForm.bind(this);
  }

  handleChange(event) {
    let state = {};
    state[event.target.id] = $.trim(event.target.value);
    this.setState(state);
    console.log(state);
  }

  handleUpdate(event) {
    event.preventDefault();

    if (!this.state.name || !this.state.age || !this.state.zipcode || this.state.name === "" || this.state.age === "" || this.state.zipcode == "") {
      return this.setState({
        missingFields: true
      })
    } else if (this.state.accepted[0]) {
      helpers.cloudinaryUpload(this.state.accepted[0])
        .then((res) => {
          // File uploaded successfully
          this.state.photoUrl = res.data.secure_url;

          console.log(res.data);
          const data = {
            id: this.props.id,
            // id: 1,
            name: this.state.name,
            age: this.state.age,
            breed: this.state.breed,
            likes: this.state.likes,
            dislikes: this.state.dislikes,
            favTreat: this.state.favTreat,
            zipcode: this.state.zipcode,
            photo_url: res.data.secure_url,
            photo_publicid: res.data.public_id
          }

          console.log(data);

          helpers.userData(data).then(() => {

            data.id = this.props.id;
            data.email = this.props.email;
            data.isAuth = this.props.isAuth;

            this.state.saveClicked = true;
            this.state.editClicked = false;
            this.props.setParent(data);

          });
        })
        .catch(function (err) {
          console.error('err', err);
        });
    } else {
      const data = {
        id: this.props.id,
        // id: 1,
        name: this.state.name,
        age: this.state.age,
        breed: this.state.breed,
        likes: this.state.likes,
        dislikes: this.state.dislikes,
        favTreat: this.state.favTreat,
        zipcode: this.state.zipcode,
        photo_url: this.state.photo_url,
        photo_publicid: this.state.photo_publicid
      }

      console.log(data);

      helpers.userData(data).then(() => {
        data.id = this.props.id;
        data.email = this.props.email;
        data.isAuth = this.props.isAuth;

        this.state.saveClicked = true;
        this.state.editClicked = false;
        this.props.setParent(data);
      });
    }

  }

  onDrop(files) {
    console.log("dropped files");
  }

  renderMissingError() {
    return (<div className="alert alert-danger" role="alert">Required field!</div>)
  }

  renderForm() {
    return (

      <form onSubmit={this.handleUpdate}>

        {/* <img style={uploadStyle} src={this.state.photoUrl}/> */}

        <div  className="dropzone">
          <Dropzone
            style={dropzoneStyle}
            accept="image/jpeg, image/png"
            onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
            maxSize={500000}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
            <p>Only *.jpeg and *.png images will be accepted.</p>
            <p>Max image size is 500kb.</p>
          </Dropzone>
        </div>

        <aside>
          <h5 style={infoStyle}>Dropped files</h5>
          <ul>
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>

        
        <div className="form-group">
          <label style={textStyle} htmlFor="name">*Name</label>
          <input type="email" value={this.state.name} style={inputStyle} className="form-control" id="name" placeholder="Enter Name" onChange={this.handleChange} />
          {(this.state.missingFields) ? this.renderMissingError() : null}
        </div>
        <div className="form-group">
          <label style={textStyle} htmlFor="age">*Age</label>
          <input type="text" value={this.state.age} style={inputStyle} className="form-control" id="age" placeholder="Age" onChange={this.handleChange} />
          {(this.state.missingFields) ? this.renderMissingError() : null}
        </div>
        <div className="form-group">
          <label style={textStyle} htmlFor="breed"> Breed</label>
          <input type="text" value={this.state.breed} style={inputStyle} className="form-control" id="breed" placeholder="Breed" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label style={textStyle} htmlFor="likes"> Likes</label>
          <input type="text" value={this.state.likes} style={inputStyle} className="form-control" id="likes" placeholder="Likes" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label style={textStyle} htmlFor="dislikes"> Dislikes</label>
          <input type="text" value={this.state.dislikes} style={inputStyle} className="form-control" id="dislikes" placeholder="Dislikes" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label style={textStyle} htmlFor="favTreat"> Favorite Treats</label>
          <input type="text" value={this.state.favTreat} style={inputStyle} className="form-control" id="favTreat" placeholder="Favorite Treats" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label style={textStyle} htmlFor="zipcode"> **Zip Code</label>
          <input type="text" value={this.state.zipcode} style={inputStyle} className="form-control" id="zipcode" placeholder="Zip Code" onChange={this.handleChange} />
          {(this.state.missingFields) ? this.renderMissingError() : null}  
        </div>

        <p>*Required</p>
        <p>**Local potential matches will be populated based on Zip Code.</p>

      </form>
    )
  }

  renderData() {
    return (
      <form>

        <img style={uploadStyle} src={this.state.photoUrl ? this.state.photoUrl : "./img/NoImgAvailable.png"} />

        <hr/>
        <h2 style={infoStyle}>{this.state.name}, {this.state.age}</h2>
        
        <hr/>
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

      </form>
    )
  }

  handleClick() {
    this.setState({
      editClicked: true,
      saveClicked: false
    })
  }

  handleRedirect() {
    browserHistory.replace("/Nearby");
  }
  // Our render method. Utilizing a few helper methods to keep this logic clean
  render() {
    console.log(this.props.id + "  " + this.props.email);
    return (

      <div className="mainContainer">
        <div className="container">
          <div className="row">
            <h1 style={textStyle}>Edit Your Pup's Profile</h1>
            <br/>
            <div className="col-sm-8 col-xs-8 col-sm-offset-2 col-xs-offset-2">
              {this.state.saveClicked ? this.renderData() : this.state.editClicked ? this.renderForm() : "Some Thing Wrong"}
            </div>
          </div>
          <div style={centerImages} className="col-sm-8 col-xs-8 col-sm-offset-2 col-xs-offset-2">
            <input type="image" onClick={this.handleClick} style={buttonStyle} src="./img/Edit.png" />
        
            <input type="image" onClick={this.handleUpdate} style={buttonStyle} src="./img/Save.png" />
           
            <input type="image" onClick={this.handleRedirect} style={buttonStyle} src="./img/Done.png" />
          </div>
        </div>
      </div>
    )
  }
};

// Export the module back to the route
export default Edit;
