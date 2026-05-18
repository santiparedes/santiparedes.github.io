require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  runtime: String,
  summary: String,
  listPrice: Number,
  views: Number,
  imageUrl: String,
  genres: [{ name: String }],
  cast: [{ actorId: String, name: String, character: String }],
  studio: { name: String, country: String }
}, { timestamps: true });

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  country: String,
  segment: { name: String, shortName: String },
  interactions: [{
    movieId: mongoose.Schema.Types.ObjectId,
    movieTitle: String,
    activity: String,
    rating: Number,
    watchedAt: Date,
    device: String
  }]
}, { timestamps: true });

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  activity: String,
  rating: Number,
  device: String,
  app: String,
  os: String,
  activityTime: Date
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
const Genre = mongoose.model('Genre', genreSchema);
const User = mongoose.model('User', userSchema);
const Activity = mongoose.model('Activity', activitySchema);

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI. Copy .env.example to .env and add your MongoDB connection string.');
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
}
main().catch(err => {
  console.error(err);
  process.exit(1);
});

function parseList(value) {
  return String(value || '')
    .split(',')
    .map(v => v.trim())
    .filter(Boolean);
}

app.get('/', async (req, res) => {
  const [movieCount, genreCount, userCount, activityCount] = await Promise.all([
    Movie.countDocuments(),
    Genre.countDocuments(),
    User.countDocuments(),
    Activity.countDocuments()
  ]);
  res.render('home', { movieCount, genreCount, userCount, activityCount });
});

app.get('/movies', async (req, res) => {
  const q = req.query.q || '';
  const filter = q ? {
    $or: [
      { title: new RegExp(q, 'i') },
      { 'genres.name': new RegExp(q, 'i') },
      { 'cast.name': new RegExp(q, 'i') }
    ]
  } : {};
  const movies = await Movie.find(filter).sort({ title: 1 });
  res.render('movies/index', { movies, q });
});

app.get('/movies/new', async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.render('movies/new', { genres });
});

app.post('/movies', async (req, res) => {
  const genres = parseList(req.body.genres).map(name => ({ name }));
  const cast = parseList(req.body.cast).map(name => ({ name }));
  await Movie.create({
    title: req.body.title,
    year: Number(req.body.year),
    runtime: req.body.runtime,
    summary: req.body.summary,
    listPrice: Number(req.body.listPrice || 0),
    views: Number(req.body.views || 0),
    imageUrl: req.body.imageUrl,
    genres,
    cast,
    studio: { name: req.body.studioName, country: req.body.studioCountry }
  });
  res.redirect('/movies');
});

app.get('/movies/:id/edit', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render('movies/edit', { movie });
});

app.put('/movies/:id', async (req, res) => {
  const genres = parseList(req.body.genres).map(name => ({ name }));
  const cast = parseList(req.body.cast).map(name => ({ name }));
  await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    year: Number(req.body.year),
    runtime: req.body.runtime,
    summary: req.body.summary,
    listPrice: Number(req.body.listPrice || 0),
    views: Number(req.body.views || 0),
    imageUrl: req.body.imageUrl,
    genres,
    cast,
    studio: { name: req.body.studioName, country: req.body.studioCountry }
  });
  res.redirect('/movies');
});

app.delete('/movies/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  await Movie.findByIdAndDelete(req.params.id);
  await Activity.deleteMany({ movieId: req.params.id });
  await User.updateMany({}, { $pull: { interactions: { movieId: req.params.id } } });
  console.log(`Deleted movie and related activity snapshots: ${movie?.title}`);
  res.redirect('/movies');
});

app.get('/genres', async (req, res) => {
  const q = req.query.q || '';
  const filter = q ? { name: new RegExp(q, 'i') } : {};
  const genres = await Genre.find(filter).sort({ name: 1 });
  res.render('genres/index', { genres, q });
});

app.get('/genres/new', (req, res) => res.render('genres/new'));

app.post('/genres', async (req, res) => {
  await Genre.create({ name: req.body.name, description: req.body.description });
  res.redirect('/genres');
});

app.get('/genres/:id/edit', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  res.render('genres/edit', { genre });
});

app.put('/genres/:id', async (req, res) => {
  const oldGenre = await Genre.findById(req.params.id);
  await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name, description: req.body.description });
  if (oldGenre && oldGenre.name !== req.body.name) {
    await Movie.updateMany({ 'genres.name': oldGenre.name }, { $set: { 'genres.$.name': req.body.name } });
  }
  res.redirect('/genres');
});

app.delete('/genres/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (genre) {
    await Movie.updateMany({}, { $pull: { genres: { name: genre.name } } });
    await Genre.findByIdAndDelete(req.params.id);
  }
  res.redirect('/genres');
});

app.get('/users', async (req, res) => {
  const q = req.query.q || '';
  const filter = q ? {
    $or: [
      { firstName: new RegExp(q, 'i') },
      { lastName: new RegExp(q, 'i') },
      { email: new RegExp(q, 'i') }
    ]
  } : {};
  const users = await User.find(filter).sort({ firstName: 1 });
  res.render('users/index', { users, q });
});

app.get('/activities', async (req, res) => {
  const activities = await Activity.find().populate('userId').populate('movieId').sort({ activityTime: -1 }).limit(50);
  res.render('activities/index', { activities });
});

app.listen(PORT, () => console.log(`MovieStream app running on port ${PORT}`));
