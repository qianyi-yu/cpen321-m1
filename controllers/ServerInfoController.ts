import { NextFunction, Request, Response } from 'express';
import { format } from 'date-fns-tz'; 
import { client } from '../services';
import { ObjectId } from 'mongodb';
import os from 'os';

export class ServerInfoController {
    async getServerIp(req: Request, res: Response, nextFunction: NextFunction) {
        try {
            const serverIp = req.socket.localAddress || "Unknown"; // || os.networkInterfaces().eth0[0].address ||
            res.status(200).send({ serverIp });
        } catch (err) {
            console.error("Error getting server IP: ", err)
            res.status(500);
        }
    };

    async getServerTime(req: Request, res: Response, nextFunction: NextFunction) {
        try {
            const now = new Date();
            const serverTime = format(now, "HH:mm:ss 'GMT'XXX", { timeZone: "GMT" }); // Formats in the required GMT+hh:ss format
            res.status(200).send({ serverTime });
        } catch (err) {
            console.error("Error getting server time: ", err)
            res.status(500);
        }
    };

    async getUserName(req: Request, res: Response, nextFunction: NextFunction) {
        try {
            const userName = {firstName: "Qian Yi", lastName: "Yu"};
            res.status(200).send(userName);
        } catch (err) {
            console.error("Error getting username: ", err)
            res.status(500);
        }
    };
}