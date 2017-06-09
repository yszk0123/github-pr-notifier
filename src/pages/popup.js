import React from 'react';
import { render } from 'react-dom';
import Popup from '../components/Popup';

const mountElement = document.createElement('div');
mountElement.id = 'root';
document.body.appendChild(mountElement);

document.addEventListener('DOMContentLoaded', () => {
  render(<Popup />, mountElement);
});
