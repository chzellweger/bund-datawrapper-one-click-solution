export default {
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
              "v": 0
            },
            {
              "p": 0.01,
              "v": 19.9
            },
            {
              "p": 0.2,
              "v": 20
            },
            {
              "p": 0.3,
              "v": 30
            },
            {
              "p": 0.4,
              "v": 40
            },
            {
              "p": 0.42,
              "v": 49.9
            },
            {
              "p": 0.57,
              "v": 50.1
            },
            {
              "p": 0.6,
              "v": 60
            },
            {
              "p": 0.7,
              "v": 70
            },
            {
              "p": 0.8,
              "v": 80
            },
            {
              "p": 1,
              "v": 81
            }
          ],
          "colors": [
            {
              "c": "#d3d3de",
              "p": 0
            },
            {
              "c": "#c51b7d",
              "p": 0.01
            },
            {
              "c": "#e9a3c9",
              "p": 0.199
            },
            {
              "c": "#fde0ef",
              "p": 0.45
            },
            {
              "c": "#faf6ea",
              "p": 0.5
            },
            {
              "c": "#e6f5d0",
              "p": 0.55
            },
            {
              "c": "#4d9221",
              "p": 0.8
            },
            {
              "c": "#4d9221",
              "p": 1
            }
          ],
          "domain": [
            0,
            100
          ]
        },
        "zoomable": true,
        "map-key-attr": "GMDNR",
        "map-key-auto": false,
        "map-type-set": "true",
        "map-key-stops": "20,< 20%\n21,20 - 39\n40,40 - 49\n50,50 - 59\n60,60 - 69\n70,70 - 79\n80,> 80",
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
