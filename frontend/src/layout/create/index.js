import { 
  Button, 
  Stack,
  Image,
  Card, 
  CardBody,
  Text,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  IconButton,
  Avatar,
  Code,
  Badge,
  CircularProgress,
  CardFooter,
  Input,
  FormLabel,
  FormControl
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

import GroupForm from '../../component/groupForm';
import GroupProgress from '../../component/groupProgress';
import IntroData from '../../component/introData';
import Footer from '../../component/footer';
import GroupInfo from '../../component/groupInfo';
import { FooterWrapper } from './style';
  
  
  function CreateGroup() {
    return (
      <div>
        <Wrapper>
          <Blank />
          <SideBar>
            <SideBarWrapper>
              <StyledLink to="/">
              <Image src='https://bit.ly/dan-abramov' width="100%" height="100%" objectFit="cover"/>
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
                  colorScheme='blackAlpha' icon={<SearchIcon />} size="sm"/>
              </Stack>
            <Stack overflow="auto" width="100%">
              <GroupForm />
            </Stack>
            </Stack>
          </Content>
          <SideInfo>
            <SideInfoWrapper>
              <IntroData />
              <Stack spacing={4} direction='column' align='center' marginTop="20px">
                <GroupProgress />
                <GroupProgress />
                <GroupProgress />  
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
  