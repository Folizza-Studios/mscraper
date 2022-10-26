# MScraper

> Easily scrape metadata from any url or html

### Usage

Installation

```sh
npm install mscraper # NPM
yarn add mscraper # YARN
```

Initialize

```ts
import mscraper from 'mscraper';

// From string
const scraper = new mscraper(
    '<meta name="description" content="This is an amazing website" />' // Your url
);
// From url
const scraper = await mscraper.getFromUrl(
    'https://github.com/' // Your url
);
```

Get the data

```ts
scraper.get('description'); // This is an amazing website
scraper.getAll(); // {tag: 'description', content: 'This is an amazing website'}
```
