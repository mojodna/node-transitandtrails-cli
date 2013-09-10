# transitandtrails-cli

I am a command line client for the [Transit
& Trails](http://www.transitandtrails.org/) API.

## Installation

```bash
npm install -g transitandtrails-cli
```

Or, if you want the current development version:

```bash
npm install -g "git+https://github.com/mojodna/node-transitandtrails-cli"
```

## Usage

```bash
tnt --help
tnt -k <key> trailhead -g 292
tnt -k <key> trailhead-maps 292
```

## Environment Variables

* `TNT_KEY` - (optional) API key--can be used to avoid passing `-k`.
* `TNT_URL_PREFIX` - (optional) alternate URL prefix. Defaults to
  `https://www.transitandtrails.org`.

## License

Copyright (c) 2013 Seth Fitzsimmons

Published under the MIT license.
