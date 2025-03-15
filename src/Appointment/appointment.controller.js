import Appointment from './appointment.model.js';
import User from '../users/user.model.js';
import Pet from '../pet/pet.model.js';

export const addAppointment = async (req, res) => {
    try {
        const { date, userId, petId, comments } = req.body;
        const [user, pet] = await Promise.all([
            User.findById(userId),
            Pet.findById(petId)
        ]);

        if (!user || !pet) {
            return res.status(404).json({
                success: false,
                msg: !user ? 'Usuario not found.' : 'Mascota not found.'
            });
        }

        const appointment = await new Appointment({ date, user: userId, pet: petId, comments }).save();
        
        res.status(201).json({ success: true, msg: 'La cita esta pendiente.', appointment });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Error al hacer cita', error });
    }
};