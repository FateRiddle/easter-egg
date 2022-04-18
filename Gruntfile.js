module.exports = function(grunt) {

  // ------------------ 初始化 toolkit ------------------

  let isInCloudBuild = process.env.BUILD_ENV === 'cloud';
  let toolkit = null; 
  
  // 不要修改!!!
  // 非云构建环境
  if (!isInCloudBuild && !process.env.CLAM_TOOLKIT_GLOBAL) {
    try {
      toolkit = require('@ali/clam-toolkit-rm');
    } catch(err) {
      console.error('[ERROR]: 构建工具已升级，请运行 tnpm update 重新安装依赖。'.red);
      console.error(err);
    }

    // 初始化工具包
    toolkit && toolkit(grunt);
  }
  
  // ------------------ 在以下写自定义逻辑 ------------------

  // 本地和云端构建都适用的任务
  // grunt.hookTask('build:main', '插入任务', 'clean:custom');

  // 本地适用的任务
  // if (!isInCloudBuild) {
  //   grunt.hookTask('prepub', '插入非构建相关的任务', 'prompt:custom');
  // }
};