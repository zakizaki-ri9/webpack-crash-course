import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import './style.scss'
import zaki from './zaki2.png'

const image = new Image()
image.src = zaki

document.body.appendChild(image)
document.body.classList.add('background')

ReactDOM.render(
  <div>
    <span>Hello, React!</span>
  </div>,
  document.getElementById('root')
)
