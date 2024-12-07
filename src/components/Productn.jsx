import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { addProductWish } from "../redux/wishlistRedux";
import { useSelector } from "react-redux";
import axios from "axios";
const Info = styled.div`
opacity: 0;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: rgba(0,0,0,0.2);
z-index: 3;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.5s ease;
cursor: pointer;
`;
const Container = styled.div`
flex: 1;
margin: 5px;
min-width: 280px;
height: 350px;
display: flex;
align-items: center;
justify-content: center;
background-color:#363636;
position: relative;

&:hover ${Info}{
    opacity: 1;
}
`;

const Circle = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
background-color: #f5fbfd;
position: absolute;
`;
const Image = styled.img`
height: 75%;

z-index: 2;
`;

const Icon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;

background-color: white;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
transition: all 0.5s ease;
&:hover{
    background-color: #e9f5f5;
    transform: scale(1.1);
}
`;
const Productn = ({ item }) => {
    const product = useSelector(state => state.wishlist);
    const currentUser = useSelector((state) => state.user.currentUser);
    const token = currentUser?.accessToken;
    const dispatch = useDispatch();
    const handleClick = () => {
        alert("butoon")
        dispatch(
            addProductWish(item))
        const pr = product.products.findIndex(p => p._id === item._id);

        if (pr === -1) {
            if (currentUser !== null) {
                addWishToDb();
            }

        }

    }
    const addWishToDb = async () => {
        try {
            await axios.post("http://localhost:5000/api/wishlist", { userId: currentUser._id,
            productId: item._id,}, {
                headers: { token: `Bearer ${token}` }

            });


        } catch (error) {
            alert(error)
        }
    }
    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined />
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlined />
                    </Link>
                </Icon>
                <Icon onClick={handleClick}>

                    <FavoriteBorderOutlined />

                </Icon>
            </Info>
        </Container>
    )
}

export default Productn

