import api from './common'

const adminApi = {
    login: ({ id, password }) => api.post('/api/auth/login_admin', { id, password }), // 로그인

    getResourceList: () => api.get('/api/system/dashboard'), // dashboard 리스트 조회

    getAlarmList: () => api.get(''), 

    getApprovalList: () => api.get('/api/system/users'), // 유저 승인 요청 리스트

    serviceApproval: ({ id, idx, permit, reason }) => api.post('/api/system/permit', { id, idx, permit, reason }), // 유저 승인

    serviceUserDel: ({ idx }) => api.post('/api/system/remove', { idx }), // 유저 삭제

    getTotalUsageList: () => api.get(''), // 유저 사용량 조회

    getUsageInfo: ({ id }) => api.post('', { id }), // 상세 정보 사용량 조회

}

export default adminApi;