import {
    getAuth,
    signInWithEmailAndPassword,

} from "firebase/auth";

class FirebaseService {

    static async loginWithEmailAndPasword(email: string, password: string, userName: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            const verifyE = await user.emailVerified;
            //agregar el obtener foto de usuario
            if (!verifyE) return alert("verifica tu correo Electronico")
            /**
             * Agregar Almacenamiento en el localStorage
             */

        } catch (error) {
            console.error("Error de autenticación:", error);
            return true;
        }
    }


}

export default FirebaseService;
