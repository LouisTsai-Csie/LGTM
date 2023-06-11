import { 
    Button, 
    Stack,
    Input,
    FormLabel,
    FormControl,
    FormHelperText,
    Textarea,
    Radio,
    RadioGroup,
    NumberInput,
    NumberInputField,
    useDisclosure,
} from '@chakra-ui/react';

import { 
    Fragment,
    useEffect,
    useState
} from "react";

import AlertLog from '../alertLog';

import {
    createGroup
} from '../../utils/group';



function GroupForm(props) {
    const [name, setName]                 = useState('');
    const [tag, setTag]                   = useState('');
    const [type, setType]                 = useState("0");
    const [maxiNum, setMaxiNum]           = useState(-1);
    const [restriction, setRestriction]   = useState(0);
    const [picLink, setPicLink]           = useState('');
    const [description, setDescription]   = useState('');
    const [title, setTitle]               = useState('');
    const [content, setContent] = useState('');

    const {isOpen, onOpen, onClose} = useDisclosure();

    

    async function checkFormData() {
        if(!name) {
            setTitle('Invalid Data Format')
            setContent('Name Not Specified.');
            onOpen();
            return;
        }
        
        const tags = tag.split(',');

        let result = await createGroup(
            name, 
            tags,
            parseInt(type), 
            maxiNum, 
            restriction, 
            picLink, 
            description, 
            props.token
        );

        if(result.detail){
            setTitle('Fail To Create Group');
            setContent('Please Try Again Later');
            return;
        }else{
            setTitle('Success To Create Group');
            setContent('Please Check Your New Group');
        }

        onOpen();



        return;
    }


    return (
        <Fragment>
            <AlertLog isOpen={isOpen} onOpen={onClose} onClose={onClose} title={title} content={content}/>
            <Stack direction="column" width="100%" align="center">
              <FormControl width="90%">
                <FormLabel marginTop="10px" width="50%">1. Group Name</FormLabel>
                <Input placeholder='Enter Group Name' width="100%" onChange={(e)=>setName(e.target.value)}/>
                
                <FormLabel marginTop="20px" width="50%">2. Group Tag</FormLabel>
                <Input placeholder='Enter Group Tag' width="100%" onChange={(e)=>setTag(e.target.value)}/>
                <FormHelperText>Please enter the group tag split by comma. ex: tag1,tag2,tag3,tag4,...</FormHelperText>
                
                <FormLabel marginTop="20px" width="50%">3. Group Restriction</FormLabel>
                <RadioGroup onChange={setType} value={type}>
                    <Stack spacing={4} direction='row'>
                        <Radio value="0">Only Those with Invitation</Radio>
                        <Radio value="1">All People Can Join</Radio>
                        <Radio value="2">Only I Can Join</Radio>
                    </Stack>
                </RadioGroup>
                <FormHelperText>Choose the way others can join the group.</FormHelperText>
                
                <FormLabel marginTop="20px" width="50%" onChange={(e)=>setMaxiNum(e.target.value)}>4. Maximum Number</FormLabel>
                <NumberInput>
                    <NumberInputField />
                </NumberInput>
                <FormHelperText>Choose the member limit of the group.</FormHelperText>

                <FormLabel marginTop="20px" width="50%" onChange={(e)=>setRestriction(e.target.value)}>5. Member Restriction</FormLabel>
                <NumberInput>
                    <NumberInputField value={restriction}/>
                </NumberInput>
                <FormHelperText>How</FormHelperText>
                
                <FormLabel marginTop="20px" width="50%" onChange={(e)=>setPicLink(e.target.value)}>6. Upload Picture</FormLabel>
                <Input placeholder='Picture Link' width="100%"/>
                <FormHelperText>Only website links are allowed.</FormHelperText>

                <FormLabel marginTop="20px" width="50%" onChange={(e)=>setDescription(e.target.value)}>7. Group Description</FormLabel>
                <Textarea placeholder='Enter some simple description' width="100%" height="150px"/>

                <Button colorTheme="white" color="gray" width="100%" height="40px" marginTop="40px" onClick={()=>checkFormData()}>Submit</Button>
              </FormControl>
            </Stack>
        </Fragment>
    );
}

export default GroupForm;