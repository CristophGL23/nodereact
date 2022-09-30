import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


let refreshTokens = [];
export const Refresh = async(req, res) => {
    const refreshToken = req.body.token

    if (!refreshToken) return res.status(401).json("No estas autenticado.")
    if (!refreshTokens.includes(refreshToken)){
        return res.status(403).json("No se puede recargar tu token.")
    }
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        
        refreshTokens.push(newRefreshToken);
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })
    })
}


const generateAccessToken = (user) => {
    return jwt.sign({id: user.id, email: user.email}, 
    "mySecretKey",
    {expiresIn: 60*60*12})
    
}

const generateRefreshToken = (user) => {
    return jwt.sign({id: user.id, email: user.email}, 
    "myRefreshSecretKey")
}
export const Login = async(req, res) => {
    try {
        const user = await UserModel.findAll({
            where: {
                email: req.body.email,
                password: req.body.password,
            }
        });

        if(user[0]){
            // Generate an access token.
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            refreshTokens.push(refreshToken);
            res.json({
                user_name: user[0].user_name,
                email: user[0].email,
                name_complete: user[0].name_complete,
                is_admin: user[0].is_admin,
                id_user: user[0].id,
                accessToken,
                refreshToken
            })
            // res.cookie('token', accessToken, { httpOnly: true })
        } else {
            res.status(400).json("Correo o contraseña incorrectas.")
        }


    } catch (error) {
        res.status(404).json({msg:error});
    }
}

export const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "mySecretKey", (err,user) => {
            if(err){
                return res.status(401).json("El token no es valido!");
            }

            req.user = user;
            next();
        })
    } else {
        res.status(401).json("No estas autenticado");
    }
}

export const testVerify = (req, res) => {
    if (req.user.id === req.params.id) {
        res.status(200).json("Usuario eliminado")
    } else {
        res.status(403).json("No estas permitido eliminar este usuario")

    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("Cerraste Sesión correctamente!!")
}
 
  
