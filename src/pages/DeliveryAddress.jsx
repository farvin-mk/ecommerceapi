import styled from "styled-components"
import { mobile } from "../responsive";
import { useState } from "react";
import { useHistory } from "react-router";
import Announcement from "../components/Announcement";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import axios from "axios";

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
const Input2 = styled.input`
 flex:1;
min-width: 80%;
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
const FilterSize = styled.select`
flex: 1;
min-width: 80%;
margin: 20px 10px 0px 0px;
padding: 10px;
`;


const FilterSizeOption = styled.option``;

const Register = () => {
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [houseno, setHouseno] = useState("")
    const [apartmentname, setApartmentname] = useState("")
    const [streetname, setStreetname] = useState("")
    const [landmark, setLandmark] = useState("")
    const [locality, setLocality] = useState("")
    const [city, setCity] = useState("")
    const history = useHistory();
    const currentUser = useSelector((state) => state.user.currentUser);
    const token = currentUser?.accessToken;

  
    const handleClick = (e) => {
       // alert(token);
       console.log(token);
        // setdisable(true)
        e.preventDefault()
        saveAddress();
        // register({ username, email, password, name, lastName })
        // history.push("/login")
    }
    const saveAddress = async () => {
        try {
            await axios.post("http://localhost:5000/api/address", {
                userId: currentUser._id,
                customerName: name,
                mobile: mobile,
                houseNo: houseno,
                apartmentName: apartmentname,
                streetName: streetname,
                landmark: landmark,
                locality: locality,
                city: city,
            }, {
                headers: { token: `Bearer ${token}` }
            })
            history.push("/paymentprocessing")
        } catch { }
    }
    return (
        <div>
            <Announcement />
            <NavBar />
        
                   
            <Container>
                <Wrapper>
                    <Title>Delivery Details</Title>
                    <Form>
                        <Input placeholder="customer name" onChange={(e) => setName(e.target.value)} />
                        <Input placeholder="mobile no." onChange={(e) => setMobile(e.target.value)} />
                        <Input placeholder="house no." onChange={(e) => setHouseno(e.target.value)} />
                        <Input placeholder="apartment name" onChange={(e) => setApartmentname(e.target.value)} />
                        <Input2 placeholder="street name" onChange={(e) => setStreetname(e.target.value)} />
                        <Input placeholder="landmark" onChange={(e) => setLandmark(e.target.value)} />
                        <FilterSize value={"Locality"} onChange={(e) => setLocality(e.target.value)}  >
                            <FilterSizeOption >Galle</FilterSizeOption>
                            <FilterSizeOption >Galle2</FilterSizeOption>
                            <FilterSizeOption>Galle3</FilterSizeOption>
                            <FilterSizeOption >Galle4</FilterSizeOption>
                        </FilterSize>
                        <Input placeholder="city" onChange={(e) => setCity(e.target.value)} />

                        <Agreement>By creating an account, I consent to the processing of my personal
                            data in accordance with the <b>PRIVACY POLICY</b>
                        </Agreement>

                        <Button onClick={handleClick}>Add Address</Button> :
                        <Error>Password not Matching!!</Error>

                    </Form>
                  
                </Wrapper>
               
            </Container>
           
        </div>

    )
}

export default Register
