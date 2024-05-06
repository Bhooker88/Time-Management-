const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Rate Limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Authentication Middleware
const { authenticateToken } = require('./middleware/authMiddleware');
const { requireRole } = require('./middleware/roleMiddleware');

// Route handlers
app.get('/api/admin/data', authenticateToken, requireRole('admin'), (req, res) => {
    res.json({ adminData: "This is sensitive data only for admins" });
});
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Route imports
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const punchRoutes = require('./routes/punchRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/punches', punchRoutes);

// Set up server to listen on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
