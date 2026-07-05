const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

//Para ejecutar este código se ejecuta `node salt.js` en la terminal. 
//Verás el proceso de creación de un usuario con contraseña hasheada y salteada, 
//y luego intentos de login con contraseña correcta, incorrecta y usuario inexistente.
const users = [];

function signup(email, password) {
    // Genera una sal aleatoria por usuario.
    const salt = randomBytes(16).toString('hex');
    // Deriva una clave segura con scrypt.
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    // Guardamos "sal:hash" para poder verificar después.
    const user = { email, password: `${salt}:${hashedPassword}` };
  
    users.push(user);

    return user;
}

function login(email, password) {
    const user = users.find((v) => v.email === email);

    // Evita fallos si el usuario no existe.
    if (!user) {
        return 'usuario no encontrado';
    }
  
    const [salt, key] = user.password.split(':');

    // Valida el formato almacenado antes de comparar.
    if (!salt || !key) {
        return 'credenciales almacenadas invalidas';
    }

    const hashedBuffer = scryptSync(password, salt, 64);
  
    const keyBuffer = Buffer.from(key, 'hex');

    // timingSafeEqual evita comparaciones vulnerables a timing attacks.
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    /*
    Una comparación normal (por ejemplo ===) suele funcionar así:
    Compara byte por byte y Se detiene en el primer error

    Si el primer byte ya es diferente → termina rápido
    Si muchos bytes coinciden → tarda más 

    Eso genera una diferencia de tiempo que se puede usar para adivinar la contraseña.

    timingSafeEqual hace que la comparación tome el mismo tiempo sin importar cuándo difieren los datos.

    */
    
    if (match) {
        return 'login success!';
    } else {
        return 'login fail!';
    }
}

const user = signup('leo@test.com', 'gatitos');
console.log('Usuario creado:', user);

console.log('Password correcto:', login('leo@test.com', 'mypassword')); // login success!
console.log('Password incorrecto:', login('leo@test.com', 'wrongpass')); // login fail!
console.log('Usuario inexistente:', login('nadie@test.com', '123456')); // usuario no encontrado