import React,{useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    if(!shippingAddress.address){
        navigate('/shipping')
        
    }
const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
}

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
            <Form.Group style={{ marginBottom: '30px' }}>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                        
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)} 
                    >
                    </Form.Check>               
                </Col>
            </Form.Group>
            <Button 
            className='rounded'
            type='submit' 
            variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen