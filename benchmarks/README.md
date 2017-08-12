
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


    inline-styles x 2,879 ops/sec ±3.51% (72 runs sampled)
    cxs x 4,045 ops/sec ±2.24% (77 runs sampled)
    emotion x 3,416 ops/sec ±2.93% (79 runs sampled)
    glamorous x 1,706 ops/sec ±12.33% (54 runs sampled)
    fela x 3,113 ops/sec ±6.61% (65 runs sampled)
    styled-components x 1,302 ops/sec ±10.00% (57 runs sampled)

    inline-styles x 2,774 ops/sec ±6.23% (72 runs sampled)
    cxs x 3,892 ops/sec ±5.62% (75 runs sampled)
    emotion x 3,121 ops/sec ±3.99% (75 runs sampled)
    glamorous x 2,251 ops/sec ±6.63% (70 runs sampled)
    fela x 2,597 ops/sec ±11.94% (56 runs sampled)
    styled-components x 1,471 ops/sec ±10.99% (62 runs sampled)

    inline-styles x 2,803 ops/sec ±4.45% (72 runs sampled)
    cxs x 3,473 ops/sec ±4.82% (69 runs sampled)
    emotion x 2,543 ops/sec ±4.98% (69 runs sampled)
    glamorous x 1,950 ops/sec ±5.37% (68 runs sampled)
    fela x 3,503 ops/sec ±5.70% (69 runs sampled)
    styled-components x 1,659 ops/sec ±6.21% (68 runs sampled)

    inline-styles x 2,659 ops/sec ±2.87% (73 runs sampled)
    cxs x 3,379 ops/sec ±4.99% (68 runs sampled)
    emotion x 2,873 ops/sec ±5.22% (70 runs sampled)
    glamorous x 2,133 ops/sec ±4.90% (69 runs sampled)
    fela x 3,829 ops/sec ±4.62% (68 runs sampled)
    styled-components x 1,576 ops/sec ±5.75% (66 runs sampled)

