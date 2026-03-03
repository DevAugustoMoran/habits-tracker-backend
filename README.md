# Hábitos Atómicos - Backend API

Este proyecto es la API de backend para una aplicación de seguimiento de hábitos, desarrollada en Node.js y Express con persistencia de datos en MongoDB. Fue creado como parte de la Actividad 1 del curso de Programación Avanzada.

El repositorio está estructurado en dos carpetas principales:
* **backend:** API REST desarrollada con Node.js, Express.js y MongoDB.
* **frontend:** Interfaz de usuario desarrollada con Next.js, Tailwind CSS y Redux para la gestión del estado global.

## Requisitos Previos
* Node.js instalado en tu equipo local.
* Una cuenta activa en MongoDB Atlas con la IP permitida (`0.0.0.0/0`).

## Instrucciones de Instalación y Ejecución

Para correr el proyecto localmente, debes levantar ambos entornos (servidor y cliente) de forma simultánea.

### 1. Clonar el repositorio
Abre tu terminal, clona el repositorio y muévete a la rama correspondiente a esta entrega:

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd <nombre-de-tu-carpeta-principal>
git checkout semana2
```

### 2. Configurar y ejecutar el Backend
Abre una terminal, entra a la carpeta del servidor e instala sus dependencias:

```bash
cd backend
npm install
```

Crea un archivo `.env` dentro de la carpeta `backend` con la siguiente estructura (reemplazando los valores con tus credenciales reales):

```env
MONGO_URI=mongodb://<usuario>:<password>@<cluster-url>:27017/habitosApp?ssl=true&authSource=admin&retryWrites=true&w=majority
PORT=3001
```

Inicia el servidor backend:

```bash
npm start
```
*(La consola te indicará que la base de datos está conectada en el puerto 3001).*

### 3. Configurar y ejecutar el Frontend
Abre una **nueva** terminal (sin cerrar la del backend), entra a la carpeta de la interfaz e instala sus dependencias:

```bash
cd frontend
npm install
```

Inicia el servidor de desarrollo de Next.js:

```bash
npm run dev
```

### 4. Uso de la aplicación
Una vez que ambos servidores estén corriendo, abre tu navegador web e ingresa a `http://localhost:3000`. La aplicación web se conectará automáticamente al backend para obtener y mostrar tu lista de hábitos usando Redux.