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

function GroupProgress(props) {
    const {ticket, name, solved, total} = props;

    return (
        <StyledLink to={`/grouppage?group=${ticket}`} onClick={()=>{props.setTicket(ticket)}}>
        <Card direction='row' width='100%' align='center' marginTop="10px">
            <Stack direction='column' align='center' justify="center" margin="5px 5px 5px 5px" width="100px">
                <Heading size="sm">Group</Heading>
                <Text>{name}</Text>
            </Stack>
            <Stack direction='column' align='center' justify="center" width="150px">
                <Text size="sm">solved: {solved}</Text>
                <Text size="sm">unsolved: {total-solved}</Text>
            </Stack>
            <CircularProgress value={(100*solved)/(total)} size='30px' margin="5px 5px 5px" width="40px" align="center"/>
        </Card>
        </StyledLink>
    )
}

export default GroupProgress;