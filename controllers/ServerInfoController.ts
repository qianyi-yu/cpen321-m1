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

    async getServerTime(req: Request, res: Response, nextFunction: NextFunction) {
        try {
            const serverTime = new Date().toISOString();
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

    // async postTodos(req: Request, res: Response, nextFunction: NextFunction) {
    //     const createData = await client.db("tutorial").collection("todolist").insertOne(req.body);
    //     res.status(200).send(`Created todo with id: ${createData.insertedId}`);
    // };

    // async putTodos(req: Request, res: Response, nextFunction: NextFunction) {
    //     const updateData = await client.db("tutorial").collection("todolist").replaceOne({ _id: new ObjectId(req.params.id)}, req.body);
        
    //     if (!updateData.acknowledged || updateData.modifiedCount == 0) {
    //         res.status(400).send("Todo with given id does not exist")
    //     } else {
    //         res.status(200).send("Todo updated")
    //     }
    // };

    // async deleteTodos(req: Request, res: Response, nextFunction: NextFunction) {
    //     const deleteData = await client.db("tutorial").collection("todolist").deleteOne({ _id: new ObjectId(req.params.id)}, req.body);
        
    //     if (!deleteData.acknowledged || deleteData.deletedCount == 0) {
    //         res.status(400).send("Todo with given id does not exist")
    //     } else {
    //         res.status(200).send("Todo deleted")
    //     }
    // };
}