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
import axios from 'axios'

function CurrencyConverter() {

  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=796d5b23ab76c25708e45d903c724a6c'

  const [value, setValue] = useState('1');
  const [originCurrency, setOriginCurrency] = useState('BRL');
  const [destinyCurrency, setDestinyCurrency] = useState('USD');
  const [showSpinner, setShowSpinner] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [convertResult, setConvertResult] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  
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
      setShowSpinner(true)
      axios.get(FIXER_URL)
        .then(res => {
          const quote = getQuote(res.data)
          if(quote){
            setConvertResult(`${value} ${originCurrency} = ${quote} ${destinyCurrency}`)
            setShowModal(true)
            setShowSpinner(false)
            setShowErrorMessage(false)
          }else{
            showError()
          }
        })
        .catch(err => showError())
    }
  }

  function showError(){
    setShowErrorMessage(true)
    setShowSpinner(false)
  }

  function getQuote(quoteData){
    if(!quoteData || quoteData.success !== true){
      return false
    }
    const quoteOrigin = quoteData.rates[originCurrency]
    const quoteDestiny = quoteData.rates[destinyCurrency]
    const quote = (1 / quoteOrigin * quoteDestiny) * value

    return quote.toFixed(2)
  }

  return (
    <div>
      <h1>Conversor de Moedas</h1>
      <Alert variant='danger' show={showErrorMessage}>
        Erro obtendo dados de conversão, tente novamente.
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
              <Button variant='success' type='submit' data-testid="btn-converter">
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
        <Modal show={showModal} onHide={handleCloseModal} data-testid="modal">
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
