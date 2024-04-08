import { v4 as uuidv4 } from 'uuid';

export const generateVerificationCode = () => {
    const uuid = uuidv4();

    const segments = uuid.split('-');
    
    // Tomar el último segmento como código de verificación
    const verificationCode = segments[segments.length - 1];
    
    return verificationCode;
}