
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const mongodDBURI="mongodb+srv://salilnigam1212:3duqsBX0WfYIacL8@cluster0.50rjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongodDBURI, { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  value: { type: Number, default: 0 },
});

const User = mongoose.model('User', UserSchema);
app.get("/",(req,res)=>res.json("This is dashboard page"))
// Registration API
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  // Check if the email is already registered
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({ message: 'Email already registered' });
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create and save the new user
  user = new User({ username, email, password: hashedPassword });
  await user.save();

  res.send({ message: 'User registered successfully' });
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: 'Invalid email or password' });
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send({ message: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
  res.send({ token });
});

// Get current value
app.get('/value', async (req, res) => {
  const { userId } = jwt.verify(req.headers.authorization.split(' ')[1], 'SECRET_KEY');
  const user = await User.findById(userId);
  res.send({ value: user.value });
});

// Update value
app.post('/update-value', async (req, res) => {
  const { userId } = jwt.verify(req.headers.authorization.split(' ')[1], 'SECRET_KEY');
  const { value } = req.body;
  await User.findByIdAndUpdate(userId, { value });
  res.send({ success: true });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
