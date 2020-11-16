var getHours = require('date-fns/getHours');
const fs = require('fs');
const outPutFileName="resultset.json";

/**
 *@function clicks
 *@summary this function wil produce JSON file on the basis of users click,
 * number of click for a particulat IP should not be more then 10
 */
const clicks = data => {
  const tempArr = {};
  const ipClickCount = {};
  data.forEach(element => {
    const { ip } = element;
    const hours = getHours(new Date(element.timestamp));
    if (tempArr[hours]) {
      if ((tempArr[hours][element.ip] && tempArr[hours][element.ip]['amount'] < element.amount)||!tempArr[hours][element.ip]) {
        tempArr[hours][element.ip] = element;
      }
    } else {
      const nestedObj = {};
      nestedObj[ip] = element;
      tempArr[hours] = nestedObj;
    }
    ipClickCount[element.ip] = ipClickCount[element.ip] ? ipClickCount[element.ip] + 1 : 1;
  });
  const outputArr = [];
  Object.keys(tempArr).forEach(key => {
    Object.keys(tempArr[key]).forEach(ip => {
      if (ipClickCount[ip] <= 10) {
        outputArr.push(tempArr[key][ip]);
      }
    });
  });
  if (outputArr.length) {
    fs.writeFileSync(outPutFileName, JSON.stringify(outputArr));
  }
};

module.exports = clicks;
