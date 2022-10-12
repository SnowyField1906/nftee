import IconService from 'icon-sdk-js';

import { HttpProvider } from 'icon-sdk-js';

new IconService(HttpProvider)

const httpProvider = new HttpProvider('https://ctz.solidwallet.io/api/v3');
const iconService = new IconService(httpProvider);

const balance = await iconService.getBalance('hx9d8a8376e7db9f00478feb9a46f44f0d051aab57').execute();
console.log(balance);