const fetch = require('node-fetch');

exports.handler = async function () {
  const congestionKey = '694b6a49546c656535326255614476'; 
  const facilityKey = '44705759496c656535337472594970';   

  const today = new Date();
  const yyyyMMdd = today.toISOString().slice(0, 10).replace(/-/g, ''); // '20250615' 형식

  // API URL 구성
  const facilityURL = `http://openapi.seoul.go.kr:8088/${facilityKey}/json/OdblrDspsnCvntl/1/1000/`;
  const congestionURL = `http://openapi.seoul.go.kr:8088/${congestionKey}/json/CardSubwayStatsNew/1/1000/${yyyyMMdd}`;

  try {
    // 병렬 호출
    const [facilityRes, congestionRes] = await Promise.all([
      fetch(facilityURL),
      fetch(congestionURL)
    ]);

    const facilityData = await facilityRes.json();
    const congestionData = await congestionRes.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        facility: facilityData,
        congestion: congestionData
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'API 호출 실패',
        detail: error.message
      })
    };
  }
};
