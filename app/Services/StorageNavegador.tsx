
class StorageNavegador {

    // Función para guardar en localStorage con expiración
    static saveToLocalStorageWithExpiry(key: string, value: any, ttlMs: number) {
        const item = {
            data: value,
            expiry: Date.now() + ttlMs,
        };
        localStorage.setItem(key, JSON.stringify(item));
    }



}
export default StorageNavegador;