import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import { requireAuth, checkUser } from './middleware/authMiddleware.js';


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/users', requireAuth, (req, res) => res.render('users'));
app.get('/staffs', requireAuth, (req, res) => res.render('staffs'));
app.get('/managers', requireAuth, (req, res) => res.render('managers'));
app.get('/admin', requireAuth, (req, res) => res.render('admin'));

app.use(authRoute);



// database connection
const dbURI = 'mongodb+srv://nodEdo:Rejoicedo123.@cluster0.dyjcuei.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err.message));



