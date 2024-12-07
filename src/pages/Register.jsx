import styled from "styled-components"
import { mobile } from "../responsive";
import { useState } from "react";
import { register } from "../redux/apiCalls";
import { useHistory } from "react-router";
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
width:40%;
padding: 20px;
background-color: white;
${mobile({ width: "75%" })}
`;

const Form = styled.form`
display: flex;
flex-wrap: wrap;
`;

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`;

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`;

const Agreement = styled.span`
font-size: 12px;
margin: 20px 0px;
`;

const Button = styled.button`
width: 40%
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
`;
const Error = styled.span`
color:Red;
`;
const Register = () => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [disable,setdisable] =useState(false)
    const history = useHistory();
    const handleClick = (e) => {
        setdisable(true)
        e.preventDefault()
        register({ username,email, password,name,lastName })
        history.push("/login")
    }
    return (
        <Container>
            <Wrapper>
                <Title>Create an Account</Title>
                <Form>
                    <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
                    <Input placeholder="last name" onChange={(e) => setLastName(e.target.value)} />
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Input placeholder="confirm password" type="password" onChange={(e) => setconfirmPassword(e.target.value)} />
                    <Agreement>By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    {password===confirmPassword ?
                     <Button  onClick={handleClick} disabled={disable}>CREATE</Button>:
                     <Error>Password not Matching!!</Error>
                }
                   
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
