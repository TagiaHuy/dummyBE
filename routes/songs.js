const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { songs } = require('../data');

// Songs Endpoints
/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: API for managing songs
 */

/**
 * @swagger
 * /api/songs:
 *   get:
 *     summary: Returns the list of all the songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: The list of the songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 */
router.get('/', (req, res) => {
  res.json(songs);
});

/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     summary: Get the song by id
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The song id
 *     responses:
 *       200:
 *         description: The song description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       404:
 *         description: The song was not found
 */
router.get('/:id', (req, res) => {
  const song = songs.find(s => s.id === req.params.id);
  if (song) {
    res.json(song);
  } else {
    res.status(404).send('Song not found');
  }
});

/**
 * @swagger
 * /api/songs/stream/{id}:
 *   get:
 *     summary: Stream the song by id
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The song id
 *     responses:
 *       200:
 *         description: The song audio stream
 *         content:
 *           audio/mpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: The song was not found
 */
router.get('/stream/:id', (req, res) => {
  const song = songs.find(s => s.id === req.params.id);
  if (!song) {
    return res.status(404).send('Song not found');
  }

  const filePath = path.join(__dirname, '../assets', song.filePath);
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/mpeg',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mpeg',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

module.exports = router;
