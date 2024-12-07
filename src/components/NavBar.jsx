import { Badge } from '@material-ui/core';
import { FavoriteBorderRounded, Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive"
import { mobile2 } from "../responsive"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { logout } from '../redux/userRedux';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router';
import { clearCart } from '../redux/cartRedux';
import { clearWishlist } from '../redux/wishlistRedux';

const Container = styled.div`
height: 60px;
background-color:#363636;
color:white;
${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
padding: 10px 20px;
display: flex;
justify-content:space-between;
align-items: center;
${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
flex:1;
display: flex;
align-items: center;
`;

const Languagr = styled.span`
font-size: 14px;
color:white;
cursor: pointer;
${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
border: 1px solid #363636;
display: flex;
align-items: center;
margin-left:25px;
padding: 5px;
`;

const Input = styled.input`
border: none;
background-color:#363636;
color:white;
${mobile({ width: "50px" })}
`;
const Center = styled.div`
flex:1;
text-align: center;
`;

const Logo = styled.h1`
font-weight:bold;
cursor: pointer;
color: white;
${mobile({ fontSize: "25px",marginLeft: "60px"  })}
`;
const Right = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;

${mobile({ flex: 2, justifyContent: "center" ,display: "none"})}
${mobile2({ flex: 2, justifyContent: "center" ,fontSize: "8px"})}
`;
const Right2 = styled.div`
flex:1;
display: none;
align-items: center;
justify-content: flex-end;

${mobile({ flex: 2, justifyContent: "center" ,display: "flex"})}
`;
const MenuItem = styled.div`
font-size: 14px;
cursor:pointer;
margin-left: 25px;
color: white;
margin-right: 10px;
${mobile({ fontSize: "8px", marginLeft: "2px" })}
`;
const NavBar = () => {
    const user = useSelector((state) => state.user.currentUser);
    const quantity = useSelector(state => state.cart.quantity)
    const wishlistquantity = useSelector(state => state.wishlist.quantity)
    const dispatch = useDispatch();
    const history= useHistory();
    const handleClick = () => {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearWishlist());
    }
    const handleClickLog = () => {
        history.push("/login");
    }
    const handleClickReg = () => {
        history.push("/register");
    }
    const handleClickHome = () => {
        history.push("/");
    }

    return (
        <Container>
            <Wrapper>
                <Left><Languagr>EN</Languagr>
                    <SearchContainer>
                        <Input placeholder="search" />
                        <Search style={{ color: "white", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center><Logo onClick={handleClickHome}>Mooi.</Logo></Center>
                <Right>
                    {user ?<MenuItem style={{ pointerEvents: 'none' }}>Register</MenuItem> : <MenuItem onClick={handleClickReg}>Register</MenuItem>}
                    {user ? <MenuItem onClick={handleClick}>Sign Out</MenuItem> : <MenuItem onClick={handleClickLog}>Sign In</MenuItem>}
                    {/* <MenuItem>Sign In</MenuItem> */}
                   
                        <MenuItem>
                        <Link to="/cart">
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined style={{ color: "white",width:"15"}}/>
                            </Badge>
                            </Link>
                            </MenuItem>
                            <MenuItem>
                            <Link to="/wishlist">
                            <Badge badgeContent={wishlistquantity} color="primary">
                                <FavoriteBorderRounded style={{ color: "white" ,width:"15"}} />
                            </Badge>
                            </Link>
                        </MenuItem>
                       
                   
                </Right>
                <Right2>
                   
                        <MenuItem>
                        <Link to="/cart">
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined style={{ color: "white",width:"15"}}/>
                            </Badge>
                            </Link>
                            </MenuItem>
                            <MenuItem>
                            <Link to="/wishlist">
                            <Badge badgeContent={wishlistquantity} color="primary">
                                <FavoriteBorderRounded style={{ color: "white" ,width:"15"}} />
                            </Badge>
                            </Link>
                        </MenuItem>
                       
                   
                </Right2>
            </Wrapper>

        </Container>
    )
}

export default NavBar
