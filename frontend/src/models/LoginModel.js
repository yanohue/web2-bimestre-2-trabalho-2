export default class LoginModel {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        // code here
    }

    async authenticate() {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.username, password: this.password })
            });


            if(!response.ok) {
                let err = await response.json();

                throw new Error(err.message);
            }

            const authData = await response.json();

            localStorage.setItem('token', authData.token);

            return authData;
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async register() {
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.username, password: this.password })
            });
 

            if(!response.ok) {
                let err = await response.json();

                throw new Error(err.message);
            }

            const newUser = await response.json();

            return newUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}