import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import routes from './routes/songs';

const app: Express = express();

dotenv.config()

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');

//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
//         return res.status(200).json({});
//     }

//     next();
// });

app.use('/', routes);

app.use((req, res, next) => {
    const error = new Error('404 not found');
    return res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);
const port: any = process.env.PORT ?? 5001;
httpServer.listen(port, () => console.log(`The server is running on port ${port}`));