import React, {useState,useEffect} from 'react'
import { Row, Col, Carousel} from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
import Mens from '../components/Mens';
import Womens from '../components/Womens';
import Electronics from '../components/Electronics';
import Footwear from '../components/Footwear';
import  Fashion  from '../Banners/First.svg'
import  Electronic  from '../Banners/Electronics.svg'
import  Shoes  from '../Banners/Shoes.svg'
import  Summer  from '../Banners/SummerSale.svg'


function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { error, loading, products, page, pages } = productList;

    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const keyword = searchParams.get('keyword') || '';
        setSearchKeyword(keyword);
        dispatch(listProducts(keyword));
    }, [dispatch, searchParams]);

    const sortedProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const latestProducts = sortedProducts.slice(0, 4);
  return (
    <div>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Row>
              <Carousel style={{ maxWidth: '100%', maxHeight: '400px' }}>
                
                <Carousel.Item>
                  <img
                    className='d-block w-100 rounded'
                    // src='https://res.cloudinary.com/daafpg7r5/image/upload/v1712112325/1_hcx0qg.svg'
                    src={Fashion} 
                    alt='Banner'
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100 rounded'                   
                    src={Summer} 
                    alt='Banner'
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100 rounded'
                    // src='https://res.cloudinary.com/daafpg7r5/image/upload/v1712112325/1_hcx0qg.svg'
                    src={Shoes}
                    alt='Banner'
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className='d-block w-100 rounded'
                    // src='https://res.cloudinary.com/daafpg7r5/image/upload/v1712112325/1_hcx0qg.svg'
                    src={Electronic}
                    alt='Banner'
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
                
              </Carousel>
            </Row>
          )}
           </div>
           <p></p>
           <h1>{searchKeyword ? `Search Results for "${searchKeyword}"` : 'Latest Products'}</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {latestProducts.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
            
            <hr className="bg-light" />
            <Mens />
            <hr className="bg-light" />
            <Womens />
            <hr className="bg-light" />
            <Electronics />
            <hr className="bg-light" />
            <Footwear />
            <hr className="bg-light" />
                            
          </div>
          
  )
}

export default HomeScreen