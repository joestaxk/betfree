"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = (require('express')).Router();
const epl_1 = require("./epl");
const defineRoutes = [
    {
        path: '/epl',
        resource: epl_1.EplRoute.createNextEvent
    }
];
for (const { path, resource } of defineRoutes) {
    router.use(path, resource);
}
module.exports = router;
