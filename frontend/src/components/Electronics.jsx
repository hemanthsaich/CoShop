import React, {useEffect} from 'react'
import { Row, Col, Carousel} from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'


function Electronics() {
    const dispatch  = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    useEffect(() =>{
        dispatch(listProducts())    
    },[dispatch])
  return (
    <div>
        
        <h1>Electronics</h1>
              {loading ? <Loader /> 
              : error ? <Message variant='danger'>{error}</Message> 
              : 
                <Row>
                  {products.map(product =>
                    (product.category === 'Electronics' && (
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

export default Electronics