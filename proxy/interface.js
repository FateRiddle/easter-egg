/**
 * Created by 呐萨<nasa.wy@alibaba-inc.com> on 2019-11-10.
 * Proxy For Interface Mock
 */
"use strict";

var url = require('url');

/**
 * 接口 mock 处理模块
 * @param requestUrl {String} 请求 URL
 * @param response {Object} 服务端响应
 * @param response.headers {Object} 响应头
 * @param response.body {Object|String}  响应体, 如果是 JSON / JSONP, 自动转为 JSON 对象
 * @returns {Object} 返回可 JSON 序列化的对象
 */
module.exports = function (requestUrl, response) {

  var parsedReqUrl = url.parse(requestUrl, true);
  var params = parsedReqUrl.query;
  var responseBody = response.body;

  switch (params.api) {
    case 'mtop.trip.uilayout.queryUILayout':
      responseBody.test = 123;
      break;
    default:
      responseBody.default = true;
      break;
  }

	return responseBody;
};
