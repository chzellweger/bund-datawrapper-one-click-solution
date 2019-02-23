import fetch from 'node-fetch'

fetch('/www/sites/bu-dw-typescript/tests/mockData.ts').then(res => res.json()).then(json => console.log(json))
.catch(error => console.log(error))