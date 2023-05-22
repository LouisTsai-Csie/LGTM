import axios from "axios";
const version = 'v1.0'
const address = `localhost/api/${version}`;

export const getMyGroup = async(jwt) => {
    try {
        let result = await axios.get(`${address}/group/my`, {
            headers: {'Authorization': 'Bearer '+jwt}
        })
        return result;
    } catch(error) {
        console.log(error);
        return {error: 'SERVER_ERROR'};
    }
}

export const getAllGroup = async(jwt) => {
    try {
        let result = await axios.get(`${address}/group/all`, {
            headers: {'Authorization': 'Bearer '+jwt}
        })
        return result;
    } catch(error) {
        console.log(error);
        return {error: 'SERVER_ERROR'};
    }
}

export const getSuggestGroup = async(jwt) => {
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

export const getHotGroup = async(jwt) => {
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

export const createGroup = async(Data, jwt) => {
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

export const enterGroup = async(Data, jwt) =>{
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

export const getGroupData = async(Data, jwt) => {
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

export const getGroupMember = async(Data, jwt) =>{
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