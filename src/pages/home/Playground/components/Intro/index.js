import React from 'react';
import Modal from '@ali/rmpi-modal';
import './index.scss';

export default function Intro({ show, curTarget = {} }) {
  // const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

  return (
    <Modal autoLockScrolling={false} show={show} showClose={false}>
      <div className="intro heartBeat">
        <img className="object-img" src={curTarget.img} alt={curTarget.text} />
        <p className="intro-text">
          寻找：<span className="text-red">{curTarget.text}</span>
        </p>
        <p className="intro-text2">
          奖励：<span className="text-red">{curTarget.points}</span> 秒
        </p>
      </div>
    </Modal>
  );
}

// const CountDown = () => {
//   const [count, set] = useState(3);
//   const flipNumber = () => {
//     var flipTime = 1000;
//     var wrapper = document.querySelector('.clock__number-wrapper');
//     wrapper.classList.add('clock__number-wrapper--open');
//     setTimeout(function() {
//       if (count > 0) {
//         set(count - 1);
//         wrapper.classList.remove('clock__number-wrapper--open');
//       }
//     }, flipTime / 2);
//   };
//   useEffect(() => {
//     var flipTime = 1000;
//     setInterval(flipNumber, flipTime);
//   }, []);
//   return (
//     <div className="clock">
//       <div className="clock__number-wrapper">
//         <span className="clock__section clock__section--next">
//           <span className="clock__number js-increment-after">{count + 1}</span>
//         </span>
//         <span className="clock__section clock__section--upper">
//           <span className="clock__number js-increment-before">{count}</span>
//         </span>
//         <span className="clock__section clock__section--upper-back">
//           <span className="clock__number js-increment-after">{count + 1}</span>
//         </span>
//         <span className="clock__section clock__section--lower">
//           <span className="clock__number js-increment-before">{count}</span>
//         </span>
//       </div>
//     </div>
//   );
// };
