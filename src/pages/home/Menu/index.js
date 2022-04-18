import React from 'react';
import Dialog from '../components/Dialog';
import Tappable from '@ali/rmpi-tappable';
import './index.scss';

export default function Menu({ toGame }) {
  return (
    <div className="menu" data-spm="menu">
      <div className="title">飞猪找一找</div>
      {/* <div className="dialog">
        <div>好像少了几件行李？</div>
      </div> */}
      <Dialog>
        <div className="dialog-content">好像少了几件行李？</div>
      </Dialog>
      <div className="feizhu-icon" />
      <div className="description">
        阿飞今天出游，行李还差 <span style={{ color: '#a3400a', fontWeight: 600 }}>6</span> 件
      </div>
      <div className="description">快帮它找找吧！神秘大奖等着你</div>
      <Tappable className="btn" onTap={toGame} data-spm-click="gostr=/tbtrip;locaid=dtoGame">
        <div className="btn-text">开始寻找</div>
        <div className="camera-icon" />
      </Tappable>
    </div>
  );
}
