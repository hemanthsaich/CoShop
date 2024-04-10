import React, {useEffect} from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen() {
  const { id } = useParams();
  const Location = useLocation();
  const qty = Location.search ? Number(Location.search.split('=')[1]) : 1
  
  const  dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  console.log('cartItems:', cartItems);

  useEffect(() => {
    if(id){
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = (id) =>{
    dispatch(removeFromCart(id))
  }
  const navigate = useNavigate();
  const checkoutHandler = (id) =>{
    navigate('/shipping')
  }

  return (
    
    <Row>
      
      <Col md={8}>
     
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            <Message variant='info'> Your cart is empty </Message>
            <Link to='/' className="btn btn-light my-3" style={{textDecoration: "none"}}>
                <b>Go Back</b>
            </Link>
          </div>
          
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2} >
                    <Image src={item.image} alt={item.name} fluid rounded />                  
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`} style={{textDecoration: "none"}}>{item.name}</Link>                
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={3}>
                  <Form.Control 
                      as='select'
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number( e.target.value)))}
                      >
                        {
                          Number.isInteger(item.countInStock) && item.countInStock > 0 && 
                          [...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))
                        }

                  
                      </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  
                  </Col>
                </Row>
              </ListGroup.Item>
            ))

            }
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                  <h2>Subtotal ({cartItems.reduce((acc,item) => acc + item.qty, 0)}) items</h2>
                  ${cartItems.reduce((acc,item) => acc + item.qty * item.price , 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
              <Button 
                type='button'
                className='btn-block rounded'
                disabled={cartItems.length === 0 }
                onClick={checkoutHandler}
                style={{width:'100%'}}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
            </ListGroup>
            
          </Card>
      </Col>
    </Row>
  )
}

export default CartScreen