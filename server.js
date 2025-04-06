const { exec } = require('child_process');
const express = require('express');
const path = require('path'); 
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ExcelJS = require("exceljs");
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const nodemailer = require("nodemailer");
require('dotenv').config({ path: 'request_sender.env' });

const app = express();
const PORT = process.env.PORT || 3002;

// ✅ Serve all static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Route for root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main', 'main.html'));
});

app.get('/fashion', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'fashion', 'fashion.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register', 'register.html'));
});

app.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'aboutus', 'aboutus.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact', 'contact.html'));
});

// ✅ Test route
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'testAlex.html'));
});

// ✅ 404 fallback (optional)
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});




// ✅ Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is running at: http://localhost:${PORT}`);
    console.log(`🔗 LAN access (if needed): http://172.20.10.12:${PORT}`);
});
