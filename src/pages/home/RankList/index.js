import React from 'react';
import PropTypes from 'prop-types';
import { getAllScoreBySort, addOneScore } from '../api';
import Overlay from '@ali/rmpi-overlay';
import Tappable from '@ali/rmpi-tappable';
// import { timeToScore } from '../utils'

import './index.scss';

const GOODS_NUM = 6;

class RankList extends React.Component {
  static propTypes = {
    score: PropTypes.number,
    replay: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      userNick: '',
      showInput: false,
      showRankList: false,
      rankListData: [],
    };
  }

  componentDidMount() {
    // this.getAllScore();
  }

  show = () => {
    const { userNick } = this.state;
    if (userNick) {
      this.addScore();
    } else {
      this.setState({
        showInput: true,
      });
    }
  };

  hide = () => {
    this.setState({
      showInput: false,
      showRankList: false,
    });
  };

  addScore = () => {
    const { userNick } = this.state;
    const { score } = this.props;
    if (userNick) {
      addOneScore({ nick: userNick, score })
        .then(this.getAllScore)
        .catch(this.getAllScore);
    } else {
      // 没有nickName直接渲染列表
      this.getAllScore();
    }
  };

  getAllScore = () => {
    getAllScoreBySort().then((data) => {
      if (data.length > 0) {
        this.setState({
          rankListData: data,
          showRankList: true,
        });
      }
    });
  };

  submitScore = () => {
    if (this.input.value) {
      this.setState(
        {
          showInput: false,
          userNick: this.input.value,
        },
        () => {
          this.addScore();
        }
      );
    }
  };

  renderRankList = () => {
    const { rankListData } = this.state;
    if (rankListData && rankListData.length) {
      const arr = [];
      rankListData.forEach((item, index) => {
        let text = '-';
        if (item.score < 0) {
          text = `找到 ${GOODS_NUM + item.score} 个`;
        } else {
          text = `剩余 ${item.score} 秒`;
        }

        if (index > 20) {
          return;
        }
        let styleName = 'rank-li';
        if (index === 0) {
          styleName += ' first';
        }
        if (index === 1) {
          styleName += ' second';
        }
        if (index === 2) {
          styleName += ' third';
        }
        arr.push(
          <li className={styleName} key={index}>
            {index > 2 ? <span className="rank-num">{index + 1}</span> : null}
            <span className="nick-name">{item.nick}</span>
            <span className="max-score">{text}</span>
          </li>
        );
      });
      return <ul className="rank-ul">{arr}</ul>;
    }
    return null;
  };

  replay = () => {
    const { replay } = this.props;
    this.setState({
      showInput: false,
      showRankList: false,
    });
    replay && replay();
  };

  render() {
    const { showInput, showRankList } = this.state;
    return (
      <div className="rank-list-container" data-spm="rankList">
        {showInput ? (
          <div className="nickname-input-container">
            <div className="nickname-input-content">
              <input
                ref={(node) => {
                  this.input = node;
                }}
                className="nickname-input"
                placeholder="请输入你的花名" />
              <Tappable
                className="input-nick-confirm"
                onTap={this.submitScore}
                data-spm-click="gostr=/tbtrip;locaid=dsubmitName">
                确定
              </Tappable>
            </div>
            <Tappable
              className="close-btn-container"
              onTap={this.hide}
              data-spm-click="gostr=/tbtrip;locaid=dcloseNameInput">
              <div className="close-btn" />
            </Tappable>
          </div>
        ) : null}
        {showRankList ? (
          <div className="replay-container" id="replayContainer">
            <div className="replay-box">
              <div className="rank-list" id="J_rankContainer">
                <p className="rank-title">排行榜</p>
                <div className="rank-project">
                  <span className="nick-name-title">昵称</span>
                  <span className="get-score-title">成绩</span>
                </div>
                <ul className="rank-ul" id="J_rankList">
                  {this.renderRankList()}
                </ul>
              </div>
              <Tappable
                className="close-btn-container"
                onTap={this.hide}
                data-spm-click="gostr=/tbtrip;locaid=dcloseRankList">
                <div className="close-btn" />
              </Tappable>
            </div>
          </div>
        ) : null}
        <Overlay autoLockScrolling={false} show={showInput || showRankList} zIndex={100} />
      </div>
    );
  }
}

export default RankList;
