import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config()

const { MONGO_USER, 
        MONGO_PASS,
        MONGO_CLUSTER, 
        GOOGLE_APPLICATION_CREDENTIALS 
    } = process.env


export default {
    fileSystem: {
        path: path.join(__dirname, '../persistence/DB'),
    },
    mongodb: {
        cnxStr: `mongodb+srv://${MONGO_USER}:${encodeURIComponent(MONGO_PASS)}${MONGO_CLUSTER}`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
    firebase: GOOGLE_APPLICATION_CREDENTIALS
}
