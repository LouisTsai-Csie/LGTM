import {  
    Stack,
    Card, 
    CardBody,
    Text,
    Avatar,
} from '@chakra-ui/react';

import {
    useEffect,
    useState
} from 'react';

import {
    userProfile
} from '../../utils/user';


function IntroData(props) {
    const [name, setName] = useState('');
    const [groupNum, setGroupNum] = useState('2');
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("");
    const [image, setImage] = useState('https://bit.ly/dan-abramov');
    const [token, setToken] = useState(null);

    
    const getUserProfile = async(jwtToken)=>{
        if(!jwtToken) return;

        const result = await userProfile(jwtToken);

        if(result.detail) return;
        
        console.log(result.data.data.user)
        const {name, pickLink, acNum, subNum} = result.data.data.user;
        console.log(pickLink);
        setName(name);
        setImage(pickLink);
        setCode(acNum);
        setLanguage(subNum);
        return;
    }


    useEffect(()=>{
        setToken((_)=>props.token);
        getUserProfile(props.token);
    }, [props.token]);


    return (
    <Stack direction='column' align='center' marginTop="10px">
    <Card direction='row' width='100%'>
        <CardBody>
        <Avatar name='Dan Abrahmov' src={image} marginBottom="10px"/>
        <Text marginBottom="5px">{token===null? "Please Login First":"Name: "+name}</Text>
        <Text marginBottom="5px">{token===null? "":"Group Number: "+groupNum}</Text>
        <Text marginBottom="5px">{token===null? "":"AC Num: " + code}</Text>
        <Text marginBottom="5px">{token===null? "":"Total Num: " + language}</Text>
        </CardBody>
    </Card>
    </Stack>
    );
}

export default IntroData;
