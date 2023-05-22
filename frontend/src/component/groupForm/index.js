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
    useState
} from "react";

import AlertLog from '../alertLog';

import {
    createGroup
} from '../../utils/group';

function GroupForm() {
    const [name, setName]                 = useState('');
    const [tag, setTag]                   = useState('');
    const [type, setType]                 = useState(1);
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

        console.log(tag.split(','));
        const jwt = '';

        let result = createGroup({
            name: name, 
            tag: tag.split(','), 
            type: type, 
            maxiNum: maxiNum, 
            restriction: restriction, 
            picLink: picLink, 
            description: description
        }, jwt);

        switch(result.error) {
            case 'FAIL_CREATING_GROUP':
                setTitle('Fail to create group');
                setContent('Please try again later');
                break;
            default:
                setTitle('Success to create group');
                setContent('Please check your new group');
                break;
        }
        onOpen();
        return;
    }

    return (
        <Fragment>
            <AlertLog isOpen={isOpen} onOpen={onOpen} onClose={onClose} title={title} content={content}/>
            <Stack direction="column" width="100%" align="center">
              <FormControl isRequired width="90%">
                <FormLabel marginTop="10px" width="50%">1. Group Name</FormLabel>
                <Input placeholder='Enter Group Name' width="100%" onChange={(e)=>setName(e.target.value)}/>
                
                <FormLabel marginTop="20px" width="50%">2. Group Tag</FormLabel>
                <Input placeholder='Enter Group Tag' width="100%" onChange={(e)=>setTag(e.target.value)}/>
                <FormHelperText>Please enter the group tag split by comma. ex: tag1,tag2,tag3,tag4,...</FormHelperText>
                
                <FormLabel marginTop="20px" width="50%">3. Group Restriction</FormLabel>
                <RadioGroup onChange={(e)=>setType('')} value={type}>
                    <Stack spacing={4} direction='row'>
                        <Radio value={1}>All People Can Join</Radio>
                        <Radio value={2}>Only Those with Invitation</Radio>
                        <Radio value={3}>Only I Can Join</Radio>
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