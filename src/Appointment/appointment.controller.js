import Appointment from './appointment.model.js';
import User from '../users/user.model.js';
import Pet from '../pet/pet.model.js';

export const addAppointment = async (req, res) => {

    try {
        const { date, userId, petId, notes } = req.body;

        const user = await User.findById(userId);
        const pet = await Pet.findById(petId);

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario not found.'
            })
        }

        if (!pet) {
            return res.status(404).json({
                success: false,
                msg: 'Mascota not found.'
            })
        }

        const appointment = new Appointment({
            date,
            user: userId,
            pet: petId,
            notes
        });

        await appointment.save();

        res.status(201).json({
            success: true,
            msg: 'La cita esta pendiente.',
            appointment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al hacer cita',
            error
        })
    }
    
}