import { 
    Stack,
    Card, 
    CardBody,
    Text,
    Avatar,
} from '@chakra-ui/react';

import { 
    Fragment,
    useState 
} from "react";

import { 
    CheckCircleIcon 
} from '@chakra-ui/icons';


function MemberData(props) {

    return (
        <Fragment>
        <Card direction="row" variant='outline' width="100%" align="center">
            {/*<Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' marginLeft="10px" size="sm"/>*/}
            <CardBody>
                <Stack spacing={10} direction='row' align='center' width="100%">
                    <Text size="sm" width="60px" fontSize="3px">{props.name}</Text>
                    <Text size="sm" width="60px">{props.rank}</Text>
                    <Text size="sm" width="60px">{props.totalSolved}</Text>
                    <Text size="sm" width="60px">{props.totalMissed}</Text>
                    <Text size="sm" width="60px">{props.solved}</Text>
                    {/*<CheckCircleIcon width="60px" size="sm"/>*/}
                </Stack>
            </CardBody>
        </Card>
        </Fragment>
    );
}

export default MemberData;