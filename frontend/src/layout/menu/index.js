import { 
  Button, 
  Stack,
  Image,
  Text,
  IconButton,
  Input,
} from '@chakra-ui/react';

import {
  useState
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

function Menu() {
  const [page, setPage] = useState(1);

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
            <GroupCard type={1}/>
            <GroupCard type={2}/>
            <GroupCard />
            <GroupCard />
            <GroupCard />
            </Stack>
            <Stack spacing={4} direction="row" width="100%" align="center" justify="center">
              <Button colorScheme='blackAlpha'>Prev</Button>
              <Text Color="black">{page}</Text>
              <Button colorScheme='blackAlpha'>Next</Button>
            </Stack>
          </Stack>
        </Content>
        <SideInfo>
          <SideInfoWrapper>
            <IntroData />
            <GroupProgress />
            <Stack spacing={4} direction="row" align="center" justify="center" marginTop="20px">
              <SignUp />
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
