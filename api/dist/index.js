var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../node_modules/yamljs/lib/Pattern.js
var require_Pattern = __commonJS({
  "../node_modules/yamljs/lib/Pattern.js"(exports, module2) {
    var Pattern;
    Pattern = function() {
      Pattern2.prototype.regex = null;
      Pattern2.prototype.rawRegex = null;
      Pattern2.prototype.cleanedRegex = null;
      Pattern2.prototype.mapping = null;
      function Pattern2(rawRegex, modifiers) {
        var _char, capturingBracketNumber, cleanedRegex, i, len, mapping, name, part, subChar;
        if (modifiers == null) {
          modifiers = "";
        }
        cleanedRegex = "";
        len = rawRegex.length;
        mapping = null;
        capturingBracketNumber = 0;
        i = 0;
        while (i < len) {
          _char = rawRegex.charAt(i);
          if (_char === "\\") {
            cleanedRegex += rawRegex.slice(i, +(i + 1) + 1 || 9e9);
            i++;
          } else if (_char === "(") {
            if (i < len - 2) {
              part = rawRegex.slice(i, +(i + 2) + 1 || 9e9);
              if (part === "(?:") {
                i += 2;
                cleanedRegex += part;
              } else if (part === "(?<") {
                capturingBracketNumber++;
                i += 2;
                name = "";
                while (i + 1 < len) {
                  subChar = rawRegex.charAt(i + 1);
                  if (subChar === ">") {
                    cleanedRegex += "(";
                    i++;
                    if (name.length > 0) {
                      if (mapping == null) {
                        mapping = {};
                      }
                      mapping[name] = capturingBracketNumber;
                    }
                    break;
                  } else {
                    name += subChar;
                  }
                  i++;
                }
              } else {
                cleanedRegex += _char;
                capturingBracketNumber++;
              }
            } else {
              cleanedRegex += _char;
            }
          } else {
            cleanedRegex += _char;
          }
          i++;
        }
        this.rawRegex = rawRegex;
        this.cleanedRegex = cleanedRegex;
        this.regex = new RegExp(this.cleanedRegex, "g" + modifiers.replace("g", ""));
        this.mapping = mapping;
      }
      Pattern2.prototype.exec = function(str) {
        var index, matches, name, ref;
        this.regex.lastIndex = 0;
        matches = this.regex.exec(str);
        if (matches == null) {
          return null;
        }
        if (this.mapping != null) {
          ref = this.mapping;
          for (name in ref) {
            index = ref[name];
            matches[name] = matches[index];
          }
        }
        return matches;
      };
      Pattern2.prototype.test = function(str) {
        this.regex.lastIndex = 0;
        return this.regex.test(str);
      };
      Pattern2.prototype.replace = function(str, replacement) {
        this.regex.lastIndex = 0;
        return str.replace(this.regex, replacement);
      };
      Pattern2.prototype.replaceAll = function(str, replacement, limit) {
        var count;
        if (limit == null) {
          limit = 0;
        }
        this.regex.lastIndex = 0;
        count = 0;
        while (this.regex.test(str) && (limit === 0 || count < limit)) {
          this.regex.lastIndex = 0;
          str = str.replace(this.regex, replacement);
          count++;
        }
        return [str, count];
      };
      return Pattern2;
    }();
    module2.exports = Pattern;
  }
});

// ../node_modules/yamljs/lib/Utils.js
var require_Utils = __commonJS({
  "../node_modules/yamljs/lib/Utils.js"(exports, module2) {
    var Pattern;
    var Utils;
    var hasProp = {}.hasOwnProperty;
    Pattern = require_Pattern();
    Utils = function() {
      function Utils2() {
      }
      Utils2.REGEX_LEFT_TRIM_BY_CHAR = {};
      Utils2.REGEX_RIGHT_TRIM_BY_CHAR = {};
      Utils2.REGEX_SPACES = /\s+/g;
      Utils2.REGEX_DIGITS = /^\d+$/;
      Utils2.REGEX_OCTAL = /[^0-7]/gi;
      Utils2.REGEX_HEXADECIMAL = /[^a-f0-9]/gi;
      Utils2.PATTERN_DATE = new Pattern("^(?<year>[0-9][0-9][0-9][0-9])-(?<month>[0-9][0-9]?)-(?<day>[0-9][0-9]?)(?:(?:[Tt]|[ 	]+)(?<hour>[0-9][0-9]?):(?<minute>[0-9][0-9]):(?<second>[0-9][0-9])(?:.(?<fraction>[0-9]*))?(?:[ 	]*(?<tz>Z|(?<tz_sign>[-+])(?<tz_hour>[0-9][0-9]?)(?::(?<tz_minute>[0-9][0-9]))?))?)?$", "i");
      Utils2.LOCAL_TIMEZONE_OFFSET = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3;
      Utils2.trim = function(str, _char) {
        var regexLeft, regexRight;
        if (_char == null) {
          _char = "\\s";
        }
        regexLeft = this.REGEX_LEFT_TRIM_BY_CHAR[_char];
        if (regexLeft == null) {
          this.REGEX_LEFT_TRIM_BY_CHAR[_char] = regexLeft = new RegExp("^" + _char + _char + "*");
        }
        regexLeft.lastIndex = 0;
        regexRight = this.REGEX_RIGHT_TRIM_BY_CHAR[_char];
        if (regexRight == null) {
          this.REGEX_RIGHT_TRIM_BY_CHAR[_char] = regexRight = new RegExp(_char + "" + _char + "*$");
        }
        regexRight.lastIndex = 0;
        return str.replace(regexLeft, "").replace(regexRight, "");
      };
      Utils2.ltrim = function(str, _char) {
        var regexLeft;
        if (_char == null) {
          _char = "\\s";
        }
        regexLeft = this.REGEX_LEFT_TRIM_BY_CHAR[_char];
        if (regexLeft == null) {
          this.REGEX_LEFT_TRIM_BY_CHAR[_char] = regexLeft = new RegExp("^" + _char + _char + "*");
        }
        regexLeft.lastIndex = 0;
        return str.replace(regexLeft, "");
      };
      Utils2.rtrim = function(str, _char) {
        var regexRight;
        if (_char == null) {
          _char = "\\s";
        }
        regexRight = this.REGEX_RIGHT_TRIM_BY_CHAR[_char];
        if (regexRight == null) {
          this.REGEX_RIGHT_TRIM_BY_CHAR[_char] = regexRight = new RegExp(_char + "" + _char + "*$");
        }
        regexRight.lastIndex = 0;
        return str.replace(regexRight, "");
      };
      Utils2.isEmpty = function(value) {
        return !value || value === "" || value === "0" || value instanceof Array && value.length === 0 || this.isEmptyObject(value);
      };
      Utils2.isEmptyObject = function(value) {
        var k;
        return value instanceof Object && function() {
          var results;
          results = [];
          for (k in value) {
            if (!hasProp.call(value, k))
              continue;
            results.push(k);
          }
          return results;
        }().length === 0;
      };
      Utils2.subStrCount = function(string, subString, start, length) {
        var c, i, j, len, ref, sublen;
        c = 0;
        string = "" + string;
        subString = "" + subString;
        if (start != null) {
          string = string.slice(start);
        }
        if (length != null) {
          string = string.slice(0, length);
        }
        len = string.length;
        sublen = subString.length;
        for (i = j = 0, ref = len; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          if (subString === string.slice(i, sublen)) {
            c++;
            i += sublen - 1;
          }
        }
        return c;
      };
      Utils2.isDigits = function(input) {
        this.REGEX_DIGITS.lastIndex = 0;
        return this.REGEX_DIGITS.test(input);
      };
      Utils2.octDec = function(input) {
        this.REGEX_OCTAL.lastIndex = 0;
        return parseInt((input + "").replace(this.REGEX_OCTAL, ""), 8);
      };
      Utils2.hexDec = function(input) {
        this.REGEX_HEXADECIMAL.lastIndex = 0;
        input = this.trim(input);
        if ((input + "").slice(0, 2) === "0x") {
          input = (input + "").slice(2);
        }
        return parseInt((input + "").replace(this.REGEX_HEXADECIMAL, ""), 16);
      };
      Utils2.utf8chr = function(c) {
        var ch;
        ch = String.fromCharCode;
        if (128 > (c %= 2097152)) {
          return ch(c);
        }
        if (2048 > c) {
          return ch(192 | c >> 6) + ch(128 | c & 63);
        }
        if (65536 > c) {
          return ch(224 | c >> 12) + ch(128 | c >> 6 & 63) + ch(128 | c & 63);
        }
        return ch(240 | c >> 18) + ch(128 | c >> 12 & 63) + ch(128 | c >> 6 & 63) + ch(128 | c & 63);
      };
      Utils2.parseBoolean = function(input, strict) {
        var lowerInput;
        if (strict == null) {
          strict = true;
        }
        if (typeof input === "string") {
          lowerInput = input.toLowerCase();
          if (!strict) {
            if (lowerInput === "no") {
              return false;
            }
          }
          if (lowerInput === "0") {
            return false;
          }
          if (lowerInput === "false") {
            return false;
          }
          if (lowerInput === "") {
            return false;
          }
          return true;
        }
        return !!input;
      };
      Utils2.isNumeric = function(input) {
        this.REGEX_SPACES.lastIndex = 0;
        return typeof input === "number" || typeof input === "string" && !isNaN(input) && input.replace(this.REGEX_SPACES, "") !== "";
      };
      Utils2.stringToDate = function(str) {
        var date, day, fraction, hour, info, minute, month, second, tz_hour, tz_minute, tz_offset, year;
        if (!(str != null ? str.length : void 0)) {
          return null;
        }
        info = this.PATTERN_DATE.exec(str);
        if (!info) {
          return null;
        }
        year = parseInt(info.year, 10);
        month = parseInt(info.month, 10) - 1;
        day = parseInt(info.day, 10);
        if (info.hour == null) {
          date = new Date(Date.UTC(year, month, day));
          return date;
        }
        hour = parseInt(info.hour, 10);
        minute = parseInt(info.minute, 10);
        second = parseInt(info.second, 10);
        if (info.fraction != null) {
          fraction = info.fraction.slice(0, 3);
          while (fraction.length < 3) {
            fraction += "0";
          }
          fraction = parseInt(fraction, 10);
        } else {
          fraction = 0;
        }
        if (info.tz != null) {
          tz_hour = parseInt(info.tz_hour, 10);
          if (info.tz_minute != null) {
            tz_minute = parseInt(info.tz_minute, 10);
          } else {
            tz_minute = 0;
          }
          tz_offset = (tz_hour * 60 + tz_minute) * 6e4;
          if ("-" === info.tz_sign) {
            tz_offset *= -1;
          }
        }
        date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
        if (tz_offset) {
          date.setTime(date.getTime() - tz_offset);
        }
        return date;
      };
      Utils2.strRepeat = function(str, number) {
        var i, res;
        res = "";
        i = 0;
        while (i < number) {
          res += str;
          i++;
        }
        return res;
      };
      Utils2.getStringFromFile = function(path2, callback) {
        var data, fs, j, len1, name, ref, req, xhr;
        if (callback == null) {
          callback = null;
        }
        xhr = null;
        if (typeof window !== "undefined" && window !== null) {
          if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
          } else if (window.ActiveXObject) {
            ref = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
            for (j = 0, len1 = ref.length; j < len1; j++) {
              name = ref[j];
              try {
                xhr = new ActiveXObject(name);
              } catch (error) {
              }
            }
          }
        }
        if (xhr != null) {
          if (callback != null) {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                  return callback(xhr.responseText);
                } else {
                  return callback(null);
                }
              }
            };
            xhr.open("GET", path2, true);
            return xhr.send(null);
          } else {
            xhr.open("GET", path2, false);
            xhr.send(null);
            if (xhr.status === 200 || xhr.status === 0) {
              return xhr.responseText;
            }
            return null;
          }
        } else {
          req = require;
          fs = req("fs");
          if (callback != null) {
            return fs.readFile(path2, function(err, data2) {
              if (err) {
                return callback(null);
              } else {
                return callback(String(data2));
              }
            });
          } else {
            data = fs.readFileSync(path2);
            if (data != null) {
              return String(data);
            }
            return null;
          }
        }
      };
      return Utils2;
    }();
    module2.exports = Utils;
  }
});

// ../node_modules/yamljs/lib/Unescaper.js
var require_Unescaper = __commonJS({
  "../node_modules/yamljs/lib/Unescaper.js"(exports, module2) {
    var Pattern;
    var Unescaper;
    var Utils;
    Utils = require_Utils();
    Pattern = require_Pattern();
    Unescaper = function() {
      function Unescaper2() {
      }
      Unescaper2.PATTERN_ESCAPED_CHARACTER = new Pattern('\\\\([0abt	nvfre "\\/\\\\N_LP]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})');
      Unescaper2.unescapeSingleQuotedString = function(value) {
        return value.replace(/\'\'/g, "'");
      };
      Unescaper2.unescapeDoubleQuotedString = function(value) {
        if (this._unescapeCallback == null) {
          this._unescapeCallback = function(_this) {
            return function(str) {
              return _this.unescapeCharacter(str);
            };
          }(this);
        }
        return this.PATTERN_ESCAPED_CHARACTER.replace(value, this._unescapeCallback);
      };
      Unescaper2.unescapeCharacter = function(value) {
        var ch;
        ch = String.fromCharCode;
        switch (value.charAt(1)) {
          case "0":
            return ch(0);
          case "a":
            return ch(7);
          case "b":
            return ch(8);
          case "t":
            return "	";
          case "	":
            return "	";
          case "n":
            return "\n";
          case "v":
            return ch(11);
          case "f":
            return ch(12);
          case "r":
            return ch(13);
          case "e":
            return ch(27);
          case " ":
            return " ";
          case '"':
            return '"';
          case "/":
            return "/";
          case "\\":
            return "\\";
          case "N":
            return ch(133);
          case "_":
            return ch(160);
          case "L":
            return ch(8232);
          case "P":
            return ch(8233);
          case "x":
            return Utils.utf8chr(Utils.hexDec(value.substr(2, 2)));
          case "u":
            return Utils.utf8chr(Utils.hexDec(value.substr(2, 4)));
          case "U":
            return Utils.utf8chr(Utils.hexDec(value.substr(2, 8)));
          default:
            return "";
        }
      };
      return Unescaper2;
    }();
    module2.exports = Unescaper;
  }
});

// ../node_modules/yamljs/lib/Escaper.js
var require_Escaper = __commonJS({
  "../node_modules/yamljs/lib/Escaper.js"(exports, module2) {
    var Escaper;
    var Pattern;
    Pattern = require_Pattern();
    Escaper = function() {
      var ch;
      function Escaper2() {
      }
      Escaper2.LIST_ESCAPEES = ["\\", "\\\\", '\\"', '"', "\0", "", "", "", "", "", "", "\x07", "\b", "	", "\n", "\v", "\f", "\r", "", "", "", "", "", "", "", "", "", "", "", "", "", "\x1B", "", "", "", "", (ch = String.fromCharCode)(133), ch(160), ch(8232), ch(8233)];
      Escaper2.LIST_ESCAPED = ["\\\\", '\\"', '\\"', '\\"', "\\0", "\\x01", "\\x02", "\\x03", "\\x04", "\\x05", "\\x06", "\\a", "\\b", "\\t", "\\n", "\\v", "\\f", "\\r", "\\x0e", "\\x0f", "\\x10", "\\x11", "\\x12", "\\x13", "\\x14", "\\x15", "\\x16", "\\x17", "\\x18", "\\x19", "\\x1a", "\\e", "\\x1c", "\\x1d", "\\x1e", "\\x1f", "\\N", "\\_", "\\L", "\\P"];
      Escaper2.MAPPING_ESCAPEES_TO_ESCAPED = function() {
        var i, j, mapping, ref;
        mapping = {};
        for (i = j = 0, ref = Escaper2.LIST_ESCAPEES.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          mapping[Escaper2.LIST_ESCAPEES[i]] = Escaper2.LIST_ESCAPED[i];
        }
        return mapping;
      }();
      Escaper2.PATTERN_CHARACTERS_TO_ESCAPE = new Pattern("[\\x00-\\x1f]|\xC2\x85|\xC2\xA0|\xE2\x80\xA8|\xE2\x80\xA9");
      Escaper2.PATTERN_MAPPING_ESCAPEES = new Pattern(Escaper2.LIST_ESCAPEES.join("|").split("\\").join("\\\\"));
      Escaper2.PATTERN_SINGLE_QUOTING = new Pattern("[\\s'\":{}[\\],&*#?]|^[-?|<>=!%@`]");
      Escaper2.requiresDoubleQuoting = function(value) {
        return this.PATTERN_CHARACTERS_TO_ESCAPE.test(value);
      };
      Escaper2.escapeWithDoubleQuotes = function(value) {
        var result;
        result = this.PATTERN_MAPPING_ESCAPEES.replace(value, function(_this) {
          return function(str) {
            return _this.MAPPING_ESCAPEES_TO_ESCAPED[str];
          };
        }(this));
        return '"' + result + '"';
      };
      Escaper2.requiresSingleQuoting = function(value) {
        return this.PATTERN_SINGLE_QUOTING.test(value);
      };
      Escaper2.escapeWithSingleQuotes = function(value) {
        return "'" + value.replace(/'/g, "''") + "'";
      };
      return Escaper2;
    }();
    module2.exports = Escaper;
  }
});

// ../node_modules/yamljs/lib/Exception/ParseException.js
var require_ParseException = __commonJS({
  "../node_modules/yamljs/lib/Exception/ParseException.js"(exports, module2) {
    var ParseException;
    var extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    };
    var hasProp = {}.hasOwnProperty;
    ParseException = function(superClass) {
      extend(ParseException2, superClass);
      function ParseException2(message, parsedLine, snippet) {
        this.message = message;
        this.parsedLine = parsedLine;
        this.snippet = snippet;
      }
      ParseException2.prototype.toString = function() {
        if (this.parsedLine != null && this.snippet != null) {
          return "<ParseException> " + this.message + " (line " + this.parsedLine + ": '" + this.snippet + "')";
        } else {
          return "<ParseException> " + this.message;
        }
      };
      return ParseException2;
    }(Error);
    module2.exports = ParseException;
  }
});

// ../node_modules/yamljs/lib/Exception/ParseMore.js
var require_ParseMore = __commonJS({
  "../node_modules/yamljs/lib/Exception/ParseMore.js"(exports, module2) {
    var ParseMore;
    var extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    };
    var hasProp = {}.hasOwnProperty;
    ParseMore = function(superClass) {
      extend(ParseMore2, superClass);
      function ParseMore2(message, parsedLine, snippet) {
        this.message = message;
        this.parsedLine = parsedLine;
        this.snippet = snippet;
      }
      ParseMore2.prototype.toString = function() {
        if (this.parsedLine != null && this.snippet != null) {
          return "<ParseMore> " + this.message + " (line " + this.parsedLine + ": '" + this.snippet + "')";
        } else {
          return "<ParseMore> " + this.message;
        }
      };
      return ParseMore2;
    }(Error);
    module2.exports = ParseMore;
  }
});

// ../node_modules/yamljs/lib/Exception/DumpException.js
var require_DumpException = __commonJS({
  "../node_modules/yamljs/lib/Exception/DumpException.js"(exports, module2) {
    var DumpException;
    var extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    };
    var hasProp = {}.hasOwnProperty;
    DumpException = function(superClass) {
      extend(DumpException2, superClass);
      function DumpException2(message, parsedLine, snippet) {
        this.message = message;
        this.parsedLine = parsedLine;
        this.snippet = snippet;
      }
      DumpException2.prototype.toString = function() {
        if (this.parsedLine != null && this.snippet != null) {
          return "<DumpException> " + this.message + " (line " + this.parsedLine + ": '" + this.snippet + "')";
        } else {
          return "<DumpException> " + this.message;
        }
      };
      return DumpException2;
    }(Error);
    module2.exports = DumpException;
  }
});

// ../node_modules/yamljs/lib/Inline.js
var require_Inline = __commonJS({
  "../node_modules/yamljs/lib/Inline.js"(exports, module2) {
    var DumpException;
    var Escaper;
    var Inline;
    var ParseException;
    var ParseMore;
    var Pattern;
    var Unescaper;
    var Utils;
    var indexOf = [].indexOf || function(item) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item)
          return i;
      }
      return -1;
    };
    Pattern = require_Pattern();
    Unescaper = require_Unescaper();
    Escaper = require_Escaper();
    Utils = require_Utils();
    ParseException = require_ParseException();
    ParseMore = require_ParseMore();
    DumpException = require_DumpException();
    Inline = function() {
      function Inline2() {
      }
      Inline2.REGEX_QUOTED_STRING = `(?:"(?:[^"\\\\]*(?:\\\\.[^"\\\\]*)*)"|'(?:[^']*(?:''[^']*)*)')`;
      Inline2.PATTERN_TRAILING_COMMENTS = new Pattern("^\\s*#.*$");
      Inline2.PATTERN_QUOTED_SCALAR = new Pattern("^" + Inline2.REGEX_QUOTED_STRING);
      Inline2.PATTERN_THOUSAND_NUMERIC_SCALAR = new Pattern("^(-|\\+)?[0-9,]+(\\.[0-9]+)?$");
      Inline2.PATTERN_SCALAR_BY_DELIMITERS = {};
      Inline2.settings = {};
      Inline2.configure = function(exceptionOnInvalidType, objectDecoder) {
        if (exceptionOnInvalidType == null) {
          exceptionOnInvalidType = null;
        }
        if (objectDecoder == null) {
          objectDecoder = null;
        }
        this.settings.exceptionOnInvalidType = exceptionOnInvalidType;
        this.settings.objectDecoder = objectDecoder;
      };
      Inline2.parse = function(value, exceptionOnInvalidType, objectDecoder) {
        var context, result;
        if (exceptionOnInvalidType == null) {
          exceptionOnInvalidType = false;
        }
        if (objectDecoder == null) {
          objectDecoder = null;
        }
        this.settings.exceptionOnInvalidType = exceptionOnInvalidType;
        this.settings.objectDecoder = objectDecoder;
        if (value == null) {
          return "";
        }
        value = Utils.trim(value);
        if (0 === value.length) {
          return "";
        }
        context = {
          exceptionOnInvalidType,
          objectDecoder,
          i: 0
        };
        switch (value.charAt(0)) {
          case "[":
            result = this.parseSequence(value, context);
            ++context.i;
            break;
          case "{":
            result = this.parseMapping(value, context);
            ++context.i;
            break;
          default:
            result = this.parseScalar(value, null, ['"', "'"], context);
        }
        if (this.PATTERN_TRAILING_COMMENTS.replace(value.slice(context.i), "") !== "") {
          throw new ParseException('Unexpected characters near "' + value.slice(context.i) + '".');
        }
        return result;
      };
      Inline2.dump = function(value, exceptionOnInvalidType, objectEncoder) {
        var ref, result, type;
        if (exceptionOnInvalidType == null) {
          exceptionOnInvalidType = false;
        }
        if (objectEncoder == null) {
          objectEncoder = null;
        }
        if (value == null) {
          return "null";
        }
        type = typeof value;
        if (type === "object") {
          if (value instanceof Date) {
            return value.toISOString();
          } else if (objectEncoder != null) {
            result = objectEncoder(value);
            if (typeof result === "string" || result != null) {
              return result;
            }
          }
          return this.dumpObject(value);
        }
        if (type === "boolean") {
          return value ? "true" : "false";
        }
        if (Utils.isDigits(value)) {
          return type === "string" ? "'" + value + "'" : String(parseInt(value));
        }
        if (Utils.isNumeric(value)) {
          return type === "string" ? "'" + value + "'" : String(parseFloat(value));
        }
        if (type === "number") {
          return value === Infinity ? ".Inf" : value === -Infinity ? "-.Inf" : isNaN(value) ? ".NaN" : value;
        }
        if (Escaper.requiresDoubleQuoting(value)) {
          return Escaper.escapeWithDoubleQuotes(value);
        }
        if (Escaper.requiresSingleQuoting(value)) {
          return Escaper.escapeWithSingleQuotes(value);
        }
        if ("" === value) {
          return '""';
        }
        if (Utils.PATTERN_DATE.test(value)) {
          return "'" + value + "'";
        }
        if ((ref = value.toLowerCase()) === "null" || ref === "~" || ref === "true" || ref === "false") {
          return "'" + value + "'";
        }
        return value;
      };
      Inline2.dumpObject = function(value, exceptionOnInvalidType, objectSupport) {
        var j, key, len1, output, val;
        if (objectSupport == null) {
          objectSupport = null;
        }
        if (value instanceof Array) {
          output = [];
          for (j = 0, len1 = value.length; j < len1; j++) {
            val = value[j];
            output.push(this.dump(val));
          }
          return "[" + output.join(", ") + "]";
        } else {
          output = [];
          for (key in value) {
            val = value[key];
            output.push(this.dump(key) + ": " + this.dump(val));
          }
          return "{" + output.join(", ") + "}";
        }
      };
      Inline2.parseScalar = function(scalar, delimiters, stringDelimiters, context, evaluate) {
        var i, joinedDelimiters, match, output, pattern, ref, ref1, strpos, tmp;
        if (delimiters == null) {
          delimiters = null;
        }
        if (stringDelimiters == null) {
          stringDelimiters = ['"', "'"];
        }
        if (context == null) {
          context = null;
        }
        if (evaluate == null) {
          evaluate = true;
        }
        if (context == null) {
          context = {
            exceptionOnInvalidType: this.settings.exceptionOnInvalidType,
            objectDecoder: this.settings.objectDecoder,
            i: 0
          };
        }
        i = context.i;
        if (ref = scalar.charAt(i), indexOf.call(stringDelimiters, ref) >= 0) {
          output = this.parseQuotedScalar(scalar, context);
          i = context.i;
          if (delimiters != null) {
            tmp = Utils.ltrim(scalar.slice(i), " ");
            if (!(ref1 = tmp.charAt(0), indexOf.call(delimiters, ref1) >= 0)) {
              throw new ParseException("Unexpected characters (" + scalar.slice(i) + ").");
            }
          }
        } else {
          if (!delimiters) {
            output = scalar.slice(i);
            i += output.length;
            strpos = output.indexOf(" #");
            if (strpos !== -1) {
              output = Utils.rtrim(output.slice(0, strpos));
            }
          } else {
            joinedDelimiters = delimiters.join("|");
            pattern = this.PATTERN_SCALAR_BY_DELIMITERS[joinedDelimiters];
            if (pattern == null) {
              pattern = new Pattern("^(.+?)(" + joinedDelimiters + ")");
              this.PATTERN_SCALAR_BY_DELIMITERS[joinedDelimiters] = pattern;
            }
            if (match = pattern.exec(scalar.slice(i))) {
              output = match[1];
              i += output.length;
            } else {
              throw new ParseException("Malformed inline YAML string (" + scalar + ").");
            }
          }
          if (evaluate) {
            output = this.evaluateScalar(output, context);
          }
        }
        context.i = i;
        return output;
      };
      Inline2.parseQuotedScalar = function(scalar, context) {
        var i, match, output;
        i = context.i;
        if (!(match = this.PATTERN_QUOTED_SCALAR.exec(scalar.slice(i)))) {
          throw new ParseMore("Malformed inline YAML string (" + scalar.slice(i) + ").");
        }
        output = match[0].substr(1, match[0].length - 2);
        if ('"' === scalar.charAt(i)) {
          output = Unescaper.unescapeDoubleQuotedString(output);
        } else {
          output = Unescaper.unescapeSingleQuotedString(output);
        }
        i += match[0].length;
        context.i = i;
        return output;
      };
      Inline2.parseSequence = function(sequence, context) {
        var e, i, isQuoted, len, output, ref, value;
        output = [];
        len = sequence.length;
        i = context.i;
        i += 1;
        while (i < len) {
          context.i = i;
          switch (sequence.charAt(i)) {
            case "[":
              output.push(this.parseSequence(sequence, context));
              i = context.i;
              break;
            case "{":
              output.push(this.parseMapping(sequence, context));
              i = context.i;
              break;
            case "]":
              return output;
            case ",":
            case " ":
            case "\n":
              break;
            default:
              isQuoted = (ref = sequence.charAt(i)) === '"' || ref === "'";
              value = this.parseScalar(sequence, [",", "]"], ['"', "'"], context);
              i = context.i;
              if (!isQuoted && typeof value === "string" && (value.indexOf(": ") !== -1 || value.indexOf(":\n") !== -1)) {
                try {
                  value = this.parseMapping("{" + value + "}");
                } catch (error) {
                  e = error;
                }
              }
              output.push(value);
              --i;
          }
          ++i;
        }
        throw new ParseMore("Malformed inline YAML string " + sequence);
      };
      Inline2.parseMapping = function(mapping, context) {
        var done, i, key, len, output, shouldContinueWhileLoop, value;
        output = {};
        len = mapping.length;
        i = context.i;
        i += 1;
        shouldContinueWhileLoop = false;
        while (i < len) {
          context.i = i;
          switch (mapping.charAt(i)) {
            case " ":
            case ",":
            case "\n":
              ++i;
              context.i = i;
              shouldContinueWhileLoop = true;
              break;
            case "}":
              return output;
          }
          if (shouldContinueWhileLoop) {
            shouldContinueWhileLoop = false;
            continue;
          }
          key = this.parseScalar(mapping, [":", " ", "\n"], ['"', "'"], context, false);
          i = context.i;
          done = false;
          while (i < len) {
            context.i = i;
            switch (mapping.charAt(i)) {
              case "[":
                value = this.parseSequence(mapping, context);
                i = context.i;
                if (output[key] === void 0) {
                  output[key] = value;
                }
                done = true;
                break;
              case "{":
                value = this.parseMapping(mapping, context);
                i = context.i;
                if (output[key] === void 0) {
                  output[key] = value;
                }
                done = true;
                break;
              case ":":
              case " ":
              case "\n":
                break;
              default:
                value = this.parseScalar(mapping, [",", "}"], ['"', "'"], context);
                i = context.i;
                if (output[key] === void 0) {
                  output[key] = value;
                }
                done = true;
                --i;
            }
            ++i;
            if (done) {
              break;
            }
          }
        }
        throw new ParseMore("Malformed inline YAML string " + mapping);
      };
      Inline2.evaluateScalar = function(scalar, context) {
        var cast, date, exceptionOnInvalidType, firstChar, firstSpace, firstWord, objectDecoder, raw, scalarLower, subValue, trimmedScalar;
        scalar = Utils.trim(scalar);
        scalarLower = scalar.toLowerCase();
        switch (scalarLower) {
          case "null":
          case "":
          case "~":
            return null;
          case "true":
            return true;
          case "false":
            return false;
          case ".inf":
            return Infinity;
          case ".nan":
            return 0 / 0;
          case "-.inf":
            return Infinity;
          default:
            firstChar = scalarLower.charAt(0);
            switch (firstChar) {
              case "!":
                firstSpace = scalar.indexOf(" ");
                if (firstSpace === -1) {
                  firstWord = scalarLower;
                } else {
                  firstWord = scalarLower.slice(0, firstSpace);
                }
                switch (firstWord) {
                  case "!":
                    if (firstSpace !== -1) {
                      return parseInt(this.parseScalar(scalar.slice(2)));
                    }
                    return null;
                  case "!str":
                    return Utils.ltrim(scalar.slice(4));
                  case "!!str":
                    return Utils.ltrim(scalar.slice(5));
                  case "!!int":
                    return parseInt(this.parseScalar(scalar.slice(5)));
                  case "!!bool":
                    return Utils.parseBoolean(this.parseScalar(scalar.slice(6)), false);
                  case "!!float":
                    return parseFloat(this.parseScalar(scalar.slice(7)));
                  case "!!timestamp":
                    return Utils.stringToDate(Utils.ltrim(scalar.slice(11)));
                  default:
                    if (context == null) {
                      context = {
                        exceptionOnInvalidType: this.settings.exceptionOnInvalidType,
                        objectDecoder: this.settings.objectDecoder,
                        i: 0
                      };
                    }
                    objectDecoder = context.objectDecoder, exceptionOnInvalidType = context.exceptionOnInvalidType;
                    if (objectDecoder) {
                      trimmedScalar = Utils.rtrim(scalar);
                      firstSpace = trimmedScalar.indexOf(" ");
                      if (firstSpace === -1) {
                        return objectDecoder(trimmedScalar, null);
                      } else {
                        subValue = Utils.ltrim(trimmedScalar.slice(firstSpace + 1));
                        if (!(subValue.length > 0)) {
                          subValue = null;
                        }
                        return objectDecoder(trimmedScalar.slice(0, firstSpace), subValue);
                      }
                    }
                    if (exceptionOnInvalidType) {
                      throw new ParseException("Custom object support when parsing a YAML file has been disabled.");
                    }
                    return null;
                }
                break;
              case "0":
                if ("0x" === scalar.slice(0, 2)) {
                  return Utils.hexDec(scalar);
                } else if (Utils.isDigits(scalar)) {
                  return Utils.octDec(scalar);
                } else if (Utils.isNumeric(scalar)) {
                  return parseFloat(scalar);
                } else {
                  return scalar;
                }
                break;
              case "+":
                if (Utils.isDigits(scalar)) {
                  raw = scalar;
                  cast = parseInt(raw);
                  if (raw === String(cast)) {
                    return cast;
                  } else {
                    return raw;
                  }
                } else if (Utils.isNumeric(scalar)) {
                  return parseFloat(scalar);
                } else if (this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(scalar)) {
                  return parseFloat(scalar.replace(",", ""));
                }
                return scalar;
              case "-":
                if (Utils.isDigits(scalar.slice(1))) {
                  if ("0" === scalar.charAt(1)) {
                    return -Utils.octDec(scalar.slice(1));
                  } else {
                    raw = scalar.slice(1);
                    cast = parseInt(raw);
                    if (raw === String(cast)) {
                      return -cast;
                    } else {
                      return -raw;
                    }
                  }
                } else if (Utils.isNumeric(scalar)) {
                  return parseFloat(scalar);
                } else if (this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(scalar)) {
                  return parseFloat(scalar.replace(",", ""));
                }
                return scalar;
              default:
                if (date = Utils.stringToDate(scalar)) {
                  return date;
                } else if (Utils.isNumeric(scalar)) {
                  return parseFloat(scalar);
                } else if (this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(scalar)) {
                  return parseFloat(scalar.replace(",", ""));
                }
                return scalar;
            }
        }
      };
      return Inline2;
    }();
    module2.exports = Inline;
  }
});

// ../node_modules/yamljs/lib/Parser.js
var require_Parser = __commonJS({
  "../node_modules/yamljs/lib/Parser.js"(exports, module2) {
    var Inline;
    var ParseException;
    var ParseMore;
    var Parser;
    var Pattern;
    var Utils;
    Inline = require_Inline();
    Pattern = require_Pattern();
    Utils = require_Utils();
    ParseException = require_ParseException();
    ParseMore = require_ParseMore();
    Parser = function() {
      Parser2.prototype.PATTERN_FOLDED_SCALAR_ALL = new Pattern("^(?:(?<type>![^\\|>]*)\\s+)?(?<separator>\\||>)(?<modifiers>\\+|\\-|\\d+|\\+\\d+|\\-\\d+|\\d+\\+|\\d+\\-)?(?<comments> +#.*)?$");
      Parser2.prototype.PATTERN_FOLDED_SCALAR_END = new Pattern("(?<separator>\\||>)(?<modifiers>\\+|\\-|\\d+|\\+\\d+|\\-\\d+|\\d+\\+|\\d+\\-)?(?<comments> +#.*)?$");
      Parser2.prototype.PATTERN_SEQUENCE_ITEM = new Pattern("^\\-((?<leadspaces>\\s+)(?<value>.+?))?\\s*$");
      Parser2.prototype.PATTERN_ANCHOR_VALUE = new Pattern("^&(?<ref>[^ ]+) *(?<value>.*)");
      Parser2.prototype.PATTERN_COMPACT_NOTATION = new Pattern("^(?<key>" + Inline.REGEX_QUOTED_STRING + `|[^ '"\\{\\[].*?) *\\:(\\s+(?<value>.+?))?\\s*$`);
      Parser2.prototype.PATTERN_MAPPING_ITEM = new Pattern("^(?<key>" + Inline.REGEX_QUOTED_STRING + `|[^ '"\\[\\{].*?) *\\:(\\s+(?<value>.+?))?\\s*$`);
      Parser2.prototype.PATTERN_DECIMAL = new Pattern("\\d+");
      Parser2.prototype.PATTERN_INDENT_SPACES = new Pattern("^ +");
      Parser2.prototype.PATTERN_TRAILING_LINES = new Pattern("(\n*)$");
      Parser2.prototype.PATTERN_YAML_HEADER = new Pattern("^\\%YAML[: ][\\d\\.]+.*\n", "m");
      Parser2.prototype.PATTERN_LEADING_COMMENTS = new Pattern("^(\\#.*?\n)+", "m");
      Parser2.prototype.PATTERN_DOCUMENT_MARKER_START = new Pattern("^\\-\\-\\-.*?\n", "m");
      Parser2.prototype.PATTERN_DOCUMENT_MARKER_END = new Pattern("^\\.\\.\\.\\s*$", "m");
      Parser2.prototype.PATTERN_FOLDED_SCALAR_BY_INDENTATION = {};
      Parser2.prototype.CONTEXT_NONE = 0;
      Parser2.prototype.CONTEXT_SEQUENCE = 1;
      Parser2.prototype.CONTEXT_MAPPING = 2;
      function Parser2(offset) {
        this.offset = offset != null ? offset : 0;
        this.lines = [];
        this.currentLineNb = -1;
        this.currentLine = "";
        this.refs = {};
      }
      Parser2.prototype.parse = function(value, exceptionOnInvalidType, objectDecoder) {
        var alias, allowOverwrite, block, c, context, data, e, first, i, indent, isRef, j, k, key, l, lastKey, len, len1, len2, len3, lineCount, m, matches, mergeNode, n, name, parsed, parsedItem, parser, ref, ref1, ref2, refName, refValue, val, values;
        if (exceptionOnInvalidType == null) {
          exceptionOnInvalidType = false;
        }
        if (objectDecoder == null) {
          objectDecoder = null;
        }
        this.currentLineNb = -1;
        this.currentLine = "";
        this.lines = this.cleanup(value).split("\n");
        data = null;
        context = this.CONTEXT_NONE;
        allowOverwrite = false;
        while (this.moveToNextLine()) {
          if (this.isCurrentLineEmpty()) {
            continue;
          }
          if ("	" === this.currentLine[0]) {
            throw new ParseException("A YAML file cannot contain tabs as indentation.", this.getRealCurrentLineNb() + 1, this.currentLine);
          }
          isRef = mergeNode = false;
          if (values = this.PATTERN_SEQUENCE_ITEM.exec(this.currentLine)) {
            if (this.CONTEXT_MAPPING === context) {
              throw new ParseException("You cannot define a sequence item when in a mapping");
            }
            context = this.CONTEXT_SEQUENCE;
            if (data == null) {
              data = [];
            }
            if (values.value != null && (matches = this.PATTERN_ANCHOR_VALUE.exec(values.value))) {
              isRef = matches.ref;
              values.value = matches.value;
            }
            if (!(values.value != null) || "" === Utils.trim(values.value, " ") || Utils.ltrim(values.value, " ").indexOf("#") === 0) {
              if (this.currentLineNb < this.lines.length - 1 && !this.isNextLineUnIndentedCollection()) {
                c = this.getRealCurrentLineNb() + 1;
                parser = new Parser2(c);
                parser.refs = this.refs;
                data.push(parser.parse(this.getNextEmbedBlock(null, true), exceptionOnInvalidType, objectDecoder));
              } else {
                data.push(null);
              }
            } else {
              if (((ref = values.leadspaces) != null ? ref.length : void 0) && (matches = this.PATTERN_COMPACT_NOTATION.exec(values.value))) {
                c = this.getRealCurrentLineNb();
                parser = new Parser2(c);
                parser.refs = this.refs;
                block = values.value;
                indent = this.getCurrentLineIndentation();
                if (this.isNextLineIndented(false)) {
                  block += "\n" + this.getNextEmbedBlock(indent + values.leadspaces.length + 1, true);
                }
                data.push(parser.parse(block, exceptionOnInvalidType, objectDecoder));
              } else {
                data.push(this.parseValue(values.value, exceptionOnInvalidType, objectDecoder));
              }
            }
          } else if ((values = this.PATTERN_MAPPING_ITEM.exec(this.currentLine)) && values.key.indexOf(" #") === -1) {
            if (this.CONTEXT_SEQUENCE === context) {
              throw new ParseException("You cannot define a mapping item when in a sequence");
            }
            context = this.CONTEXT_MAPPING;
            if (data == null) {
              data = {};
            }
            Inline.configure(exceptionOnInvalidType, objectDecoder);
            try {
              key = Inline.parseScalar(values.key);
            } catch (error) {
              e = error;
              e.parsedLine = this.getRealCurrentLineNb() + 1;
              e.snippet = this.currentLine;
              throw e;
            }
            if ("<<" === key) {
              mergeNode = true;
              allowOverwrite = true;
              if (((ref1 = values.value) != null ? ref1.indexOf("*") : void 0) === 0) {
                refName = values.value.slice(1);
                if (this.refs[refName] == null) {
                  throw new ParseException('Reference "' + refName + '" does not exist.', this.getRealCurrentLineNb() + 1, this.currentLine);
                }
                refValue = this.refs[refName];
                if (typeof refValue !== "object") {
                  throw new ParseException("YAML merge keys used with a scalar value instead of an object.", this.getRealCurrentLineNb() + 1, this.currentLine);
                }
                if (refValue instanceof Array) {
                  for (i = j = 0, len = refValue.length; j < len; i = ++j) {
                    value = refValue[i];
                    if (data[name = String(i)] == null) {
                      data[name] = value;
                    }
                  }
                } else {
                  for (key in refValue) {
                    value = refValue[key];
                    if (data[key] == null) {
                      data[key] = value;
                    }
                  }
                }
              } else {
                if (values.value != null && values.value !== "") {
                  value = values.value;
                } else {
                  value = this.getNextEmbedBlock();
                }
                c = this.getRealCurrentLineNb() + 1;
                parser = new Parser2(c);
                parser.refs = this.refs;
                parsed = parser.parse(value, exceptionOnInvalidType);
                if (typeof parsed !== "object") {
                  throw new ParseException("YAML merge keys used with a scalar value instead of an object.", this.getRealCurrentLineNb() + 1, this.currentLine);
                }
                if (parsed instanceof Array) {
                  for (l = 0, len1 = parsed.length; l < len1; l++) {
                    parsedItem = parsed[l];
                    if (typeof parsedItem !== "object") {
                      throw new ParseException("Merge items must be objects.", this.getRealCurrentLineNb() + 1, parsedItem);
                    }
                    if (parsedItem instanceof Array) {
                      for (i = m = 0, len2 = parsedItem.length; m < len2; i = ++m) {
                        value = parsedItem[i];
                        k = String(i);
                        if (!data.hasOwnProperty(k)) {
                          data[k] = value;
                        }
                      }
                    } else {
                      for (key in parsedItem) {
                        value = parsedItem[key];
                        if (!data.hasOwnProperty(key)) {
                          data[key] = value;
                        }
                      }
                    }
                  }
                } else {
                  for (key in parsed) {
                    value = parsed[key];
                    if (!data.hasOwnProperty(key)) {
                      data[key] = value;
                    }
                  }
                }
              }
            } else if (values.value != null && (matches = this.PATTERN_ANCHOR_VALUE.exec(values.value))) {
              isRef = matches.ref;
              values.value = matches.value;
            }
            if (mergeNode) {
            } else if (!(values.value != null) || "" === Utils.trim(values.value, " ") || Utils.ltrim(values.value, " ").indexOf("#") === 0) {
              if (!this.isNextLineIndented() && !this.isNextLineUnIndentedCollection()) {
                if (allowOverwrite || data[key] === void 0) {
                  data[key] = null;
                }
              } else {
                c = this.getRealCurrentLineNb() + 1;
                parser = new Parser2(c);
                parser.refs = this.refs;
                val = parser.parse(this.getNextEmbedBlock(), exceptionOnInvalidType, objectDecoder);
                if (allowOverwrite || data[key] === void 0) {
                  data[key] = val;
                }
              }
            } else {
              val = this.parseValue(values.value, exceptionOnInvalidType, objectDecoder);
              if (allowOverwrite || data[key] === void 0) {
                data[key] = val;
              }
            }
          } else {
            lineCount = this.lines.length;
            if (1 === lineCount || 2 === lineCount && Utils.isEmpty(this.lines[1])) {
              try {
                value = Inline.parse(this.lines[0], exceptionOnInvalidType, objectDecoder);
              } catch (error) {
                e = error;
                e.parsedLine = this.getRealCurrentLineNb() + 1;
                e.snippet = this.currentLine;
                throw e;
              }
              if (typeof value === "object") {
                if (value instanceof Array) {
                  first = value[0];
                } else {
                  for (key in value) {
                    first = value[key];
                    break;
                  }
                }
                if (typeof first === "string" && first.indexOf("*") === 0) {
                  data = [];
                  for (n = 0, len3 = value.length; n < len3; n++) {
                    alias = value[n];
                    data.push(this.refs[alias.slice(1)]);
                  }
                  value = data;
                }
              }
              return value;
            } else if ((ref2 = Utils.ltrim(value).charAt(0)) === "[" || ref2 === "{") {
              try {
                return Inline.parse(value, exceptionOnInvalidType, objectDecoder);
              } catch (error) {
                e = error;
                e.parsedLine = this.getRealCurrentLineNb() + 1;
                e.snippet = this.currentLine;
                throw e;
              }
            }
            throw new ParseException("Unable to parse.", this.getRealCurrentLineNb() + 1, this.currentLine);
          }
          if (isRef) {
            if (data instanceof Array) {
              this.refs[isRef] = data[data.length - 1];
            } else {
              lastKey = null;
              for (key in data) {
                lastKey = key;
              }
              this.refs[isRef] = data[lastKey];
            }
          }
        }
        if (Utils.isEmpty(data)) {
          return null;
        } else {
          return data;
        }
      };
      Parser2.prototype.getRealCurrentLineNb = function() {
        return this.currentLineNb + this.offset;
      };
      Parser2.prototype.getCurrentLineIndentation = function() {
        return this.currentLine.length - Utils.ltrim(this.currentLine, " ").length;
      };
      Parser2.prototype.getNextEmbedBlock = function(indentation, includeUnindentedCollection) {
        var data, indent, isItUnindentedCollection, newIndent, removeComments, removeCommentsPattern, unindentedEmbedBlock;
        if (indentation == null) {
          indentation = null;
        }
        if (includeUnindentedCollection == null) {
          includeUnindentedCollection = false;
        }
        this.moveToNextLine();
        if (indentation == null) {
          newIndent = this.getCurrentLineIndentation();
          unindentedEmbedBlock = this.isStringUnIndentedCollectionItem(this.currentLine);
          if (!this.isCurrentLineEmpty() && 0 === newIndent && !unindentedEmbedBlock) {
            throw new ParseException("Indentation problem.", this.getRealCurrentLineNb() + 1, this.currentLine);
          }
        } else {
          newIndent = indentation;
        }
        data = [this.currentLine.slice(newIndent)];
        if (!includeUnindentedCollection) {
          isItUnindentedCollection = this.isStringUnIndentedCollectionItem(this.currentLine);
        }
        removeCommentsPattern = this.PATTERN_FOLDED_SCALAR_END;
        removeComments = !removeCommentsPattern.test(this.currentLine);
        while (this.moveToNextLine()) {
          indent = this.getCurrentLineIndentation();
          if (indent === newIndent) {
            removeComments = !removeCommentsPattern.test(this.currentLine);
          }
          if (removeComments && this.isCurrentLineComment()) {
            continue;
          }
          if (this.isCurrentLineBlank()) {
            data.push(this.currentLine.slice(newIndent));
            continue;
          }
          if (isItUnindentedCollection && !this.isStringUnIndentedCollectionItem(this.currentLine) && indent === newIndent) {
            this.moveToPreviousLine();
            break;
          }
          if (indent >= newIndent) {
            data.push(this.currentLine.slice(newIndent));
          } else if (Utils.ltrim(this.currentLine).charAt(0) === "#") {
          } else if (0 === indent) {
            this.moveToPreviousLine();
            break;
          } else {
            throw new ParseException("Indentation problem.", this.getRealCurrentLineNb() + 1, this.currentLine);
          }
        }
        return data.join("\n");
      };
      Parser2.prototype.moveToNextLine = function() {
        if (this.currentLineNb >= this.lines.length - 1) {
          return false;
        }
        this.currentLine = this.lines[++this.currentLineNb];
        return true;
      };
      Parser2.prototype.moveToPreviousLine = function() {
        this.currentLine = this.lines[--this.currentLineNb];
      };
      Parser2.prototype.parseValue = function(value, exceptionOnInvalidType, objectDecoder) {
        var e, foldedIndent, matches, modifiers, pos, ref, ref1, val;
        if (0 === value.indexOf("*")) {
          pos = value.indexOf("#");
          if (pos !== -1) {
            value = value.substr(1, pos - 2);
          } else {
            value = value.slice(1);
          }
          if (this.refs[value] === void 0) {
            throw new ParseException('Reference "' + value + '" does not exist.', this.currentLine);
          }
          return this.refs[value];
        }
        if (matches = this.PATTERN_FOLDED_SCALAR_ALL.exec(value)) {
          modifiers = (ref = matches.modifiers) != null ? ref : "";
          foldedIndent = Math.abs(parseInt(modifiers));
          if (isNaN(foldedIndent)) {
            foldedIndent = 0;
          }
          val = this.parseFoldedScalar(matches.separator, this.PATTERN_DECIMAL.replace(modifiers, ""), foldedIndent);
          if (matches.type != null) {
            Inline.configure(exceptionOnInvalidType, objectDecoder);
            return Inline.parseScalar(matches.type + " " + val);
          } else {
            return val;
          }
        }
        if ((ref1 = value.charAt(0)) === "[" || ref1 === "{" || ref1 === '"' || ref1 === "'") {
          while (true) {
            try {
              return Inline.parse(value, exceptionOnInvalidType, objectDecoder);
            } catch (error) {
              e = error;
              if (e instanceof ParseMore && this.moveToNextLine()) {
                value += "\n" + Utils.trim(this.currentLine, " ");
              } else {
                e.parsedLine = this.getRealCurrentLineNb() + 1;
                e.snippet = this.currentLine;
                throw e;
              }
            }
          }
        } else {
          if (this.isNextLineIndented()) {
            value += "\n" + this.getNextEmbedBlock();
          }
          return Inline.parse(value, exceptionOnInvalidType, objectDecoder);
        }
      };
      Parser2.prototype.parseFoldedScalar = function(separator, indicator, indentation) {
        var isCurrentLineBlank, j, len, line, matches, newText, notEOF, pattern, ref, text;
        if (indicator == null) {
          indicator = "";
        }
        if (indentation == null) {
          indentation = 0;
        }
        notEOF = this.moveToNextLine();
        if (!notEOF) {
          return "";
        }
        isCurrentLineBlank = this.isCurrentLineBlank();
        text = "";
        while (notEOF && isCurrentLineBlank) {
          if (notEOF = this.moveToNextLine()) {
            text += "\n";
            isCurrentLineBlank = this.isCurrentLineBlank();
          }
        }
        if (0 === indentation) {
          if (matches = this.PATTERN_INDENT_SPACES.exec(this.currentLine)) {
            indentation = matches[0].length;
          }
        }
        if (indentation > 0) {
          pattern = this.PATTERN_FOLDED_SCALAR_BY_INDENTATION[indentation];
          if (pattern == null) {
            pattern = new Pattern("^ {" + indentation + "}(.*)$");
            Parser2.prototype.PATTERN_FOLDED_SCALAR_BY_INDENTATION[indentation] = pattern;
          }
          while (notEOF && (isCurrentLineBlank || (matches = pattern.exec(this.currentLine)))) {
            if (isCurrentLineBlank) {
              text += this.currentLine.slice(indentation);
            } else {
              text += matches[1];
            }
            if (notEOF = this.moveToNextLine()) {
              text += "\n";
              isCurrentLineBlank = this.isCurrentLineBlank();
            }
          }
        } else if (notEOF) {
          text += "\n";
        }
        if (notEOF) {
          this.moveToPreviousLine();
        }
        if (">" === separator) {
          newText = "";
          ref = text.split("\n");
          for (j = 0, len = ref.length; j < len; j++) {
            line = ref[j];
            if (line.length === 0 || line.charAt(0) === " ") {
              newText = Utils.rtrim(newText, " ") + line + "\n";
            } else {
              newText += line + " ";
            }
          }
          text = newText;
        }
        if ("+" !== indicator) {
          text = Utils.rtrim(text);
        }
        if ("" === indicator) {
          text = this.PATTERN_TRAILING_LINES.replace(text, "\n");
        } else if ("-" === indicator) {
          text = this.PATTERN_TRAILING_LINES.replace(text, "");
        }
        return text;
      };
      Parser2.prototype.isNextLineIndented = function(ignoreComments) {
        var EOF, currentIndentation, ret;
        if (ignoreComments == null) {
          ignoreComments = true;
        }
        currentIndentation = this.getCurrentLineIndentation();
        EOF = !this.moveToNextLine();
        if (ignoreComments) {
          while (!EOF && this.isCurrentLineEmpty()) {
            EOF = !this.moveToNextLine();
          }
        } else {
          while (!EOF && this.isCurrentLineBlank()) {
            EOF = !this.moveToNextLine();
          }
        }
        if (EOF) {
          return false;
        }
        ret = false;
        if (this.getCurrentLineIndentation() > currentIndentation) {
          ret = true;
        }
        this.moveToPreviousLine();
        return ret;
      };
      Parser2.prototype.isCurrentLineEmpty = function() {
        var trimmedLine;
        trimmedLine = Utils.trim(this.currentLine, " ");
        return trimmedLine.length === 0 || trimmedLine.charAt(0) === "#";
      };
      Parser2.prototype.isCurrentLineBlank = function() {
        return "" === Utils.trim(this.currentLine, " ");
      };
      Parser2.prototype.isCurrentLineComment = function() {
        var ltrimmedLine;
        ltrimmedLine = Utils.ltrim(this.currentLine, " ");
        return ltrimmedLine.charAt(0) === "#";
      };
      Parser2.prototype.cleanup = function(value) {
        var count, i, indent, j, l, len, len1, line, lines, ref, ref1, ref2, smallestIndent, trimmedValue;
        if (value.indexOf("\r") !== -1) {
          value = value.split("\r\n").join("\n").split("\r").join("\n");
        }
        count = 0;
        ref = this.PATTERN_YAML_HEADER.replaceAll(value, ""), value = ref[0], count = ref[1];
        this.offset += count;
        ref1 = this.PATTERN_LEADING_COMMENTS.replaceAll(value, "", 1), trimmedValue = ref1[0], count = ref1[1];
        if (count === 1) {
          this.offset += Utils.subStrCount(value, "\n") - Utils.subStrCount(trimmedValue, "\n");
          value = trimmedValue;
        }
        ref2 = this.PATTERN_DOCUMENT_MARKER_START.replaceAll(value, "", 1), trimmedValue = ref2[0], count = ref2[1];
        if (count === 1) {
          this.offset += Utils.subStrCount(value, "\n") - Utils.subStrCount(trimmedValue, "\n");
          value = trimmedValue;
          value = this.PATTERN_DOCUMENT_MARKER_END.replace(value, "");
        }
        lines = value.split("\n");
        smallestIndent = -1;
        for (j = 0, len = lines.length; j < len; j++) {
          line = lines[j];
          if (Utils.trim(line, " ").length === 0) {
            continue;
          }
          indent = line.length - Utils.ltrim(line).length;
          if (smallestIndent === -1 || indent < smallestIndent) {
            smallestIndent = indent;
          }
        }
        if (smallestIndent > 0) {
          for (i = l = 0, len1 = lines.length; l < len1; i = ++l) {
            line = lines[i];
            lines[i] = line.slice(smallestIndent);
          }
          value = lines.join("\n");
        }
        return value;
      };
      Parser2.prototype.isNextLineUnIndentedCollection = function(currentIndentation) {
        var notEOF, ret;
        if (currentIndentation == null) {
          currentIndentation = null;
        }
        if (currentIndentation == null) {
          currentIndentation = this.getCurrentLineIndentation();
        }
        notEOF = this.moveToNextLine();
        while (notEOF && this.isCurrentLineEmpty()) {
          notEOF = this.moveToNextLine();
        }
        if (false === notEOF) {
          return false;
        }
        ret = false;
        if (this.getCurrentLineIndentation() === currentIndentation && this.isStringUnIndentedCollectionItem(this.currentLine)) {
          ret = true;
        }
        this.moveToPreviousLine();
        return ret;
      };
      Parser2.prototype.isStringUnIndentedCollectionItem = function() {
        return this.currentLine === "-" || this.currentLine.slice(0, 2) === "- ";
      };
      return Parser2;
    }();
    module2.exports = Parser;
  }
});

// ../node_modules/yamljs/lib/Dumper.js
var require_Dumper = __commonJS({
  "../node_modules/yamljs/lib/Dumper.js"(exports, module2) {
    var Dumper;
    var Inline;
    var Utils;
    Utils = require_Utils();
    Inline = require_Inline();
    Dumper = function() {
      function Dumper2() {
      }
      Dumper2.indentation = 4;
      Dumper2.prototype.dump = function(input, inline, indent, exceptionOnInvalidType, objectEncoder) {
        var i, key, len, output, prefix, value, willBeInlined;
        if (inline == null) {
          inline = 0;
        }
        if (indent == null) {
          indent = 0;
        }
        if (exceptionOnInvalidType == null) {
          exceptionOnInvalidType = false;
        }
        if (objectEncoder == null) {
          objectEncoder = null;
        }
        output = "";
        prefix = indent ? Utils.strRepeat(" ", indent) : "";
        if (inline <= 0 || typeof input !== "object" || input instanceof Date || Utils.isEmpty(input)) {
          output += prefix + Inline.dump(input, exceptionOnInvalidType, objectEncoder);
        } else {
          if (input instanceof Array) {
            for (i = 0, len = input.length; i < len; i++) {
              value = input[i];
              willBeInlined = inline - 1 <= 0 || typeof value !== "object" || Utils.isEmpty(value);
              output += prefix + "-" + (willBeInlined ? " " : "\n") + this.dump(value, inline - 1, willBeInlined ? 0 : indent + this.indentation, exceptionOnInvalidType, objectEncoder) + (willBeInlined ? "\n" : "");
            }
          } else {
            for (key in input) {
              value = input[key];
              willBeInlined = inline - 1 <= 0 || typeof value !== "object" || Utils.isEmpty(value);
              output += prefix + Inline.dump(key, exceptionOnInvalidType, objectEncoder) + ":" + (willBeInlined ? " " : "\n") + this.dump(value, inline - 1, willBeInlined ? 0 : indent + this.indentation, exceptionOnInvalidType, objectEncoder) + (willBeInlined ? "\n" : "");
            }
          }
        }
        return output;
      };
      return Dumper2;
    }();
    module2.exports = Dumper;
  }
});

// ../node_modules/yamljs/lib/Yaml.js
var require_Yaml = __commonJS({
  "../node_modules/yamljs/lib/Yaml.js"(exports, module2) {
    var Dumper;
    var Parser;
    var Utils;
    var Yaml;
    Parser = require_Parser();
    Dumper = require_Dumper();
    Utils = require_Utils();
    Yaml = function() {
      function Yaml2() {
      }
      Yaml2.parse = function(input, exceptionOnInvalidType, objectDecoder) {
        if (exceptionOnInvalidType == null) {
          exceptionOnInvalidType = false;
        }
        if (objectDecoder == null) {
          objectDecoder = null;
        }
        return new Parser().parse(input, exceptionOnInvalidType, objectDecoder);
      };
      Yaml2.parseFile = function(path2, callback, exceptionOnInvalidType, objectDecoder) {
        var input;
        if (callback == null) {
          callback = null;
        }
        if (exceptionOnInvalidType == null) {
          exceptionOnInvalidType = false;
        }
        if (objectDecoder == null) {
          objectDecoder = null;
        }
        if (callback != null) {
          return Utils.getStringFromFile(path2, function(_this) {
            return function(input2) {
              var result;
              result = null;
              if (input2 != null) {
                result = _this.parse(input2, exceptionOnInvalidType, objectDecoder);
              }
              callback(result);
            };
          }(this));
        } else {
          input = Utils.getStringFromFile(path2);
          if (input != null) {
            return this.parse(input, exceptionOnInvalidType, objectDecoder);
          }
          return null;
        }
      };
      Yaml2.dump = function(input, inline, indent, exceptionOnInvalidType, objectEncoder) {
        var yaml;
        if (inline == null) {
          inline = 2;
        }
        if (indent == null) {
          indent = 4;
        }
        if (exceptionOnInvalidType == null) {
          exceptionOnInvalidType = false;
        }
        if (objectEncoder == null) {
          objectEncoder = null;
        }
        yaml = new Dumper();
        yaml.indentation = indent;
        return yaml.dump(input, inline, 0, exceptionOnInvalidType, objectEncoder);
      };
      Yaml2.stringify = function(input, inline, indent, exceptionOnInvalidType, objectEncoder) {
        return this.dump(input, inline, indent, exceptionOnInvalidType, objectEncoder);
      };
      Yaml2.load = function(path2, callback, exceptionOnInvalidType, objectDecoder) {
        return this.parseFile(path2, callback, exceptionOnInvalidType, objectDecoder);
      };
      return Yaml2;
    }();
    if (typeof window !== "undefined" && window !== null) {
      window.YAML = Yaml;
    }
    if (typeof window === "undefined" || window === null) {
      exports.YAML = Yaml;
    }
    module2.exports = Yaml;
  }
});

// index.js
var express = require("express");
var swaggerUi = require("swagger-ui-express");
var YAML = require_Yaml();
var path = require("path");
var swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
var app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
var port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`O servidor est\xE1 em execu\xE7\xE3o na porta ${port}`);
});
