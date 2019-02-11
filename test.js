const fetch = require('node-fetch');
const fs = require('fs');
const parseJson = require('parse-json')
const url =
  'https://s3.eu-central-1.amazonaws.com/app-prod-static-voteinfo/v1/ogd/20190210_kant_Abstimmungsresultate_ogd.json';

const jsonUrl = 'https://dog.ceo/api/breeds/list/all'

async function getData(voteId) {
  const vote = parseInt(voteId) - 1;

  return fetch(url, { headers: { 'Accept': 'application/json' }})
    .then((res) => {
      const contentType = res.headers.get('content-type');
      console.log(contentType);

      if (contentType === 'application/octet-stream') {
        return res.text().then(s => {
          s = s.trim()
          const json = JSON.parse(s)
          return json
        })
      } else if (contentType === 'application/json') {
        return res.json()
      } else {
        console.log('error');
        throw new Error(`content type unknown. Type: ${contentType}`);
      }
    })
    .then(data => {
      const voteData = data.kantone[1]['vorlagen'][0];
      return voteData;
    })
    .catch((error) => {
      console.log(error)
      return new Error(error)
    });
}

getData()
