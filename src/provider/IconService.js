import IconService from 'icon-sdk-js';

const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3');

export const iconService = new IconService(httpProvider);

export const accountHandler = function () {
    const requestAccount = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_HAS_ACCOUNT'
        }
    });

    window.dispatchEvent(requestAccount);

    const responseAccount = (e) => {
        const { type, payload } = e.detail
        if (type === 'RESPONSE_HAS_ACCOUNT') {
            console.log(payload); // true or false
        }
    }

    window.addEventListener('ICONEX_RELAY_RESPONSE', responseAccount);
}

export const addressHandler = () => {
    const requestAddress = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_ADDRESS'
        }
    });
    window.dispatchEvent(requestAddress);

    const responseAccount = (e) => {
        const { type, payload } = e.detail;
        if (type === 'RESPONSE_ADDRESS') {
            console.log(payload); // e.g., hx19870922...
        }
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', responseAccount);
}