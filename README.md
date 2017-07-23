# aytacworld-angular-markdown

Angular markdown directive with code highlighting and row numbers

## Install

`npm install --save aytacworld-angular-markdown`

## Usage

app.module.ts

```typescript
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'aytacworld-angular-markdown';
@NgModule({
  imports: [
    MarkdownModule
  ]
})
export class AppModule {}
```

app.component.ts

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `<div [markdown]="'# hello world\nThis is a paragraf'"></div>`
})
export class AppComponent { }
```

### Adding highlight.js style

#### Styles can be found at
[https://github.com/isagalaev/highlight.js/tree/master/src/styles](https://github.com/isagalaev/highlight.js/tree/master/src/styles)

#### Using angular CLI

1. `npm install --save highlight.js`
2. Add it to `.angular-cli.json`
```javascript
{
  ...,
  "apps": [{
    ...,
    "styles": [
      ...,
      "../node_modules/highlight.js/styles/monokai-sublime.css"
    ],
    ...
  }],
  ...
}
```

#### Using CDN
add `<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css">` inside `head` tag in `index.html`

## Api

|Input       |  Description   |  Type  |  Default  |
|------------|----------------|--------|-----------|
|markdown    |  markdown input | string | (empty) |
|sanitize    |  sanitize markdown input | boolean | undefined |
|highlight   |  highlight the pre/code inside the rendered html | boolean | true |
|lineNumbers |  add line-numbers to pre/code inside the rendered html | boolean | true |

## Test

`npm test`

still need to add more tests

## Examples

TODO

## MIT License

Copyright (c) 2017 Adem Aytaç

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
