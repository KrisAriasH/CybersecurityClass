const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');

/// Cifrado simétrico con AES-256-CBC

const message = 'me gustan las tortugas';
const key = randomBytes(32); //una secuencia de 256 ceros y unos que se usa para cifrar y descifrar el mensaje.
const iv = randomBytes(16); 
//un IV (vector de inicialización) es un valor aleatorio que se usa para asegurar 
// que el mismo mensaje cifrado varias veces produzca resultados diferentes, 

const cipher = createCipheriv('aes256', key, iv);

/// Encriptado de un mensaje. El resultado es un string hexadecimal.

const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
console.log(`Encriptado: ${encryptedMessage}`);
// utf8 es el formato de entrada del mensaje original, y hex es el formato de salida del mensaje cifrado.

/// Decifrado del mensaje cifrado. El resultado es el mensaje original en texto plano.

const decipher = createDecipheriv('aes256', key, iv);
const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8') + decipher.final('utf8');

console.log(`Decifrado el mnjs es: ${decryptedMessage.toString('utf-8')}`);