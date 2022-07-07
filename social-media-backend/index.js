const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

const port = 8800;

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
}, () => console.log('connected to mongodb'));

//middleware
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.listen(port, () => {
  console.log(`server is listening on ${port}`)
});