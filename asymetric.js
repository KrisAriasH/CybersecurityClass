const {  publicEncrypt, privateDecrypt } = require('crypto');
const { publicKey, privateKey } = require('./keypair');

// Mensaje original en texto plano.
const message = 'me gustan las tortugas'

// Cifra el mensaje usando la clave publica.
// Solo quien tenga la clave privada podra descifrarlo.
const encryptedData = publicEncrypt(
    publicKey,
    Buffer.from(message)
  );


// Muestra el mensaje cifrado en formato hexadecimal.
console.log(encryptedData.toString('hex'))


// Descifra el mensaje usando la clave privada.
const decryptedData = privateDecrypt(
    privateKey,
    encryptedData
);

// Convierte el resultado a texto UTF-8 y lo imprime.
console.log(decryptedData.toString('utf-8'));