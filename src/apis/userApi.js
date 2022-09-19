import api from './common';

const userApi = {
    login: ({ id, password }) => api.post('/api/auth/login', { id, password }), // 유저 로그인

    logout: ({ id }) => api.post('/api/auth/logout', { id }), // 유저 로그아웃

    // 유저 정보 조회 -> 로그인 성공시 store에 id passwd 저장

    getResourceList: () => api.get('/api/system/dashboard'), // 유저 대시보드 데이터 조회
    
    getVideoConfig: ({ id }) => api.post('/api/service/config', { id }), // 영상 설정 조회
    
    setInputConfig: ({ id, idx, address, auth }) => api.post('/api/service/config/input', { id, idx, address, auth }), // 입력 영상 설정
    
    setOutputConfig: ({ id, idx, auth}) => api.post('/api/service/config/output', { id, idx, auth }), // 출력 영상 설정
    
    setAlarmConfig: ({ id, enable, address}) => api.post('/api/service/config/sys_alarm', { id, enable, address }), // 시스템 알람 주소 설정
    
    resign: ({ id }) => api.post('/api/auth/leave', { id }), // 사용자 탈퇴
    
    alter: ({ id, password, stream, functions }) => api.put('/api/auth/service', { id, password, stream, functions }), // 서비스 변경
    
    snapshot: ({ id, idx }) => api.put('/api/service/snapshot', { id, idx }), // 스냅샷 촬영하기
    
    getSnapshot: ({ id, idx }) => api.post('/api/service/snapshot', { id, idx }, { responseType: 'arraybuffer' }), // 스냅샷 가져오기
    
    setControlConfig: ({ id, idx, detect, roi, line, alarm, overlay }) => api.post('/api/service/config/proc', { id, idx, detect, roi, line, alarm, overlay }), // 영상 처리 설정
    
}

export default userApi;