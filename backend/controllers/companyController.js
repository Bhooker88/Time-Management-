const Company = require('../models/Company');

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.createCompany = async (req, res) => {
    try {
        const newCompany = new Company(req.body);
        await newCompany.save();
        res.status(201).json(newCompany);
    } catch (err) {
        res.status(400).json({ message: "Error creating company" });
    }
};

exports.getCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ message: "Company not found" });
        res.status(200).json(company);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};