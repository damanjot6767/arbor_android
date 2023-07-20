import axios from "axios";
import { getTokenFromStorage } from "../common/token";
const API = axios.create({
    baseURL: 'http://3.14.140.178',
  });
  
  API.interceptors.request.use(
    async (config) => {
      try {
        const token = await getTokenFromStorage(); // Implement a function to retrieve the token from storage
        if (token) {
          console.log("token>>>", token)
          config.headers.Authorization = `Bearer ${token.token}`;
        }
      } catch (error) {
        console.error('Error intercepting request:', error);
      }
      return config;
    },
    (error) => {
      console.error('Error intercepting request:', error);
      return Promise.reject(error);
    }
  );

export const arboristsLogin = (data) => axios.post("http://3.14.140.178/arborist/login", data);
export const generatePassCode = (data) => axios.post("http://3.14.140.178/arborist/forgotpasswordgeneratecode", data)
export const forgotPassword = (data) => axios.post("http://3.14.140.178/arborist/forgotpassword", data)
export const fetchArboristProfile = () => API.get("arborist/profile")
export const editArboristProfile = (data) => API.put("arborist/profile", data)
//------------------------------------------------------------------------------------------------------Clients

export const fetchAllClients = () => API.get("arborist/clients")
export const fetchClientTypes = () => API.get("arborist/clienttypes")
export const addArboristClient = (data) => API.post("arborist/client", data)
export const editClient = (clientId, data) => API.put(`arborist/client/${clientId}`, data)
export const deleteClient = (clientId) => API.delete(`arborist/client/${clientId}`)

//------------------------------------------------------------------------------------------------------Properties

export const fetchProperties = () => API.get("arborist/properties")

//------------------------------------------------------------------------------------------------------Reports

export const fetchReports = (req) => API.get(`arborist/reports`, {
  params: req
});

