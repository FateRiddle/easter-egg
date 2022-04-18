import jsonp from 'jsonp';

const request = url =>
  new Promise((resolve, reject) =>
    jsonp(`https://pre-hubble.alibaba-inc.com/game/${url}`, null, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  );

export const getAllScore = () => request('getAllScore.do');
export const getAllScoreBySort = () => request('getAllScoreBySort.do');
export const getOneScore = nick => request(`getOneScore.do?nick=${nick}`);
export const addOneScore = ({ nick, score }) =>
  request(`addOneScore.do?nick=${nick}&score=${score}`);
export const deleteOneScore = nick => request(`deleteOneScore.do?nick=${nick}`);
export const deleteAllScore = () => request('deleteAllScore.do');

// export const test = () =>
//   jsonp('https://pre-hubble.alibaba-inc.com/game/getAllScore.do', null, (err, data) => {
//     if (err) {
//       console.error(err.message);
//     } else {
//       console.log(data);
//     }
//   });

// /game/getAllScore.do  获取所有分数
// /game/getAllScoreBySort.do  获取排序后的分数（从大到小）
// /game/getOneScore.do  通过nick参数获取单条记录（get请求，nick参数写在query中）ex: /game/getOneScore.do?nick=taiwu
// /game/addOneScore.do  添加一条记录（get请求，如果重复添加同一nick名，只会保留score最高记录）ex：/game/addOneScore.do?nick=taiwu&score=136
// /game/deleteOneScore.do  根据nick参数删除单条记录（get请求，同getOneScore使用）
// /game/deleteAllScore.do  删除表中所有记录，仅用于删除测试脏数据
