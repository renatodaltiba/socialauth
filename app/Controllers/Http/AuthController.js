'use strict'
const User = use('App/Models/User')
class AuthController {
    async callback({ally, auth}){
        const user = await ally.driver('google').getUser();

        const userDetails = {
            name: user.getName(),
            email: user.getEmail(),
            username: user.getNickname(),
            avatar: user.getAvatar(),
            token: user.getAccessToken(),
        }
        const whereClause = {
            email: user.getEmail()
        }
        const user2 = await User.findOrCreate(whereClause, userDetails)
        await auth.generate(user2)
        return 'Logged in'
    }
}

module.exports = AuthController
