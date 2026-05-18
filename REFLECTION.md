# REFLECTION.md

## 1. Volviendo a empezar

Si tuviera que rediseñar el modelo desde cero, probablemente pensaría mejor desde el inicio qué datos iban a ser catálogos y cuáles iban a ser solo snapshots. Al principio suena fácil embeber géneros y actores dentro de películas porque así se evita hacer joins, pero cuando empecé a hacer el CRUD me di cuenta de que editar o borrar un género ya no era tan directo. Si cambio el nombre de un género, no basta con actualizar la colección `genres`; también tengo que modificar todas las películas que tienen ese género embebido. Eso fue algo que en SQL hubiera sido más natural porque las películas apuntarían al `genre_id`. La información que me faltaba al inicio era entender que en MongoDB no solo importa cómo se ve el documento, sino también qué tan seguido van a cambiar esos datos relacionados.

## 2. La conversación con tu modelo

La operación que más se sintió incómoda fue editar y borrar géneros. En la app, si edito un género, tuve que agregar lógica extra para actualizar el nombre dentro de los documentos de películas. Y si borro un género, también tengo que quitarlo del arreglo `genres` en cada película. En SQL esto sería más controlado con llaves foráneas o una tabla intermedia entre película y género. No creo que ese dolor sea totalmente culpa de NoSQL, más bien fue una consecuencia de mi decisión de embeber los géneros en `movies`. Lo hice porque favorece la lectura de películas, pero el costo aparece cuando los datos del catálogo cambian.

Otra parte interesante fue `activities`. Ahí decidí no embeber todo dentro de usuarios porque las actividades pueden crecer mucho. Usar referencias a `userId` y `movieId` se sintió más limpio para guardar eventos. Pero al mostrarlas en la interfaz tuve que usar `populate`, que se parece un poco a volver a hacer joins. Eso me hizo ver que NoSQL no elimina las relaciones; solo te obliga a decidir en dónde pagas el costo: al leer, al escribir o al mantener datos duplicados.

## 3. La pregunta honesta

Para MovieStream específicamente, mi respuesta sería que depende. Si la app se usa principalmente como catálogo de películas, MongoDB sí se siente cómodo. Un documento de película puede traer título, año, géneros, cast, estudio, precio y resumen en un solo lugar. Eso hace que listar y buscar películas sea muy directo. Para una interfaz simple como la que hice, el modelo documental funciona bien.

Pero si MovieStream se usa más como sistema de análisis de ventas, usuarios, comportamiento, segmentos y transacciones, creo que el modelo relacional original puede ser mejor. Muchas preguntas del negocio suenan más naturales en SQL: ventas por género, actividad por cliente, usuarios por segmento, descuentos promedio, etc. En MongoDB se puede hacer, pero las agregaciones se vuelven más largas y hay que cuidar más la consistencia de los datos duplicados. Entonces no diría que NoSQL fue automáticamente mejor. Fue mejor para leer películas rápido y construir una app sencilla, pero no necesariamente para todo el dominio completo de MovieStream.
