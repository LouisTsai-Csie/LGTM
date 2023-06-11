import { 
  Button, 
  Stack,
  Image,
  Card, 
  CardBody,
  Text,
  IconButton,
  Avatar,
  Code,
  Badge,
  CircularProgress,
  CardFooter,
  Input,
} from '@chakra-ui/react';

import { 
  AttachmentIcon,
  SearchIcon,
  CheckIcon
} from '@chakra-ui/icons';

import {
  Blank,
  Wrapper,
  SideBar,
  SideBarWrapper,
  Content,
  SideInfo,
  Logo,
  Divider,
  SideInfoWrapper,
  FooterWrapper,
  StyledLink
} from './style';



import GroupProgress from '../../component/groupProgress';
import IntroData from '../../component/introData';
import Footer from '../../component/footer';
import GroupInfo from '../../component/groupInfo';
import MemberData from '../../component/memberData';
import GroupData from '../../component/groupData';
import { useEffect, useState } from 'react';

import {
  userStatus
} from '../../utils/user';
import { 
  getGroupInfo,
  getGroupStatus,
  getMyGroup
} from '../../utils/group';

import { useNavigate } from 'react-router-dom';

function GroupPage() {
  const [ticket, setTicket] = useState('');
  const [progress, setProgress] = useState([]);
  const [name, setName] = useState('');
  const [restriction, setRestriction] = useState(0);
  const [memNum, setMemNum] = useState(0);
  const [description, setDescription] = useState('');
  const [member, setMember] = useState([]);

  const navigate = useNavigate();
  
  async function getUserStatus(jwtToken) {
    const result = await userStatus(jwtToken);
    if(result.detail) {
      return;
    }
    setProgress(result.data.data.status);
    return;
  }

  async function getGroupInfoByTicket(t) {

    const result = await getGroupInfo({ticket: t});
    setName((_)=>result.data.data.name);
    setRestriction((_)=>result.data.data.restriction);
    setMemNum((_)=>result.data.data.memNum);
    setDescription((_)=>result.data.data.description);
  }

  async function getMemberDataByTicket(t) {
    const result = await getGroupStatus({ticket: t});
    setMember(result.data.data.status);
    return;
  }

  async function checkGroup(jwtToken, g) {
    const result = await getMyGroup(jwtToken);
    const groupList = result.data.data.group;
    const ticketList = [];
    
    for(let i=0;i<groupList.length;i++) ticketList.push(groupList[i]['ticket'])

    console.log(ticketList, g)
    
    if(!ticketList.includes(g)){
      console.log(ticketList)
      alert("Sorry It Is Not Your Group");
      navigate('/');
      return;
    }


    getUserStatus(localStorage.getItem("jwtToken"));
    getGroupInfoByTicket(g);
    getMemberDataByTicket(g);
    return;
  }

  useEffect(()=>{
    const searchParams = new URLSearchParams(window.location.search);
    const group = searchParams.get("group");
    setTicket((_)=>group);
    checkGroup(localStorage.getItem("jwtToken"), group)
  }, [ticket])

  const getGroupProgress = () => {
    return progress.map((item)=>{
      return <GroupProgress 
        key={item['ticket']}
        ticket={item['ticket']}
        name={item['name']}
        solved={item['solved']}
        total={item['total']}
        setTicket={setTicket}
      />
    })  
  }

  const getMemberData = () => {
    return member.map((item, index)=>{
      return <MemberData
        key={item['ticket']}
        rank={index+1}
        name={item['name']}
        solved={item['solved']}
        totalSolved={item['totalSolved']}
        totalMissed={item['totalMissed']}
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
            <GroupData 
              name={name} restriction={restriction} 
              memNum={memNum} description={description} 
              ticket={ticket} token={localStorage.getItem("jwtToken")}
            />
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

            <Stack width="90%">
              <Card direction="row" variant='outline' width="100%" align="center">
                {/*<Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' marginLeft="10px" size="sm"/>*/}
                <CardBody>
                    <Stack spacing={10} direction='row' align='center' width="100%">
                      <Text size="sm" width="60px"><b>Name</b></Text>
                      <Text size="sm" width="60px"><b>Rank</b></Text>
                      <Text size="sm" width="60px"><b>#Sol</b></Text>
                      <Text size="sm" width="60px"><b>#Miss</b></Text>
                      <Text size="sm" width="60px"><b>#Daily</b></Text>
                      {/*<CheckIcon width="60px" size="sm"/>*/}
                    </Stack>
                </CardBody>
              </Card>
                {
                  getMemberData()
                }
            </Stack>

            </Stack>
            <Stack spacing={4} direction="row" width="100%" align="center" justify="center" float="bottom">
            </Stack>
          </Stack>
        </Content>
        <SideInfo>
          <SideInfoWrapper>
            <IntroData token={localStorage.getItem("jwtToken")}/>
            {
              getGroupProgress()
            }
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

export default GroupPage;
