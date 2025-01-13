import express from 'express';
//import {User} from './models/userModel.js';

const app = express();
// app.use(express.json());
// // Route to create a user
// app.post('/create-user', async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const newUser = await User.create({ name, email, password, role });
//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Error creating user' });
//   }
// });


export default app;