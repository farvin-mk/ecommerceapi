import { Facebook, Instagram, MailOutlined, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import styled from "styled-components"
import { mobile } from "../responsive";

const Container =styled.div`
display: flex;
background-color:#828282;
color:white;
${mobile({flexDirection:"column"})}
`;
const Left =styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 20px;
`;
const Logo=styled.h1``;
const Desc=styled.p`
margin: 20px 0px;
`;
const SocialContainer=styled.div`
display: flex;
`;
const SocilaIcon=styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
color: white;
background-color: #${props=>props.color};
display: flex;
align-items: center;
justify-content: center;
margin-right: 20px;
`;

const Center =styled.div`
flex: 1;
padding: 20px;

${mobile({display:"none"})}
`;
const Title=styled.h3`
margin-bottom: 30px;
`;
const List=styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
flex-wrap: wrap;

`;
const ListItem=styled.li`
width: 50%;
margin-bottom: 10px;
`;

const Right =styled.div`
flex: 1;
padding: 20px;
${mobile({backgroundColor:"#eee"})}
`;

const ContactItem=styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;

`;
const Payment =styled.img`
width: 50%;

`;
const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Mooi.</Logo>
                <Desc>Welcome to the store</Desc>
                <SocialContainer>
                    <SocilaIcon color="3B5999">
                        <Facebook/>
                    </SocilaIcon>
                    <SocilaIcon color="E4405F">
                        <Instagram/>
                    </SocilaIcon>
                    <SocilaIcon color="55ACEE">
                        <Twitter/>
                    </SocilaIcon>
                    <SocilaIcon color="E60023">
                        <Pinterest/>
                    </SocilaIcon>
                </SocialContainer>
           </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Wishlist Tracking</ListItem>
                    <ListItem>Terms and Conditions</ListItem>
                </List>

            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem><Room style={{marginRight:"10px"}}/> Colombo , Sri Lanka 80000</ContactItem>
                <ContactItem><Phone style={{marginRight:"10px"}}/> +94 775656555</ContactItem>
                <ContactItem><MailOutlined style={{marginRight:"10px"}}/> contactfa-rotate-270.com</ContactItem>
                <Payment src=""/>
            </Right>
        </Container>
    )
}

export default Footer
