import dataHandlers from '../src/services/data/dataHandlers';
import handleCharts from '../src/controllers/charts/handleCharts';
import chartMachine from '../src/routes/charts/chartMachine';

import { Gemeinde, Resultat, Vorlage } from '../src/models/sourceData';
import OutputData from '../src/models/outputData';
import mockData from './mockData';
import chartHandlers from '../src/services/charts/chartHandlers';
import { doesNotReject } from 'assert';

describe('dataHandler', () => {
  describe('has a service called shapeGemeinde', () => {
    it('returns a correctly shaped Gemeinde', () => {
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

  describe('has a service called handleSpecialCase', () => {
    // values of 389: Meienried should equal 383: Büren an der Aare
    const gemeindeNummer = 389;
    const gemeindeName = 'Meienried';

    let vorlage: Vorlage;
    let result: OutputData;

    beforeAll(function() {
      vorlage = mockData.kantone[1].vorlagen[0];
      result = dataHandlers.handleSpecialCase(gemeindeNummer, vorlage);
    });

    it('keeps the special cases name', () => {
      expect(result['Namen']).toBe(gemeindeName);
    });

    it('adds the right values', () => {
      expect(result['jaStimmenInProzent']).toBe(42.387732749);
    });
  });
});

describe('controller handleCharts', () => {
  it('calls the createCharts-service', (done: any) => {
    spyOn(chartHandlers, 'createChart').and.returnValue(
      Promise.resolve('abc123')
    );

    handleCharts('1').then((result) => {
      expect(chartHandlers.createChart).toHaveBeenCalled();
      expect(result).toBe('abc123');
      done()
    });
  });

  it('calls the addData-service', (done: any) => {
    const response = {
      status: 'ok',
      data: 's3://datawrapper-charts/data/123456/abCdE.csv'
    };

    spyOn(chartHandlers, 'addData').and.returnValue(Promise.resolve(response));

    handleCharts('1').then((result) => {
      expect(chartHandlers.addData).toHaveBeenCalledWith('1', 'abc123');
      expect(result).toEqual(response);
      done()
    });
  });

  it('calls the editChart-service', (done: any) => {
    spyOn(chartHandlers, 'editChart').and.returnValue(
      Promise.resolve({ a: 'b' })
    );

    handleCharts('1').then((result) => {
      expect(chartHandlers.editChart).toHaveBeenCalled();
      expect(result).toEqual({ a: 'b' });
      done()
    });
  });

  it('calls the publishChart-service', (done: any) => {
    spyOn(chartHandlers, 'publishChart').and.returnValue(
      Promise.resolve({ a: 'b' })
    );

    handleCharts('1').then((result) => {
      expect(chartHandlers.publishChart).toHaveBeenCalled();
      expect(result).toEqual({ a: 'b' });
      done()
    });
  });
});
