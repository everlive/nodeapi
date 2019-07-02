import 'dotenv/config';
import cors from 'cors';
import express from 'express';


const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(process.env.PORT, () =>
console.log('hello node from ${process.env.PORT}'),
);

console.log(process.env.MY_SECRET);