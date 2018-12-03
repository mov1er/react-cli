import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'Dashboard',
    title: 'Dashboard',
    icon: 'area-chart',
    path: 'Dashboard',
    authority: 'guest',
  },
  {
    name: 'Statistics',
    title: '统计分析',
    icon: 'table',
    path: 'Statistics',
    authority: 'guest',
    children: [{
      name: 'UsageStatistics',
      title: '使用情况统计',
      path: 'UsageStatistics'
    }]
  }, {
    name: 'Config',
    title: '管理配置',
    icon: 'appstore',
    path: 'Config',
    authority: 'admin',
    children: [
    {
      name: 'InterfaceConfig',
      title: '接口配置',
      path: 'InterfaceConfig'
    }, {
      name: 'ParameterConfig',
      title: '参数配置',
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
