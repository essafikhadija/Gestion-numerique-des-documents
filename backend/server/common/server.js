import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import LOGGER from './logger';
import compression from 'compression';
import connctDB from './connexiondb';

const app = new Express();

export default class ExpressServer {
    constructor() {
        const root = path.normalize(`${__dirname}/../..`);
        app.set('appPath', `${root}client`);
        app.use(bodyParser.json({limit: process.env.REQUEST_LIMIT || '100kb'}));
        app.use(bodyParser.urlencoded({extended: true, limit: process.env.REQUEST_LIMIT || '100kb'}));
        app.use(cookieParser(process.env.SESSION_SECRET));
        app.use(Express.static(`${root}/public`));
        app.use(compression());
    }

    connectToDB() {
        connctDB();
        return this;
    }

    router(routes) {
        //swaggerify(app, routes);
        routes(app);
        return this;
    }

    listen(port = process.env.PORT) {
        const welcome = p => () => {
            LOGGER.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`)
        };
        http.createServer(app).listen(port, welcome(port));
        return app;
    }
}
