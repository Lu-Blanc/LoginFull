import 'dotenv/config';
import express  from 'express';
import db from './config/db.js';
import router from './router/router.js'
import cookieParser from 'cookie-parser';
// import cors agar API kita dapat di akses ke domain lain
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5001

try {
    await db.authenticate();    
    console.log('Database Connection');
} catch (error) {
    console.log(error);
}

// cors({opsi})
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(cookieParser());
app.use(express.json());
app.use('/login',router);

app.listen(port,()=>{
    console.log(`Server Connection On ${port}`);
})