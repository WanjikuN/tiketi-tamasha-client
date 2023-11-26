import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate} from "react-router-dom"
import Axios from 'axios';


const CheckoutContainer = styled.div`
  padding: 40px;
`;

const CheckoutForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #be372862;
  border: 1px solid #be372824;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #be372824;
    font-size: 18px;
  }
`;
const SuccessMsg = styled.p`
  color: #be372862;
  font-weight: 1000;
`;

function Checkout() {
  const[order, setOrder] = useState({
    name: "",
    email: "",
    paymentMethod: "",
    paymentDetails:"",
    orderId: "",
  });
  function handleChange(e) {
    e.preventDefault();
    const { id, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [id]: value,
    }));
  }
 
  const [showSuccessMsg, setShowSuccessMessage] = useState(false);
 
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const res = await Axios.get(`http://localhost:5000/lnmo?amount=1&phone=${order.paymentDetails}`);
      console.log(res);
  
      if (res.status === 200) {
        console.log("STK push initiated successfully");
        setShowSuccessMessage(true);
  
        // Clear the form
        setOrder({
          name: "",
          email: "",
          paymentMethod: "",
          paymentDetails: "",
          orderId: "",
        });
      } else {
        console.error("Failed to initiate STK push");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
      navigate(-1);
    };
    
  return (
    <>
     <p id="back" onClick={handleGoBack} style={{fontSize:"30px",position:"absolute", marginLeft:"40px",marginTop:"40px",color:"black"}}>←<span style={{fontSize:"30px"}}>Back</span></p>
    <CheckoutContainer>
      
      <CheckoutForm onSubmit={handleSubmit}>
        <input type="hidden" value={order.orderId}/>
         <FormField>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            value={order.name}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            value={order.email}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="paymentMethod">Payment Method:</Label>
          <Select
            id="paymentMethod"
            value={order.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="mpesa">M-Pesa</option>
            <option value="mastercard">Mastercard</option>
            
          </Select>
        </FormField>
      
        {order.paymentMethod === "mpesa" && (
          <FormField>
            <Label htmlFor="mpesaNumber">M-Pesa Number:</Label>
            <Input
              type="text"
              id="paymentDetails"
              value={order.paymentDetails}
              onChange={handleChange}
              required
            />
          </FormField>
        )}
        {order.paymentMethod === "mastercard" && (
          <FormField>
            <Label htmlFor="cardNumber">Card Number:</Label>
            <Input
              type="text"
              id="paymentDetails"
              value={order.paymentDetails}
              onChange={handleChange}
              required
            />
          </FormField>
        )}
        
        <SubmitButton type="submit" >GET TICKET</SubmitButton>
      </CheckoutForm>
      {showSuccessMsg && (
          <SuccessMsg>
            Check your phone for M-PESA payment
          </SuccessMsg>
        )}
    </CheckoutContainer>
    </>
  );
}

export default Checkout;