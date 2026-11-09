import {Platform} from "react-native"

export const BASE_URL = 
Platform.OS === "android" ? "http://10.105.181.30:4000" : "http://localhost:4000"