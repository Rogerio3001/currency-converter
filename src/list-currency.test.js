import React from 'react'
import ReactDOM from 'react-dom'
import ListCurrency from './list-currency'

describe('test of component list currency', () => {
    it('shold render component without errors', () => {
        const div = document.createElement('div')
        ReactDOM.render(<ListCurrency />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})