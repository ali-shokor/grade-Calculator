
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/grade-Calculator/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/grade-Calculator"
  }
],
  assets: {
    'index.csr.html': {size: 2402, hash: 'cd4cc2a18cc03d56e2510463782f0754e3c6cec1320b4d2e7fd134a142dfcab2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1152, hash: '53a3b0f55ab42b51e03c761d3d1330d2c3e98c5d2cac496f7e61665898919a21', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 32065, hash: '72d9dc2e664230e6b378a9197f3233d69c7bfd73bba5a976a56cea9543b0ad51', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-YG5INCBQ.css': {size: 18225, hash: 'Bq9Cv59b3l8', text: () => import('./assets-chunks/styles-YG5INCBQ_css.mjs').then(m => m.default)}
  },
};
