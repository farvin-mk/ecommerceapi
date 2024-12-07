
import { useSelector } from "react-redux";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { mobile } from "../responsive";
import { useHistory } from "react-router";

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
  cursor: pointer;
  &:hover{
    opacity: 1;
}
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



const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
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


const WishList = () => {
  const history = useHistory();
  const wishlist = useSelector(state => state.wishlist);
  const quantity = useSelector(state => state.cart.quantity)
  const quantityWishlist = useSelector(state => state.wishlist.quantity)
  
  return (
    <Container>
      <NavBar />
      <Announcement />
      <Wrapper>
        <Title>Your Wishlist</Title>
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
            {wishlist.products?.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image onClick={()=>{history.push(`/product/${product._id}`)}} src={product.img} />
                  <Details>
                    <ProductName><b>Product : </b>{product.title}</ProductName>
                    <ProductId><b>ID : </b>{product._id}</ProductId>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  
                  <ProductPrice>Rs. {product.price}</ProductPrice>
                </PriceDetail>

              </Product>

            ))}<Hr />


          </Info>
          
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default WishList
