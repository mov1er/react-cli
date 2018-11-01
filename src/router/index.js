import asyncComponent from '../components/AsyncComponent';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      exact: true,
      name: 'home',
      component: asyncComponent(() => import("../views/home"))
    },
    '/Dashboard': {
      exact: true,
      component: asyncComponent(() => import("../views/Dashboard"))
    },
    '/Statistics/UsageStatistics': {
      exact: true,
      component: asyncComponent(() => import("../views/usageStatistics"))
    },
    '/Config/ParameterConfig': {
      exact: true,
      component: asyncComponent(() => import("../views/parameterConfig"))
    },
    '/Config/InterfaceConfig': {
      exact: true,
      component: asyncComponent(() => import("../views/interfaceConfig"))
    },
    '/Config/InterfaceConfig/InterfaceAdd': {
      exact: true,
      name: '新增接口',
      component: asyncComponent(() => import("../views/interfaceAdd"))
    },
    '/Config/InterfaceConfig/interfaceDetail/:id': {
      exact: false,
      name: '接口详情',
      component: asyncComponent(() => import("../views/interfaceDetail"))
    },
    // '/Config/InterfaceConfig/interface/:id': {
    //   exact: false,
    //   component: asyncComponent(() => import("../views/interfaceAdd"))
    // },
    '/exception/403': {
      exact: true,
      name: '403',
      component: asyncComponent(() => import("../views/Exception/403"))
    },
    '/exception/404': {
      exact: true,
      name: '404',
      component: asyncComponent(() => import("../views/Exception/404"))
    },
    '/exception/500': {
      exact: false,
      name: '500',
      component: asyncComponent(() => import("../views/Exception/500"))
    },
  };

  function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach(item => {
      if (item.children) {
        keys[item.path] = { ...item };
        keys = { ...keys, ...getFlatMenuData(item.children) };
      } else {
        keys[item.path] = { ...item };
      }
    });
    return keys;
  }
  let menuData = getFlatMenuData(getMenuData());

  const routerData = {};

  Object.keys(routerConfig).forEach(path => {
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });

  let routerArr = []
  for (let i in routerData) {
    routerData[i].path = i;
    routerArr.push(routerData[i])
  }
  console.log(routerArr);

  return routerArr;
};
