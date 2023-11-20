import axios from "axios"


const sendMailBulk = async (datas) => {
    let datos = {}
    try {
    const { VITE_API_URL } = import.meta.env
    const response = await axios
      .post(`${VITE_API_URL}/enviar-correo`, datas, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      datos = response.data
    } catch (error) {
        console.error("Error creating clients:", error);
        throw error;
    }
    return datos;
}




export { sendMailBulk };