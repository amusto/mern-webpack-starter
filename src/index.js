import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

/*import _ from 'lodash';

function component() {
    var element = document.createElement('div');
    let fullname = 'Armando Musto';

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = `Welcome to the site, ${fullname}!!!`;

    return element;
}

document.body.appendChild(component());*/