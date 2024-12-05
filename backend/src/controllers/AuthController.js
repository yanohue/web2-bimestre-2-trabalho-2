import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config({ path: './src/resources/.env' });

export default class AuthController {
    constructor(app, authService)  {
        this.app = app;
        this.authService = authService;
    }

/*////////////////////////////////////////////////////////////////////////////
                    ENDPOINTS
*/////////////////////////////////////////////////////////////////////////////

    async start() {
        this.app.post('/login', this.login.bind(this));
        this.app.post('/register', this.register.bind(this));
    }


    async login(req, res) {
        try {
            const { username, password } = req.body;
            const token = await this.authService.authenticate(username, password);
            if(token) {
                res.status(200).send({ auth: true, token: token });
            }
        } catch(error) {
            res.status(500).send({ auth: false, message: error.message });
        }
    }

    async register(req, res) {
        try {
            const { username, password } = req.body;
            const newUser = await this.authService.register(username, password);
            if(newUser) {
                res.status(200).send(newUser);
            }
        } catch(error) {
            res.status(500).send({message: error.message});
        }

    }

/*////////////////////////////////////////////////////////////////////////////
                    AUTHENTICATION
*/////////////////////////////////////////////////////////////////////////////

    async authToken(req, res, next) {
        const { authorization } = req.headers;

        if(!authorization) {
            return res.status(401).send({auth: false, message:'Token not found!'});
        }

        try {
            const token = authorization.split(' ')[1]; //Bearer token
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if(err) {
                    return res.status(401).send({auth: false, message:'Invalid token!'});
                }
                req.username = decoded.username;
                next();
            });
        } catch(error) {
            return res.status(403).send({message: error.message});
        }
    }
}