import { RenderTarget } from './makeStyles';

export function insertStyles(definitions: any, rtl: boolean, target: RenderTarget): string {
  let classes = '';

  for (const propName in definitions) {
    const definition = definitions[propName];
    // className || css || rtlCSS

    const className = definition[0];
    const rtlCSS = definition[2];

    const ruleClassName = rtl ? (rtlCSS ? 'r' + className : className) : className;

    // Should be done always to return classes
    classes += ' ' + ruleClassName; // adds useless empty string on beginning

    if (target.cache[ruleClassName]) {
      continue;
    }

    const css = definition[1];
    const ruleCSS = rtl ? rtlCSS || css : css;

    target.cache[ruleClassName] = [propName, definition];

    (target.node.sheet as CSSStyleSheet).insertRule(ruleCSS, target.index);
    target.index++;
  }

  // console.log('insertStyles:classes', classes);
  return classes;
}
