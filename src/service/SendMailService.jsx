import axios from "axios"


const sendMailBulk = async (datas) => {
    let datos = {}
    try {
    const { VITE_API_URL } = import.meta.env
    const response = await axios
      .post(`${VITE_API_URL}/enviar-correo`, datas, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://main.d2ycgzclkv91hm.amplifyapp.com",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
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