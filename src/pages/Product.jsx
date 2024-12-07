
import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components'
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethos';
import { useState, useEffect } from 'react';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import axios from 'axios';

const Container = styled.div`
background-color:#363636;
color:white;
`;

const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({ padding: "10px", flexDirection: "column" })}

`;

const ImgContainer = styled.div`
flex: 1;
`;

const Image = styled.img`
width: 100%;
heigth: 90vh;
object-fit: cover;

${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
flex: 1;
margin-left: 10px;
padding: 0px; 50px;

${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
font-weight: 200;
`;

const Desc = styled.p`
margin: 20px 0px;
`;
const Stock = styled.span`
font-weight: 100;
font-size: 20px;
`;

const Price = styled.span`
font-weight: 100;
font-size: 40px;
`;

const FilterContainer = styled.div`
width: 50%;
margin: 30px 0px;
display flex;
justify-content: space-between;

${mobile({ width: "100%" })}
`;

const Filter = styled.div`
display: flex;
align-items: center;
`;

const FilterTitle = styled.span`
font-size: 20px;
font-weight: 200;
`;

const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props => props.color};
margin: 0px 5px;
cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;


const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: space-between;

${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight: 700;

`;
const Amount = styled.span`
width: 30px;
heigth: 30px;
border-radius: 10px;
border: 1px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin 0px 5px;
`;

const Button = styled.button`
padding: 15px;
border: 2px solid teal;
background-color: white;
cursor: pointer;
font-weight: 500;

&:hover{
    background-color: #f8f4f4;
}
`;

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setquantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const token = currentUser?.accessToken;
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setProduct((res).data);
            } catch (error) {

            }
        };
        getProduct();
    }, [id]);

    const handleQty = (type) => {
        if (type === "dec") {
            quantity > 1 && setquantity(quantity - 1);
        } else {
            setquantity(quantity + 1);
        }
    };

    const handleClick = () => {
        if (size === "") {
            alert("Please Select Size");
        } else if (color === "") {
            alert("Please Select color");

        } else {
            dispatch(
                addProduct({ ...product, quantity, color, size }));
            if (currentUser != null) {
                addOrderToDb(size,color);
            }

        }

    };
    const addOrderToDb = async (size,color) => {
       
        try {
            await axios.get("http://localhost:5000/api/carts/find/" + currentUser._id + "/" + id + "/" + color + "/" + size, {
                headers: { token: `Bearer ${token}` }

            }).then(
                res => {
                  
                    if (res.data===null) {
                        axios.post("http://localhost:5000/api/carts", {
                            userId: currentUser._id,
                            productId: product._id,
                            quantity: quantity,
                            color: color,
                            size: size,
                        }, {
                            headers: { token: `Bearer ${token}` }

                        });
                    } else {
                       
                        axios.put("http://localhost:5000/api/carts/" + currentUser._id + "/" + id + "/" + size + "/" + color, {
                            quantity:res.data.quantity+quantity
                          }, {
                            headers: { token: `Bearer ${token}` }
                    
                          });
                    }
                }
            ).catch(
               
            )


        } catch (error) {
          
        }
    }
    return (

        <Container>
            <NavBar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>Rs {product.price}</Price>
                    <br/>
                    <Stock>Availabel: {product.inStock}</Stock>

                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => (
                                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                            ))}


                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize value={size} onChange={(e) => setSize(e.target.value)}  >
                                <FilterSizeOption></FilterSizeOption>
                                {product.size?.map((s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}

                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQty("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQty("inc")} />
                        </AmountContainer>
                        {
                            product.inStock>0 ? <Button onClick={handleClick}>Add to Cart</Button>:  <Button disabled={true}>Add to Cart</Button>
                        }
                       
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product
