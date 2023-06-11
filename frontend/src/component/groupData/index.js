import {  
    Stack,
    Card, 
    CardBody,
    Code,
    Text,
    Heading,
    CardHeader,
    Box,
    StackDivider,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    ModalFooter
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

import { Fragment, useState } from 'react';
import { leaveGroup } from '../../utils/group';

function GroupData(props) {
    const [ticket, setTicket] = useState('');
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    async function leaveGroupHandler() {
        if(ticket!==props.ticket){
            alert("Please Enter Correct Group Ticket");
            return;
        }
        await leaveGroup({ticket}, props.token);
        onClose();
        alert('Successfully Leave The Group');
        navigate('/');
        return;
    }

    return (
        <Fragment>
            <Card>
                <CardHeader>
                <Heading size='sm'>{props.name}</Heading>
                </CardHeader>
                <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading fontSize="8px" textTransform='uppercase'>Member</Heading>
                        <Text>{props.memNum}</Text>
                    </Box>
                    <Box>
                        <Heading fontSize="8px" textTransform='uppercase'>Restriction</Heading>
                        <Text>{props.restriction}</Text>
                    </Box>
                    <Box>
                        <Heading fontSize="8px" textTransform='uppercase'>Description</Heading>
                        <Text>{props.description}</Text>
                    </Box>
                    <Button colorScheme="blackAlpha" variant="outline"
                        onClick={onOpen}
                    > Leave </Button>
                </Stack>
                </CardBody>
            </Card>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px) hue-rotate(90deg)'
                />
                <ModalContent>
                <ModalHeader>Are you sure to leave the group</ModalHeader>
                <ModalBody backdropFilter='blur(10px) hue-rotate(30deg)'>
                    <Text>Please Enter Group Ticket:   <Code>{props.ticket}</Code></Text>
                    <Input colorScheme='blackAlpha' marginTop="30px"
                        onChange={(e)=>{setTicket(e.target.value)}} value={ticket}
                    />
                </ModalBody>

                <ModalFooter>
                    <Stack align="center" justify="center" width="100%">
                    <Button colorScheme='blackAlpha' variant='outline' size="sm"
                        onClick={leaveGroupHandler}
                    >
                    Submit
                    </Button>
                    </Stack>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Fragment>
    );
}

export default GroupData;
