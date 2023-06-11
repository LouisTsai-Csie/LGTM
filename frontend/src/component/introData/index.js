import {  
    Stack,
    Card, 
    CardBody,
    Text,
    Avatar,
    Code,
    Badge,
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
    const [groupNum, setGroupNum] = useState('');
    const [code, setCode] = useState("print('Hello world!')");
    const [language, setLanguage] = useState(['python', 'C', 'C++']);
    const [image, setImage] = useState('https://bit.ly/dan-abramov');
    const [token, setToken] = useState(null);

    
    const getUserProfile = async(jwtToken)=>{
        if(!jwtToken) return;

        const result = await userProfile(jwtToken);

        if(result.detail) return;
        
        console.log(result.data.data.user)
        const {name, pickLink} = result.data.data.user;
        console.log(pickLink);
        setName(name);
        setImage(pickLink);
        return;
    }


    useEffect(()=>{
        setToken((_)=>props.token);
        getUserProfile(props.token);
    }, [props.token]);

    function getLanguageBadge() {
        if(token===null) return;
        const color = ['green', 'blackAlpha', 'orange', 'teal'];
        return language.map((item, index)=>(
            <Badge colorScheme={
                color[index]
            }>
                {item}
            </Badge>
        ));
    }

    return (
    <Stack direction='column' align='center' marginTop="10px">
    <Card direction='row' width='100%'>
        <CardBody>
        <Avatar name='Dan Abrahmov' src={image} marginBottom="10px"/>
        <Text marginBottom="5px">{token===null? "Please Login First":"Name: "+name}</Text>
        <Text marginBottom="5px">{token===null? "":"Group Number: "+groupNum}</Text>
        <Code marginBottom="5px">{token===null? "":code}</Code>
        <Text marginBottom="10px">{token===null? "": "language"}</Text>
        <Stack spacing={4} direction='row' wrap="wrap">
            {
                getLanguageBadge()
            }
        </Stack>
        </CardBody>
    </Card>
    </Stack>
    );
}

export default IntroData;
