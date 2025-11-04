const express = require('express');
const router = express.Router();

// Dummy user for authentication
const dummyUser = {
  id: '123',
  username: 'testuser',
  email: 'user@example.com',
  password: 'password123', // In a real app, never store plain passwords
};

// Authentication & User Management
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       500:
 *         description: Some server error
 */
router.post('/register', (req, res) => {
  // In a real app, you'd save the user to a database and generate a real JWT
  res.json({ token: 'dummy_jwt_token_for_registered_user' });
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === dummyUser.email && password === dummyUser.password) {
    res.json({ token: 'dummy_jwt_token_for_logged_in_user' });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get the current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/me', (req, res) => {
  // In a real app, you'd validate the JWT and return the user associated with it
  // For this dummy API, we'll just return the dummy user profile
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer dummy_jwt_token')) {
    res.json({ id: dummyUser.id, username: dummyUser.username, email: dummyUser.email });
  } else {
    res.status(401).send('Unauthorized');
  }
});

module.exports = router;
