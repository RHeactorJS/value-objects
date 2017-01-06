# Errors

Note that Babel [does not support extending builtin classes](https://github.com/babel/babel/commit/3878bd812c73bdd18b1011be59515dad985940fd), so we use [this way](http://stackoverflow.com/a/35858868) to create the error objects:
  
```javascript
class MyError {
  constructor(message) {
    this.name = MyError.name
    this.message = message
    this.stack = (new Error(message)).stack
  }
}
MyError.prototype = Object.create(Error.prototype)
```
