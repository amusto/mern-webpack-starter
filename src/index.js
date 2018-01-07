import _ from 'lodash';

function component() {
    var element = document.createElement('div');
    let fullname = 'Armando Musto';

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = `Welcome to the site, ${fullname}!!!`;

    return element;
}

document.body.appendChild(component());