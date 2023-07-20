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

export const addProperty = (data) => API.post("arborist/property", data)
export const fetchProperties = () => API.get("arborist/properties")
export const fetchClientProperty = (clientId) => API.get(`/arborist/client/${clientId}/properties`)
export const editProperties = (propertyId, data) => API.put(`arborist/property/${propertyId}`, data)
export const deleteProperty = (propertyId) => API.delete(`arborist/property/${propertyId}`)
//------------------------------------------------------------------------------------------------------Reports

export const fetchReports = (req) => API.get(`arborist/reports`, {
  params: req
});
export const saveReport = (data) => API.post("arborist/report", data)
export const editReport = (reportId, data) => API.put(`arborist/report/${reportId}`, data)
export const deleteReport = (reportId) => API.delete(`/arborist/report/${reportId}`)

//-------------------------------------------------------------------------------------------------------Tree
export const fetchTreeSpecies = () => API.get("arborist/species")
export const fetchHealthRates = () => API.get("arborist/healthrates")
export const fetchJurisdiction = () => API.get("arborist/jurisdictions")
export const fetchRecomendations = () => API.get("arborist/recommendations")
export const fetchTrees = (reportId) => API.get(`arborist/report/${reportId}/trees`)
export const saveTree = (reportId, data) => API.post(`arborist/report/${reportId}/tree`, data)
export const updateTree = (reportId, treeId, data) => API.put(`arborist/report/${reportId}/tree/${treeId}`, data)
export const deleteTree = (reportId, treeId) => API.delete(`arborist/report/${reportId}/tree/${treeId}`)

