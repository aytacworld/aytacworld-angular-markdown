'use strict';
var extend = require('extend');
var fs = require('fs');
var gutil = require('gulp-util');
var join = require('path').join;
var through = require('through2');

module.exports = exports = function () {

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-ng2-inline-template', 'Streaming not supported'));
      return;
    }

    try {
      const fS = file.path.split('/');
      const fD = fS.splice(0, fS.length - 1).join('/');
      file.contents = new Buffer(inline(file.contents.toString(), extend({}, { dir: fD + '/' })));
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-ng2-inline-template', err, { fileName: file.path }));
    }

    cb();
  });
};

var STYLE_URLS = 'styleUrls';
var STYLES = 'styles';

function inline(file, options) {
  var index1, index2, startLine, endLine, styleUrls;
  var lines = file.split('\n');
  var preffix = '';
  var suffix = '';
  var single = false;

  lines.forEach(function (line, i) {
    index1 = line.indexOf(STYLE_URLS);
    index2 = line.indexOf(']');

    // Single line array definition
    if (index1 >= 0 && index2 > 0) {
      startLine = i;
      styleUrls = lines[i].slice(index1, index2 + 1);

      preffix = line.slice(0, index1);
      suffix = line.slice(index2 + 1);
      lines[i] = preffix + replace(styleUrls, options) + suffix;
      single = true;
    }
    // Multiple line array definition
    if (!single) {
      if (index1 >= 0 && index2) {
        startLine = i;
        preffix = line.slice(0, index1);
      }
      if (index2 >= 0 && index1 < 0 && startLine !== undefined) {
        endLine = i;
        var _lines = lines.splice(startLine, (i - startLine + 1));
        styleUrls = _lines.join('');

        lines.splice(startLine, 0, preffix + replace(styleUrls, options));
      }
    }
  });

  return lines.join('\n');
}

// ----------------------
// Utils
function replace(styleUrls, options) {
  var styles = '';
  var urls = eval('({' + styleUrls + '}).styleUrls');
  if (urls) {
    urls.forEach(function (url, i) {
      var coma = i > 0 ? ', ' : '';
      styles += coma + getStylesString(url, options);
    });
  }


  var newLines = STYLES + ': [' + styles + ']';
  newLines += hasTraillingComa(styleUrls) ? ',' : '';
  return newLines;
}

function getStylesString(stylesPath, options) {
  const cssFile = join(options.dir, stylesPath).replace('.scss', '.css');
  var styles = fs.readFileSync(cssFile, 'utf8');
  var styleString = '`' + trimTrailingLineBreak(styles) + '`';

  return styleString;
}

function trimTrailingLineBreak(styles) {
  var lines = styles.split('\n');
  // var trim = lines.splice(-1, 1);
  return (lines.pop() === '' ? lines.join('\n') : styles);
}

function hasTraillingComa(styleUrls) {
  return styleUrls.slice(-1) === ',' ? true : false;
}
