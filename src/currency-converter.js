import React, { useState } from 'react';
import './currency-converter.css';
import { 
  Jumbotron, 
  Button, 
  Form, 
  Col, 
  Spinner,
  Alert,
  Modal
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import ListCurrency from  './list-currency'

function CurrencyConverter() {
  const [value, setValue] = useState('1');
  const [originCurrency, setOriginCurrency] = useState('BRL');
  const [destinyCurrency, setDestinyCurrency] = useState('USD');
  const [showSpinner, setShowSpinner] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [convertResult, setConvertResult] = useState(false)
  
  function handleValue(e){
    setValue(e.target.value.replace(/\D/g, ''))
  }
  
  function handleOriginCurrency(e){
    setOriginCurrency(e.target.value)
  }
  
  function handleDestinyCurrency(e){
    setDestinyCurrency(e.target.value)
  }
  
  function handleCloseModal(e){
    setValue(1)
    setOriginCurrency('BRL')
    setDestinyCurrency('USD')
    setFormValid(false)
    setShowModal(false)
  }

  function convert(e){
    e.preventDefault()
    setFormValid(true)
    if(e.currentTarget.checkValidity() === true){
      setShowModal(true)
    }
  }

  return (
    <div>
      <h1>Currency converter</h1>
      <Alert variant='danger' show={false}>
        Conection error, please try again.
      </Alert>
      <Jumbotron>
        <Form onSubmit={convert} noValidate validated={formValid}>
          <Form.Row>
            <Col sm="3">
              <Form.Control 
                placeholder="0"
                value={value}
                onChange={handleValue}
                required
              />
            </Col>
            <Col sm="3">
              <Form.Control as='select'
                value={originCurrency}
                onChange={handleOriginCurrency}
              >
                <ListCurrency />
              </Form.Control>
            </Col>
            <Col sm="1" className='text-center' style={{ paddingTop: '5px' }}>
              <FontAwesomeIcon icon={faAngleDoubleRight}/>
            </Col>
            <Col sm="3">
              <Form.Control as='select'
                value={destinyCurrency}
                onChange={handleDestinyCurrency}
              >
                <ListCurrency />
              </Form.Control>
            </Col>
            <Col sm="2">
              <Button variant='success' type='submit'>
                <span className={ showSpinner ? null : 'hidden'}>
                  <Spinner animation='border' size='sm' />
                </span>
                <span className={ showSpinner ? 'hidden' : null}>
                  Converter
                </span>
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Converter
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {convertResult}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='success' onClick={handleCloseModal}>
              New conversion
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  );
}

export default CurrencyConverter;
