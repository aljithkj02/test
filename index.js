const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter');
const todoRouter = require('./routes/todoRouter');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send('HOME')
})

app.use('/auth', authRouter);
app.use('/todo', todoRouter);

const startServer = async ()=> {
    await connectDB();
    app.listen(process.env.PORT, ()=> {
        console.log('Listening to PORT', process.env.PORT);
    })
}
startServer();