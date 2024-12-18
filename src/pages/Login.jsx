import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)), url("https://img2.goodfon.com/wallpaper/nbig/a/29/tekstura-platya-naryad-dress.jpg") center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`;

const Wrapper = styled.div`
width:25%;
padding: 20px;
background-color: white;
${mobile({ width: "75%" })}
`;

const Form = styled.form`
display: flex;
flex-direction: column;
`;

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`;

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 0px;
padding: 10px;
`;


const Button = styled.button`
width: 40%
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
margin-bottom:10px;
&:disabled{
    color:green;
    cursor: not-allowed;
}
`;

const Link = styled.a`
margin: 5px 0px;
font-size: 12px;
text-decoration: underline;
cursor: pointer;
`;
const Error = styled.span`
color:Red;
`;

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const cart = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, { username, password },cart)
    }
    return (
        <Container>
            <Wrapper>
                <Title>Sign In</Title>
                <Form>
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                    {error && <Error>Something Went Wrong!</Error>}
                    <Link>Do not Remeber the Password?</Link>
                    <Link>Create A new Account</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
