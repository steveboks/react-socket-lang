import io from 'socket.io-client'; // socket.io client 설치, web-socket이 아닌 라이브러리.
import React from 'react';
import ReactDOM from 'react-dom';

// https://react.i18next.com/latest/usetranslation-hook 설치
import './i18n';
// 훅 사용
import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts'; // 소캣데이터 보기위해 리챠트 설치

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'] // https://socket.io/docs/v3/client-api/index.html
});

const App = ({}) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();

  // 1. CPU 이벤트를 수신하고 상태를 업데이트합니다.
  useEffect(() => {
    socket.on('cpu', cpuPercent => {
      setData(currentData => [...currentData, cpuPercent]);
    })
  }, []);

  // 2. 상태를 사용하여 라인 차트 렌더링 / recharts 사용
  return (
    <div>
      <h1>{t('title')}</h1>
      <div>
        <button onClick={e => {i18n.changeLanguage("en");}}>en</button>
        <button onClick={e => {i18n.changeLanguage("ko");}}>ko</button>
      </div>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
