import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'Dashboard',
    icon: 'area-chart',
    path: 'Dashboard',
    authority: 'guest',
  },
  {
    name: '统计分析',
    icon: 'table',
    path: 'Statistics',
    authority: 'guest',
    children: [{
      name: '使用情况统计',
      path: 'UsageStatistics'
    }]
  }, {
    name: '管理配置',
    icon: 'appstore',
    path: 'Config',
    authority: 'admin',
    children: [
    {
      name: '接口配置',
      path: 'InterfaceConfig'
    }, {
      name: '参数配置',
      path: 'ParameterConfig'
    }]
  }
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
