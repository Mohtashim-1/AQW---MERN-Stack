const express = require('express')
const app = express()
const port = 3000
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


app.set('view engine', 'ejs');
app.set('views', './views');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(uploadsDir));


// File uploads
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname);
  }
});


const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif'];
    cb(null, allowed.includes(file.mimetype));
  }
});


// Single file upload
app.post('/upload', upload.single('photo'), (req, res) => {
  res.json({ filename: req.file.filename });
});


app.get('/testing', (req, res) => {
  res.send("Testing file upload: ");
});


// Multiple files
app.post('/upload-many', upload.array('photos', 5), (req, res) => {
  res.json({ files: req.files.map(f => f.filename) });
});


app.use('/uploads', express.static('uploads'));




// /// Authentication

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = '123';






// Register
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }

  try {
    const existing = await AuthUser.findOne({ username });
    if (existing) {
      return res.status(409).json({ error: 'username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await AuthUser.create({ username, passwordHash });
    res.status(201).json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Login
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }

  try {
    const user = await AuthUser.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));


const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);

const authUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const AuthUser = mongoose.model('AuthUser', authUserSchema);


app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/users', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/upload', (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Upload File</title>
      </head>
      <body>
        <h1>Upload a File</h1>
        <form action="/upload" method="post" enctype="multipart/form-data">
          <input type="file" name="photo" required />
          <button type="submit">Upload</button>
        </form>
      </body>
    </html>
  `);
});


app.set('view engine', 'ejs');
app.set('views', './views');







const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');



const logger = (req, res, next) => {
  console.log(`${req.method} | ${req.url} - ${new Date().toISOString()}`);
  next();
};
 


app.use(logger);
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/search', (req, res) => {
  const { q, page } = req.query;
  res.send(`Search: ${q}, Page: ${page}`);
});

// app.use('/users', userRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


app.get('/view', (req, res) => {
  res.render('index', {
    title: 'My Express App',
    name: 'World',
    f_name: 'Mohtashim',
    items: ['Apples', 'Bananas', 'Cherries'],
    product: 'Laptop'
  });
});


// let users = [
//   { id: 1, name: 'Alice', email: 'alice@example.com' },
//   { id: 2, name: 'Bob', email: 'bob@example.com' }
// ];


// app.get('/api/users', (req, res) => {
//   res.json(users);
// });
  

// app.get('/api/users/:id', (req, res) => {
//   const user = users.find(u => u.id === parseInt(req.params.id));
//   if (!user) return res.status(404).json({ error: 'User not found' });
//   res.json({ name: user.name, email: user.email });
// });
