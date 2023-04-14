import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // jika token kosong maka
    if(token == null) return res.sendStatus(401);
    // jika token ada maka akan di verifikasi
    // verify('tokennya',secret key)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decode) => {
        // jika error maka
        if(error) return res.sendStatus(403);
        req.email = decode.email;
        next();
    })
}