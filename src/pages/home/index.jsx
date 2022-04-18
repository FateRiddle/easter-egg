import React, { Suspense, lazy, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Loading from '@ali/rmpi-loading';
const Menu = lazy(() => import('./Menu'));
const Playground = lazy(() => import('./Playground'));

const Game = () => {
  const [isMenu, set] = useState(true);

  useEffect(() => {
    import('./Playground');
  }, []);

  const toGame = () => set(false);
  const backToMenu = () => set(true);

  return (
    <div>
      {isMenu ? (
        <Suspense fallback={<Loading show />}>
          <Menu toGame={toGame} />
        </Suspense>
      ) : (
        <Suspense fallback={<Loading show />}>
          <div className="game-page">
            <Playground backToMenu={backToMenu} />
          </div>
        </Suspense>
      )}
    </div>
  );
};

ReactDOM.render(<Game />, document.querySelector('#app'));
