import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
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

    static async registerWithEmailAndPassword(email: string, password: string, username: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            await sendEmailVerification(userCredential.user, { url: 'http://localhost:5173/login' });
            //agregar el obtener foto de usuario
            const verifyE = await user.emailVerified;
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
