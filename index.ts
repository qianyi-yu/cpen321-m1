import express, { NextFunction, Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { client } from './services';
import { validationResult } from 'express-validator';
import { TodoRoutes } from './routes/TodoRoutes';
import { ServerInfoRoutes } from './routes/ServerInfoRoutes';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json()) // run before get request, process body of function in json\
app.use(morgan('tiny'))
// if have multiple Routes
// const OtherRoutes = []
const Routes = [...TodoRoutes, ...ServerInfoRoutes]

// change to Routes.forEach
Routes.forEach((route) => {
    (app as any)[route.method] (
        route.route,
        route.validation,
        async (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // if there are validation errors, send a response with error messages
                return res.status(400).json({ errors: errors.array() });
            }

            try {
                await route.action(
                    req,
                    res,
                    next,
                );
            } catch (err) {
                console.log(err)
                return res.sendStatus(500); // dont expose internal server workings
            }
        } 
    )
})

client.connect().then(() => {
    console.log("MongoDB Client Connected");

    app.listen(process.env.PORT, () => {
        console.log("Listening on port " + process.env.PORT);
    });
}).catch(err => {
    console.error(err);
    client.close();
});
