import express from 'express';
import { signupController, loginController } from '../controllers/signupController.js'; // Import signupController correctly

const router = express.Router();

// Define the POST route for signup
router.post('/signup', signupController);
router.post('/login', loginController);

export default router; // Use 'export default' instead of 'module.exports'
