const express = require('express');
const router = express.Router();
const { playlists } = require('../data');

// Playlists Endpoints
/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: API for managing playlists
 */

/**
 * @swagger
 * /api/playlists:
 *   get:
 *     summary: Returns the list of all the playlists
 *     tags: [Playlists]
 *     responses:
 *       200:
 *         description: The list of the playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 */
router.get('/', (req, res) => {
  res.json(playlists);
});

/**
 * @swagger
 * /api/playlists:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Playlist'
 *     responses:
 *       201:
 *         description: The playlist was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       500:
 *         description: Some server error
 */
router.post('/', (req, res) => {
  const { name, description, imageUrl } = req.body;
  const newPlaylist = {
    id: `playlist${playlists.length + 1}`,
    name,
    description,
    imageUrl,
    songs: [],
  };
  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
});

/**
 * @swagger
 * /api/playlists/{id}/songs:
 *   post:
 *     summary: Add a song to a playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The playlist id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               songId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The song was successfully added to the playlist
 *       404:
 *         description: The playlist was not found
 */
router.post('/:id/songs', (req, res) => {
  const playlist = playlists.find(p => p.id === req.params.id);
  if (!playlist) {
    return res.status(404).send('Playlist not found');
  }
  const { songId } = req.body;
  if (!playlist.songs.includes(songId)) {
    playlist.songs.push(songId);
  }
  res.json({ message: 'Song added to playlist successfully.' });
});

module.exports = router;
