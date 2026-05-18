# MovieStream MongoDB

Proyecto individual para migrar el dominio de MovieStream de un modelo relacional en Oracle a un modelo documental en MongoDB. La app permite probar el modelo con una interfaz web simple usando CRUD sobre películas y géneros, además de vistas de usuarios y actividades.

## Qué hace el proyecto

- Define un modelo documental para MovieStream usando MongoDB.
- Carga datos de prueba con un script `seed.js`.
- Incluye mínimo:
  - 20 películas
  - 5 géneros
  - 10 actores
  - 15 usuarios
  - 45 interacciones
- Permite CRUD de:
  - Movies
  - Genres
- Permite listar:
  - Users
  - Activities
- Prueba relaciones embebidas y referenciadas:
  - `movies` embebe géneros, cast y estudio.
  - `activities` referencia usuarios y películas.

## Stack usado

- Node.js
- Express
- MongoDB Atlas o MongoDB local
- Mongoose
- EJS
- CSS simple

Elegí este stack porque es directo, fácil de desplegar en Render y suficiente para demostrar CRUD con MongoDB sin meter un frontend complejo.

## Cómo correrlo desde cero

### 1. Clonar el repositorio

```bash
git clone TU_URL_DEL_REPO
cd moviestream-mongodb
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Luego edita `.env` y agrega tu conexión de MongoDB:

```bash
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/moviestream?retryWrites=true&w=majority
PORT=3000
```

### 4. Poblar la base de datos

```bash
npm run seed
```

Esto borra y recrea las colecciones principales con datos de prueba.

### 5. Correr la app

```bash
npm start
```

Abre:

```bash
http://localhost:3000
```

## Deployment sugerido

### MongoDB Atlas

1. Crear cluster gratis M0.
2. Crear usuario de base de datos.
3. Permitir acceso desde cualquier IP con `0.0.0.0/0` para pruebas.
4. Copiar connection string y ponerlo como `MONGODB_URI`.

### Render

1. Subir este proyecto a GitHub.
2. Crear un nuevo Web Service en Render.
3. Conectar el repo.
4. Build command:

```bash
npm install
```

5. Start command:

```bash
npm start
```

6. Agregar variable de ambiente:

```bash
MONGODB_URI=tu_connection_string
```

7. Abrir la URL pública y probar en incógnito.

## Captura de pantalla

Agrega aquí una captura después de desplegar la app:

```md
![App funcionando](./screenshot.png)
```

## Archivos importantes

- `MODEL.md`: explicación del modelo documental.
- `REFLECTION.md`: reflexión del proceso.
- `seed.js`: script para recrear la base.
- `server.js`: servidor Express y rutas CRUD.
- `views/`: pantallas EJS.
- `public/style.css`: estilos básicos.
