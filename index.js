require('dotenv').config();
const app = require('./config/middleware');
const pool = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./utils/errorHandler');

const PORT = process.env.PORT || 3000

app.use('/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    try {
        const connection = await pool.getConnection();

        if (await connection.ping()) {
            console.log('Successfully connected to the database');
        } else {
            console.log('Failed connection to database');
        }

        connection.release();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});