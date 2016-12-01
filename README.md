is-cf
=====

Returns `true` if running on Cloud Foundry, otherwise returns `false`


# Installation
```bash
npm install --save is-cf
```

# Usage
```javascript
var isCF = require('is-cf');

if (isCF.env()) {
	// Running on a Cloud Foundry
}
```

## API

#### `env()`

Determines Cloud Foundry presence using environment variables
