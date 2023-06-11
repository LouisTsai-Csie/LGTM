import {  
  Stack,
  Image,
  IconButton,
  Input,
} from '@chakra-ui/react';
  
import { 
  AttachmentIcon,
  SearchIcon
} from '@chakra-ui/icons'

import {
  Blank,
  Wrapper,
  SideBar,
  SideBarWrapper,
  Content,
  SideInfo,
  SideInfoWrapper,
  StyledLink
} from './style';

import {
  useState, useEffect
} from 'react';

import GroupForm from '../../component/groupForm';
import GroupProgress from '../../component/groupProgress';
import IntroData from '../../component/introData';
import Footer from '../../component/footer';
import GroupInfo from '../../component/groupInfo';
import { FooterWrapper } from './style';

  
function CreateGroup() {
  const [token, setToken] = useState(null);

  useEffect(()=>{
    const jwtToken = localStorage.getItem("jwtToken");
    setToken((_)=>jwtToken);
  }, [token]);


  return (
    <div>
      <Wrapper>
        <Blank />
        <SideBar>
          <SideBarWrapper>
            <StyledLink to="/">
            <Image src='https://i.imgur.com/c4umajd.jpg' width="100%" height="100%" objectFit="contain"/>
            </StyledLink>
            <GroupInfo />
          </SideBarWrapper>
        </SideBar>
        <Content>
          <Stack direction="column" width="100%" height="100%" align="center">
            <Stack
              width="100%" 
              direction="row" marginTop="20px" marginBottom="40px" height="40px" width="90%" justify="center" align="center">
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
          <Stack overflow="auto" width="100%">
            <GroupForm token={localStorage.getItem("jwtToken")}/>
          </Stack>
          </Stack>
        </Content>
        <SideInfo>
          <SideInfoWrapper>
            <IntroData token={localStorage.getItem("jwtToken")}/>
            <Stack spacing={4} direction='column' align='center' marginTop="20px">
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

export default CreateGroup;
