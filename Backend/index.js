import express  from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './src/routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/test", (req, res) => {
  res.json({ message: "Hello from the server!" });
});
app.use('/', router);
console.log("hey")

mongoose.connect('mongodb+srv://abhivishwkarmaa52:IgbGH8u3MRps1eSb@tasksubmission.kcszkls.mongodb.net/?retryWrites=true&w=majority&appName=tasksubmission')
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));
