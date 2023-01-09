const router = (require('express')).Router();
import { EplRoute } from "./epl";
import timer from "./timer.router";

type routeType<T> = {path:T, resource: (arg0: object, arg1: object) => any };

const defineRoutes:Array<routeType<string>> =  [
    {
        path: '/epl',
        resource: EplRoute.createNextEvent
    }
]

for (const {path,resource} of defineRoutes) {
    router.use(path, resource)
}


module.exports = router;
