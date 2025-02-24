import dotenv from "dotenv";
dotenv.config();

import axios from 'axios';

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const redirect_uri = process.env.REDIRECT_URI

const url = "https://oauth2.googleapis.com/token"

const getIdToken = async (code: string) => {

  try {
    const response = await axios.post(url, {
      client_id,
      client_secret,
      redirect_uri,
      code,
      grant_type: "authorization_code"
    })
    return response.data.id_token
  }
  catch (error) {
    console.log("getIdToken error", error);
  }
}

export default getIdToken