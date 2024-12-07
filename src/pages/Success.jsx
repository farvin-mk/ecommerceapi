import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethos";
import { useDispatch } from "react-redux";
import { clearCart } from '../redux/cartRedux';
const Success = () => {
  const location = useLocation();

  const cart = location.state.products;
  const address = location.state.address;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {

    const createOrder = async () => {

      try {

        const res = await userRequest.post("/orders", {
          userId: currentUser._id,

          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: address.customerName + " " + address.houseNo + " " + address.apartmentName + " " + address.streetName + " " + address.locality + " " + address.city + " Land Mark:" + address.landmark + " Mobile:" + address.mobile,
          status: "Completed",
        });
        cart.products.map( (item) => (

           userRequest.put("/products/" + item._id, {
            inStock: -item.quantity
          }).then((res) => (
            console.log(res)
          ))
        ));

        cart.products.map((item) => (

          userRequest.delete("/carts/" + item._id)
        ));
        setOrderId(res.data._id);
      } catch (error) {
        alert(error)
      }
      dispatch(clearCart());
    };
    createOrder();
  }, [cart, address, currentUser, dispatch]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
};

export default Success;