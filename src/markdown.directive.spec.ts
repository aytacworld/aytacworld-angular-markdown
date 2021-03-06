// tslint:disable:max-classes-per-file
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownDirective } from './markdown.directive';

@Component({ template: `<div [markdown]="markdownInput" ></div>` })
class TestComponent1 { markdownInput: string = `hello world`; highlight: boolean; lineNumbers: boolean; }

@Component({ template: `<div [markdown]="markdownInput" [sanitize]="sanitize" [highlight]="highlight" [lineNumbers]="lineNumbers"></div>` })
class TestComponent2 { markdownInput: string = `hello world`; sanitize: boolean; highlight: boolean = true; lineNumbers: boolean = true; }

describe('MarkdownDirective', () => {
  let fixture: ComponentFixture<TestComponent1 | TestComponent2>;
  let el: HTMLElement;
  let comp: TestComponent1 | TestComponent2;

  function getHtml (selector: string = 'div'): string | undefined {
    const ret = el && el.querySelector && el.querySelector(selector);
    if (ret) {
      return ret.innerHTML;
    }
    return undefined;
  }

  function getHtmlCount (selector: string = 'div'): number {
    const ret = el && el.querySelectorAll && el.querySelectorAll(selector);
    if (ret) {
      return ret.length;
    }
    return 0;
  }

  function getText (selector: string = 'div'): string | undefined {
    const ret = el && el.querySelector && el.querySelector(selector);
    if (ret) {
      return ret.textContent || undefined;
    }
    return undefined;
  }

  describe('only markdown parameter is filled in', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          MarkdownDirective,
          TestComponent1
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent1);
      el = fixture.nativeElement;
      comp = fixture.componentInstance;
    });

    it('should be defined', () => {
      expect(comp).toBeDefined();
    });

    it('should render markdown to html', () => {
      fixture.detectChanges();
      expect(getText()).toBe('hello world\n');
    });

    it('should render code without highlighting if language is not specified', () => {
      comp.markdownInput = '```export class MyClass {}```';
      fixture.detectChanges();
      expect(getHtml('pre.hljs')).toBeUndefined();
      expect(getText('code')).toBe('export class MyClass {}');
    });

    it('should render code with highlighting if language is specified in first line and show line-numbers', () => {
      comp.markdownInput = '```typescript\nclass A {\nconst x:number;\n}```';
      fixture.detectChanges();
      expect(getHtml('pre.hljs')).toBeDefined();
      expect(getHtmlCount('.line-number span')).toEqual(3);
      expect(getText('code')).toBe('class A {\nconst x:number;\n}\n');
    });
  });

  describe('all parameters filled in', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          MarkdownDirective,
          TestComponent2
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent2);
      el = fixture.nativeElement;
      comp = fixture.componentInstance;
    });

    it('should be defined', () => {
      expect(comp).toBeDefined();
    });

    it('should render markdown to html', () => {
      fixture.detectChanges();
      expect(getText()).toBe('hello world\n');
    });

    it('should render code without highlighting if language is not specified', () => {
      comp.markdownInput = '```export class MyClass {}```';
      fixture.detectChanges();
      expect(getHtml('pre.hljs')).toBeUndefined();
      expect(getText('code')).toBe('export class MyClass {}');
    });

    it('should render code with highlighting if language is specified in first line and show line-numbers', () => {
      comp.markdownInput = '```typescript\nclass A {\nconst x:number;\n}```';
      fixture.detectChanges();
      expect(getHtml('pre.hljs')).toBeDefined();
      expect(getHtmlCount('.line-number span')).toEqual(3);
      expect(getText('code')).toBe('class A {\nconst x:number;\n}\n');
    });

    it('should not highlight if highlight Input is set to false', () => {
      comp.markdownInput = '```typescript\nclass A {\nconst x:number;\n}```';
      comp.highlight = false;
      fixture.detectChanges();
      expect(getHtml('pre.hljs')).toBeUndefined();
      expect(getHtml('code')).toBe('class A {\nconst x:number;\n}\n');
    });

    it('should not add line-numbers if highlight Input is set to false', () => {
      comp.markdownInput = '```typescript\nclass A {\nconst x:number;\n}```';
      comp.highlight = false;
      fixture.detectChanges();
      expect(getHtmlCount('.line-number span')).toEqual(0);
    });

    it('should not add line-numbers if showNumbers Input is set to false', () => {
      comp.markdownInput = '```typescript\nclass A {\nconst x:number;\n}```';
      comp.lineNumbers = false;
      fixture.detectChanges();
      expect(getHtmlCount('.line-number span')).toEqual(0);
    });
  });
});
