import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import postRoute from './routes/posts.routes.js';
import userRoute from './routes/user.routes.js';
import authRoute from './routes/auth.routes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/posts', postRoute)
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});