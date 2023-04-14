import users from '../models/usersModel.js'
import jwt from 'jsonwebtoken';


export const refreshToken = async(req, res) =>{
    try {
        const refreshToken = req.cookies.refreshToken;
        // jika tokennya tdk ada maka
        if(!refreshToken) return res.sendStatus(401)
        // jika tokennya ada maka kita akan bandingkan dengan token yang terdapat di database
        const user = await users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        // jika tidak cocok maka
        if(!user[0]) return res.sendStatus(403)
        // jika cocok maka
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decode) => {
            // jika error maka
            if(error) return res.sendStatus(403);
            
            // jika tidak maka
            const userId = user[0].id;
            const username = user[0].username;
            const email = user[0].email; 
        
            const accessToken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'});
            res.json( { accessToken } );
        });
    } catch (error) {
        console.log(error);
    }
}


