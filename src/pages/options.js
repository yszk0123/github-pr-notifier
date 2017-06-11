import React from 'react';
import { render } from 'react-dom';
import Options from '../components/Options';

const mountElement = document.createElement('div');
mountElement.id = 'root';
document.body.appendChild(mountElement);

function handleSave() {
  window.chrome.runtime.sendMessage('update');
}

document.addEventListener('DOMContentLoaded', () => {
  render(<Options onSave={handleSave} />, mountElement);
});
