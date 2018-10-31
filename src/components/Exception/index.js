import React from 'react';
import { Button } from 'antd';
import config from './typeConfig';
import './index.less';

export default ({ className, linkElement = 'a', type, title, desc, img, actions, ...rest }) => {
  const pageType = type in config ? type : '404';
  return (
    <div className='exception' {...rest}>
      <div className='imgBlock'>
        <div
          className='imgEle'
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </div>
      <div className='txtContent'>
        <h1>{title || config[pageType].title}</h1>
        <div className='desc'>{desc || config[pageType].desc}</div>
        <div className='actions'>
          <a href="/"><Button type="primary">返回首页</Button></a>
        </div>
      </div>
    </div>
  );
};