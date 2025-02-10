import express from 'express';
import postRoute from './routes/posts.routes.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/posts', postRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});