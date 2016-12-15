# rheactor-value-objects

[![Build Status](https://travis-ci.org/ResourcefulHumans/rheactor-value-objects.svg?branch=master)](https://travis-ci.org/ResourcefulHumans/rheactor-value-objects)
[![monitored by greenkeeper.io](https://img.shields.io/badge/greenkeeper.io-monitored-brightgreen.svg)](http://greenkeeper.io/) 
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![semantic-release](https://img.shields.io/badge/semver-semantic%20release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/854f1c8c7c144cb48c2e6b74fd64c9b4)](https://www.codacy.com/app/ResourcefulHumans/rheactor-value-objects?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ResourcefulHumans/rheactor-value-objects&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/854f1c8c7c144cb48c2e6b74fd64c9b4)](https://www.codacy.com/app/ResourcefulHumans/rheactor-value-objects?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ResourcefulHumans/rheactor-value-objects&amp;utm_campaign=Badge_Coverage)

[![NPM](https://nodei.co/npm/rheactor-value-objects.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/rheactor-value-objects/)

A collection of value objects

## Common API

### .Type()

This method exposes a [tcomb](https://github.com/gcanti/tcomb) type validation base on the **name of the type**.

Note that instanceof can't be used because having this check will return false, because the application using
the value-objects package will create an instance that Node.js thinks to be from a different location that the
one referenced in this package's `uri.js`

    # app.js
    const URIValue = require('rheactor-value-objects/uri')
    let u = new URIValue(…)
    URIValue.Type(u) // will fail
    
    # uri.js
    URIValue.Type = t.irreducible('URIValue', (x) => x instanceof URIValue)
  
## .equals()

You can compare two value objects with the `.equals()` method:

```javascript
const ex = new URIValue('https://example.com') 
ex.equals(new URIValue('https://example.com')) // -> true
ex.equals(new URIValue('https://acme.com'))    // -> false
```
## TODO

- Replace HAPI Joi validation with tcomb validation
