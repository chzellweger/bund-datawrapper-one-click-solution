import { Gemeinde, Resultat, Vorlage } from '../src/models/sourceData';
import OutputData from '../src/models/outputData';

import mockData from './mockData';
import mockResForCreateChart from './mockResForCreateChart';
import mockResForPublishChart from './mockResforPublishChart';

import dataHandlers from '../src/services/data/dataHandlers';
import chartHandlers from '../src/services/charts/chartHandlers';
import handleCharts from '../src/controllers/charts/handleCharts';
import chartMachine from '../src/routes/charts/chartMachine';

describe('dataHandlers has a service called', () => {
  describe('shapeGemeinde', () => {
    it(', it returns a correctly shaped Gemeinde', () => {
      const gemeinde: Gemeinde = {
        geoLevelnummer: '1',
        geoLevelname: 'test',
        geoLevelParentnummer: '0',
        resultat: <Resultat>{
          gebietAusgezaehlt: true,
          jaStimmenInProzent: 1,
          jaStimmenAbsolut: 1,
          neinStimmenAbsolut: 1,
          stimmbeteiligungInProzent: 1,
          eingelegteStimmzettel: 1,
          anzahlStimmberechtigte: 1,
          gueltigeStimmen: 1
        }
      };

      const result: OutputData = {
        Codes: '1',
        Namen: 'test',
        jaStimmenInProzent: 1,
        jaStimmenAbsolut: 1,
        neinStimmenAbsolut: 1,
        stimmbeteiligungInProzent: 1
      };

      expect(dataHandlers.shapeGemeinde(gemeinde)).toEqual(result);
    });
  });

  describe('handleSpecialCase', () => {
    // values of 389: Meienried should equal 383: Büren an der Aare
    const gemeindeNummer = 389;
    const gemeindeName = 'Meienried';

    let vorlage: Vorlage;
    let result: OutputData;

    beforeAll(function() {
      vorlage = mockData.kantone[1].vorlagen[0];
      result = dataHandlers.handleSpecialCase(gemeindeNummer, vorlage);
    });

    it(', it keeps the special cases name', () => {
      expect(result['Namen']).toBe(gemeindeName);
    });

    it(', it adds the right values', () => {
      expect(result['jaStimmenInProzent']).toBe(42.387732749);
    });
  });
});

describe('chartHandlers has a service called', () => {
  describe('getId', () => {
    it(', it returns a chart id from the api response', () => {
      expect(chartHandlers.getId(mockResForCreateChart)).toBe('aBcDe');
    });
  });

  describe('getChartInfo', () => {
    it(', it returns an object of infos for a publish-response from the api', () => {
      const response = {
        chartId: 'nDfLw',
        publicUrl: '//datawrapper.dwcdn.net/nDfLw/2/',
        embed: {
          'embed-method-iframe':
            '<iframe title="Wo das Energiegesetz angenommen wurden" aria-describedby="" src="//datawrapper.dwcdn.net/nDfLw/2/" scrolling="no" frameborder="0" width="444" height="415"></iframe>',
          'embed-method-responsive':
            '<iframe title="Wo das Energiegesetz angenommen wurden" aria-describedby="" id="datawrapper-chart-nDfLw" src="//datawrapper.dwcdn.net/nDfLw/2/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important;" height="415"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",function(a){if(void 0!==a.data["datawrapper-height"])for(var t in a.data["datawrapper-height"]){var e=document.getElementById("datawrapper-chart-"+t);e&&(e.style.height=a.data["datawrapper-height"][t]+"px")}})}();\n</script>'
        },
        publishedAt: '2019-02-10 16:19:46'
      };

      expect(chartHandlers.getChartInfo(mockResForPublishChart)).toEqual(response);
    });
  });
});

// describe('controller handleCharts', () => {
//   it('calls the createCharts-service', (done: any) => {
//     spyOn(chartHandlers, 'createChart').and.returnValue(
//       Promise.resolve('abc123')
//     );

//     handleCharts('1').then((result) => {
//       expect(chartHandlers.createChart).toHaveBeenCalled();
//       expect(result).toBe('abc123');
//       done()
//     });
//   });

//   it('calls the addData-service', (done: any) => {
//     const response = {
//       status: 'ok',
//       data: 's3://datawrapper-charts/data/123456/abCdE.csv'
//     };

//     spyOn(chartHandlers, 'addData').and.returnValue(Promise.resolve(response));

//     handleCharts('1').then((result) => {
//       expect(chartHandlers.addData).toHaveBeenCalledWith('1', 'abc123');
//       expect(result).toEqual(response);
//       done()
//     });
//   });

//   it('calls the editChart-service', (done: any) => {
//     spyOn(chartHandlers, 'editChart').and.returnValue(
//       Promise.resolve({ a: 'b' })
//     );

//     handleCharts('1').then((result) => {
//       expect(chartHandlers.editChart).toHaveBeenCalled();
//       expect(result).toEqual({ a: 'b' });
//       done()
//     });
//   });

//   it('calls the publishChart-service', (done: any) => {
//     spyOn(chartHandlers, 'publishChart').and.returnValue(
//       Promise.resolve({ a: 'b' })
//     );

//     handleCharts('1').then((result) => {
//       expect(chartHandlers.publishChart).toHaveBeenCalled();
//       expect(result).toEqual({ a: 'b' });
//       done()
//     });
//   });
// });
