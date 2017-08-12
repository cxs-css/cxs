
# Benchmarks

First, in the root of the cxs repo, run `npm run prepublish`.

Then:

```sh
cd benchmarks
npm i
npm test
```

    inline-styles x 1,816 ops/sec ±8.29% (67 runs sampled)
    cxs x 2,777 ops/sec ±3.20% (73 runs sampled)
    emotion x 2,274 ops/sec ±4.53% (67 runs sampled)
    glamorous x 1,338 ops/sec ±6.30% (59 runs sampled)
    styled-components x 880 ops/sec ±11.67% (57 runs sampled)

    inline-styles x 2,629 ops/sec ±7.03% (69 runs sampled)
    cxs x 3,273 ops/sec ±5.63% (68 runs sampled)
    emotion x 2,892 ops/sec ±5.33% (70 runs sampled)
    glamorous x 2,173 ops/sec ±4.27% (72 runs sampled)
    styled-components x 1,625 ops/sec ±14.74% (73 runs sampled)

