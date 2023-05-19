import {  
    Stack,
    Card, 
    CardBody,
    Text,
    Heading,
    CardHeader,
    Box,
    StackDivider,
    Button
} from '@chakra-ui/react';

import { Fragment, useState } from 'react';

function GroupData() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('sad');
    const [restriction, setRestriction] = useState('ads');
    const [memNum, setMemNum] = useState(0);


    return (
        <Fragment>
            <Card>
                <CardHeader>
                <Heading size='sm'>{name}</Heading>
                </CardHeader>
                <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading fontSize="8px" textTransform='uppercase'>Member</Heading>
                        <Text>{memNum}</Text>
                    </Box>
                    <Box>
                        <Heading fontSize="8px" textTransform='uppercase'>Restriction</Heading>
                        <Text>{restriction}</Text>
                    </Box>
                    <Box>
                        <Heading fontSize="8px" textTransform='uppercase'>Description</Heading>
                        <Text>{description}</Text>
                    </Box>
                    <Button colorScheme="blackAlpha" variant="outline"> Leave </Button>
                </Stack>
                </CardBody>
            </Card>
        </Fragment>
    );
}

export default GroupData;
