export default class AuthRepository {
    constructor(User) {
        this.User = User;
    }

/*////////////////////////////////////////////////////////////////////////////
                    QUERIES
*/////////////////////////////////////////////////////////////////////////////

    async findByUsername(username) {
        try {
            const user = this.User.findOne({ where: { username } });
            // console.log(await user);
            return user;
        } catch(error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    async registerNewUser(username, password) {
        try {
            const newUser = this.User.create({
                username: username,
                password: password
            });
            return newUser;
        } catch(error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}



