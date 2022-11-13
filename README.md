# Prueba técnica - React Inventario de Vacunación de Empleados

En este proyecto he utilizado json-server para la somulación de un backend. A continuación describo los pasos para ejecutar la aplicación correctamente.

## Setup

### 1) `npm install` - Instala todas las dependencias

### 2) `npm run fake-api` - Levanta el json-server que simulará el backend
Asegurarse de no tener nada corriendo en el puerto 3100 ya que ahí correrá el Fake Api.
En el caso de que se quiera cambiar de puerto, se puede hacer en la línea 39 del package.json

### 3) `npm run start` - Levanta la aplicación
Asegurarse de no tener nada corriendo en el puerto 3000 para que la aplicación pueda levantarse sin ningún problema

### 3) Abrir navegador en [http://localhost:3000](http://localhost:3000)
Una vez que la aplicación esté corriendo nos aparecerá el login para poder iniciar sesión.

### 4) Iniciar sesión como Administrador
Para iniciar como administrador, ya existe una cuenta creadea la cual es:

`Usuario: admin`
`Contraseña: admin`

### 4) Iniciar sesión como Empleado
Siempre que se cree un nuevo empleado, generará unas credenciales para poder ingresar con el correo 
electrónico y la cédula como contraseña.

#### Por ejemplo:

`Usuario: test@mail.com`
`Contraseña: 1717154130`

En el archivo `src/api/db.json` está la base de datos de todos los usuarios creados.