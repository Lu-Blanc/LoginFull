import users from "../models/usersModel.js";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";

export const deleteUser = async(req,res)=>{
    try {
        await users.destroy({
            where:{
                id : req.params.id
            }
        })
        res.status(200).json({msg: 'Berhasil'})
    } catch (error) {
        console.log(error);
    }
}

export const createUser = async (req, res)=>{
    const { username, password, email, confirmpassword } = req.body;
    if (password !== confirmpassword) return res.status(400).json({ msg: 'Password dan Confirm Password Tidak Sama'});
    // jika password dan confirm passwordnya cocok
    const salt = await bcrypt.genSalt();
    // setelah itu password akan di hash hash('password yang akan di hash','saltnya')
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        // register
        await users.create({
            username: username,
            password: hashPassword,
            email: email
        });
        // jika berhasil maka
        res.status(200).json({msg:'Register Sukses'});
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (req, res)=>{
    try {
        // mencari data berdasarkan email
        const user = await users.findAll({
            where: {
                email: req.body.email
            }
        });
        // jika email ditemukan maka kita akan membandingkan password yang kirim dengan yang ada di database
        const match = await bcrypt.compare(req.body.password, user[0].password);
        
        // jika password tidak sama maka
        if(!match) return res.status(400).json({msg: 'Password Salah'});
        
        // jika password benar maka akan di constrak 1 per 1
        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        
        // lalu membuat acces token
        const accessToken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '120s'}
        );
        const refreshToken = jwt.sign({userId, username, email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'}
        );

        // lalu menyimpan resresh tokennya ke dalam database berdasarkan id
        await users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        }); 

        // setelah itu membuat http only cookie yang akan di kirim ke client
        // cookie('nama cookie','value',{opsi})
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            // expire cookie dalam ml second
            maxAge: 24 * 60 * 60 * 1000
            // jika menggunakan https menggunakan
            // secure: true 
        });

        // lalu memberikan acces token ke client
        res.json({ accessToken });
    } catch (error) {
        // jika email tidak ditemukan maka
        res.status(404).json({msg: 'Email tidak ditemukan'});
    }
}

export const getUser = async (req, res) =>{
    try {
        const user = await users.findAll({
            attributes:[
            'id',
            'username',
            'email'   
            ]
        });
        res.json( user );
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) =>{
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
        const userId = user[0].id
        await users.update({refreshToken: null},{
            where:{
                id: userId
            }
        })
        res.clearCookie('refreshToken')
        return res.sendStatus(200)
}