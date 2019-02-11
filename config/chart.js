module.exports = {
    "title": "[Hier Titel einfügen]",
    "type": "d3-maps-choropleth",
    "metadata": {
      "data": {
        "transpose": false,
        "vertical-header": true,
        "horizontal-header": true,
        "column-format": {
          "Codes": {
            "type": "text"
          },
          "Namen": [],
          "jaStimmenInProzent": [],
          "neinStimmenAbsolut": [],
          "stimmbeteiligungInProzent": []
        }
      },
      "visualize": {
        "highlighted-series": [],
        "highlighted-values": [],
        "basemap": "canton-bern-2018",
        "tooltip": {
          "body": "Ja: {{ jaStimmenAbsolut }}\nNein: {{ neinStimmenAbsolut }}\nStimmbeteiligung: {{ stimmbeteiligungInProzent }}%",
          "title": "{{ Namen }}: {{ jaStimmenInProzent }}% Ja",
          "fields": {
            "Codes": "Codes",
            "Namen": "Namen",
            "jaStimmenAbsolut": "jaStimmenAbsolut",
            "jaStimmenInProzent": "jaStimmenInProzent",
            "neinStimmenAbsolut": "neinStimmenAbsolut",
            "stimmbeteiligungInProzent": "stimmbeteiligungInProzent"
          }
        },
        "gradient": {
          "stops": [
            {
              "p": 0,
              "v": 20
            },
            {
              "p": 0.49,
              "v": 49.9
            },
            {
              "p": 0.51,
              "v": 50.1
            },
            {
              "p": 1,
              "v": 80
            }
          ],
          "colors": [
            {
              "c": "#c51b7d",
              "p": 0
            },
            {
              "c": "#e9a3c9",
              "p": 0.16666666666666666
            },
            {
              "c": "#fde0ef",
              "p": 0.3333333333333333
            },
            {
              "c": "#faf6ea",
              "p": 0.5
            },
            {
              "c": "#e6f5d0",
              "p": 0.6666666666666666
            },
            {
              "c": "#a1d76a",
              "p": 0.8333333333333334
            },
            {
              "c": "#4d9221",
              "p": 1
            }
          ],
          "domain": [
            0,
            0.16666666666666666,
            0.3333333333333333,
            0.5,
            0.6666666666666666,
            0.8333333333333334,
            1
          ]
        },
        "zoomable": true,
        "map-key-attr": "GMDNR",
        "map-key-auto": false,
        "map-type-set": "true",
        "map-key-stops": "20,< 20%\n30,30 - 39\n40,40 - 49\n50,50 - 59\n60,60 - 69\n70,70 - 79\n80,> 80",
        "map-key-title": "Prozent Ja-Stimmen",
        "map-key-format": ".1f",
        "map-key-position": "br",
        "hide-empty-regions": true,
        "avoid-label-overlap": true
      },
      "describe": {
        "source-name": "BfS",
        "source-url": "https://opendata.swiss/de/dataset/echtzeitdaten-am-abstimmungstag-zu-kantonalen-abstimmungsvorlagen",
        "number-format": "-",
        "number-divisor": 0,
        "number-append": "",
        "number-prepend": "",
        "intro": "",
        "byline": "Der Bund",
        "hide-title": false
      },
      "annotate": {
        "notes": ""
      },
      "axes": {
        "keys": "Codes",
        "labels": "Namen",
        "values": "jaStimmenInProzent"
      }
    }
  }
