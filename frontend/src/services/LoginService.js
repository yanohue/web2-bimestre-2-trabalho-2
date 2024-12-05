export default class LoginService {
    constructor(loginModel) {
        this.loginModel = loginModel;
        // code here
    }

    async handleLogin() {
        try {
            const authData = await this.loginModel.authenticate();
            return authData;
        } catch(error) {
            throw new Error(' '+ error.message);
        }
    }

    async handleRegister() {
        try {
            const newUser = await this.loginModel.register();
            return newUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}