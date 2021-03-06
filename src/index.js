import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import models from './models';
import express from 'express';
import uuidv4 from 'uuid/v4';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.get('/', (req, res) => {
    res.send('Hello world');
});
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    }
    next();
  });

app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
  });
  app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
  });
  app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
  });
  
  app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
  });
  
  app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
  });

  app.get('/users', (req, res) => {
    return res.send(Object.values(req.context.models.users));
  });
  
  app.get('/users/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
  });

  app.get('/messages', (req, res) => {
    return res.send(Object.values(req.context.models.messages));
  });
  
  app.get('/messages/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId]);
  });
  app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
      id,
      text: req.body.text,
      userId: req.context.me.id,
    };
  
    req.context.models.messages[id] = message;
  
    return res.send(message);
  });
  app.delete('/messages/:messageId', (req, res) => {
    const {
      [req.params.messageId]: message,
      ...otherMessages
    } = req.context.models.messages;
  
    req.context.models.messages = otherMessages;
  
    return res.send(message);
  });
  
  app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
  });
  
  app.put('/users/:userId', (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`,);
  });
  
  app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
  });

  let users = {
    1: {
      id: '1',
      username: 'Robin Wieruch',
    },
    2: {
      id: '2',
      username: 'Dave Davids',
    },
  };
  
  let messages = {
    1: {
      id: '1',
      text: 'Hello World',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2',
    },
  };
app.listen(process.env.PORT, () =>
console.log(`hello node from ${process.env.PORT}`),
);

console.log(process.env.MY_SECRET);