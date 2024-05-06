const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { sendEmail } = require('../services/emailService');

router.post('/register', async (req, res) => {
    try {
        const user = await register(req.body); // Assuming register function returns the registered user
        await sendEmail(user.email, "Welcome to Our Service", "Thank you for registering!");
        res.status(201).json({ message: "User registered successfully, email sent!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', login);

module.exports = router;