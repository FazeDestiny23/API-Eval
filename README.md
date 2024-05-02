El código no utiliza ninguna técnica o algortimo de encriptación en específico, sin embargo, lo que realiza es la creación de un token o llave de seguridad.

La aplicación funciona como servidor y cliente:

El usuario o cliente debe realizar las peticiones con apoyo del software de Postman.

La propia computadora funciona como servidor debido al uso del puerto 3000 y un servidor local.

Ahora bien, el procedimiento para poder realizar la encriptación de un mensaje en este caso una fotografía es el siguiente:

1. Abrir el archvio "index.js" y abrir una terminal nueva dentro del software de "Postman".
2. Podemos observar que existen varias funciones con sus respectivos paths o rutas y cada una puede ir en una terminal distinta para mayor comodidad.
3. Primeramente mediante el método "GET" generaremos una nueva llave de encriptación.
4. Después podemos copiar ese token y verificar que efectivamente es válido o por otro lado no es posible utilizarlo.
5. De igual manera se incluye una función para desactivar ese mismo token una vez terminemos de emplearlo, esto para añadir mayor seguridad al tráfico de información.
6. Ahora bien, para encriptar un mensaje debemos escribir el mensaje que queremos enviar de manera segura utilizando un método "POST", escribiendo el mensaje junto con el token válido en formato JSON, aquí podemos añadir el nombre de la imagen o un link dependiendo de cómo lo tengamos guardado dentro de nuestro dispositivo.
7. Por último para poder desencriptarlo, necesitaremos utilizar la llave o token y el mensaje encriptado, esto de igual manera con el método "POST" y desde la terminal de Postman.

Cabe destacar que el código también cuenta con manejo de errores sencillos para indicarle al cliente o usuario si la información solicitada o ingresada no es la correcta, de igual manera la información podría visualizarse dentro de un navegador de internet.
