import {  
    Stack,
    Card,
    Text,
    Heading,
    CircularProgress,
} from '@chakra-ui/react';

import {
    useState
} from 'react';

import {
    StyledLink
} from './style';

function GroupProgress() {
    const [groupName, setGroupName]     = useState('OO');
    const [solvedNum, setSolvedNum]     = useState(100);
    const [unsolvedNum, setUnsolvedNum] = useState(20);

    return (
        <StyledLink to="/grouppage">
        <Card direction='row' width='100%' align='center' marginTop="10px">
            <Stack direction='column' align='center' justify="center" margin="5px 5px 5px 5px" width="100px">
                <Heading size="sm">Group</Heading>
                <Text>{groupName}</Text>
            </Stack>
            <Stack direction='column' align='center' justify="center" width="150px">
                <Text size="sm">solved: {solvedNum}</Text>
                <Text size="sm">unsolved: {unsolvedNum}</Text>
            </Stack>
            <CircularProgress value={(100*solvedNum)/(solvedNum+unsolvedNum)} size='30px' margin="5px 5px 5px" width="40px" align="center"/>
        </Card>
        </StyledLink>
    )
}

export default GroupProgress;