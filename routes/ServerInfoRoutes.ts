import { body, param } from "express-validator";
import { ServerInfoController } from "../controllers/ServerInfoController";

const controller = new ServerInfoController();

export const ServerInfoRoutes = [
    {
        method: "get",
        route: "/server-ip",
        action: controller.getServerIp,
        validation: []
    },
    {
        method: "get",
        route: "/server-time",
        action: controller.getServerTime,
        validation: []
    },
    {
        method: "get",
        route: "/developer-name",
        action: controller.getUserName,
        validation: []
    },
]