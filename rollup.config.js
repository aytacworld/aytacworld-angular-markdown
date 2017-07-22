export default {
  dest: 'dist/bundles/aytacworld-angular-markdown.umd.js',
  entry: 'dist/index.js',
  format: 'umd',
  globals: {
    '@angular/core': 'ng.core',
    'marked': 'marked',
    'highlight.js': 'highlight.js',
    'rxjs': 'rxjs'
  },
  moduleName: 'ng.simpleForms',
  sourceMap: false,
  external: [ '@angular/core', 'marked', 'highlight.js', 'rxjs' ]
}
