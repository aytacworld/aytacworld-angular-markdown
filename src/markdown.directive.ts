import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { parse } from 'marked';
import { highlightBlock } from 'highlight.js';

@Directive({ selector: '[markdown]' })
export class MarkdownDirective implements OnInit {
  @Input() markdown: string;
  @Input() sanitize: boolean;
  @Input() highlight: boolean = true;
  @Input() lineNumbers: boolean = true;

  constructor (private el: ElementRef) { }

  ngOnInit (): void {
    this.el.nativeElement.innerHTML = parse(this.markdown, { sanitize: this.sanitize });
    if (this.highlight) {
      const preTags: Array<HTMLPreElement> = this.el.nativeElement.getElementsByTagName('pre');
      for (const pre of preTags) {
        pre.classList.add(pre.getElementsByTagName('code')[0].className.split('-')[1]);
        this.removeLines(pre);
        highlightBlock(pre);
        if (this.lineNumbers) { this.addLines(pre); }
      }
    }

  }

  private removeLines (pre: HTMLPreElement): void {
    const span = pre.querySelector('span.line-number');
    if (span) {
      pre.removeChild(span);
    }
  }

  private addLines (pre: HTMLPreElement): void {
    const style = 'style="float: left;text-align: right;"';
    const rowStyle = 'style="display: block;padding: 0 .5em 0 1em;border-right: 1px solid;margin-right: 5px;"';
    pre.innerHTML = '<span class="line-number" ' + style + '></span>' + pre.innerHTML + '<span class="cl"></span>';
    const num = pre.innerHTML.split(/\n/).length;
    for (let j = 1; j < num; j++) {
      const lineNum = pre.getElementsByTagName('span')[0];
      lineNum.innerHTML += '<span ' + rowStyle + '>' + (j) + '</span>';
    }
  }
}
