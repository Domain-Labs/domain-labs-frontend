const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const { parse } = require('node-html-parser');

const app = express();
const PORT = 3030;

// static resources should just be served as they are
const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // Will not compress responses, if this header is present
    return false;
  }
  // Resort to standard compression
  return compression.filter(req, res);
};
// Compress all HTTP responses
app.use(
  compression({
    // filter: Decide if the answer should be compressed or not,
    // depending on the 'shouldCompress' function above
    filter: shouldCompress,
    // threshold: It is the byte threshold for the response
    // body size before considering compression, the default is 1 kB
    threshold: 0,
  }),
);

app.use(express.static(path.resolve(__dirname, 'build'), { maxAge: '30d' }));

const indexPath = path.resolve(__dirname, 'build', 'index.html');

app.get('/*', (req, res, next) => {
  const url = req.url;
  console.log(url, ' >>> url');
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error during file reading', err);
      return res.status(404).end();
    }

    switch (url) {
      case '/faqs':
        const root = parse(htmlData);
        const headElement = root.querySelector('head');
        const title = headElement.querySelector('title');
        title.set_content(
          `FAQ's - Digital Identities, Web3 Domains, Crypto Wallets`,
        );
        const metaElements = headElement.querySelectorAll('meta');
        metaElements.forEach((meta) => {
          if (
            meta.getAttribute('name') === 'description' ||
            meta.getAttribute('property') === 'og:description'
          ) {
            meta.setAttribute(
              'content',
              'Get answers to your FAQs about digital identities, Web3 domains, and crypto wallets. Empower yourself with knowledge and make informed decisions.',
            );
          }
        });
        htmlData = root.toString();
        console.log(htmlData);
        break;
      case '':
      case '/pricing':
      case 'clio':
      default:
        break;
    }
    // // inject meta tags
    // htmlData = htmlData.replace(
    //     "<title>React App</title>",
    //     `<title>${post.title}</title>`
    // )
    // .replace('__META_OG_TITLE__', post.title)
    // .replace('__META_OG_DESCRIPTION__', post.description)
    // .replace('__META_DESCRIPTION__', post.description)
    // .replace('__META_OG_IMAGE__', post.thumbnail)
    return res.send(htmlData);
  });
});

app.listen(PORT, (error) => {
  if (error) {
    return console.log('Error during app startup', error);
  }
  console.log('listening on ' + PORT + '...');
});
