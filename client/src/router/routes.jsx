import asyncLoad from './asyncLoad';

const routes = [
    {
        path: '/',
        exact: true,
        active: "1",
        breadcrumb: ["主页"],
        component: asyncLoad(() => import('@pages/home'))
    },
    {
        path: '/article/work',
        active: "2",
        breadcrumb: ["文章", "工作"],
        component: asyncLoad(() => import('@pages/work'))
    },
    {
        path: '/article/life',
        active: "3",
        breadcrumb: ["文章", "生活"],
        component: asyncLoad(() => import('@pages/life'))
    },
    {
        path: '/article/others',
        active: "4",
        breadcrumb: ["文章", "其他"],
        component: asyncLoad(() => import('@pages/others'))
    },
    {
        path: '/messageboard',
        active: "5",
        breadcrumb: ["留言板"],
        component: asyncLoad(() => import('@pages/messageboard'))
    },
    {
        path: '/about',
        active: "6",
        breadcrumb: ["关于"],
        component: asyncLoad(() => import('@pages/about'))
    },
    {
        path: '*',
        active: "",
        breadcrumb: [],
        component: asyncLoad(() => import('@pages/404'))
    }
];

export default routes;