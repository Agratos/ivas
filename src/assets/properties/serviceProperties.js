export const serviceProperties = {
    main: {
        types: [1, 2, 3],
        1: '서비스 사용자',
        2: '서비스 신청',
        3: '시스템 관리자',
    },

    login: {
        validation: {
            info: {
                id: '아이디 중복 확인을 해주세요.',
                valid: '사용할 수 있는 아이디입니다.',
                unvalid: '사용 중인 아이디입니다.',
                password: '숫자, 특수문자, 영문 대소문자 조합 6~12자리',
                confirmpassword: '입력한 비밀번호가 서로 일치하지 않습니다.'
            },
        },
        info: {
            default: '아이디와 비밀번호를 입력해주세요.',
            user: '* 로그인 후 사용자 페이지로 연결됩니다.',
            admin: '* 로그인 후 관리자 페이지로 연결됩니다.',
        },
        success: {
            user: '로그인되었습니다. 사용자 페이지로 이동합니다.',
            admin: '로그인되었습니다. 관리자 페이지로 이동합니다.',
            chk: '사용가능한 아이디입니다.'
        },
        error: {
            snackbar: {
                user: '로그인에 실패하였습니다.',
                admin: '로그인에 실패하였습니다.',
            },
            info: {
                user: '아이디 또는 비밀번호가 일치하지 않습니다.',
                admin: '아이디 또는 비밀번호가 일치하지 않습니다.',
                chk: '사용가능하지 않은 아이디입니다.'
            },
        },
    },

    register: {
        success:{
            service: '서비스 신청에 성공하였습니다.'
        },
        error:{
            service: '서비스 신청에 실패하였습니다.'
        },
    },

    resign: {
        validation: {
            info: {
                password: '숫자, 특수문자, 영문 대소문자 조합 6~12자리',
                confirmpassword: '비밀번호가 일치하지 않습니다.'
            },
        },  
        success:{
            user: '탈퇴되었습니다.',
        },
        error:{
            user: '탈퇴 신청이 실패하였습니다.',
        },
    },

    service: {
        info: 'IVAS 시스템을 선택해 주셔서 감사합니다. 아래 정보를 입력해주세요.',
        subInfo: '* 은 필수 입력 항목입니다.',
        success: '서비스 신청이 완료되었습니다.',

        validation: {
            info: '서비스 변경 및 탈퇴 신청시 기존 비밀번호를 입력해주셔야 합니다.',
            pwd: '기존 비밀번호를 입력 해주십시오.',
            newpwd: '변경할 새 패스워드가 일치하지 않습니다.',
            oldpwd: '기존 비밀번호가 일치하지 않습니다.'
        },

        alter: {
            success: '서비스 변경 신청이 완료되었습니다.',
            error: '서비스 변경 신청이 실패하였습니다.'
        },
        
        types: [1, 2, 3, 4, 5, 6, 7, 8],
        1: '영상 녹화',
        2: '경로 추적',
        3: '위치/크기/속도 파악',
        4: '쓰러짐 감지',
        5: '탐지 영역 설정',
        6: 'ROI 설정',
        7: 'Line ROI 설정',
        8: 'Top/정면 뷰 전환',

        selectedCheckBox: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
        },

        requestedStream: {
            '1~3':
            '영상 스트림 1 ~ 3 개 : 제어 모듈 1, 영상 처리 모듈 1, 영상 분석 모듈 1',
            '4~6':
            ' 영상 스트림 4 ~ 6 개 : 제어 모듈 1, 영상 처리 모듈 2, 영상 분석 모듈 2',
            '7~9':
            '영상 스트림 7 ~ 9 개 : 제어 모듈 1, 영상 처리 모듈 3, 영상 분석 모듈 3',
        },
    },

    approval: {
        refuse: {
            validation: '거절 시 사유는 필수 입력입니다.',
        },
        success: '승인 처리 되었습니다.',
        delete: '삭제되었습니다.'
    },

    user: {
        video: {
            types: [1, 2, 3, 4, 5, 6],
            1: '경로 추적',
            2: '녹화',
            3: '위치/크기/속도',
            4: '쓰러짐 감지',
            5: 'Top 뷰 전환',
            6: '정면 뷰 전환',
        },
        rtsp: {
            success: '적용되었습니다.',
            error: '적용이 실패하였습니다',
        }
    },
};

