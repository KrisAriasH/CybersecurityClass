const { generateKeyPairSync } = require('crypto');

// Genera un par de llaves RSA: publica (cifrar/verificar) y privada (descifrar/firmar).
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  // Tamaño del modulo RSA en bits.
  modulusLength: 2048,
  publicKeyEncoding: {
    // Formato estandar para clave publica.
    type: 'spki',
    // PEM = representacion en texto base64 con cabeceras.
    format: 'pem',
  },
  privateKeyEncoding: {
    // Formato estandar para clave privada.
    type: 'pkcs8',
    // Se exporta como PEM para usarla facilmente en Node.
    format: 'pem',
  },
});

// Exporta ambas llaves para usarlas desde otros archivos.
module.exports = { publicKey, privateKey };
