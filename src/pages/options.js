import React from 'react';
import { render } from 'react-dom';
import Options from '../components/Options';

const mountElement = document.createElement('div');
mountElement.id = 'root';
document.body.appendChild(mountElement);

document.addEventListener('DOMContentLoaded', () => {
  render(<Options />, mountElement);
});
