"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = (require('express')).Router();
const timer_router_1 = require("./timer.router");
const defineRoutes = [
    {
        path: '/timer',
        resource: timer_router_1.default
    }
];
for (const { path, resource } of defineRoutes) {
    router.use(path, resource);
}
module.exports = router;
