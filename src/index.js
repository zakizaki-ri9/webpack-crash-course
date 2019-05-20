import _ from 'lodash'
import './style.css'
import zaki from './zaki2.png'

function component() {
  const element = document.createElement('div')
  const array = ['Hello', 'Webpack', '!!']
  element.innerHTML = _.join(array, ' ')
  return element
}

document.body.appendChild(component())
document.body.classList.add('background')

const image = new Image()
image.src = zaki
document.body.appendChild(image)
