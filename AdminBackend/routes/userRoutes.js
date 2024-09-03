import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/allVenders', async (req, res) => {
  try {
    const users = await User.find();  
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/saveVenders', async (req, res) => {
  const { username, email, PhoneNumber, Active } = req.body;
  const newUser = new User({ username, email, PhoneNumber, Active });

  try {
    let errors = [];
    if(!username){
       errors.push({msg: 'Please Enter UserName Field'})
       return res.status(400).json({ errors });
    }
    if(!email){
      errors.push({msg: 'Please Enter Email Field'})
      return res.status(400).json({ errors });
   }
    if(!PhoneNumber){
    errors.push({msg: 'Please Enter PhoneNumber Field'})
    return res.status(400).json({ errors });
   }
   const existingUserByName = await User.findOne({ username });
   if (existingUserByName) {
     errors.push({ msg: 'username already registered.' });
   }
   const existingUser = await User.findOne({ email });
   if (existingUser) {
     errors.push({ msg: 'Email already registered.' });
   }

   if (errors.length > 0) {
     return res.status(400).json({ errors });
   }
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(400).json({ message: error.message });
  }
});
 
router.put('/updateVenders/:email', async (req, res) => {
  const { email } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ email }, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/deleteVenders/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const deletedUser = await User.findOneAndUpdate({ email }, { Active: false }, { new: true });
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/restoreVenders/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const restoredUser = await User.findOneAndUpdate({ email }, { Active: true }, { new: true });
    if (!restoredUser) {
      return res.status(404).json({ message: 'User not found or already active' });
    }
    res.json(restoredUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
