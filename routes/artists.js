const express = require('express');
const router = express.Router();
const { artists, songs } = require('../data');

// Artists Endpoints
/**
 * @swagger
 * tags:
 *   name: Artists
 *   description: API for managing artists
 */

/**
 * @swagger
 * /api/artists:
 *   get:
 *     summary: Returns the list of all the artists
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: The list of the artists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artist'
 */
router.get('/', (req, res) => {
  res.json(artists);
});

/**
 * @swagger
 * /api/artists/{id}:
 *   get:
 *     summary: Get the artist by id
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The artist id
 *     responses:
 *       200:
 *         description: The artist description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       404:
 *         description: The artist was not found
 */
router.get('/:id', (req, res) => {
  const artist = artists.find(a => a.id === req.params.id);
  if (artist) {
    res.json(artist);
  } else {
    res.status(404).send('Artist not found');
  }
});

/**
 * @swagger
 * /api/artists/{id}/songs:
 *   get:
 *     summary: Get all songs by an artist
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The artist id
 *     responses:
 *       200:
 *         description: A list of songs by the artist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       404:
 *         description: The artist was not found
 */
router.get('/:id/songs', (req, res) => {
  const artist = artists.find(a => a.id === req.params.id);
  if (!artist) {
    return res.status(404).send('Artist not found');
  }
  const artistSongs = songs.filter(s => s.artist === artist.name);
  res.json(artistSongs);
});

module.exports = router;
