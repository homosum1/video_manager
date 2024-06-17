const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {sequelize} = require('./database');
const authRoutes = require('./auth/authRoutes');
const userRoutes = require('./user/userRoutes');

const port = 3000;
const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

sequelize.sync().then(() => {
    console.log('DB running ✅');
}).catch(err => {
    console.error('Unable to sync database 💥', err);
});

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
