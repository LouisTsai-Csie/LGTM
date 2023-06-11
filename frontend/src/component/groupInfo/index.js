import { Fragment, useState } from "react";

import { 
  Button, 
  Stack,
  Card,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  ModalOverlay
} from '@chakra-ui/react';

import {
  Divider,
} from './style';


import {
  Link
} from "react-router-dom";

import {
  enterGroup,
  getAllGroup,
  getMyGroup
} from '../../utils/group';



function GroupInfo(props) {
  const [ticket, setTicket] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure()

  async function getGroup(type) {
    if(!props.token) return;
    let result = null;
    switch(type){
      case "Mine":
        result = await getMyGroup(props.token);
        break;
      case "Suggest":
        result = await getAllGroup(0);
        break;
      case "Hot":
        result = await getAllGroup(0);
        break;
      default:
        result = await getAllGroup(0);
        break;
    }
    props.setGroup(result.data.data.group);
    return;
  }

  async function enterGroupByTicket() {
    if(!ticket) return;
    let result = await enterGroup({ticket: ticket}, props.token);
    if(result.detail){
      alert("Fail To Enter The Group");
      return;
    }
    alert(`You Are Added Into The Group ${ticket}`);
    setTicket((_)=>'');
    onClose();
    return;
  }

  return (
      <Fragment>

      <Card>
        <Stack spacing={2} direction='column' align='center'>
          <Button colorScheme='blackAlpha' 
            width="240px" height="30px" variant='ghost' 
            iconSpacing="1.5em"
            onClick={()=>{getGroup("Mine")}}
          >
            My Group
          </Button>
          <Button colorScheme='blackAlpha' 
            width="240px" height="30px" variant='ghost' 
            iconSpacing="1.5em"
            onClick={()=>{getGroup("Suggest")}}
          >
            Suggest Group
          </Button>
          <Button colorScheme='blackAlpha' 
            width="240px" height="30px" variant='ghost' 
            iconSpacing="1.5em"
            onClick={()=>{getGroup("Hot")}}
          >
            Hot Group
          </Button>
        </Stack>
      </Card>
      <Divider />
      <Card>
        <Stack spacing={2} direction='column' align='center'>
          <Button colorScheme='blackAlpha' width="240px" height="30px" variant='ghost'
            iconSpacing="1.5em"
          >
            <Link to="/creategroup">Add Group</Link>
          </Button>
          <Button colorScheme='blackAlpha' width="240px" height="30px" variant='ghost'
            iconSpacing="1.5em" onClick={onOpen}
          >
            Enter Group
          </Button>
        </Stack>
      </Card>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader>Enter Group</ModalHeader>
          <ModalBody backdropFilter='blur(10px) hue-rotate(30deg)'>
            <Text>Please Enter Group Ticket</Text>
            <Input colorScheme='blackAlpha' marginTop="30px" onChange={(e)=>{setTicket(e.target.value)}} value={ticket}/>
          </ModalBody>

          <ModalFooter>
            <Stack align="center" justify="center" width="100%">
              <Button colorScheme='blackAlpha' onClick={onClose && enterGroupByTicket} variant='outline' size="sm">
              Submit
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Fragment>
  )
}

export default GroupInfo;