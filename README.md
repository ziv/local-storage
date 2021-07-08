# local-storage
[![CI](https://github.com/ziv/local-storage/actions/workflows/main.yml/badge.svg)](https://github.com/ziv/local-storage/actions/workflows/main.yml)
[![CodeQL](https://github.com/ziv/local-storage/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/ziv/local-storage/actions/workflows/codeql-analysis.yml)
[![codecov](https://codecov.io/gh/ziv/local-storage/branch/main/graph/badge.svg?token=NTYSCHNSS1)](https://codecov.io/gh/ziv/local-storage)

AsyncLocalStorage middleware.

## Install
```shell
npm i @xpr/local-storage
```

## Usage

```typescript
import { localStorage, getStore } from '@xpr/local-storage';

const app = express();

// The middleware starts an async hooks trap.
// 
// From now on, every function called after
// this middleware run, can access the [[Request]]
// and the [[Response]] of the same context using
// the [[getStore]] function.
app.use(localStorage);

app.use((req, res, next) => {
  req.locals.RAND = generateRandNumber();
});


function logger(message: string) {
  const store = getStore();
  if (store) {
    // we've been called from inside async trap
    // we can use the store content
    const id = store.request.locals.RAND;
    console.log(id, message);
  } else {
    console.log(null, message);
  }
}
// 
```
