import api from './common'

const adminApi = {
    login: ({ id, password }) => api.post('/api/auth/login_admin', { id, password }),

    getResourceList: () => api.get('/api/system/dashboard'),

    getAlarmList: () => api.get(''),

    getApprovalList: () => api.get('/api/system/users'),

    serviceApproval: ({ id, idx, permit, reason }) => api.post('/api/system/permit', { id, idx, permit, reason }),

    serviceUserDel: ({ idx }) => api.post('/api/system/remove', { idx }),

    getTotalUsageList: () => api.get(''),

    getUsageInfo: ({ id }) => api.post('', { id }),

}

export default adminApi;