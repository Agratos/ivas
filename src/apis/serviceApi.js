import api from './common';

export default {
    register : ({ id, password, confirmPassword, stream, functions }) => api.post('/api/auth/service', { id, password, confirmPassword, stream, functions }), // 서비스 신청

    chkdup : ({ id }) => api.post('/api/auth/check_duplicate', { id }), // ID 중복체크
    
}