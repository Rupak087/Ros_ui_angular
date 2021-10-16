import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        icon: 'grid-outline',
        link: '/ROS/dashboard',
        home: true,
    },
    {
        title: 'Cash Management',
        icon: 'briefcase-outline',
        children: [
            {
                title: 'Cash up',
                icon: 'pricetags-outline',
                link: '/ROS/cash-management/cashup',
            },
            {
                title: 'Deposit',
                icon: 'pricetags-outline',
                link: '/ROS/cash-management/deposit',
            },
            {
                title: 'Reconciliation',
                icon: 'file-add-outline',
                link: '/ROS/cash-management/reconciliation',
            },
            {
                title: 'Reports',
                icon: 'file-text-outline',
                link: '/ROS/cash-management/report',
            },
        ],
    },
    {
        title: 'Employee',
        icon: 'people-outline',
        children: [
            {
                title: 'Attendance',
                link: '/ROS/employee/attendance',
            },
            {
                title: 'Requests',
                link: '/ROS/employee/request',
            },
            {
                title: 'Payroll',
                link: '/ROS/employee/payroll',
            },
        ],
    },
    {
        title: 'Stock',
        icon: 'pricetags-outline',
        children: [],
    },
    {
        title: 'Auth',
        icon: 'lock-outline',
        children: [
            {
                title: 'Login',
                link: '/auth/login',
            },
            {
                title: 'Register',
                link: '/auth/register',
            },
            {
                title: 'Request Password',
                link: '/auth/request-password',
            },
            {
                title: 'Reset Password',
                link: '/auth/reset-password',
            },
        ],
    },
];
