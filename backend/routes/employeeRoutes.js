const express = require('express');
const router = express.Router();
const { getEmployees, addEmployee } = require('../controllers/employeeController');

router.route('/').get(getEmployees).post(addEmployee);

module.exports = router;