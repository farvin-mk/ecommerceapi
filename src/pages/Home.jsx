import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import NavBar from '../components/NavBar'
import Categories from '../components/Categories'
import Productns from '../components/Productns'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { publicRequest } from "../requestMethos";
import { addProduct, clearCart } from '../redux/cartRedux'
import axios from "axios";
import { addProductWish, clearWishlist } from '../redux/wishlistRedux'
const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.accessToken;
  const [product, setProduct] = useState([]);
  const [productWish, setProductWish] = useState([]);
  const dispatch = useDispatch();


  useEffect(() => {
    if (currentUser !== null) {
      const getCartProduct = async () => {
        try {
        const r= await  axios.get("http://localhost:5000/api/carts/find/" + currentUser._id, {
            headers: { token: `Bearer ${token}` }
          });
          
          setProduct(r.data);
        } catch (error) { }
      };
      const getWishllistProduct = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/wishlist/find/" + currentUser._id, {
            headers: { token: `Bearer ${token}` }
          })

          setProductWish(res.data);
          
        } catch (error) { }
      };
      

      getCartProduct(); getWishllistProduct();
    }
  }, [currentUser, setProduct, setProductWish, token]);

  useEffect(() => {
    if (currentUser !== null) {
    const getCartProducts = async () => {
      dispatch(
        clearCart()
      );
      
      product.map((p) => (
       
        publicRequest.get("/products/find/" + p.productId).then(res => {
          var quantity = p.quantity
          var color = p.color
          var size = p.size
          dispatch(
            addProduct({ ...res.data, quantity, color, size })
          )


        })

      ));

    };
    const getWishlistProducts = async () => {
      dispatch(
        clearWishlist()
      );
      productWish.map((p) => (
        publicRequest.get("/products/find/" + p.productId).then(res => {
          dispatch(
            addProductWish({ ...res.data })
          )

        })

      ));
    };
    getCartProducts(); getWishlistProducts();
  }
  }, [product, productWish, dispatch,currentUser]);

  return (

    <div>
      <Announcement />
      <NavBar />
      <Slider />
      <Categories />
      <Productns />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home
