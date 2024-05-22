require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./utils/errorHandler');
const myLogger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.LOGGING === "true") {
    app.use(myLogger({ upperCase: false }));
}

try {
    app.use('/auth', authRoutes);
} catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
    });
}

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});