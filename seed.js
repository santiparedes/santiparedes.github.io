require('dotenv').config();
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
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

const genreSchema = new mongoose.Schema({ name: String, description: String }, { timestamps: true });
const actorSchema = new mongoose.Schema({ name: String, birthYear: Number, country: String }, { timestamps: true });
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  country: String,
  segment: { name: String, shortName: String },
  interactions: [{ movieId: mongoose.Schema.Types.ObjectId, movieTitle: String, activity: String, rating: Number, watchedAt: Date, device: String }]
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
const Actor = mongoose.model('Actor', actorSchema);
const User = mongoose.model('User', userSchema);
const Activity = mongoose.model('Activity', activitySchema);

const genreData = [
  { name: 'Action', description: 'Fast paced stories with fights, chases or missions.' },
  { name: 'Comedy', description: 'Light movies focused on humor.' },
  { name: 'Drama', description: 'Character driven stories with emotional conflicts.' },
  { name: 'Sci-Fi', description: 'Technology, future worlds and science based fiction.' },
  { name: 'Thriller', description: 'Suspense and high tension plots.' }
];

const actorData = [
  { name: 'Emma Stone', birthYear: 1988, country: 'USA' },
  { name: 'Ryan Gosling', birthYear: 1980, country: 'Canada' },
  { name: 'Oscar Isaac', birthYear: 1979, country: 'Guatemala' },
  { name: 'Zendaya', birthYear: 1996, country: 'USA' },
  { name: 'Diego Luna', birthYear: 1979, country: 'Mexico' },
  { name: 'Ana de Armas', birthYear: 1988, country: 'Cuba' },
  { name: 'Pedro Pascal', birthYear: 1975, country: 'Chile' },
  { name: 'Florence Pugh', birthYear: 1996, country: 'UK' },
  { name: 'Dev Patel', birthYear: 1990, country: 'UK' },
  { name: 'Sofia Boutella', birthYear: 1982, country: 'Algeria' }
];

const movieTitles = [
  ['Neon City', 2020, ['Action', 'Sci-Fi'], ['Ryan Gosling', 'Ana de Armas']],
  ['Last Signal', 2021, ['Sci-Fi', 'Thriller'], ['Oscar Isaac', 'Zendaya']],
  ['The Small Cafe', 2019, ['Comedy', 'Drama'], ['Emma Stone', 'Dev Patel']],
  ['North Route', 2022, ['Action', 'Thriller'], ['Diego Luna', 'Pedro Pascal']],
  ['Silent Harbor', 2018, ['Drama', 'Thriller'], ['Florence Pugh', 'Oscar Isaac']],
  ['Galaxy Bread', 2023, ['Comedy', 'Sci-Fi'], ['Zendaya', 'Diego Luna']],
  ['The Archive', 2020, ['Drama', 'Sci-Fi'], ['Dev Patel', 'Sofia Boutella']],
  ['Final Train', 2024, ['Action', 'Drama'], ['Pedro Pascal', 'Emma Stone']],
  ['Blue Summer', 2017, ['Comedy', 'Drama'], ['Ryan Gosling', 'Florence Pugh']],
  ['Deep Orbit', 2025, ['Sci-Fi', 'Thriller'], ['Ana de Armas', 'Oscar Isaac']],
  ['Street Lights', 2016, ['Drama'], ['Diego Luna', 'Emma Stone']],
  ['The Double Agent', 2021, ['Action', 'Thriller'], ['Pedro Pascal', 'Sofia Boutella']],
  ['Weekend Plan', 2022, ['Comedy'], ['Dev Patel', 'Zendaya']],
  ['Red Valley', 2019, ['Action', 'Drama'], ['Florence Pugh', 'Diego Luna']],
  ['Quantum Door', 2023, ['Sci-Fi'], ['Oscar Isaac', 'Ana de Armas']],
  ['Hidden Review', 2018, ['Thriller'], ['Emma Stone', 'Pedro Pascal']],
  ['Midnight Studio', 2020, ['Comedy', 'Drama'], ['Ryan Gosling', 'Sofia Boutella']],
  ['Solar Kids', 2024, ['Sci-Fi', 'Comedy'], ['Zendaya', 'Dev Patel']],
  ['Cold Case 44', 2017, ['Thriller', 'Drama'], ['Ana de Armas', 'Florence Pugh']],
  ['The Last Premiere', 2025, ['Drama', 'Comedy'], ['Diego Luna', 'Oscar Isaac']]
];

const userFirstNames = ['Santiago', 'Andrea', 'Luis', 'Camila', 'Mateo', 'Valeria', 'Diego', 'Mariana', 'Pablo', 'Regina', 'Jorge', 'Sofia', 'Emilio', 'Daniela', 'Carlos'];
const userLastNames = ['Paredes', 'Gomez', 'Garza', 'Lopez', 'Santos', 'Molina', 'Perez', 'Ramirez', 'Vega', 'Castillo', 'Torres', 'Salinas', 'Mendez', 'Rojas', 'Flores'];
const segments = [{ name: 'Casual Viewer', shortName: 'CAS' }, { name: 'Premium Family', shortName: 'PRF' }, { name: 'Movie Fan', shortName: 'FAN' }];
const devices = ['iPhone', 'Android TV', 'Web', 'iPad', 'Roku'];
const activities = ['view', 'rating', 'favorite'];

async function seed() {
  if (!process.env.MONGODB_URI) throw new Error('Missing MONGODB_URI in .env');
  await mongoose.connect(process.env.MONGODB_URI);

  await Promise.all([
    Movie.deleteMany({}), Genre.deleteMany({}), Actor.deleteMany({}), User.deleteMany({}), Activity.deleteMany({})
  ]);

  await Genre.insertMany(genreData);
  const actors = await Actor.insertMany(actorData);

  const movies = await Movie.insertMany(movieTitles.map((m, index) => ({
    title: m[0],
    year: m[1],
    runtime: `${95 + index * 3} min`,
    summary: `A MovieStream test movie called ${m[0]} used to validate document modeling decisions.`,
    listPrice: Number((3.99 + (index % 4)).toFixed(2)),
    views: 1000 + index * 730,
    imageUrl: '',
    genres: m[2].map(name => ({ name })),
    cast: m[3].map((name, i) => ({
      actorId: String(actors.find(a => a.name === name)?._id || ''),
      name,
      character: i === 0 ? 'Lead' : 'Supporting'
    })),
    studio: { name: index % 2 === 0 ? 'Northstar Studios' : 'Pacific Frame', country: index % 2 === 0 ? 'USA' : 'Mexico' }
  })));

  const users = await User.insertMany(userFirstNames.map((firstName, index) => ({
    firstName,
    lastName: userLastNames[index],
    email: `${firstName.toLowerCase()}.${userLastNames[index].toLowerCase()}@example.com`,
    country: index % 3 === 0 ? 'Mexico' : index % 3 === 1 ? 'USA' : 'Canada',
    segment: segments[index % segments.length],
    interactions: []
  })));

  const activityDocs = [];
  for (const user of users) {
    for (let i = 0; i < 3; i++) {
      const movie = movies[(i + users.indexOf(user)) % movies.length];
      const activity = activities[(i + users.indexOf(user)) % activities.length];
      const doc = {
        userId: user._id,
        movieId: movie._id,
        activity,
        rating: activity === 'rating' ? 3 + (i % 3) : undefined,
        device: devices[(i + users.indexOf(user)) % devices.length],
        app: 'MovieStream Web',
        os: i % 2 === 0 ? 'iOS' : 'Android',
        activityTime: new Date(Date.now() - (i + 1) * 86400000)
      };
      activityDocs.push(doc);
      user.interactions.push({
        movieId: movie._id,
        movieTitle: movie.title,
        activity: doc.activity,
        rating: doc.rating,
        watchedAt: doc.activityTime,
        device: doc.device
      });
      await user.save();
    }
  }
  await Activity.insertMany(activityDocs);

  console.log('Seed completed: 20 movies, 5 genres, 10 actors, 15 users, 45 activities.');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
