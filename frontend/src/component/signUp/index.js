import { 
    Button, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    FormControl,
    FormLabel,
    Input,
    Stack
  } from '@chakra-ui/react';
  
import { Fragment, useState } from 'react';

import {
  userSignIn,
  userSignUp
} from '../../utils/user';

import AlertLog from '../alertLog';

  
function SignUp(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [checkPwd, setCheckPwd] = useState('');
  const [picLink, setPicLink]   = useState('');

  async function checkSignUpData() {
    if(!name || !email || !password){
      alert('Incomplete sign up data');
      return;
    }
    if(password!=checkPwd){
      alert('Please check your input password');
      return;
    }

    const result = await userSignUp({
      name: name,
      email: email,
      password: password,
      picLink: picLink
    });

    if(result.detail){
      alert("Someone Else Registered This Email");
      return;
    } 
    const token = result.data.data.access_token;
    localStorage.setItem("jwtToken", token);

    props.setToken((_)=>token);

    alert('success');
    onClose();
    return;
  }

  async function checkSignInData() {
    if(!email || !password){
      alert('Incomplete sign in data');
      return;
    }

    const token = localStorage.getItem("jwtToken");

    const result = await userSignIn({
      email: email,
      password: password
    }, token);

    if(result.detail){
      alert(result.detail);
      return;
    }

    const t = result.data.data.access_token;
    localStorage.setItem("jwtToken", t);
    props.setToken((_)=>t);

    alert('success');
    onClose();
    return;
  }


  const getLoginButton = () => {
    return (
      <Fragment>
      <Button onClick={onOpen} width="100%" colorScheme="blackAlpha" variant="outline">Login</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Login</ModalHeader>
          <ModalBody>
            <Tabs variant='soft-rounded' colorScheme='green'>
              <TabList>
                <Tab>Sign Up</Tab>
                <Tab>Sign In</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input type='text' onChange={(e)=>setName(e.target.value)}/>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' onChange={(e)=>setEmail(e.target.value)}/>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' onChange={(e)=>setPassword(e.target.value)}/>
                    <FormLabel>Check Password</FormLabel>
                    <Input type='password' onChange={(e)=>setCheckPwd(e.target.value)}/>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Picture Link</FormLabel>
                    <Input type='text' onChange={(e)=>setPicLink(e.target.value)}/>
                    <Stack width="100%" justify="center" align="center">
                      <Button colorScheme='blackAlpha' variant='outline' marginTop="20px" onClick={()=>checkSignUpData()}>Submit</Button>
                    </Stack>
                  </FormControl>
                </TabPanel>
                <TabPanel>
                  <FormControl isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    <Stack width="100%" justify="center" align="center">
                      <Button colorScheme='blackAlpha' variant='outline' marginTop="20px" onClick={()=>checkSignInData()}>Submit</Button>
                    </Stack>
                  </FormControl>
                </TabPanel>
              </TabPanels>
            </Tabs>

          </ModalBody>
        </ModalContent>
      </Modal>
      </Fragment>
    )
  }

  const logoutHandler = () =>{
    localStorage.removeItem("jwtToken");
    props.setToken((_)=>null);
    alert("Successfully Logout");
    return;
  }

  const getLogoutButton = () =>{
    return (
      <Fragment>
      <Button onClick={logoutHandler} 
        width="100%" colorScheme="blackAlpha" variant="outline">Logout</Button>
      </Fragment>
    )
  }

  return (
    <Fragment>
      {
        props.token===null? getLoginButton():getLogoutButton()
      }
    </Fragment>
  );
}

export default SignUp;
