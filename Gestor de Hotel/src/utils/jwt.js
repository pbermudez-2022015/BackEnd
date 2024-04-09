'use strict'

import jwt from 'jsonwebtoken'
const secretKey = '@SECRET_KEY@'

export const generateJwt = async (paylod) => {
    try {
        return jwt.sign(paylod, secretKey, {
            expiresIn: '6h',
            algorithm: 'HS256'
        })

    } catch (err) {
        console.error(err)
        return err
    }
}