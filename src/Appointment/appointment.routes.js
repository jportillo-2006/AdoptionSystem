import { Router } from 'express';
import { addAppointment } from './appointment.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
    '/',
    [
        validarJWT,
        validarCampos
    ],
    addAppointment
)

export default router;