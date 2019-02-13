function copyToClip(str) {
  function listener(e) {
    e.clipboardData.setData('text/html', str);
    e.clipboardData.setData('text/plain', str);
    e.preventDefault();
  }
  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
}

const copyButton1 = document.querySelector('.copy-1');
const copyButton2 = document.querySelector('.copy-2');

const startButton1 = document.querySelector('.run-1');
const startButton2 = document.querySelector('.run-2');

const linkBox1 = document.querySelector('.result-1-direct');
const linkBox2 = document.querySelector('.result-2-direct');

const embedBox2 = document.querySelector('.result-2-embed');
const embedBox1 = document.querySelector('.result-1-embed');

const editBox1 = document.querySelector('.result-1-edit');
const editBox2 = document.querySelector('.result-2-edit');

const mapBox1 = document.querySelector('.map-1');
const mapBox2 = document.querySelector('.map-2');

const loader1 = document.querySelector('.loader-1');
const loader2 = document.querySelector('.loader-2');

const resultBox1 = document.querySelector('.result-box-1');
const resultBox2 = document.querySelector('.result-box-2');

const errorBox2 = document.querySelector('.error-box-2');
const errorBox1 = document.querySelector('.error-box-1');

loader1.hidden = true;
loader2.hidden = true;

resultBox1.hidden = true;
resultBox2.hidden = true;

errorBox1.hidden = true;
errorBox2.hidden = true;

startButton1.addEventListener('click', () => {
  loader1.hidden = false;
  resultBox1.hidden = true;
  errorBox1.hidden = true;

  fetch('/chart-machine/machine/1')
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      linkBox1.innerHTML = `<mark>${json.chart.publicUrl}</mark>`;
      linkBox1.href = json.chart.publicUrl;

      editBox1.innerHTML = `<mark>https://app.datawrapper.de/map/${
        json.chart.chartId
      }/visualize</mark>`;
      editBox1.href = `https://app.datawrapper.de/map/${
        json.chart.chartId
      }/visualize`;

      mapBox1.innerHTML = json.chart.embed['embed-method-responsive'];

      embedBox1.innerText = json.chart.embed['embed-method-responsive'];

      loader1.hidden = true;
      resultBox1.hidden = false;
    })
    .catch((e) => {
      console.log(e);
      loader1.hidden = true;
      resultBox1.hidden = true;
      errorBox1.hidden = false;
    });
});

startButton2.addEventListener('click', () => {
  loader2.hidden = false;
  resultBox2.hidden = true;
  errorBox2.hidden = true;

  fetch('/chart-machine/machine/2')
    .then((res) => res.json())
    .then((json) => {
      console.log(json);

      linkBox2.innerHTML = `<mark>${json.chart.publicUrl}</mark>`;
      linkBox2.href = json.chart.publicUrl;

      editBox2.innerHTML = `<mark>https://app.datawrapper.de/map/${
        json.chart.chartId
      }/visualize</mark>`;
      editBox2.href = `https://app.datawrapper.de/map/${
        json.chart.chartId
      }/visualize`;

      mapBox2.innerHTML = json.chart.embed['embed-method-responsive'];
      embedBox2.innerText = json.chart.embed['embed-method-responsive'];

      loader2.hidden = true;
      resultBox2.hidden = false;
    })
    .catch((e) => {
      console.log(e);
      loader2.hidden = true;
      resultBox2.hidden = true;
      errorBox2.hidden = false;
    });
});

copyButton1.addEventListener('click', () => {
  copyToClip(embedBox1.innerText);
});

copyButton2.addEventListener('click', () => {
  copyToClip(embedBox2.innerText);
});
