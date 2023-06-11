import { 
  Button, 
  Stack,
  Image,
  Text,
  IconButton,
  Input,
} from '@chakra-ui/react';

import {
  useState,
  useEffect
} from 'react';

import { 
  AttachmentIcon,
  SearchIcon
} from '@chakra-ui/icons';

import {
  Blank,
  Wrapper,
  SideBar,
  SideBarWrapper,
  Content,
  SideInfo,
  SideInfoWrapper,
  FooterWrapper,
  StyledLink
} from './style';

import SignUp from '../../component/signUp';
import GroupCard from '../../component/groupCard';
import GroupProgress from '../../component/groupProgress';
import IntroData from '../../component/introData';
import Footer from '../../component/footer';
import GroupInfo from '../../component/groupInfo';

import {
  getAllGroup
} from '../../utils/group';

import {
  userStatus
} from '../../utils/user';

function Menu() {
  const [progress, setProgress] = useState([]);
  const [group, setGroup] = useState([]);
  const [page, setPage] = useState(0);
  const [token, setToken] = useState(null);

  async function getGroups() {
    if(page===undefined || page===null) return;
    let result = await getAllGroup(page);
    console.log(result.data.data.group);
    setGroup(result.data.data.group);
    setPage(result.data.data.pages);
    return;
  }

  async function getUserStatus(jwtToken) {
    const result = await userStatus(jwtToken);
    setProgress(result.data.data.status);
    return;
  }

  useEffect(()=>{
    const jwtToken = localStorage.getItem("jwtToken");
    getGroups();
    if(!jwtToken){
      alert('Please Login First');
      setProgress([]);
      return;
    }
    setToken((_)=>jwtToken);
    getUserStatus(jwtToken);
  }, [token]);

  const getGroupCards = () => {
    return group.map((item)=>{
      return <GroupCard 
        key={item['ticket']}
        ticket={item['ticket']}
        name={item['name']}
        tag={item['tags']}
        types={item['types']}
        picLink={item['picLink']}
        memNum={item['memNum']}
        token={localStorage.getItem("jwtToken")}
      />
    })
  }

  const getGroupProgress = () => {
    return progress.map((item)=>{
      return <GroupProgress 
        key={item['ticket']}
        ticket={item['ticket']}
        name={item['name']}
        solved={item['solved']}
        total={item['total']}
      />
    })  
  }

  return (
    <div>
      <Wrapper>
        <Blank />
        <SideBar>
          <SideBarWrapper>
            <StyledLink to="/">
            <Image src='https://i.imgur.com/c4umajd.jpg' width="100%" height="100%" objectFit="contain"/>
            </StyledLink>
            <GroupInfo setGroup={setGroup} token={localStorage.getItem("jwtToken")}/>
          </SideBarWrapper>
        </SideBar>
        <Content>
          <Stack direction="column" height="100%" width="100%" align="center">
            <Stack direction="row" marginTop="20px" marginBottom="40px" height="40px" width="90%" justify="center" align="center">
              <Input 
                width="90%"
                placeholder="Search Some Group..."
                rightIcon={<AttachmentIcon boxSize="0.8em"/>}
              />
              <IconButton
                width="10%"
                height="80%"
                colorScheme='blackAlpha' icon={<SearchIcon />} size="sm" variant="outline"/>
            </Stack>
            <Stack direction="column" width="100%" align="center" overflow="auto">
            {
              getGroupCards()
            }
            </Stack>
          </Stack>
        </Content>
        <SideInfo>
          <SideInfoWrapper>
            <IntroData token={localStorage.getItem("jwtToken")}/>
            {
              getGroupProgress()
            }
            <Stack spacing={4} direction="row" align="center" justify="center" marginTop="20px">
              <SignUp token={localStorage.getItem("jwtToken")} setToken={setToken}/>
            </Stack>
          </SideInfoWrapper>
        </SideInfo>
        <Blank />
      </Wrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </div>
  );
}

export default Menu;
