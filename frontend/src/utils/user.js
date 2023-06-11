import axios from "axios";

const version = 'v1.0'
const address = `http://127.0.0.1:8000/api/${version}`;

export const userSignUp = async(Data) => {
    const {name, email, password, picLink} = Data;
    console.log(name, email, password, picLink);
    try {
        let result = await axios.post(`${address}/user/signup`,{
            name: name,
            email: email,
            password: password, 
            picLink: picLink
        });
        return result;
    } catch(error) {
        console.log(error);
        return {detail: 'SERVER_ERROR'};
    }
}

export const userSignIn = async(Data, token) => {
    const {email, password} = Data;
    try {
        let result = await axios.post(`${address}/user/signin`, {
            headers: {'Authorization': 'Bearer '+token},
            email: email,
            password: password
        });
        return result;
    } catch(error) {
        console.log(error);
        return {"detail": "SERVER_ERROR"};
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
        return {"detail": 'SERVER_ERROR'};
    }
}

export const userStatus = async(jwt) => {
    try {
        let result = await axios.get(`${address}/user/status`, {
            headers: {'Authorization': 'Bearer '+jwt}
        })
        return result
    } catch(error) {
        console.log(error);
        return {"detail": "SERVER_ERROR"};
    }
}