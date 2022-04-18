import React from 'react';
import Tappable from '@ali/rmpi-tappable';
import './index.scss';

const Header = (props) => {
  const { curTime, curTarget, openRankList, playing } = props;
  const name = playing ? (curTarget && curTarget.text) || '' : '';
  const noTime = playing && curTime && curTime < 10 && curTime > 0;
  return (
    <div className="header" data-spm="header">
      <div className="clock-group">
        <div className={`header-clock-icon ${noTime ? 'wobble' : ''}`} />
        <span className={`header-time-count ${noTime ? 'time-count-red' : ''}`}>{curTime}</span>
      </div>
      {/* <i
        key="loading-circle"
        className={`loading-circle ${curTime > 0 ? 'loading-circle--activate' : ''}`}
      ></i> */}
      <div className="header-current-target">{name ? `寻找${name}` : ''}</div>
      <Tappable
        onTap={openRankList}
        data-spm-click="gostr=/tbtrip;locaid=dtoRankList"
        className={`header-rank-icon btn ${playing ? '' : 'heartBeat'}`} />
    </div>
  );
};

export default Header;
