const express = require('express');
const router = express.Router();
const { songs, playlists } = require('../data');

// User-Specific Data (in-memory for demonstration)
let recentlyPlayed = [];
let favorites = [];

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /api/users/me/recently-played:
 *   get:
 *     summary: Get recently played songs for the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of recently played songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       401:
 *         description: Unauthorized
 */
router.get('/me/recently-played', (req, res) => {
  res.json(recentlyPlayed.map(songId => songs.find(s => s.id === songId)).filter(Boolean));
});

/**
 * @swagger
 * /api/users/me/recently-played:
 *   post:
 *     summary: Add a song to the recently played list for the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *         description: The song was successfully added to the recently played list
 *       401:
 *         description: Unauthorized
 */
router.post('/me/recently-played', (req, res) => {
  const { songId } = req.body;
  if (!recentlyPlayed.includes(songId)) {
    recentlyPlayed.unshift(songId); // Add to the beginning
    if (recentlyPlayed.length > 10) { // Keep only last 10
      recentlyPlayed.pop();
    }
  }
  res.json({ message: 'Song added to recently played successfully.' });
});

/**
 * @swagger
 * /api/users/me/favorites:
 *   get:
 *     summary: Get favorite songs for the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of favorite songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       401:
 *         description: Unauthorized
 */
router.get('/me/favorites', (req, res) => {
  res.json(favorites.map(songId => songs.find(s => s.id === songId)).filter(Boolean));
});

/**
 * @swagger
 * /api/users/me/favorites:
 *   post:
 *     summary: Add a song to the favorites list for the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *         description: The song was successfully added to the favorites list
 *       401:
 *         description: Unauthorized
 */
router.post('/me/favorites', (req, res) => {
  const { songId } = req.body;
  if (!favorites.includes(songId)) {
    favorites.push(songId);
  }
  res.json({ message: 'Song added to favorites successfully.' });
});

/**
 * @swagger
 * /api/users/{userId}/playlists:
 *   get:
 *     summary: Get all playlists for a specific user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The list of playlists for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 */
router.get('/:userId/playlists', (req, res) => {
  // For simplicity, returning all playlists for any user ID
  res.json(playlists);
});

module.exports = router;
