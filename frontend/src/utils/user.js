import axios from "axios";

const version = 'v1.0'
const address = `localhost/api/${version}`;

export const userSignUp = async(Data) => {
    try {
        let result = await axios.post(`${address}/user/signup`,{
            data: Data,
        });
        return result;
    } catch(error) {
        console.log(error);
        return {error: 'SERVER_ERROR'};
    }
}

export const userSignIn = async(Data, jwt) => {
    try {
        let result = await axios.post(`${address}/user/signin`, {
            headers: {'Authorization': 'Bearer '+jwt},
            data: Data
        });
        return result;
    } catch(error) {
        console.log(error);
        return {error: 'SERVER_ERROR'};
    }
}

export const userProfile = async(jwt) => {
    try {
        let result = await axios.get(`${address}/user/profile`, {
            headers: {'Authorization': 'Bearer '+jwt}
        })
        return result;
    } catch(error) {
        console.log(error);
        return {error: 'SERVER_ERROR'};
    }
}