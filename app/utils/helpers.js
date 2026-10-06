// Include the Axios library for HTTP requests
import axios from "axios";


// Helper Functions
const helpers = {

    //SignUp New User
    regNewuser(email, password) {
        const newUser = { email, password };
        return axios.post("/api/register", newUser)
            .then((response) => {
                console.log(response);
                return response;
            });
    },

    //User LogIn
    userLogin(email, password) {
        const loggingUser = { email, password };
        return axios.post("/api/login", loggingUser)
            .then((response) => {
                console.log(response);
                return response;
            });
    },
    // Edit user's info
    userData(data) {
        console.log(data)
        return axios.put("/api/profile", data)
    },
    //Find Nearby 
    findNear(zipcode, id) {
        const nearbyData = {
            zipcode,
            id
        }
        console.log(nearbyData)
        return axios.post("/api/users/nearby", nearbyData)
            .then((response) => {
                console.log(response);
                return response;
            });
    },

    //Find user's matches 
    findMatches(userid) {

        return axios.get(`/api/users/matches/${userid}`);

        // axios.get(`/api/users/matches/${userid}`)
        //     .then((response) => {
        //         console.log(response);
        //         return response;
        //     });
    },

    //Find a single user's match profile info
    findMatchProfile(matchId) {
        return axios.get(`/api/users/${matchId}`)
    },

    unmatchUser(userId, matchId) {
        return axios.put(`/api/unmatch/${userId}/${matchId}`)
    },

    // Uploads an image to cloudinary
    cloudinaryUpload(image) {
        const url = "https://api.cloudinary.com/v1_1/khwilsoncloudinary/image/upload";
        const uploadPreset = 'bohjunrg';

        const fd = new FormData();
        fd.append("upload_preset", uploadPreset);
        fd.append("file", image);

        const config = {
            headers: { "X-Requested-With": "XMLHttpRequest" }
        };

        return axios.post(url, fd, config)
    },

    // Delete an image to cloudinary (not yet working)
    cloudinaryDelete(publicid) {
        const url = "https://api.cloudinary.com/v1_1/khwilsoncloudinary/resources/image/upload?public_ids[]=" + publicid;

        axios.delete(url, config)
            .then(function(res) {
                // File deleted successfully
                console.log(res.data);
            })
            .catch(function(err) {
                console.error('err', err);
            });

    },

    matchRequest(id, matchId, request) {
        var info = { id, matchId, request }
        return axios.post("/api/match/post", info)
    }

};


// We export the helpers function
export default helpers;