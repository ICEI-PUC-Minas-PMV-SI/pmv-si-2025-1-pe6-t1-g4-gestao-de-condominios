import {createHash} from 'crypto';

const privateKey = createHash('sha256');
const privateKeyHex = privateKey.digest('hex');

console.log(privateKeyHex);