const { createHash } = require('crypto');

// Crea un hash de una contraseña usando SHA-256. 
// No es recomendado para producción, solo para demostración.

//Para ejecutar este código se ejecuta `node hash.js` en la terminal. 
//Verás los hashes de ambas contraseñas y si coinciden o no.

function hash(input) {
	return createHash('sha256').update(input).digest('base64');
}

const Contraseña1 = 'chispita123';
const password2 = 'chispita123';

const hash1 = hash(Contraseña1);
const hash2 = hash(password2);

const match = hash1 === hash2;

console.log('Contraseña 1 hash:', hash1);
console.log('Contraseña 2 hash:', hash2);
console.log('Do they match?', match);
