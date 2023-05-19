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


function MemberData() {

    return (
        <Fragment>
        <Card direction="row" variant='outline' width="100%" align="center">
            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' marginLeft="10px" size="sm"/>
            <CardBody>
                <Stack spacing={10} direction='row' align='center' width="100%">
                    <Text size="sm" width="60px" fontSize="3px">Louis Tsai</Text>
                    <Text size="sm" width="60px">2</Text>
                    <Text size="sm" width="60px">12</Text>
                    <Text size="sm" width="60px">2</Text>
                    <Text size="sm" width="60px">34</Text>
                    <CheckCircleIcon width="60px" size="sm"/>
                </Stack>
            </CardBody>
        </Card>
        </Fragment>
    );
}

export default MemberData;