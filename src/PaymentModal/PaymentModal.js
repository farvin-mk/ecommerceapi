import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { useSelector } from "react-redux";

const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const PaymentModal = ({ orderId, name, amount,currentAddress }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const history= useHistory();
  const loginPush =()=>{

    history.push("/login")
  }
  
  // Put the payment variables here
  var payment = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: '1213387', // Replace your Merchant ID
    return_url: 'http://sample.com/return',
    cancel_url: 'http://sample.com/cancel',
    notify_url: 'http://sample.com/notify',
    order_id: orderId,
    items: name,
    amount: amount, 
    currency: 'LKR',
    first_name: 'Saman',
    last_name: 'Perera',
    email: '',
    phone: '',
    address: 'No.1, Galle Road',
    city: 'Colombo',
    country: 'Sri Lanka',
    delivery_address: 'No. 46, Galle road, Kalutara South', // optional field
    delivery_city: 'Kalutara', // optional field
    delivery_country: 'Sri Lanka', // optional field
    custom_1: '', // optional field
    custom_2: '', // optional field
  };
    
  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(orderId) {
    history.push("/success", {
      products:cart, address:currentAddress});
   
    //Note: validate the payment and show success or failure page to the customer
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:"  + error);
  };

  function pay(){
    currentAddress!==null?
    window.payhere.startPayment(payment):alert("please select the Address");
  }

  return  user!== null ? <SummaryButton onClick={pay}>Checkout Now</SummaryButton>:<SummaryButton onClick={loginPush}>Checkout Now</SummaryButton>;
};

export default PaymentModal;