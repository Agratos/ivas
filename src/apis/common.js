import axios from 'axios';
//import httpServer from 'utils/httpServer';
//import localStoreService from 'utils/localStoreService';
axios.defaults.withCredentials = true;

const api = {
    get: async (url) => {
        return await axios.get(
            url,
            //httpServer.authorization(localStoreService.get('token'))
        );
    },

    post: async (url, jsonData) => {
        console.log(jsonData);
        return await axios.post(
            url,
            jsonData,
            //httpServer.authorization(localStoreService.get('token'))
        );
    },

    put: async (url, jsonData) => {
        return await axios.put(
            url,
            jsonData,
            //httpServer.authorization(localStoreService.get('token'))
        );
    },

    delete: async (url) => {
        return await axios.delete(
            url,
            //httpServer.authorization(localStoreService.get('token'))
        );
    },
}

export default api;