// import express, { NextFunction, Request, Response } from 'express';
// import { MongoClient } from 'mongodb';
// import { client } from './services';
// import { validationResult } from 'express-validator';
// import { TodoRoutes } from './routes/TodoRoutes';
// import { ServerInfoRoutes } from './routes/ServerInfoRoutes';
// import morgan from 'morgan';
// import dotenv from 'dotenv';
// import https from 'https';
// import fs from 'fs';

// dotenv.config();

// const options = {
//     key: fs.readFileSync('/etc/ssl/certs/myserver-key.pem'),
//     cert: fs.readFileSync('/etc/ssl/certs/myserver-cert.pem')
// };

// const app = express();

// app.use(express.json()) // run before get request, process body of function in json\
// app.use(morgan('tiny'))
// // if have multiple Routes
// // const OtherRoutes = []
// const Routes = [...TodoRoutes, ...ServerInfoRoutes]

// // change to Routes.forEach
// Routes.forEach((route) => {
//     (app as any)[route.method] (
//         route.route,
//         route.validation,
//         async (req: Request, res: Response, next: NextFunction) => {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 // if there are validation errors, send a response with error messages
//                 return res.status(400).json({ errors: errors.array() });
//             }

//             try {
//                 await route.action(
//                     req,
//                     res,
//                     next,
//                 );
//             } catch (err) {
//                 console.log(err)
//                 return res.sendStatus(500); // dont expose internal server workings
//             }
//         } 
//     )
// })

// client.connect().then(() => {
//     console.log("MongoDB Client Connected");

//     app.listen(process.env.PORT, () => {
//         console.log("Listening on port " + process.env.PORT);
//     });
// }).catch(err => {
//     console.error(err);
//     client.close();
// });

import express, { NextFunction, Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { client } from './services';
import { validationResult } from 'express-validator';
import { TodoRoutes } from './routes/TodoRoutes';
import { ServerInfoRoutes } from './routes/ServerInfoRoutes';
import morgan from 'morgan';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';

dotenv.config();

// Read your self-signed certificate and private key
const options = {
    key: fs.readFileSync('/etc/ssl/certs/myserver-key.pem'),
    cert: fs.readFileSync('/etc/ssl/certs/myserver-cert.pem')
};

const app = express();

app.use(express.json()) // Process body of function in JSON
app.use(morgan('tiny'));

// Combine all routes, including your Todo and ServerInfo routes
const Routes = [...TodoRoutes, ...ServerInfoRoutes];

// Apply routes to the app
Routes.forEach((route) => {
    (app as any)[route.method](
        route.route,
        route.validation,
        async (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // If there are validation errors, send a response with error messages
                return res.status(400).json({ errors: errors.array() });
            }

            try {
                await route.action(req, res, next);
            } catch (err) {
                console.log(err);
                return res.sendStatus(500); // Don't expose internal server workings
            }
        }
    );
});

// Connect to MongoDB and start the HTTPS server
client.connect()
    .then(() => {
        console.log("MongoDB Client Connected");

        // Create an HTTPS server instead of HTTP
        https.createServer(options, app).listen(process.env.PORT, () => {
            console.log("Listening on port " + process.env.PORT);
        });
    })
    .catch(err => {
        console.error(err);
        client.close();
    });
