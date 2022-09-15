import { Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainLayout from './components/layout/MainLayout';

import LoginPage from 'pages/LoginPage';
import NotFoundPage from 'pages/NotFoundPage';

import UserDashboardPage from 'pages/user/UserDashboardPage';

import AdminDashboardPage from 'pages/admin/AdminDashboardPage';

const routes = [
    {
        path: 'user',
        element: <Layout type={0} />,
        children: [
            { path: 'dashboard', element: <UserDashboardPage /> },
        //   { path: 'video', element: <UserVideoContainer /> },
        //   { path: 'service', element: <UserServiceContainer /> },
        ],
    },{
        path: 'admin',
        element: <Layout type={1} />,
        children: [
             { path: 'dashboard', element: <AdminDashboardPage /> },
        //   { path: 'approval', element: <AdminApprovalContainer /> },
        //   { path: 'usage', element: <AdminUsageContainer /> },
        //   { path: 'usage/detail/:id', element: <AdminUsageDetailContainer /> },
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