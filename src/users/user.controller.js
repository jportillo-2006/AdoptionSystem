import { response, request } from "express";
import { hash } from "argon2"
import User from './user.model.js'

export const getUsers = async (req = request, res = response) => {
    try {
        const {limite = 10, desde = 0} = req.query;
        const query = {status: true};
        
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query

            )
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener usuarios',
            error
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const  { id } = req.params;
        const user= await User.findById(id);

        if(!user){
            return res.status(404).json({
                success: false,
                msg: 'Usuario not found'
            })
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener usuario',
            error
        })
    }
}

export const updateUser = async (req, res = response) => {
    try {
        const {id } = req.params
        const { _id, password, email, ...data } = req.body

        if(password){
            data.password = await hash(password)
        }

        const user = await User.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'Usuario actualizado',
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar user',
            error
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await Usuario.findOne({ email });

        if (!user) return res.status(404).json({ msg: 'Usuario not found' });
        
        if (!await verify(user.password, oldPassword)) 
            return res.status(400).json({ msg: 'Contraseña incorrecta' });

        user.password = await hash(newPassword);
        await user.save();

        res.status(200).json({ msg: 'Contraseña actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar contraseña', error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        
        const user = await User.findByIdAndUpdate(id, {status: false}, {new: true});

        const autheticatedUser = req.user;

        res.status(200).json({
            success: true,
            msg: 'Usuario desactivado',
            user,
            autheticatedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al desactivar usuario',
            error
        })
    }
}