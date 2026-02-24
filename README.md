# Hábitos Atómicos - Backend API

Este proyecto es la API de backend para una aplicación de seguimiento de hábitos, desarrollada en Node.js y Express con persistencia de datos en MongoDB. Fue creado como parte de la Actividad 1 del curso de Programación Avanzada.

## Requisitos Previos

Antes de ejecutar este proyecto, asegurarse de tener instalado:
* Node.js
* Una cuenta en MongoDB Atlas con un cluster configurado.

## Instrucciones de Instalación y Ejecución

Seguir estos pasos para levantar el servidor en un entorno local:

### 1. Clonar el repositorio
Si aún no se tiene el código en la máquina local, clonar el repositorio desde la rama correspondiente y entrar a la carpeta del proyecto:
bash
git clone <URL_DEl_REPOSITORIO>
cd habits-tracker-backend
git checkout semana1

### 2. Configurar las variables de entorno

Crear un archivo llamado `.env` en la raíz del proyecto. Dentro de este archivo, colocar la cadena de conexión a MongoDB Atlas. 

El archivo debe verse exactamente así, reemplazando los datos entre los símbolos `< >` con las credenciales reales:

env
MONGO_URI=mongodb+srv://<tu_usuario>:<tu_contraseña_alfanumerica>@<tu_cluster>.mongodb.net/habitosApp?retryWrites=true&w=majority


**Nota de seguridad:** Asegurarse de que la dirección IP esté permitida (`0.0.0.0/0`) en la sección *Network Access* de MongoDB Atlas para evitar errores de conexión.

### 3. Iniciar el servidor
Una vez que el archivo `.env` esté listo, iniciar la aplicación ejecutando:

bash
npm start


Si la configuración es correcta, la consola mostrará un mensaje indicando que el servidor está corriendo y que la base de datos está conectada.