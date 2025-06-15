const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const apiKey = '44705759496c656535337472594970'; 
  const serviceName = 'OdblrDspsnCvntl';
  const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/${serviceName}/1/1000/`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API 호출 실패', detail: err.message }) };
  }
};
