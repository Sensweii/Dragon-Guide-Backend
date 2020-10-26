import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import costumeRoute from './routes/costumeRoute';


dotenv.config();
const mongodbUrl = process.env.MONGODB_URI || 'mongodb://localhost/amazona';
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/costumes', costumeRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log('Server started.');
});