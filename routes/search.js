const express = require('express');
const router = express.Router();
const { songs, playlists, artists } = require('../data');

// Search
/**
 * @swagger
 * tags:
 *   name: Search
 *   description: API for searching content
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search for songs, artists, and playlists
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query
 *     responses:
 *       200:
 *         description: The search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 songs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Song'
 *                 artists:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Artist'
 *                 playlists:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Playlist'
 */
router.get('/', (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
  );
  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(query) || playlist.description.toLowerCase().includes(query)
  );

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(query)
  );

  res.json({
    songs: filteredSongs,
    artists: filteredArtists,
    playlists: filteredPlaylists,
  });
});

module.exports = router;
