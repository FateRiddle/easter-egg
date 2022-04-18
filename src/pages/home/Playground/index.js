import 'regenerator-runtime/runtime';
import React from 'react';
import { CAMERA_FACING_BACK, getWebCameraAsync } from '@ali/webar.js/src/index';
import './index.scss';
import * as tfc from '@tensorflow/tfjs-core';
import MobileNet from '../model';
import goodsList from '../model/goodsList';
import Modal from './components/Modal';
import Header from './components/Header';
import Footer from './components/Footer';
import RankList from '../RankList';
import Intro from './components/Intro';

const VIDEO_PIXELS = 224;
const TOTAL_TIME = 30; // 初始固定60s
const GOODS_NUM = 6; // 每次参加的物品总数
const ACCURACY = 0.4; // 模型认定多少概率以上算是找到了

export default class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.model = new MobileNet();
    this.timer = undefined;
    this.state = {
      ready: false, // 相机和算法model是否ready（每次从主界面进入游戏界面时需要）
      curTime: TOTAL_TIME, // 剩余时间
      goodsNum: 0, // 找到的物体数
      goods: [], // 物品列表
      curObject: '', // 相机当前识别到的物体
      playing: false, // 正在游戏中
      modalVisible: false, // modal是否可见
      introVisible: false, // 每次寻找的开场动画
      screenShot: '',
      // countDownVisible: true, // 倒计时动画是否可见
    };
  }

  componentDidMount = async () => {
    try {
      this.initGoods(() => this.setState({ introVisible: true }));
      await this.initCamera();
      // 预热模型
      await this.initGame().then(() => {
        this.setState({ ready: true, playing: true, introVisible: false });
      });
      this.gameLoop();
    } catch (err) {
      // alert(err.toString());
      clearInterval(this.timer);
    }
  };

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.camera.closeAsync();
  }

  // 准备模型
  initGame = () => {
    this.setState({ goodsNum: 0 });

    return this.model.load().then(() => this.warmUpModel());
    // .catch(err => alert(err.toString()));
  };

  // 计时器倒数
  timerDown = () => {
    const { curTime } = this.state;
    if (curTime > 0) {
      this.setState({ curTime: curTime - 1 });
    }
  };

  // 加计时的动画
  // addTime = (points, callback) => {
  //   const now = { count: this.state.curTime };
  //   const target = now.count + points;
  //   anime({
  //     targets: now,
  //     count: target,
  //     round: 1,
  //     easing: 'linear',
  //     update: () => {
  //       this.setState({ curTime: count });
  //     },
  //     complete: callback,
  //   });
  // };

  toggleCountDown = () => {
    this.setState({ countDownVisible: !this.state.countDownVisible });
  };

  toggleIntro = () => {
    this.setState({ introVisible: !this.state.introVisible });
  };

  // 游戏主loop，开始计时
  gameLoop = () => {
    this.timer = setInterval(() => {
      this.timerDown();
      this.getImg();
      if (this.state.curTime <= 0) {
        clearInterval(this.timer);
        this.finishGame();
      }
    }, 1000);
  };

  // 开局随机寻找的物品list
  initGoods = (callback = () => {}) => {
    const goods = [];
    while (goods.length < GOODS_NUM) {
      const randomItem = goodsList[Math.floor(Math.random() * goodsList.length)];
      const valueList = goods.map(g => g.value);
      if (valueList.indexOf(randomItem.value) === -1) {
        goods.push(randomItem);
      }
      // goods.push(goodsList[9]);
    }
    this.setState({ goods, goodsNum: 0, curObject: '' }, callback);
  };

  // 校验物品是否找对逻辑
  itemFound = () => {
    const { goods, goodsNum, curObject } = this.state;
    const curTarget = goods ? goods[goodsNum] : {};
    return curTarget.value === curObject;
  };

  alignCvs = (cvs) => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    cvs.width = width * 2;
    cvs.height = height * 2;
    const { style } = cvs;
    style.width = `${width}px`;
    style.height = `${height}px`;
    return [width, height];
  };

  // 开启相机
  initCamera = async () => {
    if (this.displayTarget) {
      this.displayTarget.loop();
      return;
    }

    // 获取 webgl 上下文
    const cvs = this.glCanvas;

    cvs.width = window.innerWidth * 2;
    cvs.height = window.innerHeight * 2;
    this.alignCvs(cvs);
    const gl = cvs.getContext('webgl');

    try {
      // 摄像机配置
      this.camera = await getWebCameraAsync({
        facing: CAMERA_FACING_BACK,
      });
      // 异步开启
      await this.camera.openAsync();
      // 相机放上去
      this.displayTarget = this.camera.createDisplayTarget('ar-container', {
        autoResize: 0,
        gl,
      });
      this.displayTarget.loop();
    } catch (error) {
      // alert(error);
      console.error(error);
    }
  };

  // 用默认值将模型跑起来
  warmUpModel = () => {
    this.model.predict(tfc.zeros([VIDEO_PIXELS, VIDEO_PIXELS, 3]));
  };

  // 获取一次物体识别
  getImg = async () => {
    try {
      const img = await this.displayTarget.snapshotImageDataURLAsync({
        type: 'imageData',
        // compress: 0.4,
        // resize: [100, 100],
      });
      const result = tfc.tidy(() => {
        const pixels = tfc.browser.fromPixels(img);
        const centerHeight = pixels.shape[0] / 2;
        const beginHeight = centerHeight - VIDEO_PIXELS / 2;
        const centerWidth = pixels.shape[1] / 2;
        const beginWidth = centerWidth - VIDEO_PIXELS / 2;
        const pixelsCropped = pixels.slice(
          [beginHeight, beginWidth, 0],
          [VIDEO_PIXELS, VIDEO_PIXELS, 3]
        );
        return this.model.predict(pixelsCropped);
      });

      const topK = await this.model.getTopKClasses(result, 5);
      const top1 = topK[0];
      if (top1.value < ACCURACY) {
        this.setState({ curObject: 'nothing' });
      } else {
        this.setState({ curObject: top1.label }, async () => {
          // 如果判定成功
          if (this.itemFound()) {
            const screenShot = await this.displayTarget.snapshotImageDataURLAsync({
              type: 'image/jpeg',
              compress: 0.4,
              resize: [300, 380],
            });
            this.setState({ screenShot });
            this.finishGame();
          }
        });
      }
    } catch (error) {
      clearInterval(this.timer);
      // alert(error.toString());
    }
  };

  handleBack = () => {
    this.props.backToMenu();
  };

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  // 隐藏modal
  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  // 结束游戏
  finishGame = () => {
    // 暂停相机
    this.displayTarget.pause();
    const { goods, goodsNum, curTime } = this.state;
    const { points = 30 } = goods[goodsNum];
    this.timer && clearInterval(this.timer);
    if (goodsNum === GOODS_NUM - 1) {
      this.setState(
        {
          playing: false,
          curTime: curTime + points,
        },
        () => {
          this.showModal();
        }
      );
    } else {
      this.setState(
        {
          playing: false,
        },
        () => this.showModal()
      );
    }
  };

  // 恢复游戏
  resume = () => {
    const { goods, goodsNum, curTime } = this.state;
    const { points = 30 } = goods[goodsNum];
    this.hideModal();
    this.setState({ goodsNum: goodsNum + 1, introVisible: true });
    setTimeout(() => {
      // 恢复相机
      this.setState({
        introVisible: false,
        playing: true,
        curTime: curTime + points,
      });
      this.displayTarget.resume();
      this.gameLoop();
    }, 3000);
  };

  // 重新开始
  replay = () => {
    this.initGoods(() => this.setState({ introVisible: true }));
    setTimeout(() => {
      this.hideModal();
      this.displayTarget.resume();
      this.setState(
        {
          introVisible: false,
          playing: true,
          curTime: TOTAL_TIME,
        },
        () => {
          this.gameLoop();
        }
      );
    }, 3000);
  };

  openRankList = () => {
    this.rankList.getAllScore();
  };

  submitScore = () => {
    this.rankList.show();
  };

  render() {
    const {
      ready,
      curTime,
      playing,
      goods,
      goodsNum,
      curObject,
      modalVisible,
      screenShot,
      introVisible,
    } = this.state;
    let status = 10;
    if (ready) {
      if (playing) {
        status = 0;
      } else if (goodsNum >= GOODS_NUM - 1) {
        status = 3;
      } else if (curTime > 0) {
        status = 1;
      } else {
        status = 2;
      }
    }
    // const status = playing ? 0 : goodsNum >= GOODS_NUM - 1 ? 3 : curTime > 0 ? 1 : 2;
    const score = goodsNum < GOODS_NUM - 1 ? goodsNum - GOODS_NUM : curTime;
    const curTarget = goods ? goods[goodsNum] : {};
    const leftNum = GOODS_NUM - goodsNum - 1;
    return (
      <div data-spm="playground">
        <Intro show={introVisible} curTarget={curTarget} />
        <div className="camera-bg" id="ar-container">
          <canvas ref={node => (this.glCanvas = node)} />
        </div>
        <Header
          curTime={curTime}
          curTarget={curTarget}
          playing={playing}
          openRankList={this.openRankList} />
        <Footer curObject={curObject} status={status} curTarget={curTarget} />
        <Modal
          autoLockScrolling={false}
          show={modalVisible && !playing}
          type={status}
          curTarget={curTarget}
          resume={this.resume}
          leftNum={leftNum}
          replay={this.replay}
          submitScore={this.submitScore}
          screenShot={screenShot} />
        <RankList ref={n => (this.rankList = n)} score={score} />
      </div>
    );
  }
}
