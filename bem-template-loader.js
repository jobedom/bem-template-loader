const os = require('os');
const he = require('he');
const cheerio = require('cheerio');

const BEM_BLOCK = 'bem-block';
const BEM_ELEMENT = 'bem-element';
const BEM_MODIFIERS = 'bem-modifiers';
const BEM_ATTR = '__bem__';

function bemError(message, filename) {
   const error = new Error();
   error.hideStack = true;
   error.message = ['', message, `    in ${filename}`, ''].join(os.EOL);
   return error;
}

module.exports = function (content) {
   console.log('👉 %ccontent', 'background: yellow', content);
   const context = this;
   const filename = context.resourcePath;
   this.cacheable && this.cacheable();

   const $ = cheerio.load(content.replace(/&(.*?;)/g, '#entity#$1'), { xmlMode: true });

   const blocks = $(`[${BEM_BLOCK}]`);
   blocks.each(function () {
      const block = $(this);
      block.attr(BEM_ATTR, block.attr(BEM_BLOCK));
      block.removeAttr(BEM_BLOCK);
   });

   const elements = $(`[${BEM_ELEMENT}]`);
   elements.each(function () {
      const element = $(this);
      let block = null;
      const bemElement = element.attr(BEM_ELEMENT);
      const parents = element.parentsUntil($.root());
      parents.each(function () {
         const parent = $(this);
         const parentBem = parent.attr(BEM_ATTR);
         if (!block && parentBem) block = parentBem;
      });
      if (!block) throw bemError(`No block as ancestor for element '${bemElement}'`, filename);
      element.attr(BEM_ATTR, `${block}__${bemElement}`);
      element.removeAttr(BEM_ELEMENT);
   });

   const modifiers = $(`[${BEM_MODIFIERS}]`);
   modifiers.each(function () {
      const modifier = $(this);
      const baseBem = modifier.attr(BEM_ATTR);
      const bemModifiers = modifier.attr(BEM_MODIFIERS);
      if (!baseBem) throw bemError(`Modifiers '${bemModifiers}' are not applied to a block/element`, filename);
      const items = bemModifiers.trim().split(/\s+/);
      const classes = [baseBem];
      items.forEach(item => classes.push(`${baseBem}--${item}`));
      modifier.attr(BEM_ATTR, classes.join(' '));
      modifier.removeAttr(BEM_MODIFIERS);
   });

   const bems = $(`[${BEM_ATTR}]`);
   bems.each(function () {
      const bem = $(this);
      bem.addClass(bem.attr(BEM_ATTR));
      bem.removeAttr(BEM_ATTR);
   });

   return he.decode($.html()).replace(/#entity#(.*?;)/g, '&$1');
};
