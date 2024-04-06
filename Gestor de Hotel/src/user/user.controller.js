'use strict'

import User from './user.model.js'
import { encrypt, checkPassword } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'



export const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'ADMIN' });
        if (!existingAdmin) {
            const hashedPassword = await encrypt('12345678');
            const defaultAdmin = new User({
                name: 'Admin',
                surname: 'Admin',
                username: 'admin',
                password: hashedPassword,
                email: 'admin@example.com',
                phone: '12345678',
                role: 'ADMIN'
            });
            await defaultAdmin.save();
            console.log('Se creó el administrador por defecto.');
        } else {
            console.log('Ya existe un administrador en la base de datos.');
        }
    } catch (error) {
        console.error('Error al crear el administrador por defecto:', error);
    }
}