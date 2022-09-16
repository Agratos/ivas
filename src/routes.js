import Layout from './components/layout/Layout';
import MainLayout from './components/layout/MainLayout';

import LoginPage from 'pages/LoginPage';
import NotFoundPage from 'pages/NotFoundPage';

import UserDashboardPage from 'pages/user/UserDashboardPage';
import UserVideoSettingPage from 'pages/user/UserVideoSettingPage';
import UserChangeServicePage from 'pages/user/UserChangeServicePage';

import AdminDashboardPage from 'pages/admin/AdminDashboardPage';
import AdminServiceApprovalPage from 'pages/admin/AdminServiceApprovalPage';
import AdminServiceUsageStatusPage from 'pages/admin/AdminServiceUsageStatusPage';
import AdminServiceUsageDetailPage from 'pages/admin/AdminServiceUsageDetailPage';

const routes = [
    {
        path: 'user',
        element: <Layout type={0} />,
        children: [
            { path: 'dashboard', element: <UserDashboardPage /> },
            { path: 'video', element: <UserVideoSettingPage /> },
            { path: 'service', element: <UserChangeServicePage /> },
        ],
    },{
        path: 'admin',
        element: <Layout type={1} />,
        children: [
            { path: 'dashboard', element: <AdminDashboardPage /> },
            { path: 'approval', element: <AdminServiceApprovalPage /> },
            { path: 'usage', element: <AdminServiceUsageStatusPage /> },
            { path: 'usage/detail/:id', element: <AdminServiceUsageDetailPage /> },
        ],
    },{
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <LoginPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
]

export default routes;