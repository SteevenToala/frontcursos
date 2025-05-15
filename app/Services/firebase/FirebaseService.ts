import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword,

} from "firebase/auth";
import StorageNavegador from "../StorageNavegador";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageBucket } from "./FirebaseConfig";

class FirebaseService {

    static async loginWithEmailAndPasword(email: string, password: string, userName: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            const verifyE = await user.emailVerified;
            //agregar el obtener foto de usuario
            if (!verifyE) return alert("verifica tu correo Electronico")
            StorageNavegador.saveToLocalStorageWithExpiry(
                "user", {
                email: email,
                verify: verifyE,
                uidFirebase: idToken,
                username: userName,
                urlUserImg: null
            }, 60 * 60 * 1000
            );

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
            StorageNavegador.saveToLocalStorageWithExpiry(
                "user", {
                email: email,
                verify: verifyE,
                uidFirebase: idToken,
                username: username,
                urlUserImg: null
            }, 60 * 60 * 1000);
        } catch (error) {
            console.error("Error de autenticación:", error);
            return true;
        }
    }

    static async uploadFile(file: File, userName: string, fileName: string) {
        const storageRef = ref(storageBucket, `uploads/${userName}/${fileName}`);
        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL; // Devuelve la URL del archivo subido
        } catch (error) {
            console.error('Error al subir archivo:', error);
            return null;
        }
    }

}

export default FirebaseService;
