# Clase de Criptografía Básica

Ejemplos prácticos en Node.js sobre conceptos fundamentales de criptografía: hashing, salting, cifrado simétrico y cifrado asimétrico, usando el módulo nativo `crypto`.

Este repositorio tiene fines **educativos y de demostración**. Ninguno de estos ejemplos debe usarse tal cual en un entorno de producción.

## Requisitos

- [Node.js](https://nodejs.org/) instalado (cualquier versión reciente, ya que `crypto` es un módulo nativo).
- No requiere instalar dependencias externas.

## Cómo ejecutar los ejemplos

Cloná el repositorio y corré cada archivo con Node directamente desde la terminal:

```bash
node hash.js
node salt.js
node Symetric.js
node asymetric.js
```

> `keypair.js` no se ejecuta por separado: exporta un par de llaves RSA que usa `asymetric.js`.

## Contenido del repositorio

### `hash.js` — Hashing simple con SHA-256
Genera el hash de dos contraseñas usando SHA-256 y compara si coinciden. Sirve para entender qué es una función de hash, pero **no es apto para guardar contraseñas en producción** porque no usa "sal" (salt) y SHA-256 es demasiado rápido, lo que lo hace vulnerable a ataques de fuerza bruta.

### `salt.js` — Hashing seguro con salt (scrypt)
Simula un sistema de registro (`signup`) y login (`login`) de usuarios:
- Genera una **sal aleatoria** distinta para cada usuario.
- Deriva la contraseña con `scrypt`, una función de hash lenta y resistente a ataques de fuerza bruta.
- Usa `timingSafeEqual` para comparar contraseñas de forma segura, evitando **ataques de temporización** (timing attacks).

### `Symetric.js` — Cifrado simétrico (AES-256-CBC)
Cifra y descifra un mensaje usando **la misma clave** (`key`) tanto para cifrar como para descifrar. Introduce el concepto de **IV** (vector de inicialización), necesario para que el mismo mensaje cifrado dos veces no produzca siempre el mismo resultado.

### `keypair.js` — Generación de llaves RSA
Genera un par de llaves asimétricas (**pública** y **privada**) en formato PEM, usadas por `asymetric.js`.

### `asymetric.js` — Cifrado asimétrico (RSA)
Cifra un mensaje con la **clave pública** y lo descifra con la **clave privada**, ilustrando el modelo de cifrado asimétrico: cualquiera puede cifrar con la llave pública, pero solo quien tenga la llave privada puede descifrar.

## Conceptos cubiertos

| Archivo         | Concepto principal                          |
|-----------------|----------------------------------------------|
| `hash.js`       | Hashing (SHA-256)                            |
| `salt.js`       | Salting + hashing seguro (scrypt)            |
| `Symetric.js`   | Cifrado simétrico (AES-256-CBC)              |
| `keypair.js`    | Generación de llaves RSA                     |
| `asymetric.js`  | Cifrado asimétrico (RSA)                     |

## Advertencia

Estos ejemplos están simplificados para fines didácticos. Para aplicaciones reales, considerá:
- Usar librerías especializadas y mantenidas (ej. `bcrypt`, `argon2`) para contraseñas.
- Nunca hardcodear contraseñas o mensajes de prueba en el código.
- Gestionar claves de forma segura (variables de entorno, gestores de secretos, HSM, etc).
- Revisar buenas prácticas actualizadas, ya que las recomendaciones criptográficas evolucionan con el tiempo.
