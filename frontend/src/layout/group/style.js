import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Blank = styled.div`
    width: 5%;
    height: 100%;
`

export const Wrapper = styled.div`
    width: 100vw;
    height: 95vh; 
    display: flex;
    justify-content: center;
    align-items: center;  
`

export const FooterWrapper = styled.div`
    width: 100vw;
    height: 5vh;
    display: flex;
`

export const SideBar = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
`

export const SideBarWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`


export const Logo = styled.div`
    background-color: red;
    width: 240px;
    height: 60px;
    margin-top: 10px;
    margin-bottom: 40px;
`

export const Divider = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: black;
    width: 100%;
    height: 1px;
    opacity: 20%;
`


export const Content = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
`


export const SideInfo = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
`

export const SideInfoWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const StyledLink = styled(Link)`
  width: 15%;
  margin-top: 10px; 
  width: 100%; 
  height: 60px;
  margin-bottom: 40px;
`;