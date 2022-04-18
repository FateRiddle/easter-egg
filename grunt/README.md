# Grunt 任务自定义配置目录

> 这里是自定义 Grunt 任务配置目录.

1. 项目开发和构建依赖的 Grunt 默认任务配置可访问 <http://gitlab.alibaba-inc.com/clam-eco/clam/tree/master/packages/builder-clam-react/lib/grunt> 查阅;
2. 如需覆盖默认任务, 请从 <http://gitlab.alibaba-inc.com/clam-eco/clam/tree/master/packages/builder-clam-react/lib/grunt> 内复制对应的任务配置 js 文件到当前目录 (`grunt`) 下;
3. Grunt 命令执行时会自动将默认任务配置与当前目录 (`grunt`) 下任务配置进行合并, 生成合并后的任务配置;
4. 任务配置合并是基于 **深度 merge 替换**, **对于数组型值, 会将新值直接替换默认数组值**, 因此对于数组值, 如果需要保留默认配置中的数组值, 请书写为合并后的数组值.
