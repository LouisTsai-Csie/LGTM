import { Fragment } from "react";

import { 
    Button, 
    Stack,
    Card,
    
} from '@chakra-ui/react';

import {
    Divider,
} from './style';


import {
  Link
} from "react-router-dom";


function GroupInfo() {
    return (
        <Fragment>
        <Card>
              <Stack spacing={1} direction='column' align='center'>
                <Button colorScheme='blackAlpha' width="240px" height="30px" variant='ghost' 
                  iconSpacing="1.5em"
                >
                  My Group
                </Button>
                <Button colorScheme='blackAlpha' width="240px" height="30px" variant='ghost' 
                  iconSpacing="1.5em"
                >
                  Suggest Group
                </Button>
                <Button colorScheme='blackAlpha' width="240px" height="30px" variant='ghost' 
                  iconSpacing="1.5em"
                >
                  Hot Group
                </Button>
              </Stack>
            </Card>
            <Divider />
            <Card>
              <Stack spacing={1} direction='column' align='center'>
                <Button colorScheme='blackAlpha' width="240px" height="30px" variant='ghost'
                  // leftIcon={<AttachmentIcon boxSize="0.8em"/>}
                  iconSpacing="1.5em"
                >
                  <Link to="/creategroup">Add Group</Link>
                </Button>
                <Button colorScheme='blackAlpha' width="240px" height="30px" variant='ghost'
                  // leftIcon={<AttachmentIcon boxSize="0.8em"/>}
                  iconSpacing="1.5em"
                >
                  Enter Group
                </Button>
              </Stack>
        </Card>
        </Fragment>
    )
}

export default GroupInfo;