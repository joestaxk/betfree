const router = (require('express')).Router();
import timer from "./timer.router";

type routeType<T> = [{path:T, resource: (arg0: object, arg1: object) => any }];

const defineRoutes:routeType<string> = [
    {
        path: '/timer',
        resource: timer
    }
]

for (const {path,resource} of defineRoutes) {
    router.use(path, resource)
}


module.exports = router;
