export const routes = [
  {
    name: 'Dashboard',
    title: 'Dashboard',
    icon: 'area-chart'
  },
  {
    name: 'Statistics',
    title: '统计分析',
    icon: 'table',
    sub: [{
      name: 'UsageStatistics',
      title: '使用情况统计',
      href: '/UsageStatistics'
    }]
  }, {
    name: 'Config',
    title: '管理配置',
    icon: 'appstore',
    sub: [{
      name: 'InterfaceConfig',
      title: '接口配置',
      href: '/InterfaceConfig'
    }, {
      name: 'ParameterConfig',
      title: '参数配置',
      href: '/ParameterConfig'
    }]
  }
];