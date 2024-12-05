import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './src/resources/.env' });

export default class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    
    async authenticate(username, password) {
        try {
            const user = await this.authRepository.findByUsername(username);
            let token = null;
            if(!user) {
                throw new Error('User not found!');
            }
            else if(user && user.password !== password) {
                throw new Error('Invalid password!');
            }
            else if(user && user.password === password) {
                token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
            }
            return token;
        } catch(error) {
            throw new Error(error.message);
        } 
    }

    async register(username, password) {
        try {
            const newUser = await this.authRepository.registerNewUser(username, password);
            return newUser;
        } catch(error) {
            throw new Error('Username is not available!');
        }
    }
    
}