const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const songsRouter = require('./routes/songs');
const playlistsRouter = require('./routes/playlists');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const searchRouter = require('./routes/search');

app.use('/api/songs', songsRouter);
app.use('/api/playlists', playlistsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/search', searchRouter);

app.get('/', (req, res) => {
  res.send('CMCMP3 API is running!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});