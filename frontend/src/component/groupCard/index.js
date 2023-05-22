import {  
    Stack,
    Image,
    Card, 
    CardBody,
    Text,
    IconButton,
    Tag,
    useDisclosure
} from '@chakra-ui/react';

import { 
    Fragment,
    useState
} from 'react';

import {
    AddIcon,
    LockIcon
} from '@chakra-ui/icons';

import {
    enterGroup,
} from '../../utils/group';

import AlertLog from '../alertLog';

import {
    StyledLink
} from './style';

function GroupCard(props) {
    const {groupId, picLink, name, num, type, tag} = props;
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [title, setTitle]     = useState('');
    const [content, setContent] = useState('');

    async function checkGroupEntry() {

        const jwt = '';

        let result = enterGroup({groupId: groupId}, jwt);
        
        switch(result.error) {
            case 'ALREADY_JOINED':
                setTitle('Fail to join group');
                setContent('You are already in the group');
                break;
            case 'FAIL_TO_JOIN':
                setTitle('Fail to join group');
                setContent('You are not allowed to join the group');
                break;
            default:
                setTitle('Success to join the group');
                setContent('You are added into the group');
                break;
        }
        onOpen();
        return;
    }

    function getTag() {
        let tags = ['adfs', 'adfsgd', 'dafsgd'];
        return tags.map((item)=>(<Tag variant='outline' colorScheme='blackAlpha' fontSize="5px" marginRight="3px" >{item}</Tag>))
    }

    return (
        <Fragment>
            <AlertLog isOpen={isOpen} onOpen={onOpen} onClose={onClose} title={title} content={content}/>
            <Card
                direction={{ base: 'column', sm: 'row' }} variant='outline' height="90px" width="90%"
            >
            <StyledLink to="/grouppage">
            <Image
                objectFit="cover"
                height="100%" width="100%"
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
                to="/grouppage"
            />
            </StyledLink>
            <CardBody>
                <Stack spacing={2} direction='row' align='center'>
                    <Text fontSize="15px" width="50%"><b>{name}</b></Text>
                    <Text fontSize="10px" width="45%">{num} members</Text>
                    <IconButton colorScheme='blackAlpha' variant="outline" icon={type===1? <AddIcon />:<LockIcon />} size="sm" width="5%"
                        onClick={()=>checkGroupEntry()}
                    />
                </Stack>
                <Stack direction="row" marginTop="10px">
                    {
                        getTag()
                    }
                </Stack>
            </CardBody>
        </Card>
        </Fragment>
    );
}

export default GroupCard;

