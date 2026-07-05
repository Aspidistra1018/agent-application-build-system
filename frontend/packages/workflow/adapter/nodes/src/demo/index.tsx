import React, { useState } from 'react';

import classNames from 'classnames';

import PngDemo from '../assets/rspack.png';
import SVGDemo, { ReactComponent as SVGComponent } from '../assets/react.svg';

import s from './index.module.less';

export function DemoComponent(props: { name: string }): JSX.Element {
  const [foo] = useState('hello world');
  const { name } = props;
  return (
    // Font-bold from taiwindcss
    // It is recommended to use taiwindcss first.
    <div className={classNames(s.foo, 'font-bold')}>
      {foo} {name}!
      <div>
        <div>
          SVG: <img src={SVGDemo} />
        </div>
        <div>
          SVG Icon: <SVGComponent />
        </div>
        <div>
          PNG: <img src={PngDemo} width={100} />
        </div>
      </div>
    </div>
  );
}
