import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation} from 'react-router-dom';

function SearchBar() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}`);
        } else {
            navigate(location.pathname); 
        }
    };

    return (
        <Form className="d-flex" onSubmit={submitHandler} style={{ marginRight: '80px', marginLeft: '140px' }}>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='me-sm-2 rounded'
            />
            <Button
                type='submit'
                variant='primary'
                className='my-3 my-sm-0 rounded'
            >
                Submit
            </Button>
        </Form>
    );
}

export default SearchBar;
