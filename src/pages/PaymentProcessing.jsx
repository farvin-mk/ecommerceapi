import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import PaymentModal from "../PaymentModal/PaymentModal";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import axios from "axios";
const Container = styled.div`
background-color:#363636;
color:white;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Dropdown = styled.div`
     position: relative;
    margin-right:10px;
`;
const DropdownButton = styled.button`
padding: 12px 8px !important;
background-color:#ffff;
border: 0.5px solid lightgray;
  border-radius: 10px;
  font-weight: 200;
  font-color: black;
display: flex;
justify-content: space-between;
// width:300px;y
width: 100%;
${mobile({ width: "100%" })}
`;
const DropdownItem = styled.div`

padding:10px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const DropdownMenu = styled.div`
//   transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
position: relative;
background-color:#ffff;
border: 0.5px solid lightgray;
  border-radius: 2px;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  ${mobile({ width: "100%" })}
  // z-index: 2;
  
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
  transform: translateY(-1px);
  ${mobile({ marginBottom: "20px" })}
`;
const RadioB = styled.input`

margin-bottom: .5rem;
`;
const RadioN = styled.label`
margin-left:10px;
margin-bottom: .5rem;

`;
const Cart = () => {
  const cart = useSelector(state => state.cart);
  const quantity = useSelector(state => state.cart.quantity)
  const quantityWishlist = useSelector(state => state.wishlist.quantity)
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.accessToken;
  const [dropdown, setDropdown] = useState(false)
  const [address, setAddress] = useState([])
  const [currentAddress, setCurrentAddress] = useState(null)
  const history = useHistory();
  const handleButtonClick = () => {
    setDropdown(!dropdown);
  };
  useEffect(() => {
    const getAddress = async () => {

      try {
        await axios.get("http://localhost:5000/api/address/find/" + currentUser._id, {
          headers: { token: `Bearer ${token}` }

        }).then(res => {
          setAddress(res.data);

        })
      } catch (error) {

      }
    };
    getAddress();
  }, [currentUser, token, setAddress]);

  return (

    <Container>
      <NavBar />
      <Announcement />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <TopButton>Continue Shopping</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({quantity})</TopText>
            <TopText>Your Wishlist ({quantityWishlist})</TopText>
          </TopTexts>
          <TopButton type="filled">Checkout Now</TopButton>
        </Top>
        <Bottom>
          <Info>

            <Dropdown>
              <DropdownButton onClick={handleButtonClick}>Delivery Address {dropdown ? <ArrowUpward /> : <ArrowDownward />} </DropdownButton>
              {dropdown && (
                <DropdownMenu>
                  <DropdownItem>
                    <TopButton type="filled" onClick={(e) => history.push("/deliveryaddress")}>Add New Address</TopButton>
                  </DropdownItem>
                  {address.map((m) => (
                    <DropdownItem key={m.houseNo}>
                      <RadioB onClick={() => setCurrentAddress(m)} type="radio" name="address" value={m.houseNo + m.apartmentName + m.streetName + m.locality + m.city} />
                      <RadioN>{m.customerName} <br />{m.houseNo + " " + m.apartmentName + " " + m.streetName + " " + m.locality + "" + m.city}<br />{"Land Mark:" + m.landmark}<br />{"Mobile:" + m.mobile}</RadioN>

                    </DropdownItem>

                  ))}

                </DropdownMenu>
              )}
            </Dropdown>


          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. 200</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs. 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText >Total</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>

            <PaymentModal orderId={cart._id}
              name="Order"
              amount={cart.total}
              currentAddress={currentAddress}
            >
            </PaymentModal>


          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
