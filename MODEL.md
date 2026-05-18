# MODEL.md — MovieStream en MongoDB

## 1. Idea general

El modelo original de MovieStream venía de un enfoque relacional en Oracle, con tablas como `MOVIE_COPY`, `CUSTOMER_COPY`, `GENRE_COPY`, `CUSTSALES_COPY` y `ACTIVITY_COPY`. En SQL, las relaciones se reconstruyen con llaves foráneas y `JOINs`. Para MongoDB decidí pensar más en cómo se usa la app: listar películas, buscar por género o actor, ver usuarios y revisar interacciones.

Mi modelo final queda con estas colecciones:

1. `movies`
2. `genres`
3. `actors`
4. `users`
5. `activities`

No intenté copiar tabla por tabla. La idea fue mover el modelo hacia documentos que ya traigan la información más usada junta.

---

## 2. Colección `movies`

```json
{
  "_id": "ObjectId",
  "title": "Neon City",
  "year": 2020,
  "runtime": "120 min",
  "summary": "A MovieStream test movie...",
  "listPrice": 4.99,
  "views": 12000,
  "imageUrl": "",
  "genres": [
    { "name": "Action" },
    { "name": "Sci-Fi" }
  ],
  "cast": [
    {
      "actorId": "ObjectId as string",
      "name": "Ryan Gosling",
      "character": "Lead"
    }
  ],
  "studio": {
    "name": "Northstar Studios",
    "country": "USA"
  },
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Decisión

En películas embebí `genres`, `cast` y `studio` como snapshots. Lo hice porque al listar una película casi siempre quiero ver el título con sus géneros, actores principales y estudio sin tener que hacer varios `populate` o agregaciones. En el modelo Oracle, estos datos aparecían como columnas JSON en `MOVIE_COPY`, entonces ya había una tendencia a agrupar esta información alrededor de la película.

### Trade-off

La consulta de películas se vuelve más fácil. Buscar películas por género o por actor se puede hacer directo sobre `genres.name` o `cast.name`. Lo malo es que si cambio el nombre de un género, tengo que actualizar también las películas que tienen ese género embebido. En la app resolví esto actualizando los snapshots de películas cuando se edita un género.

---

## 3. Colección `genres`

```json
{
  "_id": "ObjectId",
  "name": "Action",
  "description": "Fast paced stories with fights, chases or missions.",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Decisión

Aunque el nombre del género está embebido en `movies`, mantuve una colección `genres` porque la app necesita CRUD de géneros. Sirve como catálogo para crear, editar y eliminar géneros.

### Relación con movies

La relación Movie–Genre es muchos-a-muchos. En SQL normalmente se resolvería con una tabla intermedia. En MongoDB la resolví embebiendo un arreglo de géneros dentro de cada película. No hago referencia hacia ambas direcciones porque eso duplica demasiado y obliga a mantener sincronía en dos lados.

---

## 4. Colección `actors`

```json
{
  "_id": "ObjectId",
  "name": "Ana de Armas",
  "birthYear": 1988,
  "country": "Cuba",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Decisión

Los actores existen como catálogo independiente, pero en `movies.cast` guardo un snapshot con `actorId`, `name` y `character`. Esto evita hacer joins cada vez que se muestra una película. Si el objetivo fuera tener páginas detalladas de actores y filmografías complejas, probablemente usaría referencias más fuertes y agregaciones.

---

## 5. Colección `users`

```json
{
  "_id": "ObjectId",
  "firstName": "Santiago",
  "lastName": "Paredes",
  "email": "santiago.paredes@example.com",
  "country": "Mexico",
  "segment": {
    "name": "Movie Fan",
    "shortName": "FAN"
  },
  "interactions": [
    {
      "movieId": "ObjectId",
      "movieTitle": "Neon City",
      "activity": "view",
      "rating": 5,
      "watchedAt": "Date",
      "device": "iPhone"
    }
  ],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Decisión

En `users` embebí un resumen de interacciones recientes. Esto es útil si quiero abrir un usuario y ver rápido qué ha hecho. No metería todo el historial aquí si fuera una app real con millones de eventos, porque el documento del usuario crecería demasiado.

---

## 6. Colección `activities`

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "movieId": "ObjectId",
  "activity": "rating",
  "rating": 4,
  "device": "Web",
  "app": "MovieStream Web",
  "os": "iOS",
  "activityTime": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Decisión

Las actividades sí las dejé como colección separada con referencias a `users` y `movies`. Esta es la parte que más puede crecer, parecido a `ACTIVITY_COPY` y `CUSTSALES_COPY` en Oracle. Si cada vista, rating o favorito se embebiera completo dentro de usuarios o películas, los documentos se volverían muy grandes.

### Dirección de referencia

`activities` apunta hacia `users` y `movies`. No guardo un arreglo gigante de actividades dentro de cada película porque una película popular podría tener demasiados eventos.

---

## 7. Qué consultas se vuelven más fáciles

Listar películas con sus géneros y actores es más fácil porque todo está dentro del documento `movie`. Buscar películas por género también es directo con `genres.name`. Ver una lista básica de usuarios con sus últimas interacciones también es cómodo porque el usuario trae un resumen embebido.

---

## 8. Qué consultas se vuelven más difíciles

Cambiar datos maestros puede doler más. Por ejemplo, si edito el nombre del género `Sci-Fi`, también tengo que actualizar las películas que lo tienen embebido. También es más incómodo hacer reportes tipo SQL muy relacionales, como ventas por usuario, género, fecha y segmento al mismo tiempo. En MongoDB se puede hacer con aggregation pipelines, pero no se siente tan directo como un `JOIN` con `GROUP BY` en SQL.

---

## 9. Conclusión del modelo

Para MovieStream, MongoDB funciona bien si la app está enfocada en mostrar películas y actividad reciente. El modelo documental hace que leer películas sea muy simple. Pero para análisis fuertes de ventas, historial completo e integridad estricta entre usuarios, películas y géneros, el modelo relacional sigue teniendo ventajas claras.
