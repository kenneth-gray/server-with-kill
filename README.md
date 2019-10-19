# Server With Kill

This package can wrap a node `server` so that it has an additional `kill` method, which destroys connections immediately.

## Installation

```
npm install server-with-kill
```

## Example usage

```javascript
const express = require('express');
const { transform } = require('server-with-kill');

const app = express();

const server = transform(app.listen(3000));
server.kill();
```

See `/example/index.ts` for a more advanced use case.
