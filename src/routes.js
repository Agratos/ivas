import { Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainLayout from './components/layout/MainLayout';
import LoginPage from 'pages/LoginPage';

const routes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <LoginPage /> },
        ],
    },
]

export default routes;