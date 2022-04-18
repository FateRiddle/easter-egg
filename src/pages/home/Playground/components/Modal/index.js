import React from 'react';
import Modal from '@ali/rmpi-modal';
import Lottie from 'react-lottie';
import Tappable from '@ali/rmpi-tappable';
import './index.scss';

// type:
// 1. 找到了一个，继续找
// 2. 到时间没找到，game over
// 3. 找到了最后一个

const loties = {
  success:
    'https://gw.alipayobjects.com/os/fliggy-play/ad351a0e-28ee-4547-970a-e053168ae315/%25E9%25A3%259E%25E7%258C%25AA%25E4%25B8%258B%25E6%258B%2589%25E5%2588%25B7%25E6%2596%25B02019.json',
  failure: 'https://assets4.lottiefiles.com/datafiles/tdCLmdmRpULFtsT/data.json',
};

const Pop = ({ show, type, curTarget, resume, leftNum, replay, submitScore, screenShot }) => {
  const name = (curTarget && curTarget.text) || '';
  const modal1Style = screenShot ? { background: `url(${screenShot})` } : {};
  return type === 1 ? (
    <Modal autoLockScrolling={false} show={show} showClose={false} data-spm="modal1">
      <div className="modal1" style={modal1Style}>
        <div className="modal1-filter" />
        <img
          className="found-sign"
          src="https://gw.alicdn.com/tfs/TB1XsMLlWL7gK0jSZFBXXXZZpXa-245-71.png"
          alt="" />
        {name && <div className="modal1-text">{`还剩 ${leftNum} 件遗失行李啦`}</div>}
        <Tappable
          className="modal1-btn btn"
          onTap={resume}
          data-spm-click="gostr=/tbtrip;locaid=dresume">
          <div>继续寻找</div>
          <div className="modal1-icon" />
        </Tappable>
      </div>
    </Modal>
  ) : (
    show && (
      <div className="modal2" data-spm="modal2">
        <Lottie
          className="modal2-pic-area"
          options={{
            loop: true,
            autoplay: true,
            path: type === 2 ? loties.failure : loties.success,
          }}
          width={280}
          height={280} />
        <div className="modal2-text">{`${
          type === 2 ? '时间在匆忙寻找中流逝，飞猪没能赶上飞机' : '成功找到了所有行李，飞猪起航啦~'
        }`}</div>
        <div className="modal2-btns">
          <Tappable
            className="modal2-btn btn"
            onTap={replay}
            data-spm-click="gostr=/tbtrip;locaid=drestart">
            再来一次
          </Tappable>
          <Tappable
            className="modal2-btn btn"
            style={{ marginLeft: 20 }}
            onTap={submitScore}
            data-spm-click="gostr=/tbtrip;locaid=dsubmitScore">
            提交成绩
          </Tappable>
        </div>
      </div>
    )
  );
};

export default Pop;
