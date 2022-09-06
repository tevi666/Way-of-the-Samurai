import React from 'react'
import ReactDOM from 'react-dom'
import SamuraiJsApp from './App'

it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SamuraiJsApp />, div )
    ReactDOM.unmountComponentAtNode(div)
})