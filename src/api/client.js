import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "@env";

//constant for using the base url easily
const client = axios.create({
  baseURL: `${EXPO_PUBLIC_BASE_URL}`,
});

export default client;

//cloudVersion
