import jwt from 'jsonwebtoken';
import User from '../model/User.js';

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // Check json with web token exists & is verified
    if (token) {
        jwt.verify(token, 'Authentication Secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
            
    } else {
        res.redirect('/login');
    }
}

// Check current user

export const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'Authentication Secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}


