module.exports = {
  types: [
    { value: 'init', name: 'init:     初始提交' },
    { value: 'feat', name: 'feat:     增加新功能' },
    { value: 'fix', name: 'fix:      修复bug' },
    { value: 'ui', name: 'ui:       更新UI' },
    { value: 'refactor', name: 'refactor: 代码重构' },
    { value: 'docs', name: 'docs:     修改文档' },
    { value: 'test', name: 'test:     增删测试' },
    { value: 'chore', name: 'chore:    更改配置文件' },
    { value: 'style', name: 'style:    样式修改不影响逻辑' },
    { value: 'revert', name: 'revert:   版本回退' },
    { value: 'add', name: 'add:      添加依赖' },
    { value: 'del', name: 'del:      删除代码/文件' },
  ],
  scopes: [],
  messages: {
    type: '请选择更改类型:',
    scope: '请输入更改范围(可选):',
    subject: '请输入简短描述(必填):',
    body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issues(可选):',
    confirmCommit: '确认使用以上信息提交(y/n)?',
  },
  simple: true
};
