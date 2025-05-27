const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/carreras`;

export async function getCarreras() {
    const carreras = await (await fetch(`${API_URL}`)).json()
    console.log(carreras);
    return carreras;
}