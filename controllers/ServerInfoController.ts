import { NextFunction, Request, Response } from 'express';
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

    async getServerTime(req: Request, res: Response, next: NextFunction) {
        try {
            const now = new Date();
    
            // Format time in the desired format: hh:mm:ss GMT+hh:ss
            const timeZoneOffset = now.getTimezoneOffset(); // Offset in minutes
            const offsetHours = Math.abs(Math.floor(timeZoneOffset / 60));
            const offsetMinutes = Math.abs(timeZoneOffset % 60);
            const offsetSign = timeZoneOffset > 0 ? "-" : "+";
    
            const gmtOffset = `GMT${offsetSign}${String(offsetHours).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;
            const formattedTime = now.toISOString().split("T")[1].split(".")[0]; // Extract hh:mm:ss
    
            const serverTime = `${formattedTime} ${gmtOffset}`;
            res.status(200).send({ serverTime });
        } catch (error) {
            console.error("Error fetching server time", error);
            res.sendStatus(500);
        }
    }

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