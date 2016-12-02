is-cf
=====

Cloud Foundry environment detection and helpers.


# Installation
```bash
npm install --save is-cf
```

# Usage
```javascript
var isCF = require('is-cf');

if (isCF.env()) {
	// Running on a Cloud Foundry
  if (isCF.getService('p-redis')) {
    // Service 'p-redis' is bound, do stuff

  }
}
```

## API

#### `env()`

Determines Cloud Foundry presence using environment variables, returns a boolean

#### `getAppEnv()`

Returns VCAP_APPLICATION environment variable as an object

#### `getServicesEnv()`

Returns VCAP_SERVICES environment variable as an object

#### `getService(name)`

Returns environment metadata for service 'name' as an array, or null if service 'name' not found
