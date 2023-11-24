const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
