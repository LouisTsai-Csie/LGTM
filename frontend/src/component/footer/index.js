
import { Fragment } from 'react';
import {  
    Stack,
    Text,
} from '@chakra-ui/react';

function Footer() {
    return (
        <Fragment>
            <Stack direction="row" align="center" width="100%" justify="center">
            <Text width="10%" fontSize="5px">About US</Text>
            <Text width="10%" fontSize="5px">Blog</Text>
            <Text width="10%" fontSize="5px">Contact US</Text>
            <Text width="10%" fontSize="5px">Price</Text>
            <Text width="10%" fontSize="5px">Donate</Text>
            <Text fontSize="5px">All rights reserved</Text>
            </Stack>
        </Fragment>
    );
}

export default Footer;