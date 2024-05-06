const express = require('express');
const router = express.Router();
const { getAllCompanies, createCompany, getCompany } = require('../controllers/companyController');

router.route('/').get(getAllCompanies).post(createCompany);
router.route('/:id').get(getCompany);

module.exports = router;