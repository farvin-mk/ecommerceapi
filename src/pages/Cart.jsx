import { Add, Delete, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { mobile } from "../responsive";
import { deleteProduct, updateProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { userRequest } from "../requestMethos";
import { useRef } from 'react';
import axios from "axios";
import { useHistory } from 'react-router';
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
  color:white;
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

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  ${mobile({ width: "100px" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span`
${mobile({ fontSize: "12px" })}
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
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
const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;



const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const quantity = useSelector(state => state.cart.quantity)
  const quantityWishlist = useSelector(state => state.wishlist.quantity)
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.accessToken;
  const qty = useRef(null);
  const history = useHistory();
  const loginPush = () => {
    history.push("/login")
  }
  const checkoutPush = () => {
    history.push("/paymentprocessing")
  }
  const handleQty = (type, id, color, size) => {
    if (type === "inc") {
      qty.current = parseInt(document.getElementById(id + color + size).innerText) + 1
    } else if((type === "dec")) {
      
if(parseInt(document.getElementById(id + color + size).innerText)-1===0){
  console.log("aaa");
  currentUser ? deleteCartItem(currentUser._id,id,color,size) : del(id,color,size);
}else{
  qty.current = parseInt(document.getElementById(id + color + size).innerText) - 1
}
     
    }
    if (currentUser !== null) {
      updateOrder(currentUser._id, id, color, size);
    }
    dispatch(
      updateProduct({ type, id, color, size }));
  };
  const deleteCartItem = async (currentUser, id, color, size) => {
    try {

      await userRequest.delete("/carts/" + currentUser + "/" + id + "/" + size + "/" + color);

      dispatch(
        deleteProduct({ id, color, size }));
    } catch (error) {

    }
  }
  const del = (id, color, size) => {
    dispatch(
      deleteProduct({ id, color, size }));
  }
  const updateOrder = async (currentUser, id, color, size) => {


    try {
      await axios.put("http://localhost:5000/api/carts/" + currentUser + "/" + id + "/" + size + "/" + color, {
        quantity: qty.current
      }, {
        headers: { token: `Bearer ${token}` }

      });


    } catch (error) {
      alert(error)
    }
  }
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
            {cart.products?.map((product) => (
              <Product key={product._id + product.color + product.size}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName><b>Product : </b>{product.title}</ProductName>
                    <ProductId><b>ID : </b>{product._id}</ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize ><b>Size : </b>{product.size}</ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={() => handleQty('inc', product._id, product.color, product.size, product.price)} />
                    <ProductAmount id={product._id + product.color + product.size}>{product.quantity} </ProductAmount>
                    <Remove onClick={() => handleQty('dec', product._id, product.color, product.size, product.price)} />
                  </ProductAmountContainer>
                  <ProductPrice>Rs. {product.price * product.quantity}</ProductPrice>
                  <Delete onClick={() =>currentUser ? deleteCartItem(currentUser._id, product._id, product.color, product.size) : del(product._id, product.color, product.size)} />
                </PriceDetail>

              </Product>

            ))}<Hr />


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
            {currentUser !== null ?
            cart.total !==0 ?  <SummaryButton onClick={checkoutPush}>Checkout Now</SummaryButton> :
              <SummaryButton>Checkout Now</SummaryButton> :
              cart.total !==0 ?  <SummaryButton onClick={loginPush}>Checkout Now</SummaryButton> :
              <SummaryButton>Checkout Now</SummaryButton>
             
            }
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
