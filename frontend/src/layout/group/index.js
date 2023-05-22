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

function GroupPage() {
  return (
    <div>
      <Wrapper>
        <Blank />
        <SideBar>
          <SideBarWrapper>
            <StyledLink to="/">
            <Image src='https://bit.ly/dan-abramov' width="100%" height="100%" objectFit="cover"/>
            </StyledLink>
            <GroupData />
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
                colorScheme='blackAlpha' icon={<SearchIcon />} size="sm"/>
            </Stack>
            <Stack direction="column" width="100%" align="center" overflow="auto">

            <Stack width="90%">
              <Card direction="row" variant='outline' width="100%" align="center">
                <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' marginLeft="10px" size="sm"/>
                <CardBody>
                    <Stack spacing={10} direction='row' align='center' width="100%">
                      <Text size="sm" width="60px"><b>Name</b></Text>
                      <Text size="sm" width="60px"><b>Rank</b></Text>
                      <Text size="sm" width="60px"><b>#Sol</b></Text>
                      <Text size="sm" width="60px"><b>#Miss</b></Text>
                      <Text size="sm" width="60px"><b>#Daily</b></Text>
                      <CheckIcon width="60px" size="sm"/>
                    </Stack>
                </CardBody>
              </Card>

              <MemberData />
              <MemberData />

            </Stack>

            </Stack>
            <Stack spacing={4} direction="row" width="100%" align="center" justify="center" float="bottom">
              <Button colorScheme='blackAlpha'>Prev</Button>
              <Text Color="black">5</Text>
              <Button colorScheme='blackAlpha'>Next</Button>
            </Stack>
          </Stack>
        </Content>
        <SideInfo>
          <SideInfoWrapper>
            <IntroData />
            <GroupProgress />
            <GroupProgress />
            <GroupProgress />
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
