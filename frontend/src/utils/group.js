import axios from "axios";
const version = 'v1.0'
const address = `http://127.0.0.1:8000/api/${version}`;

export const getMyGroup = async(jwt) => {
    try {
        let result = await axios.get(`${address}/group/member`, {
            headers: {'Authorization': 'Bearer '+jwt}
        })
        return result;
    } catch(error) {
        console.log(error);
        return {error: 'SERVER_ERROR'};
    }
}

export const getAllGroup = async(pages) => {
    try {
        let result = await axios.get(`${address}/group/all`,{
            params: {
                pages: pages
            }
        });
        return result;
    } catch(error) {
        console.log(error);
        return {detail: 'SERVER_ERROR'};
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

export const createGroup = async(
    name,
    tags,
    types,
    maxiNum,
    restriction,
    picLink,
    description,
    jwt) => {
    try {
        let result = await axios.post(`http://localhost:8000/api/v1.0/group/create`, {
            headers: {'Authorization': 'Bearer '+jwt},
            data: {
                name: name, 
                tag: tags,
                types: types, 
                maxiNum: maxiNum, 
                restriction: restriction, 
                picLink: picLink, 
                description: description
            }
        });
        return result;
    } catch(error) {
        console.log(error);
        return {detail: 'SERVER_ERROR'};
    }
}

export const enterGroup = async(Data, jwt) =>{
    try {
        let result = await axios.post(`${address}/group/enter`, {
            data: Data
        },{
            headers: {'Authorization': 'Bearer '+jwt},
        });
        return result;
    } catch(error) {
        console.log(error);
        return {'detail': 'SERVER_ERROR'};
    }
}

export const getGroupData = async(jwt) => {
    try {
        let result = await axios.post(`${address}/user/status`, {
            headers: {'Authorization': 'Bearer '+jwt},
        });
        return result;
    } catch(error) {
        console.log(error);
        return {error: 'SERVER_ERROR'};
    }
}

export const getGroupStatus = async(Data) =>{
    try {
        let result = await axios.post(`${address}/group/status`, {
            data: Data
        });
        return result;
    } catch(error) {
        console.log(error);
        return {error: 'SERVER_ERROR'};
    }
}

export const getGroupInfo = async(Data)=> {
    try{
        let result = await axios.post(`${address}/group/info`, {
            data: Data
        });
        return result;
    } catch(error){
        console.log(error);
        return {detail: "SERVER_ERROR"};
    }
}

export const leaveGroup = async(Data, jwt) => {
    try{
        const result = await axios.post(`${address}/group/leave`,{
            data: Data
        }, {
            headers: {'Authorization': 'Bearer '+jwt},
        })
        return result;
    }catch(error){
        console.log(error);
        return {detail: "SERVER_ERROR"};
    }
}