import React from 'react';
import Lottie from 'react-lottie';
import Dialog from '../../../components/Dialog';
import goodsList from '../../../model/goodsList';
import './index.scss';

const random = list => list[Math.floor(Math.random() * list.length)];

const nothingList = [
  '嗯..这个东东是啥',
  '嗯..这个东东是啥',
  '行李好难找呀',
  '时间，没有时间了',
  '好难，做飞猪真的好难',
  '找到啦！哦...不是',
  '找到啦！哦...不是',
];

const findList = [
  text => `这是${text}吗？`,
  text => `${text}！${text}！`,
  text => `呜..${text}？`,
  text => `有点像${text}`,
  text => `${text}...？`,
];

// status 0 初始 1 猜对 2 全部答对 3 时间到
const feizhuIcons = {
  10: 'https://gw.alipayobjects.com/os/fliggy-play/31d615f4-8d10-431e-8f64-1eec50da888a/normal.json',
  0: 'https://gw.alipayobjects.com/os/fliggy-play/31d615f4-8d10-431e-8f64-1eec50da888a/normal.json',
  1: 'https://gw.alipayobjects.com/os/fliggy-play/9cce5610-b703-446b-9714-7cc0f33df40a/ok.json',
  2: 'https://gw.alipayobjects.com/os/fliggy-play/fbcf8cec-2f5e-4604-9908-49110672cf88/speechless.json',
  3: 'https://gw.alipayobjects.com/os/fliggy-play/e7d83a0b-c17a-4dda-8f49-75fb65b2b138/excited.json',
};
const feizhuLotties = {};

Object.keys(feizhuIcons).forEach((key) => {
  feizhuLotties[key] = (
    <Lottie
      key={feizhuIcons[key]}
      options={{
        loop: true,
        autoplay: true,
        path: feizhuIcons[key],
      }}
      style={{ position: 'absolute', right: -8, top: 0 }}
      width={150}
      height={150} />
  );
});

const Footer = (props) => {
  const { curObject, status, curTarget } = props;
  let text = '';
  if (curObject && curObject !== 'nothing') {
    // alert(JSON.stringify(goodsList[0]));
    const good = goodsList.find && goodsList.find(a => a.value === curObject);
    if (good && good.text) {
      text = good.text;
    }
    // text = curGoods[0].text;
  }

  const name = (curTarget && curTarget.text) || '';
  let gameRemark = !curObject ? '游戏开始！' : random(findList)(text);
  if (curObject === 'nothing') {
    gameRemark = random(nothingList);
  }
  const dialogs = {
    10: '游戏准备中哦...',
    0: gameRemark,
    1: `找到${name}了！`,
    2: '怎么已经到点了？！',
  };

  return (
    <div className="footer">
      {!!dialogs[status] && (
        <Dialog style={{ position: 'absolute', left: 38, top: -39 }}>{dialogs[status]}</Dialog>
      )}
      {/* <div
        className="footer-feizhu"
        style={{
          width: status === '2' ? 95 : 90,
          height: status === '2' ? 101 : 120,
          backgroundImage: `url(${feizhuIcons[status]})`
        }}
      /> */}
      {feizhuLotties[status]}
      {/* <div className="footer-bar" /> */}
    </div>
  );
};

export default Footer;
