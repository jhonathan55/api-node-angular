import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as cors from 'cors';
import routes from "./routes";
import helmet from "helmet";

const PORT = process.env.PORT || 3000;

createConnection().then(async () => {

    // create express app
    const app = express();
    //middlewqares
    app.use(cors());
    //app.use(helmet());
    app.use(express.json());

    //routes
    app.use('/', routes);

    // start express server
    app.listen(PORT, () => console.log(`server ok ${PORT}`));

}).catch(error => console.log(error));
