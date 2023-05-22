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


function IntroData() {
    const [name, setName] = useState('');
    const [groupNum, setGroupNum] = useState('');
    const [code, setCode] = useState("print('Hello world!')");
    const [language, setLanguage] = useState(['python', 'C', 'C++']);
    const [image, setImage] = useState('https://bit.ly/dan-abramov');

    // useEffect(async()=>{
    //     const jwt = '';
    //     if(!jwt) return;
    //     const result = await userProfile(jwt);

    //     switch(result.error) {
    //         case 'SERVER_ERROR':
    //             break;
    //         case 'JWT_EXPIRE':
    //             break;
    //         default:
    //             // const {picLink, username} = result.data;
    //             // setName(username);
    //             // setImage(picLink);
    //             break;
    //     } 
    //     return;
    // }, []);

    function getLanguageBadge() {
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
        <Text marginBottom="5px">Name: {name}</Text>
        <Text marginBottom="5px">Group Number: {groupNum}</Text>
        <Code marginBottom="5px">{code}</Code>
        <Text marginBottom="10px">Language</Text>
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
