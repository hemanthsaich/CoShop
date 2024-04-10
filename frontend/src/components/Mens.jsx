import React, {useEffect} from 'react'
import { Row, Col, Carousel} from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'


function Mens() {
    const dispatch  = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    useEffect(() =>{
        dispatch(listProducts())    
    },[dispatch])
  return (
    <div>
        {/* <Carousel>
            <Carousel.Item>
              <Link to='/'>
                <img
                  className="d-block w-100"
                  src="/images/mens1.jpg"
                  alt="First slide"
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link to='/'>
                <img
                  className="d-block w-100"
                  src="/images/mens2.jpg"
                  alt="Second slide"
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link to='/'>
                <img
                  className="d-block w-100"
                  src="/images/mens3.jpg"
                  alt="Third slide"
                />
              </Link>
            </Carousel.Item>
        </Carousel> */}
        <h1>Mens Fashion</h1>
              {loading ? <Loader /> 
              : error ? <Message variant='danger'>{error}</Message> 
              : 
                <Row>
                  {products.map(product =>
                    (product.category === 'Mens Fashion' && (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                      </Col>
                    ))
                  )}


                </Row>
                }
    </div>
  )
}

export default Mens