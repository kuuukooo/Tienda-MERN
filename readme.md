# 🛒 Tienda MERN

Este es un proyecto Fullstack desarrollado con el stack **MERN** (MongoDB, Express, React y Node.js). Se trata de una tienda en línea que permite a los usuarios **crear, editar y eliminar productos**.

## 📌 Características
- 🏪 Administración de productos (CRUD: Crear, Leer, Actualizar y Eliminar).
- 🛠 Backend con **Node.js, Express y MongoDB**.
- 🎨 Frontend con **React**.
- 🔄 Comunicación entre frontend y backend mediante **API REST**.
- 🚀 Despliegue local mediante scripts de `npm`.

## 📂 Estructura del Proyecto
```
📦 mi-proyecto
 ┣ 📂 backend
 ┃ ┣ 📜 server.js  # Servidor Express
 ┃ ┣ 📂 models     # Modelos de la base de datos
 ┃ ┣ 📂 routes     # Rutas de la API
 ┃ ┗ 📂 controllers # Controladores de la API
 ┣ 📂 frontend
 ┃ ┣ 📜 src/       # Código fuente de React
 ┃ ┗ 📜 public/    # Archivos estáticos
 ┣ 📜 package.json # Configuración y scripts de npm
 ┗ 📜 .gitignore   # Ignora node_modules y .env
```

## 🚀 Instalación y Uso

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2️⃣ Instalar dependencias
Ejecuta el siguiente comando para instalar las dependencias tanto del backend como del frontend:
```bash
npm install
```

### 3️⃣ Iniciar el servidor
```bash
npm run dev
```
Este comando ejecutará `nodemon backend/server.js`, iniciando el backend con recarga automática.

### 4️⃣ Construir el frontend
```bash
npm run build
```
Esto instalará las dependencias del frontend y generará una versión optimizada de la aplicación.

### 5️⃣ Ejecutar el frontend (opcional)
Para ejecutar el frontend en modo desarrollo:
```bash
cd frontend
npm start
```

## 🛠 Tecnologías Utilizadas
- **MongoDB** - Base de datos NoSQL
- **Express.js** - Framework para Node.js
- **React.js** - Biblioteca para UI
- **Node.js** - Entorno de ejecución de JavaScript
- **Nodemon** - Recarga automática del servidor en desarrollo

## 📜 Licencia
Este proyecto está bajo la licencia [MIT](LICENSE).

---
