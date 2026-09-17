import { i as __require, n as __esmMin, r as __exportAll, t as __commonJSMin } from "./chunks/rolldown-runtime_BMI-E3GI.mjs";
import { At as stripRequestBase, Cn as AstroError, Dt as removeLeadingForwardSlash, Mt as decodeKey, St as isInternalPath, Tt as prependForwardSlash, V as escape, Wt as CacheNotEnabled, Y as getDefaultStatusCode, an as LocalsNotAnObject, at as AstroIntegrationLogger, bt as collapseDuplicateTrailingSlashes, c as getResolvedLogger, d as getEnvironment, dt as clientAddressSymbol, kt as removeTrailingForwardSlash, nt as createAsyncManifestMemo, o as getRouteGenerator, pn as NoManifestAvailable, rt as createManifestMemo, s as getLogger, st as ASTRO_ERROR_HEADER, ut as REROUTABLE_STATUS_CODES, vt as appendForwardSlash, xt as hasFileExtension } from "./chunks/sequence_Uaq5IZkJ.mjs";
import { n as matchPattern } from "./chunks/remote_BOuOrwzx.mjs";
import "./chunks/remoteProbe_Btlai6VS.mjs";
import { A as getUsedFeatures, C as getPattern, M as getSetCookiesFromResponse, N as computePathnameFromDomain, O as ALL_FETCH_FEATURES, P as NOOP_MIDDLEWARE_FN, S as getI18n, T as serializeActionResult, _ as handlePages, a as handleMiddleware, b as prepareResponse, d as provideSession, f as getRouteTable, g as routeComparator, h as updateRouteTable, i as setRenderOptions, j as markFeatureUsed, k as FetchFeatures, l as renderErrorFromState, m as matchRoute, n as FetchState, o as DisabledAstroCache, p as matchAllRoutes, r as getRenderOptions, s as NoopAstroCache, t as getParts, u as renderErrorPage, v as createCrossOriginForbiddenResponse, w as getActionContext, x as finalizeI18n, y as isForbiddenCrossOriginRequest } from "./chunks/parts_BZVfn-nX.mjs";
import nodePath from "node:path";
//#endregion
//#region node_modules/.pnpm/path-to-regexp@6.1.0/node_modules/path-to-regexp/dist.es2015/index.js
var dist_es2015_exports$1 = /* @__PURE__ */ __exportAll({
	compile: () => compile$1,
	match: () => match$1,
	parse: () => parse$1,
	pathToRegexp: () => pathToRegexp$2,
	regexpToFunction: () => regexpToFunction$1,
	tokensToFunction: () => tokensToFunction$1,
	tokensToRegexp: () => tokensToRegexp$1
});
/**
* Tokenize input string.
*/
function lexer$1(str) {
	var tokens = [];
	var i = 0;
	while (i < str.length) {
		var char = str[i];
		if (char === "*" || char === "+" || char === "?") {
			tokens.push({
				type: "MODIFIER",
				index: i,
				value: str[i++]
			});
			continue;
		}
		if (char === "\\") {
			tokens.push({
				type: "ESCAPED_CHAR",
				index: i++,
				value: str[i++]
			});
			continue;
		}
		if (char === "{") {
			tokens.push({
				type: "OPEN",
				index: i,
				value: str[i++]
			});
			continue;
		}
		if (char === "}") {
			tokens.push({
				type: "CLOSE",
				index: i,
				value: str[i++]
			});
			continue;
		}
		if (char === ":") {
			var name = "";
			var j = i + 1;
			while (j < str.length) {
				var code = str.charCodeAt(j);
				if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
					name += str[j++];
					continue;
				}
				break;
			}
			if (!name) throw new TypeError("Missing parameter name at " + i);
			tokens.push({
				type: "NAME",
				index: i,
				value: name
			});
			i = j;
			continue;
		}
		if (char === "(") {
			var count = 1;
			var pattern = "";
			var j = i + 1;
			if (str[j] === "?") throw new TypeError("Pattern cannot start with \"?\" at " + j);
			while (j < str.length) {
				if (str[j] === "\\") {
					pattern += str[j++] + str[j++];
					continue;
				}
				if (str[j] === ")") {
					count--;
					if (count === 0) {
						j++;
						break;
					}
				} else if (str[j] === "(") {
					count++;
					if (str[j + 1] !== "?") throw new TypeError("Capturing groups are not allowed at " + j);
				}
				pattern += str[j++];
			}
			if (count) throw new TypeError("Unbalanced pattern at " + i);
			if (!pattern) throw new TypeError("Missing pattern at " + i);
			tokens.push({
				type: "PATTERN",
				index: i,
				value: pattern
			});
			i = j;
			continue;
		}
		tokens.push({
			type: "CHAR",
			index: i,
			value: str[i++]
		});
	}
	tokens.push({
		type: "END",
		index: i,
		value: ""
	});
	return tokens;
}
/**
* Parse a string for the raw tokens.
*/
function parse$1(str, options) {
	if (options === void 0) options = {};
	var tokens = lexer$1(str);
	var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
	var defaultPattern = "[^" + escapeString$1(options.delimiter || "/#?") + "]+?";
	var result = [];
	var key = 0;
	var i = 0;
	var path = "";
	var tryConsume = function(type) {
		if (i < tokens.length && tokens[i].type === type) return tokens[i++].value;
	};
	var mustConsume = function(type) {
		var value = tryConsume(type);
		if (value !== void 0) return value;
		var _a = tokens[i], nextType = _a.type, index = _a.index;
		throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
	};
	var consumeText = function() {
		var result = "";
		var value;
		while (value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) result += value;
		return result;
	};
	while (i < tokens.length) {
		var char = tryConsume("CHAR");
		var name = tryConsume("NAME");
		var pattern = tryConsume("PATTERN");
		if (name || pattern) {
			var prefix = char || "";
			if (prefixes.indexOf(prefix) === -1) {
				path += prefix;
				prefix = "";
			}
			if (path) {
				result.push(path);
				path = "";
			}
			result.push({
				name: name || key++,
				prefix,
				suffix: "",
				pattern: pattern || defaultPattern,
				modifier: tryConsume("MODIFIER") || ""
			});
			continue;
		}
		var value = char || tryConsume("ESCAPED_CHAR");
		if (value) {
			path += value;
			continue;
		}
		if (path) {
			result.push(path);
			path = "";
		}
		if (tryConsume("OPEN")) {
			var prefix = consumeText();
			var name_1 = tryConsume("NAME") || "";
			var pattern_1 = tryConsume("PATTERN") || "";
			var suffix = consumeText();
			mustConsume("CLOSE");
			result.push({
				name: name_1 || (pattern_1 ? key++ : ""),
				pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
				prefix,
				suffix,
				modifier: tryConsume("MODIFIER") || ""
			});
			continue;
		}
		mustConsume("END");
	}
	return result;
}
/**
* Compile a string to a template function for the path.
*/
function compile$1(str, options) {
	return tokensToFunction$1(parse$1(str, options), options);
}
/**
* Expose a method for transforming tokens into the path function.
*/
function tokensToFunction$1(tokens, options) {
	if (options === void 0) options = {};
	var reFlags = flags$1(options);
	var _a = options.encode, encode = _a === void 0 ? function(x) {
		return x;
	} : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
	var matches = tokens.map(function(token) {
		if (typeof token === "object") return new RegExp("^(?:" + token.pattern + ")$", reFlags);
	});
	return function(data) {
		var path = "";
		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];
			if (typeof token === "string") {
				path += token;
				continue;
			}
			var value = data ? data[token.name] : void 0;
			var optional = token.modifier === "?" || token.modifier === "*";
			var repeat = token.modifier === "*" || token.modifier === "+";
			if (Array.isArray(value)) {
				if (!repeat) throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
				if (value.length === 0) {
					if (optional) continue;
					throw new TypeError("Expected \"" + token.name + "\" to not be empty");
				}
				for (var j = 0; j < value.length; j++) {
					var segment = encode(value[j], token);
					if (validate && !matches[i].test(segment)) throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
					path += token.prefix + segment + token.suffix;
				}
				continue;
			}
			if (typeof value === "string" || typeof value === "number") {
				var segment = encode(String(value), token);
				if (validate && !matches[i].test(segment)) throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
				path += token.prefix + segment + token.suffix;
				continue;
			}
			if (optional) continue;
			var typeOfMessage = repeat ? "an array" : "a string";
			throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
		}
		return path;
	};
}
/**
* Create path match function from `path-to-regexp` spec.
*/
function match$1(str, options) {
	var keys = [];
	return regexpToFunction$1(pathToRegexp$2(str, keys, options), keys, options);
}
/**
* Create a path match function from `path-to-regexp` output.
*/
function regexpToFunction$1(re, keys, options) {
	if (options === void 0) options = {};
	var _a = options.decode, decode = _a === void 0 ? function(x) {
		return x;
	} : _a;
	return function(pathname) {
		var m = re.exec(pathname);
		if (!m) return false;
		var path = m[0], index = m.index;
		var params = Object.create(null);
		var _loop_1 = function(i) {
			if (m[i] === void 0) return "continue";
			var key = keys[i - 1];
			if (key.modifier === "*" || key.modifier === "+") params[key.name] = m[i].split(key.prefix + key.suffix).map(function(value) {
				return decode(value, key);
			});
			else params[key.name] = decode(m[i], key);
		};
		for (var i = 1; i < m.length; i++) _loop_1(i);
		return {
			path,
			index,
			params
		};
	};
}
/**
* Escape a regular expression string.
*/
function escapeString$1(str) {
	return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
* Get the flags for a regexp from the options.
*/
function flags$1(options) {
	return options && options.sensitive ? "" : "i";
}
/**
* Pull out keys from a regexp.
*/
function regexpToRegexp$1(path, keys) {
	if (!keys) return path;
	var groups = path.source.match(/\((?!\?)/g);
	if (groups) for (var i = 0; i < groups.length; i++) keys.push({
		name: i,
		prefix: "",
		suffix: "",
		modifier: "",
		pattern: ""
	});
	return path;
}
/**
* Transform an array into a regexp.
*/
function arrayToRegexp$1(paths, keys, options) {
	var parts = paths.map(function(path) {
		return pathToRegexp$2(path, keys, options).source;
	});
	return new RegExp("(?:" + parts.join("|") + ")", flags$1(options));
}
/**
* Create a path regexp from string input.
*/
function stringToRegexp$1(path, keys, options) {
	return tokensToRegexp$1(parse$1(path, options), keys, options);
}
/**
* Expose a function for taking tokens and returning a RegExp.
*/
function tokensToRegexp$1(tokens, keys, options) {
	if (options === void 0) options = {};
	var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
		return x;
	} : _d;
	var endsWith = "[" + escapeString$1(options.endsWith || "") + "]|$";
	var delimiter = "[" + escapeString$1(options.delimiter || "/#?") + "]";
	var route = start ? "^" : "";
	for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
		var token = tokens_1[_i];
		if (typeof token === "string") route += escapeString$1(encode(token));
		else {
			var prefix = escapeString$1(encode(token.prefix));
			var suffix = escapeString$1(encode(token.suffix));
			if (token.pattern) {
				if (keys) keys.push(token);
				if (prefix || suffix) {
					if (token.modifier === "+" || token.modifier === "*") {
						var mod = token.modifier === "*" ? "?" : "";
						route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
					} else route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
				} else route += "(" + token.pattern + ")" + token.modifier;
			} else route += "(?:" + prefix + suffix + ")" + token.modifier;
		}
	}
	if (end) {
		if (!strict) route += delimiter + "?";
		route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
	} else {
		var endToken = tokens[tokens.length - 1];
		var isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
		if (!strict) route += "(?:" + delimiter + "(?=" + endsWith + "))?";
		if (!isEndDelimited) route += "(?=" + delimiter + "|" + endsWith + ")";
	}
	return new RegExp(route, flags$1(options));
}
/**
* Normalize the given path string, returning a regular expression.
*
* An empty array can be passed in for the keys, which will hold the
* placeholder key descriptions. For example, using `/user/:id`, `keys` will
* contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
*/
function pathToRegexp$2(path, keys, options) {
	if (path instanceof RegExp) return regexpToRegexp$1(path, keys);
	if (Array.isArray(path)) return arrayToRegexp$1(path, keys, options);
	return stringToRegexp$1(path, keys, options);
}
__esmMin((() => {}));
//#endregion
//#region node_modules/.pnpm/path-to-regexp@6.3.0/node_modules/path-to-regexp/dist.es2015/index.js
var dist_es2015_exports = /* @__PURE__ */ __exportAll({
	compile: () => compile,
	match: () => match,
	parse: () => parse,
	pathToRegexp: () => pathToRegexp$1,
	regexpToFunction: () => regexpToFunction,
	tokensToFunction: () => tokensToFunction,
	tokensToRegexp: () => tokensToRegexp
});
/**
* Tokenize input string.
*/
function lexer(str) {
	var tokens = [];
	var i = 0;
	while (i < str.length) {
		var char = str[i];
		if (char === "*" || char === "+" || char === "?") {
			tokens.push({
				type: "MODIFIER",
				index: i,
				value: str[i++]
			});
			continue;
		}
		if (char === "\\") {
			tokens.push({
				type: "ESCAPED_CHAR",
				index: i++,
				value: str[i++]
			});
			continue;
		}
		if (char === "{") {
			tokens.push({
				type: "OPEN",
				index: i,
				value: str[i++]
			});
			continue;
		}
		if (char === "}") {
			tokens.push({
				type: "CLOSE",
				index: i,
				value: str[i++]
			});
			continue;
		}
		if (char === ":") {
			var name = "";
			var j = i + 1;
			while (j < str.length) {
				var code = str.charCodeAt(j);
				if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
					name += str[j++];
					continue;
				}
				break;
			}
			if (!name) throw new TypeError("Missing parameter name at ".concat(i));
			tokens.push({
				type: "NAME",
				index: i,
				value: name
			});
			i = j;
			continue;
		}
		if (char === "(") {
			var count = 1;
			var pattern = "";
			var j = i + 1;
			if (str[j] === "?") throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
			while (j < str.length) {
				if (str[j] === "\\") {
					pattern += str[j++] + str[j++];
					continue;
				}
				if (str[j] === ")") {
					count--;
					if (count === 0) {
						j++;
						break;
					}
				} else if (str[j] === "(") {
					count++;
					if (str[j + 1] !== "?") throw new TypeError("Capturing groups are not allowed at ".concat(j));
				}
				pattern += str[j++];
			}
			if (count) throw new TypeError("Unbalanced pattern at ".concat(i));
			if (!pattern) throw new TypeError("Missing pattern at ".concat(i));
			tokens.push({
				type: "PATTERN",
				index: i,
				value: pattern
			});
			i = j;
			continue;
		}
		tokens.push({
			type: "CHAR",
			index: i,
			value: str[i++]
		});
	}
	tokens.push({
		type: "END",
		index: i,
		value: ""
	});
	return tokens;
}
/**
* Parse a string for the raw tokens.
*/
function parse(str, options) {
	if (options === void 0) options = {};
	var tokens = lexer(str);
	var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
	var result = [];
	var key = 0;
	var i = 0;
	var path = "";
	var tryConsume = function(type) {
		if (i < tokens.length && tokens[i].type === type) return tokens[i++].value;
	};
	var mustConsume = function(type) {
		var value = tryConsume(type);
		if (value !== void 0) return value;
		var _a = tokens[i], nextType = _a.type, index = _a.index;
		throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
	};
	var consumeText = function() {
		var result = "";
		var value;
		while (value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) result += value;
		return result;
	};
	var isSafe = function(value) {
		for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
			var char = delimiter_1[_i];
			if (value.indexOf(char) > -1) return true;
		}
		return false;
	};
	var safePattern = function(prefix) {
		var prev = result[result.length - 1];
		var prevText = prefix || (prev && typeof prev === "string" ? prev : "");
		if (prev && !prevText) throw new TypeError("Must have text between two parameters, missing text after \"".concat(prev.name, "\""));
		if (!prevText || isSafe(prevText)) return "[^".concat(escapeString(delimiter), "]+?");
		return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
	};
	while (i < tokens.length) {
		var char = tryConsume("CHAR");
		var name = tryConsume("NAME");
		var pattern = tryConsume("PATTERN");
		if (name || pattern) {
			var prefix = char || "";
			if (prefixes.indexOf(prefix) === -1) {
				path += prefix;
				prefix = "";
			}
			if (path) {
				result.push(path);
				path = "";
			}
			result.push({
				name: name || key++,
				prefix,
				suffix: "",
				pattern: pattern || safePattern(prefix),
				modifier: tryConsume("MODIFIER") || ""
			});
			continue;
		}
		var value = char || tryConsume("ESCAPED_CHAR");
		if (value) {
			path += value;
			continue;
		}
		if (path) {
			result.push(path);
			path = "";
		}
		if (tryConsume("OPEN")) {
			var prefix = consumeText();
			var name_1 = tryConsume("NAME") || "";
			var pattern_1 = tryConsume("PATTERN") || "";
			var suffix = consumeText();
			mustConsume("CLOSE");
			result.push({
				name: name_1 || (pattern_1 ? key++ : ""),
				pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
				prefix,
				suffix,
				modifier: tryConsume("MODIFIER") || ""
			});
			continue;
		}
		mustConsume("END");
	}
	return result;
}
/**
* Compile a string to a template function for the path.
*/
function compile(str, options) {
	return tokensToFunction(parse(str, options), options);
}
/**
* Expose a method for transforming tokens into the path function.
*/
function tokensToFunction(tokens, options) {
	if (options === void 0) options = {};
	var reFlags = flags(options);
	var _a = options.encode, encode = _a === void 0 ? function(x) {
		return x;
	} : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
	var matches = tokens.map(function(token) {
		if (typeof token === "object") return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
	});
	return function(data) {
		var path = "";
		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];
			if (typeof token === "string") {
				path += token;
				continue;
			}
			var value = data ? data[token.name] : void 0;
			var optional = token.modifier === "?" || token.modifier === "*";
			var repeat = token.modifier === "*" || token.modifier === "+";
			if (Array.isArray(value)) {
				if (!repeat) throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
				if (value.length === 0) {
					if (optional) continue;
					throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
				}
				for (var j = 0; j < value.length; j++) {
					var segment = encode(value[j], token);
					if (validate && !matches[i].test(segment)) throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
					path += token.prefix + segment + token.suffix;
				}
				continue;
			}
			if (typeof value === "string" || typeof value === "number") {
				var segment = encode(String(value), token);
				if (validate && !matches[i].test(segment)) throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
				path += token.prefix + segment + token.suffix;
				continue;
			}
			if (optional) continue;
			var typeOfMessage = repeat ? "an array" : "a string";
			throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
		}
		return path;
	};
}
/**
* Create path match function from `path-to-regexp` spec.
*/
function match(str, options) {
	var keys = [];
	return regexpToFunction(pathToRegexp$1(str, keys, options), keys, options);
}
/**
* Create a path match function from `path-to-regexp` output.
*/
function regexpToFunction(re, keys, options) {
	if (options === void 0) options = {};
	var _a = options.decode, decode = _a === void 0 ? function(x) {
		return x;
	} : _a;
	return function(pathname) {
		var m = re.exec(pathname);
		if (!m) return false;
		var path = m[0], index = m.index;
		var params = Object.create(null);
		var _loop_1 = function(i) {
			if (m[i] === void 0) return "continue";
			var key = keys[i - 1];
			if (key.modifier === "*" || key.modifier === "+") params[key.name] = m[i].split(key.prefix + key.suffix).map(function(value) {
				return decode(value, key);
			});
			else params[key.name] = decode(m[i], key);
		};
		for (var i = 1; i < m.length; i++) _loop_1(i);
		return {
			path,
			index,
			params
		};
	};
}
/**
* Escape a regular expression string.
*/
function escapeString(str) {
	return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
* Get the flags for a regexp from the options.
*/
function flags(options) {
	return options && options.sensitive ? "" : "i";
}
/**
* Pull out keys from a regexp.
*/
function regexpToRegexp(path, keys) {
	if (!keys) return path;
	var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
	var index = 0;
	var execResult = groupsRegex.exec(path.source);
	while (execResult) {
		keys.push({
			name: execResult[1] || index++,
			prefix: "",
			suffix: "",
			modifier: "",
			pattern: ""
		});
		execResult = groupsRegex.exec(path.source);
	}
	return path;
}
/**
* Transform an array into a regexp.
*/
function arrayToRegexp(paths, keys, options) {
	var parts = paths.map(function(path) {
		return pathToRegexp$1(path, keys, options).source;
	});
	return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
/**
* Create a path regexp from string input.
*/
function stringToRegexp(path, keys, options) {
	return tokensToRegexp(parse(path, options), keys, options);
}
/**
* Expose a function for taking tokens and returning a RegExp.
*/
function tokensToRegexp(tokens, keys, options) {
	if (options === void 0) options = {};
	var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
		return x;
	} : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
	var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
	var delimiterRe = "[".concat(escapeString(delimiter), "]");
	var route = start ? "^" : "";
	for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
		var token = tokens_1[_i];
		if (typeof token === "string") route += escapeString(encode(token));
		else {
			var prefix = escapeString(encode(token.prefix));
			var suffix = escapeString(encode(token.suffix));
			if (token.pattern) {
				if (keys) keys.push(token);
				if (prefix || suffix) {
					if (token.modifier === "+" || token.modifier === "*") {
						var mod = token.modifier === "*" ? "?" : "";
						route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
					} else route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
				} else {
					if (token.modifier === "+" || token.modifier === "*") throw new TypeError("Can not repeat \"".concat(token.name, "\" without a prefix and suffix"));
					route += "(".concat(token.pattern, ")").concat(token.modifier);
				}
			} else route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
		}
	}
	if (end) {
		if (!strict) route += "".concat(delimiterRe, "?");
		route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
	} else {
		var endToken = tokens[tokens.length - 1];
		var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
		if (!strict) route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
		if (!isEndDelimited) route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
	}
	return new RegExp(route, flags(options));
}
/**
* Normalize the given path string, returning a regular expression.
*
* An empty array can be passed in for the keys, which will hold the
* placeholder key descriptions. For example, using `/user/:id`, `keys` will
* contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
*/
function pathToRegexp$1(path, keys, options) {
	if (path instanceof RegExp) return regexpToRegexp(path, keys);
	if (Array.isArray(path)) return arrayToRegexp(path, keys, options);
	return stringToRegexp(path, keys, options);
}
__esmMin((() => {}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@6.6.0/node_modules/@vercel/routing-utils/dist/superstatic.js
var require_superstatic = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var superstatic_exports = {};
	__export(superstatic_exports, {
		collectHasSegments: () => collectHasSegments,
		compilePathToRegexpTemplate: () => compilePathToRegexpTemplate,
		convertCleanUrls: () => convertCleanUrls,
		convertHeaders: () => convertHeaders,
		convertRedirects: () => convertRedirects,
		convertRewrites: () => convertRewrites,
		convertTrailingSlash: () => convertTrailingSlash,
		getCleanUrls: () => getCleanUrls,
		pathToRegexp: () => pathToRegexp,
		sourceToRegex: () => sourceToRegex
	});
	module.exports = __toCommonJS(superstatic_exports);
	var import_url$1 = __require("url");
	var import_path_to_regexp = __toCommonJS(dist_es2015_exports$1);
	var import_path_to_regexp_updated = __toCommonJS(dist_es2015_exports);
	function cloneKeys(keys) {
		if (typeof keys === "undefined") return;
		return keys.slice(0);
	}
	function compareKeys(left, right) {
		return (typeof left === "undefined" ? "undefined" : left.toString()) === (typeof right === "undefined" ? "undefined" : right.toString());
	}
	function pathToRegexp(callerId, path, keys, options) {
		const newKeys = cloneKeys(keys);
		const currentRegExp = (0, import_path_to_regexp.pathToRegexp)(path, keys, options);
		try {
			const currentKeys = keys;
			const newRegExp = (0, import_path_to_regexp_updated.pathToRegexp)(path, newKeys, options);
			const isDiffRegExp = currentRegExp.toString() !== newRegExp.toString();
			if (process.env.FORCE_PATH_TO_REGEXP_LOG || isDiffRegExp) {
				const message = JSON.stringify({
					path,
					currentRegExp: currentRegExp.toString(),
					newRegExp: newRegExp.toString()
				});
				console.error(`[vc] PATH TO REGEXP PATH DIFF @ #${callerId}: ${message}`);
			}
			const isDiffKeys = !compareKeys(keys, newKeys);
			if (process.env.FORCE_PATH_TO_REGEXP_LOG || isDiffKeys) {
				const message = JSON.stringify({
					isDiffKeys,
					currentKeys,
					newKeys
				});
				console.error(`[vc] PATH TO REGEXP KEYS DIFF @ #${callerId}: ${message}`);
			}
		} catch (err) {
			const message = JSON.stringify({
				path,
				error: err.message
			});
			console.error(`[vc] PATH TO REGEXP ERROR @ #${callerId}: ${message}`);
		}
		return currentRegExp;
	}
	var UN_NAMED_SEGMENT = "__UN_NAMED_SEGMENT__";
	function getCleanUrls(filePaths) {
		return filePaths.map(toRoute).filter((f) => f.endsWith(".html")).map((f) => ({
			html: f,
			clean: f.slice(0, -5)
		}));
	}
	function convertCleanUrls(cleanUrls, trailingSlash, status = 308) {
		const routes = [];
		if (cleanUrls) {
			const loc = trailingSlash ? "/$1/" : "/$1";
			routes.push({
				src: "^/(?:(.+)/)?index(?:\\.html)?/?$",
				headers: { Location: loc },
				status
			});
			routes.push({
				src: "^/(.*)\\.html/?$",
				headers: { Location: loc },
				status
			});
		}
		return routes;
	}
	function convertRedirects(redirects, defaultStatus = 308) {
		return redirects.map((r) => {
			const { src, segments } = sourceToRegex(r.source);
			const hasSegments = collectHasSegments(r.has);
			normalizeHasKeys(r.has);
			normalizeHasKeys(r.missing);
			try {
				const loc = replaceSegments(segments, hasSegments, r.destination, true);
				let status;
				if (typeof r.permanent === "boolean") status = r.permanent ? 308 : 307;
				else if (r.statusCode) status = r.statusCode;
				else status = defaultStatus;
				const route = {
					src,
					headers: { Location: loc },
					status
				};
				if (typeof r.env !== "undefined") route.env = r.env;
				if (r.has) route.has = r.has;
				if (r.missing) route.missing = r.missing;
				return route;
			} catch (_e) {
				throw new Error(`Failed to parse redirect: ${JSON.stringify(r)}`);
			}
		});
	}
	function convertRewrites(rewrites, internalParamNames) {
		return rewrites.map((r) => {
			const { src, segments } = sourceToRegex(r.source);
			const hasSegments = collectHasSegments(r.has);
			normalizeHasKeys(r.has);
			normalizeHasKeys(r.missing);
			try {
				const interpolate = (value) => replaceSegments(segments, hasSegments, value, false, internalParamNames);
				let route;
				if (typeof r.destination === "string") route = {
					src,
					dest: interpolate(r.destination),
					check: true
				};
				else {
					const destination = {
						...r.destination,
						type: "service"
					};
					if (typeof destination.path === "string") destination.path = interpolate(destination.path);
					route = {
						src,
						destination
					};
				}
				if (r.transforms) route.transforms = r.transforms.map((transform) => {
					if (transform.type !== "request.path") return { ...transform };
					return {
						...transform,
						args: compilePathToRegexpTemplateFromSegments(transform.args, segments, hasSegments, transform.env)
					};
				});
				if (typeof r.env !== "undefined") route.env = r.env;
				if (r.has) route.has = r.has;
				if (r.missing) route.missing = r.missing;
				if (r.statusCode) route.status = r.statusCode;
				return route;
			} catch (_e) {
				throw new Error(`Failed to parse rewrite: ${JSON.stringify(r)}`);
			}
		});
	}
	function convertHeaders(headers) {
		return headers.map((h) => {
			const obj = {};
			const { src, segments } = sourceToRegex(h.source);
			const hasSegments = collectHasSegments(h.has);
			normalizeHasKeys(h.has);
			normalizeHasKeys(h.missing);
			const namedSegments = segments.filter((name) => name !== UN_NAMED_SEGMENT);
			const indexes = {};
			segments.forEach((name, index) => {
				indexes[name] = toSegmentDest(index);
			});
			hasSegments.forEach((name) => {
				indexes[name] = "$" + name;
			});
			h.headers.forEach(({ key, value }) => {
				if (namedSegments.length > 0 || hasSegments.length > 0) {
					if (key.includes(":")) key = safelyCompile(key, indexes);
					if (value.includes(":")) value = safelyCompile(value, indexes);
				}
				obj[key] = value;
			});
			const route = {
				src,
				headers: obj,
				continue: true
			};
			if (h.has) route.has = h.has;
			if (h.missing) route.missing = h.missing;
			return route;
		});
	}
	function convertTrailingSlash(enable, status = 308) {
		const routes = [];
		if (enable) {
			routes.push({ src: "^/\\.well-known(?:/.*)?$" });
			routes.push({
				src: "^/((?:[^/]+/)*[^/\\.]+)$",
				headers: { Location: "/$1/" },
				status
			});
			routes.push({
				src: "^/((?:[^/]+/)*[^/]+\\.\\w+)/$",
				headers: { Location: "/$1" },
				status
			});
		} else routes.push({
			src: "^/(.*)\\/$",
			headers: { Location: "/$1" },
			status
		});
		return routes;
	}
	function sourceToRegex(source) {
		const keys = [];
		const r = pathToRegexp("632", source, keys, {
			strict: true,
			sensitive: true,
			delimiter: "/"
		});
		const segments = keys.map((k) => k.name).map((name) => {
			if (typeof name !== "string") return UN_NAMED_SEGMENT;
			return name;
		});
		return {
			src: r.source,
			segments
		};
	}
	var namedGroupsRegex = /\(\?<([a-zA-Z][a-zA-Z0-9_]*)>/g;
	var normalizeHasKeys = (hasItems = []) => {
		for (const hasItem of hasItems) if ("key" in hasItem && hasItem.type === "header") hasItem.key = hasItem.key.toLowerCase();
		return hasItems;
	};
	function getStringValueForRegex(value) {
		if (typeof value === "string") return value;
		if (value && typeof value === "object" && value !== null) {
			if ("re" in value && typeof value.re === "string") return value.re;
		}
		return null;
	}
	function collectHasSegments(has) {
		const hasSegments = /* @__PURE__ */ new Set();
		for (const hasItem of has || []) {
			if (!hasItem.value && "key" in hasItem) hasSegments.add(hasItem.key);
			const stringValue = getStringValueForRegex(hasItem.value);
			if (stringValue) {
				for (const match of stringValue.matchAll(namedGroupsRegex)) if (match[1]) hasSegments.add(match[1]);
				if (hasItem.type === "host") hasSegments.add("host");
			}
		}
		return [...hasSegments];
	}
	var escapeSegment = (str, segmentName) => str.replace(new RegExp(`:${segmentName}`, "g"), `__ESC_COLON_${segmentName}`);
	var unescapeSegments = (str) => str.replace(/__ESC_COLON_/gi, ":");
	var pathTemplateSegmentNameRegex = /^([a-zA-Z_][a-zA-Z0-9_]*)/;
	function isEscaped(value, index) {
		let backslashCount = 0;
		for (let i = index - 1; i >= 0 && value[i] === "\\"; i--) backslashCount++;
		return backslashCount % 2 === 1;
	}
	function collectPathTemplateSegments(template) {
		const segments = [];
		for (let i = 0; i < template.length; i++) {
			if (template[i] !== ":" || isEscaped(template, i)) continue;
			const match = template.slice(i + 1).match(pathTemplateSegmentNameRegex);
			if (match) {
				segments.push(match[1]);
				i += match[1].length;
			}
		}
		return segments;
	}
	function collectNamedDollarReferences(template) {
		const references = [];
		for (let i = 0; i < template.length; i++) {
			if (template[i] !== "$" || isEscaped(template, i)) continue;
			const remainder = template.slice(i + 1);
			const bracedMatch = remainder.match(/^\{([a-zA-Z_][a-zA-Z0-9_]*)\}/);
			const unbracedMatch = remainder.match(pathTemplateSegmentNameRegex);
			const name = bracedMatch?.[1] || unbracedMatch?.[1];
			if (name) references.push(name);
		}
		return references;
	}
	function compilePathToRegexpTemplateFromSegments(template, segments, hasItemSegments, env = []) {
		const indexes = {};
		segments.forEach((name, index) => {
			indexes[name] = toSegmentDest(index);
		});
		hasItemSegments.forEach((name) => {
			indexes[name] = `$${name}`;
		});
		for (const name of collectPathTemplateSegments(template)) if (!(name in indexes)) throw new Error(`Path template references parameter ":${name}" that is not present in the source or has conditions.`);
		const routeParameters = /* @__PURE__ */ new Set([...segments.filter((name) => name !== UN_NAMED_SEGMENT), ...hasItemSegments]);
		for (const name of collectNamedDollarReferences(template)) if (routeParameters.has(name) && !env.includes(name)) throw new Error(`Path template references route parameter "${name}" as \`$${name}\`. Use \`:${name}\` path-to-regexp syntax in high-level rewrites, or list "${name}" in the transform env allowlist if it is an environment variable.`);
		return safelyCompile(template, indexes, true);
	}
	function compilePathToRegexpTemplate(source, template, has, env) {
		const { segments } = sourceToRegex(source);
		return compilePathToRegexpTemplateFromSegments(template, segments, collectHasSegments(has), env);
	}
	function replaceSegments(segments, hasItemSegments, destination, isRedirect, internalParamNames) {
		const namedSegments = segments.filter((name) => name !== UN_NAMED_SEGMENT);
		if (!(destination.includes(":") && namedSegments.length > 0 || hasItemSegments.length > 0 || !isRedirect)) return destination;
		let escapedDestination = destination;
		const indexes = {};
		segments.forEach((name, index) => {
			indexes[name] = toSegmentDest(index);
			escapedDestination = escapeSegment(escapedDestination, name);
		});
		hasItemSegments.forEach((name) => {
			indexes[name] = "$" + name;
			escapedDestination = escapeSegment(escapedDestination, name);
		});
		const parsedDestination = (0, import_url$1.parse)(escapedDestination, true);
		delete parsedDestination.href;
		delete parsedDestination.path;
		delete parsedDestination.search;
		delete parsedDestination.host;
		let { pathname, hash, query, hostname, ...rest } = parsedDestination;
		pathname = unescapeSegments(pathname || "");
		hash = unescapeSegments(hash || "");
		hostname = unescapeSegments(hostname || "");
		let destParams = /* @__PURE__ */ new Set();
		const pathnameKeys = [];
		const hashKeys = [];
		const hostnameKeys = [];
		try {
			pathToRegexp("528", pathname, pathnameKeys);
			pathToRegexp("834", hash || "", hashKeys);
			pathToRegexp("712", hostname || "", hostnameKeys);
		} catch (_) {}
		destParams = new Set([
			...pathnameKeys,
			...hashKeys,
			...hostnameKeys
		].map((key) => key.name).filter((val) => typeof val === "string"));
		pathname = safelyCompile(pathname, indexes, true);
		hash = hash ? safelyCompile(hash, indexes, true) : null;
		hostname = hostname ? safelyCompile(hostname, indexes, true) : null;
		for (const [key, strOrArray] of Object.entries(query)) if (Array.isArray(strOrArray)) query[key] = strOrArray.map((str) => safelyCompile(unescapeSegments(str), indexes, true));
		else query[key] = safelyCompile(unescapeSegments(strOrArray), indexes, true);
		const paramKeys = Object.keys(indexes);
		if (!isRedirect && !paramKeys.some((param) => !(internalParamNames && internalParamNames.includes(param)) && destParams.has(param))) {
			for (const param of paramKeys) if (!(param in query) && param !== UN_NAMED_SEGMENT) query[param] = indexes[param];
		}
		destination = (0, import_url$1.format)({
			...rest,
			hostname,
			pathname,
			query,
			hash
		});
		return destination.replace(/%24/g, "$");
	}
	function safelyCompile(value, indexes, attemptDirectCompile) {
		if (!value) return value;
		if (attemptDirectCompile) try {
			return (0, import_path_to_regexp.compile)(value, { validate: false })(indexes);
		} catch (_e) {}
		for (const key of Object.keys(indexes)) if (value.includes(`:${key}`)) value = value.replace(new RegExp(`:${key}\\*`, "g"), `:${key}--ESCAPED_PARAM_ASTERISK`).replace(new RegExp(`:${key}\\?`, "g"), `:${key}--ESCAPED_PARAM_QUESTION`).replace(new RegExp(`:${key}\\+`, "g"), `:${key}--ESCAPED_PARAM_PLUS`).replace(new RegExp(`:${key}(?!\\w)`, "g"), `--ESCAPED_PARAM_COLON${key}`);
		value = value.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, "\\$1").replace(/--ESCAPED_PARAM_PLUS/g, "+").replace(/--ESCAPED_PARAM_COLON/g, ":").replace(/--ESCAPED_PARAM_QUESTION/g, "?").replace(/--ESCAPED_PARAM_ASTERISK/g, "*");
		return (0, import_path_to_regexp.compile)(`/${value}`, { validate: false })(indexes).slice(1);
	}
	function toSegmentDest(index) {
		return "$" + (index + 1).toString();
	}
	function toRoute(filePath) {
		return filePath.startsWith("/") ? filePath : "/" + filePath;
	}
	0 && (module.exports = {
		collectHasSegments,
		compilePathToRegexpTemplate,
		convertCleanUrls,
		convertHeaders,
		convertRedirects,
		convertRewrites,
		convertTrailingSlash,
		getCleanUrls,
		pathToRegexp,
		sourceToRegex
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@6.6.0/node_modules/@vercel/routing-utils/dist/append.js
var require_append = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var append_exports = {};
	__export(append_exports, { appendRoutesToPhase: () => appendRoutesToPhase });
	module.exports = __toCommonJS(append_exports);
	var import_index = require_dist();
	function appendRoutesToPhase({ routes: prevRoutes, newRoutes, phase }) {
		const routes = prevRoutes ? [...prevRoutes] : [];
		if (newRoutes === null || newRoutes.length === 0) return routes;
		let isInPhase = false;
		let insertIndex = -1;
		routes.forEach((r, i) => {
			if ((0, import_index.isHandler)(r)) {
				if (r.handle === phase) isInPhase = true;
				else if (isInPhase) {
					insertIndex = i;
					isInPhase = false;
				}
			}
		});
		if (isInPhase) routes.push(...newRoutes);
		else if (phase === null) {
			const lastPhase = routes.findIndex((r) => (0, import_index.isHandler)(r) && r.handle);
			if (lastPhase === -1) routes.push(...newRoutes);
			else routes.splice(lastPhase, 0, ...newRoutes);
		} else if (insertIndex > -1) routes.splice(insertIndex, 0, ...newRoutes);
		else {
			routes.push({ handle: phase });
			routes.push(...newRoutes);
		}
		return routes;
	}
	0 && (module.exports = { appendRoutesToPhase });
}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@6.6.0/node_modules/@vercel/routing-utils/dist/merge.js
var require_merge = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var merge_exports = {};
	__export(merge_exports, { mergeRoutes: () => mergeRoutes });
	module.exports = __toCommonJS(merge_exports);
	var import_index = require_dist();
	function getBuilderRoutesMapping(builds) {
		const builderRoutes = {};
		for (const { entrypoint, routes, use } of builds) if (routes) {
			if (!builderRoutes[entrypoint]) builderRoutes[entrypoint] = {};
			builderRoutes[entrypoint][use] = routes;
		}
		return builderRoutes;
	}
	function addToHandleMap(path, routesMapping, handleMap) {
		const br = routesMapping[path];
		Object.keys(br).sort().forEach((use) => {
			let prevHandle = null;
			br[use].forEach((route) => {
				if ((0, import_index.isHandler)(route)) prevHandle = route.handle;
				else {
					const routes = handleMap.get(prevHandle);
					if (!routes) handleMap.set(prevHandle, [route]);
					else routes.push(route);
				}
			});
		});
	}
	function getCheckAndContinue(routes) {
		const checks = [];
		const continues = [];
		const others = [];
		for (const route of routes) if ((0, import_index.isHandler)(route)) throw new Error(`Unexpected route found in getCheckAndContinue(): ${JSON.stringify(route)}`);
		else if (route.check && !route.override) checks.push(route);
		else if (route.continue && !route.override) continues.push(route);
		else others.push(route);
		return {
			checks,
			continues,
			others
		};
	}
	function mergeRoutes({ userRoutes, builds }) {
		const userHandleMap = /* @__PURE__ */ new Map();
		let userPrevHandle = null;
		(userRoutes || []).forEach((route) => {
			if ((0, import_index.isHandler)(route)) userPrevHandle = route.handle;
			else {
				const routes = userHandleMap.get(userPrevHandle);
				if (!routes) userHandleMap.set(userPrevHandle, [route]);
				else routes.push(route);
			}
		});
		const projectHandleMap = /* @__PURE__ */ new Map();
		const projectMiddlewareRoutes = getBuilderRoutesMapping(builds.filter((b) => b.projectMiddleware));
		Object.keys(projectMiddlewareRoutes).sort().forEach((path) => addToHandleMap(path, projectMiddlewareRoutes, projectHandleMap));
		const builderHandleMap = /* @__PURE__ */ new Map();
		const builderRoutes = getBuilderRoutesMapping(builds.filter((b) => !b.projectMiddleware));
		Object.keys(builderRoutes).sort().forEach((path) => addToHandleMap(path, builderRoutes, builderHandleMap));
		const outputRoutes = [];
		const uniqueHandleValues = /* @__PURE__ */ new Set([
			null,
			...userHandleMap.keys(),
			...projectHandleMap.keys(),
			...builderHandleMap.keys()
		]);
		for (const handle of uniqueHandleValues) {
			const userRoutes2 = userHandleMap.get(handle) || [];
			const projectRoutes = projectHandleMap.get(handle) || [];
			const builderRoutes2 = builderHandleMap.get(handle) || [];
			const builderSorted = getCheckAndContinue(builderRoutes2);
			if (handle !== null && (userRoutes2.length > 0 || projectRoutes.length > 0 || builderRoutes2.length > 0)) outputRoutes.push({ handle });
			outputRoutes.push(...builderSorted.continues);
			outputRoutes.push(...userRoutes2);
			outputRoutes.push(...projectRoutes);
			outputRoutes.push(...builderSorted.checks);
			outputRoutes.push(...builderSorted.others);
		}
		return outputRoutes;
	}
	0 && (module.exports = { mergeRoutes });
}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@6.6.0/node_modules/@vercel/routing-utils/dist/service-route-ownership.js
var require_service_route_ownership = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var service_route_ownership_exports = {};
	__export(service_route_ownership_exports, {
		getOwnershipGuard: () => getOwnershipGuard,
		normalizeRoutePrefix: () => normalizeRoutePrefix,
		scopeRouteSourceToOwnership: () => scopeRouteSourceToOwnership
	});
	module.exports = __toCommonJS(service_route_ownership_exports);
	function normalizeRoutePrefix(routePrefix) {
		let normalized = routePrefix.startsWith("/") ? routePrefix : `/${routePrefix}`;
		if (normalized !== "/" && normalized.endsWith("/")) normalized = normalized.slice(0, -1);
		return normalized || "/";
	}
	function escapeForRegex(value) {
		return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
	}
	function toPrefixMatcher(routePrefix) {
		return `${escapeForRegex(routePrefix)}(?:/|$)`;
	}
	function isDescendantPrefix(candidate, prefix) {
		return candidate !== prefix && candidate.startsWith(`${prefix}/`);
	}
	function getOwnershipGuard(ownerPrefix, allRoutePrefixes) {
		const owner = normalizeRoutePrefix(ownerPrefix);
		const nonRootPrefixes = Array.from(new Set(allRoutePrefixes.map(normalizeRoutePrefix))).filter((prefix) => prefix !== "/").sort((a, b) => b.length - a.length);
		if (owner === "/") return nonRootPrefixes.map((prefix) => `(?!${toPrefixMatcher(prefix)})`).join("");
		const descendants = nonRootPrefixes.filter((prefix) => isDescendantPrefix(prefix, owner));
		return `${`(?=${toPrefixMatcher(owner)})`}${descendants.map((prefix) => `(?!${toPrefixMatcher(prefix)})`).join("")}`;
	}
	function scopeRouteSourceToOwnership(source, ownershipGuard) {
		if (!ownershipGuard) return source;
		return `^${ownershipGuard}(?:${source.startsWith("^") ? source.slice(1) : source})`;
	}
	0 && (module.exports = {
		getOwnershipGuard,
		normalizeRoutePrefix,
		scopeRouteSourceToOwnership
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@6.6.0/node_modules/@vercel/routing-utils/dist/schemas.js
var require_schemas = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var schemas_exports = {};
	__export(schemas_exports, {
		cleanUrlsSchema: () => cleanUrlsSchema,
		hasSchema: () => hasSchema,
		headersSchema: () => headersSchema,
		redirectsSchema: () => redirectsSchema,
		rewritesSchema: () => rewritesSchema,
		routesSchema: () => routesSchema,
		trailingSlashSchema: () => trailingSlashSchema,
		transformsSchema: () => transformsSchema
	});
	module.exports = __toCommonJS(schemas_exports);
	var mitigateSchema = {
		description: "Mitigation action to take on a route",
		type: "object",
		additionalProperties: false,
		required: ["action"],
		properties: { action: {
			description: "The mitigation action to take",
			type: "string",
			enum: ["challenge", "deny"]
		} }
	};
	var serviceDestinationSchema = {
		description: "A service-targeted destination that delegates routing into a named service from `services`. Identified by the presence of `service`.",
		type: "object",
		additionalProperties: false,
		required: ["service"],
		properties: {
			type: {
				description: "Optional explicit format marker. The destination shape is identified by the `service` property, so `type` is no longer required. When present it must be `service`.",
				type: "string",
				enum: ["service"]
			},
			service: {
				description: "A service name identifier.",
				type: "string",
				minLength: 1,
				maxLength: 64,
				pattern: "^[a-zA-Z]([a-zA-Z0-9_-]*[a-zA-Z0-9])?$"
			},
			path: {
				description: "Routing-only path used to select a route inside the target service. It does not mutate the URL observed by user code.",
				type: "string",
				maxLength: 4096
			}
		}
	};
	var matchableValueSchema = {
		description: "A value to match against. Can be a string (regex) or a condition operation object",
		anyOf: [{
			description: "A regular expression used to match thev value. Named groups can be used in the destination.",
			type: "string",
			maxLength: 4096
		}, {
			description: "A condition operation object",
			type: "object",
			additionalProperties: false,
			minProperties: 1,
			properties: {
				eq: {
					description: "Equal to",
					anyOf: [{
						type: "string",
						maxLength: 4096
					}, { type: "number" }]
				},
				neq: {
					description: "Not equal",
					type: "string",
					maxLength: 4096
				},
				inc: {
					description: "In array",
					type: "array",
					items: {
						type: "string",
						maxLength: 4096
					}
				},
				ninc: {
					description: "Not in array",
					type: "array",
					items: {
						type: "string",
						maxLength: 4096
					}
				},
				pre: {
					description: "Starts with",
					type: "string",
					maxLength: 4096
				},
				suf: {
					description: "Ends with",
					type: "string",
					maxLength: 4096
				},
				re: {
					description: "Regex",
					type: "string",
					maxLength: 4096
				},
				gt: {
					description: "Greater than",
					type: "number"
				},
				gte: {
					description: "Greater than or equal to",
					type: "number"
				},
				lt: {
					description: "Less than",
					type: "number"
				},
				lte: {
					description: "Less than or equal to",
					type: "number"
				}
			}
		}]
	};
	var hasSchema = {
		description: "An array of requirements that are needed to match",
		type: "array",
		maxItems: 16,
		items: { anyOf: [{
			type: "object",
			additionalProperties: false,
			required: ["type", "value"],
			properties: {
				type: {
					description: "The type of request element to check",
					type: "string",
					enum: ["host"]
				},
				value: matchableValueSchema
			}
		}, {
			type: "object",
			additionalProperties: false,
			required: ["type", "key"],
			properties: {
				type: {
					description: "The type of request element to check",
					type: "string",
					enum: [
						"header",
						"cookie",
						"query"
					]
				},
				key: {
					description: "The name of the element contained in the particular type",
					type: "string",
					maxLength: 4096
				},
				value: matchableValueSchema
			}
		}] }
	};
	var transformsSchema = {
		description: "A list of transform rules to adjust a request path, request query parameters, or request/response headers",
		type: "array",
		minItems: 1,
		items: {
			type: "object",
			additionalProperties: false,
			required: ["type", "op"],
			properties: {
				type: {
					description: "The scope of the transform to apply",
					type: "string",
					enum: [
						"request.headers",
						"request.query",
						"response.headers",
						"request.path"
					]
				},
				op: {
					description: "The operation to perform on the target",
					type: "string",
					enum: [
						"append",
						"set",
						"delete"
					]
				},
				target: {
					description: "The target of the transform",
					type: "object",
					required: ["key"],
					properties: { key: {
						description: "A value to match against. Can be a string or a condition operation object (without regex support)",
						anyOf: [{
							description: "A valid header name (letters, numbers, hyphens, underscores)",
							type: "string",
							maxLength: 4096
						}, {
							description: "A condition operation object",
							type: "object",
							additionalProperties: false,
							minProperties: 1,
							properties: {
								eq: {
									description: "Equal to",
									anyOf: [{
										type: "string",
										maxLength: 4096
									}, { type: "number" }]
								},
								neq: {
									description: "Not equal",
									type: "string",
									maxLength: 4096
								},
								inc: {
									description: "In array",
									type: "array",
									items: {
										type: "string",
										maxLength: 4096
									}
								},
								ninc: {
									description: "Not in array",
									type: "array",
									items: {
										type: "string",
										maxLength: 4096
									}
								},
								pre: {
									description: "Starts with",
									type: "string",
									maxLength: 4096
								},
								suf: {
									description: "Ends with",
									type: "string",
									maxLength: 4096
								},
								gt: {
									description: "Greater than",
									type: "number"
								},
								gte: {
									description: "Greater than or equal to",
									type: "number"
								},
								lt: {
									description: "Less than",
									type: "number"
								},
								lte: {
									description: "Less than or equal to",
									type: "number"
								}
							}
						}]
					} }
				},
				args: {
					description: "The arguments to the operation",
					anyOf: [{
						type: "string",
						maxLength: 4096
					}, {
						type: "array",
						minItems: 1,
						items: {
							type: "string",
							maxLength: 4096
						}
					}]
				},
				env: {
					description: "An array of environment variable names that should be replaced at runtime in the args value",
					type: "array",
					minItems: 1,
					maxItems: 64,
					items: {
						type: "string",
						maxLength: 256
					}
				}
			},
			allOf: [
				{
					if: { properties: { op: { enum: ["append", "set"] } } },
					then: { required: ["args"] }
				},
				{
					if: { allOf: [{ properties: { type: { enum: ["request.headers", "response.headers"] } } }, { properties: { op: { enum: ["set", "append"] } } }] },
					then: { properties: {
						target: { properties: { key: {
							if: { type: "string" },
							then: { pattern: "^[a-zA-Z0-9_-]+$" }
						} } },
						args: { anyOf: [{
							type: "string",
							pattern: "^[a-zA-Z0-9_ :;.,\"'?!(){}\\[\\]@<>=+*#$&`|~\\^%/-]+$"
						}, {
							type: "array",
							items: {
								type: "string",
								pattern: "^[a-zA-Z0-9_ :;.,\"'?!(){}\\[\\]@<>=+*#$&`|~\\^%/-]+$"
							}
						}] }
					} }
				},
				{
					if: {
						required: ["type"],
						properties: { type: { enum: [
							"request.headers",
							"request.query",
							"response.headers"
						] } }
					},
					then: { required: ["target"] }
				},
				{
					if: {
						required: ["type"],
						properties: { type: { enum: ["request.path"] } }
					},
					then: {
						required: ["args"],
						not: { required: ["target"] },
						properties: {
							op: { enum: ["set"] },
							args: {
								description: "The runtime-visible request path. Must be an origin-form path without query or fragment.",
								type: "string",
								maxLength: 2048,
								pattern: "^/(?!/)(?!.*[?#\\s\\x00-\\x1F\\x7F]).*$"
							}
						}
					}
				}
			]
		}
	};
	var rewriteTransformsSchema = {
		description: "A list of request path transforms using path-to-regexp parameters.",
		type: "array",
		minItems: 1,
		items: {
			type: "object",
			additionalProperties: false,
			required: [
				"type",
				"op",
				"args"
			],
			properties: {
				type: {
					description: "The request path to expose to the target runtime",
					type: "string",
					enum: ["request.path"]
				},
				op: {
					description: "Replace the runtime-visible request path",
					type: "string",
					enum: ["set"]
				},
				args: {
					description: "An origin-form request path. Route parameters use path-to-regexp syntax such as `/:path*`.",
					type: "string",
					maxLength: 2048,
					pattern: "^/(?!/)(?!.*[?#\\s\\x00-\\x1F\\x7F]).*$"
				},
				env: {
					description: "An array of environment variable names that should be replaced at runtime in the args value",
					type: "array",
					minItems: 1,
					maxItems: 64,
					items: {
						type: "string",
						maxLength: 256
					}
				}
			}
		}
	};
	var routesSchema = {
		type: "array",
		description: "A list of routes objects used to rewrite paths to point towards other internal or external paths",
		example: [{
			dest: "https://docs.example.com",
			src: "/docs"
		}],
		items: { anyOf: [{
			type: "object",
			anyOf: [{ required: ["src"] }, { required: ["source"] }],
			additionalProperties: false,
			properties: {
				src: {
					type: "string",
					maxLength: 4096
				},
				source: {
					type: "string",
					maxLength: 4096
				},
				dest: {
					type: "string",
					maxLength: 4096
				},
				destination: { anyOf: [{
					type: "string",
					maxLength: 4096
				}, serviceDestinationSchema] },
				headers: {
					type: "object",
					additionalProperties: false,
					minProperties: 1,
					maxProperties: 100,
					patternProperties: { "^.{1,256}$": {
						type: "string",
						maxLength: 32768
					} }
				},
				methods: {
					type: "array",
					maxItems: 10,
					items: {
						type: "string",
						maxLength: 32
					}
				},
				caseSensitive: { type: "boolean" },
				important: {
					deprecated: true,
					type: "boolean"
				},
				user: { type: "boolean" },
				continue: { type: "boolean" },
				override: {
					deprecated: true,
					type: "boolean"
				},
				check: { type: "boolean" },
				isInternal: { type: "boolean" },
				status: {
					type: "integer",
					minimum: 100,
					maximum: 999
				},
				statusCode: {
					type: "integer",
					minimum: 100,
					maximum: 999
				},
				locale: {
					type: "object",
					additionalProperties: false,
					minProperties: 1,
					properties: {
						redirect: {
							type: "object",
							additionalProperties: false,
							minProperties: 1,
							maxProperties: 100,
							patternProperties: { "^.{1,256}$": {
								type: "string",
								maxLength: 4096
							} }
						},
						value: {
							type: "string",
							maxLength: 4096
						},
						path: {
							type: "string",
							maxLength: 4096
						},
						cookie: {
							type: "string",
							maxLength: 4096
						},
						default: {
							type: "string",
							maxLength: 4096
						}
					}
				},
				middleware: { type: "number" },
				middlewarePath: { type: "string" },
				middlewareRawSrc: {
					type: "array",
					items: { type: "string" }
				},
				has: hasSchema,
				missing: hasSchema,
				mitigate: mitigateSchema,
				transforms: transformsSchema,
				env: {
					description: "An array of environment variable names that should be replaced at runtime in the destination or headers",
					type: "array",
					minItems: 1,
					maxItems: 64,
					items: {
						type: "string",
						maxLength: 256
					}
				},
				respectOriginCacheControl: {
					description: "When set to true (default), external rewrites will respect the Cache-Control header from the origin. When false, caching is disabled for this rewrite.",
					type: "boolean"
				}
			}
		}, {
			type: "object",
			deprecated: true,
			required: ["handle"],
			additionalProperties: false,
			properties: { handle: {
				type: "string",
				maxLength: 32,
				enum: [
					"error",
					"filesystem",
					"hit",
					"miss",
					"resource",
					"rewrite"
				]
			} }
		}] }
	};
	var rewritesSchema = {
		type: "array",
		maxItems: 2048,
		description: "A list of rewrite definitions.",
		items: {
			type: "object",
			additionalProperties: false,
			required: ["source", "destination"],
			properties: {
				source: {
					description: "A pattern that matches each incoming pathname (excluding querystring).",
					type: "string",
					maxLength: 4096
				},
				destination: {
					description: "An absolute pathname to an existing resource, an external URL, or a service-targeted destination object.",
					anyOf: [{
						type: "string",
						maxLength: 4096
					}, serviceDestinationSchema]
				},
				transforms: rewriteTransformsSchema,
				has: hasSchema,
				missing: hasSchema,
				statusCode: {
					description: "An optional integer to override the status code of the response.",
					type: "integer",
					minimum: 100,
					maximum: 999
				},
				env: {
					description: "An array of environment variable names that should be replaced at runtime in the destination",
					type: "array",
					minItems: 1,
					maxItems: 64,
					items: {
						type: "string",
						maxLength: 256
					}
				},
				respectOriginCacheControl: {
					description: "When set to true (default), external rewrites will respect the Cache-Control header from the origin. When false, caching is disabled for this rewrite.",
					type: "boolean"
				}
			}
		}
	};
	var redirectsSchema = {
		title: "Redirects",
		type: "array",
		maxItems: 2048,
		description: "A list of redirect definitions.",
		items: {
			type: "object",
			additionalProperties: false,
			required: ["source", "destination"],
			properties: {
				source: {
					description: "A pattern that matches each incoming pathname (excluding querystring) or a full URL including domain.",
					type: "string",
					maxLength: 4096
				},
				destination: {
					description: "A location destination defined as an absolute pathname or external URL.",
					type: "string",
					maxLength: 4096
				},
				permanent: {
					description: "A boolean to toggle between permanent and temporary redirect. When `true`, the status code is `308`. When `false` the status code is `307`.",
					type: "boolean"
				},
				statusCode: {
					description: "An optional integer to define the status code of the redirect.",
					private: true,
					type: "integer",
					minimum: 100,
					maximum: 999
				},
				has: hasSchema,
				missing: hasSchema,
				env: {
					description: "An array of environment variable names that should be replaced at runtime in the destination",
					type: "array",
					minItems: 1,
					maxItems: 64,
					items: {
						type: "string",
						maxLength: 256
					}
				}
			}
		}
	};
	var headersSchema = {
		type: "array",
		maxItems: 2048,
		description: "A list of header definitions.",
		items: {
			type: "object",
			additionalProperties: false,
			required: ["source", "headers"],
			properties: {
				source: {
					description: "A pattern that matches each incoming pathname (excluding querystring)",
					type: "string",
					maxLength: 4096
				},
				headers: {
					description: "An array of key/value pairs representing each response header.",
					type: "array",
					maxItems: 1024,
					items: {
						type: "object",
						additionalProperties: false,
						required: ["key", "value"],
						properties: {
							key: {
								type: "string",
								maxLength: 4096
							},
							value: {
								type: "string",
								maxLength: 32768
							}
						}
					}
				},
				has: hasSchema,
				missing: hasSchema
			}
		}
	};
	var cleanUrlsSchema = {
		description: "When set to `true`, all HTML files and Serverless Functions will have their extension removed. When visiting a path that ends with the extension, a 308 response will redirect the client to the extensionless path.",
		type: "boolean"
	};
	var trailingSlashSchema = {
		description: "When `false`, visiting a path that ends with a forward slash will respond with a `308` status code and redirect to the path without the trailing slash.",
		type: "boolean"
	};
	0 && (module.exports = {
		cleanUrlsSchema,
		hasSchema,
		headersSchema,
		redirectsSchema,
		rewritesSchema,
		routesSchema,
		trailingSlashSchema,
		transformsSchema
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@6.6.0/node_modules/@vercel/routing-utils/dist/types.js
var require_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	module.exports = __toCommonJS({});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@6.6.0/node_modules/@vercel/routing-utils/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var src_exports = {};
	__export(src_exports, {
		appendRoutesToPhase: () => import_append.appendRoutesToPhase,
		compilePathToRegexpTemplate: () => import_superstatic2.compilePathToRegexpTemplate,
		convertRewrites: () => import_superstatic2.convertRewrites,
		getCleanUrls: () => import_superstatic2.getCleanUrls,
		getOwnershipGuard: () => import_service_route_ownership.getOwnershipGuard,
		getTransformedRoutes: () => getTransformedRoutes,
		isHandler: () => isHandler,
		isValidHandleValue: () => isValidHandleValue,
		mergeRoutes: () => import_merge.mergeRoutes,
		normalizeRoutePrefix: () => import_service_route_ownership.normalizeRoutePrefix,
		normalizeRoutes: () => normalizeRoutes,
		pathToRegexp: () => import_superstatic2.pathToRegexp,
		scopeRouteSourceToOwnership: () => import_service_route_ownership.scopeRouteSourceToOwnership,
		sourceToRegex: () => import_superstatic2.sourceToRegex
	});
	module.exports = __toCommonJS(src_exports);
	var import_url = __require("url");
	var import_superstatic = require_superstatic();
	var import_append = require_append();
	var import_merge = require_merge();
	var import_service_route_ownership = require_service_route_ownership();
	__reExport(src_exports, require_schemas(), module.exports);
	var import_superstatic2 = require_superstatic();
	__reExport(src_exports, require_types(), module.exports);
	var validHandleValues = /* @__PURE__ */ new Set([
		"filesystem",
		"hit",
		"miss",
		"rewrite",
		"error",
		"resource"
	]);
	function isHandler(route) {
		return typeof route.handle !== "undefined";
	}
	function isValidHandleValue(handle) {
		return validHandleValues.has(handle);
	}
	function convertRouteAliases(route, index) {
		if (route.source !== void 0) {
			if (route.src !== void 0) throw new Error(`Route at index ${index} cannot define both \`src\` and \`source\`. Please use only one.`);
			route.src = route.source;
			delete route.source;
		}
		if (route.destination !== void 0) {
			if (route.dest !== void 0) throw new Error(`Route at index ${index} cannot define both \`dest\` and \`destination\`. Please use only one.`);
			if (typeof route.destination === "string") {
				route.dest = route.destination;
				delete route.destination;
			} else if (typeof route.destination.service === "string") route.destination = {
				...route.destination,
				type: "service"
			};
		}
		if (route.statusCode !== void 0) {
			if (route.status !== void 0) throw new Error(`Route at index ${index} cannot define both \`status\` and \`statusCode\`. Please use only one.`);
			route.status = route.statusCode;
			delete route.statusCode;
		}
	}
	function normalizeRoutes(inputRoutes) {
		if (!inputRoutes || inputRoutes.length === 0) return {
			routes: inputRoutes,
			error: null
		};
		const routes = [];
		const handling = [];
		const errors = [];
		inputRoutes.forEach((r, i) => {
			const route = { ...r };
			routes.push(route);
			if (!isHandler(route)) try {
				convertRouteAliases(route, i);
			} catch (err) {
				errors.push(err.message);
			}
			const keys = Object.keys(route);
			if (isHandler(route)) {
				const { handle } = route;
				if (keys.length !== 1) {
					const unknownProp = keys.find((prop) => prop !== "handle");
					errors.push(`Route at index ${i} has unknown property \`${unknownProp}\`.`);
				} else if (!isValidHandleValue(handle)) errors.push(`Route at index ${i} has unknown handle value \`handle: ${handle}\`.`);
				else if (handling.includes(handle)) errors.push(`Route at index ${i} is a duplicate. Please use one \`handle: ${handle}\` at most.`);
				else handling.push(handle);
			} else if (route.src) {
				if (!route.src.startsWith("^")) route.src = `^${route.src}`;
				if (!route.src.endsWith("$")) route.src = `${route.src}$`;
				route.src = route.src.replace(/\\\//g, "/");
				const regError = checkRegexSyntax("Route", i, route.src);
				if (regError) errors.push(regError);
				if (route.destination && typeof route.destination === "object" && route.continue) errors.push(`Route at index ${i} cannot define \`continue: true\` with a service \`destination\`. The service handoff is terminal.`);
				const handleValue = handling[handling.length - 1];
				if (handleValue === "hit") {
					if (route.dest) errors.push(`Route at index ${i} cannot define \`dest\`/\`destination\` after \`handle: hit\`.`);
					if (route.status) errors.push(`Route at index ${i} cannot define \`status\`/\`statusCode\` after \`handle: hit\`.`);
					if (!route.continue) errors.push(`Route at index ${i} must define \`continue: true\` after \`handle: hit\`.`);
				} else if (handleValue === "miss") {
					if (route.dest && !route.check) errors.push(`Route at index ${i} must define \`check: true\` after \`handle: miss\`.`);
					else if (!route.dest && !route.continue) errors.push(`Route at index ${i} must define \`continue: true\` after \`handle: miss\`.`);
				}
			} else errors.push(`Route at index ${i} must define either \`src\` or \`source\` property.`);
		});
		return {
			routes,
			error: errors.length > 0 ? createError("invalid_route", errors, "https://vercel.link/routes-json", "Learn More") : null
		};
	}
	function checkRegexSyntax(type, index, src) {
		try {
			new RegExp(src);
		} catch (_err) {
			return `${type} at index ${index} has invalid \`${type === "Route" ? "src`/`source" : "source"}\` regular expression "${src}".`;
		}
		return null;
	}
	function checkPatternSyntax(type, index, { source, destination, has, transforms }) {
		let sourceSegments = /* @__PURE__ */ new Set();
		const destinationSegments = /* @__PURE__ */ new Set();
		try {
			sourceSegments = new Set((0, import_superstatic.sourceToRegex)(source).segments);
		} catch (_err) {
			return {
				message: `${type} at index ${index} has invalid \`source\` pattern "${source}".`,
				link: "https://vercel.link/invalid-route-source-pattern"
			};
		}
		const destinationString = typeof destination === "string" ? destination : typeof destination?.path === "string" ? destination.path : void 0;
		if (destinationString !== void 0) {
			try {
				const { hostname, pathname, query } = (0, import_url.parse)(destinationString, true);
				(0, import_superstatic.sourceToRegex)(hostname || "").segments.forEach((name) => destinationSegments.add(name));
				(0, import_superstatic.sourceToRegex)(pathname || "").segments.forEach((name) => destinationSegments.add(name));
				for (const strOrArray of Object.values(query)) {
					const value = Array.isArray(strOrArray) ? strOrArray[0] : strOrArray;
					(0, import_superstatic.sourceToRegex)(value || "").segments.forEach((name) => destinationSegments.add(name));
				}
			} catch (_err) {}
			const hasSegments = (0, import_superstatic.collectHasSegments)(has);
			for (const segment of destinationSegments) if (!sourceSegments.has(segment) && !hasSegments.includes(segment)) return {
				message: `${type} at index ${index} has segment ":${segment}" in \`destination\` property but not in \`source\` or \`has\` property.`,
				link: "https://vercel.link/invalid-route-destination-segment"
			};
		}
		for (const transform of transforms || []) {
			if (transform.type !== "request.path") continue;
			try {
				(0, import_superstatic.compilePathToRegexpTemplate)(source, transform.args, has, transform.env);
			} catch (error) {
				return {
					message: `${type} at index ${index} has an invalid \`request.path\` transform: ${error instanceof Error ? error.message : String(error)}`,
					link: "https://vercel.link/invalid-route-destination-segment"
				};
			}
		}
		return null;
	}
	function checkRedirect(r, index) {
		if (typeof r.permanent !== "undefined" && typeof r.statusCode !== "undefined") return `Redirect at index ${index} cannot define both \`permanent\` and \`statusCode\` properties.`;
		return null;
	}
	function createError(code, allErrors, link, action) {
		const errors = Array.isArray(allErrors) ? allErrors : [allErrors];
		return {
			name: "RouteApiError",
			code,
			message: errors[0],
			link,
			action,
			errors
		};
	}
	function notEmpty(value) {
		return value !== null && value !== void 0;
	}
	function getTransformedRoutes(vercelConfig) {
		const { cleanUrls, rewrites, redirects, headers, trailingSlash } = vercelConfig;
		const { routes: userRoutes = null } = vercelConfig;
		let routes = null;
		if (typeof cleanUrls !== "undefined") {
			const normalized = normalizeRoutes((0, import_superstatic.convertCleanUrls)(cleanUrls, trailingSlash));
			if (normalized.error) {
				normalized.error.code = "invalid_clean_urls";
				return {
					routes,
					error: normalized.error
				};
			}
			routes = routes || [];
			routes.push(...normalized.routes || []);
		}
		if (typeof trailingSlash !== "undefined") {
			const normalized = normalizeRoutes((0, import_superstatic.convertTrailingSlash)(trailingSlash));
			if (normalized.error) {
				normalized.error.code = "invalid_trailing_slash";
				return {
					routes,
					error: normalized.error
				};
			}
			routes = routes || [];
			routes.push(...normalized.routes || []);
		}
		if (userRoutes) {
			const normalized = normalizeRoutes(userRoutes);
			if (normalized.error) return {
				routes,
				error: normalized.error
			};
			routes = routes || [];
			routes.push(...normalized.routes || []);
		}
		if (typeof redirects !== "undefined") {
			const code = "invalid_redirect";
			const regexErrorMessage = redirects.map((r, i) => checkRegexSyntax("Redirect", i, r.source)).find(notEmpty);
			if (regexErrorMessage) return {
				routes,
				error: createError("invalid_redirect", regexErrorMessage, "https://vercel.link/invalid-route-source-pattern", "Learn More")
			};
			const patternError = redirects.map((r, i) => checkPatternSyntax("Redirect", i, r)).find(notEmpty);
			if (patternError) return {
				routes,
				error: createError(code, patternError.message, patternError.link, "Learn More")
			};
			const redirectErrorMessage = redirects.map(checkRedirect).find(notEmpty);
			if (redirectErrorMessage) return {
				routes,
				error: createError(code, redirectErrorMessage, "https://vercel.link/redirects-json", "Learn More")
			};
			const normalized = normalizeRoutes((0, import_superstatic.convertRedirects)(redirects));
			if (normalized.error) {
				normalized.error.code = code;
				return {
					routes,
					error: normalized.error
				};
			}
			routes = routes || [];
			routes.push(...normalized.routes || []);
		}
		if (typeof headers !== "undefined") {
			const code = "invalid_header";
			const regexErrorMessage = headers.map((r, i) => checkRegexSyntax("Header", i, r.source)).find(notEmpty);
			if (regexErrorMessage) return {
				routes,
				error: createError(code, regexErrorMessage, "https://vercel.link/invalid-route-source-pattern", "Learn More")
			};
			const patternError = headers.map((r, i) => checkPatternSyntax("Header", i, r)).find(notEmpty);
			if (patternError) return {
				routes,
				error: createError(code, patternError.message, patternError.link, "Learn More")
			};
			const normalized = normalizeRoutes((0, import_superstatic.convertHeaders)(headers));
			if (normalized.error) {
				normalized.error.code = code;
				return {
					routes,
					error: normalized.error
				};
			}
			routes = routes || [];
			routes.push(...normalized.routes || []);
		}
		if (typeof rewrites !== "undefined") {
			const code = "invalid_rewrite";
			const regexErrorMessage = rewrites.map((r, i) => checkRegexSyntax("Rewrite", i, r.source)).find(notEmpty);
			if (regexErrorMessage) return {
				routes,
				error: createError(code, regexErrorMessage, "https://vercel.link/invalid-route-source-pattern", "Learn More")
			};
			const patternError = rewrites.map((r, i) => checkPatternSyntax("Rewrite", i, r)).find(notEmpty);
			if (patternError) return {
				routes,
				error: createError(code, patternError.message, patternError.link, "Learn More")
			};
			const normalized = normalizeRoutes((0, import_superstatic.convertRewrites)(rewrites));
			if (normalized.error) {
				normalized.error.code = code;
				return {
					routes,
					error: normalized.error
				};
			}
			routes = routes || [];
			routes.push({ handle: "filesystem" });
			routes.push(...normalized.routes || []);
		}
		return {
			routes,
			error: null
		};
	}
	0 && (module.exports = {
		appendRoutesToPhase,
		compilePathToRegexpTemplate,
		convertRewrites,
		getCleanUrls,
		getOwnershipGuard,
		getTransformedRoutes,
		isHandler,
		isValidHandleValue,
		mergeRoutes,
		normalizeRoutePrefix,
		normalizeRoutes,
		pathToRegexp,
		scopeRouteSourceToOwnership,
		sourceToRegex,
		...require_schemas(),
		...require_types()
	});
}));
require_dist();
nodePath.posix.join;
//#endregion
//#region node_modules/.pnpm/@astrojs+vercel@11.0.10_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1__99f5a78ca2b4a23786628669104a9165/node_modules/@astrojs/vercel/dist/index.js
var ASTRO_PATH_HEADER = "x-astro-path";
var ASTRO_PATH_PARAM = "x_astro_path";
var ASTRO_PATH_TOKEN_PARAM = "x_astro_path_token";
var ASTRO_LOCALS_HEADER = "x-astro-locals";
var ASTRO_MIDDLEWARE_SECRET_HEADER = "x-astro-middleware-secret";
//#endregion
//#region \0virtual:astro-vercel:config
var middlewareSecret = "26d31c33-4de0-4388-ae1d-169b6a0d6eca";
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/app/manifest.js
function deserializeManifest(serializedManifest, routesList) {
	const routes = [];
	if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) {
		routes.push({
			...serializedRoute,
			routeData: deserializeRouteData(serializedRoute.routeData)
		});
		const route = serializedRoute;
		route.routeData = deserializeRouteData(serializedRoute.routeData);
	}
	if (routesList) for (const route of routesList?.routes) routes.push({
		file: "",
		links: [],
		scripts: [],
		styles: [],
		routeData: route
	});
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const key = decodeKey(serializedManifest.key);
	return {
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		rootDir: new URL(serializedManifest.rootDir),
		srcDir: new URL(serializedManifest.srcDir),
		publicDir: new URL(serializedManifest.publicDir),
		outDir: new URL(serializedManifest.outDir),
		cacheDir: new URL(serializedManifest.cacheDir),
		buildClientDir: new URL(serializedManifest.buildClientDir),
		buildServerDir: new URL(serializedManifest.buildServerDir),
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		key
	};
}
function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
		distURL: rawRouteData.distURL
	};
}
function deserializeRouteInfo(rawRouteInfo) {
	return {
		styles: rawRouteInfo.styles,
		file: rawRouteInfo.file,
		links: rawRouteInfo.links,
		scripts: rawRouteInfo.scripts,
		routeData: deserializeRouteData(rawRouteInfo.routeData)
	};
}
//#endregion
//#region \0virtual:astro:renderers
var renderers = [];
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/actions/handler.js
function handleAction(apiContext, state) {
	markFeatureUsed(state.manifest, FetchFeatures.actions);
	if (apiContext.isPrerendered) return;
	const { action, setActionResult } = getActionContext(apiContext);
	if (!action) return;
	if (state.manifest.checkOrigin && isForbiddenCrossOriginRequest(apiContext.request, apiContext.url, apiContext.isPrerendered)) return Promise.resolve(createCrossOriginForbiddenResponse(apiContext.request));
	return executeAction(action, setActionResult);
}
async function executeAction(action, setActionResult) {
	const actionResult = await action.handler();
	const serialized = serializeActionResult(actionResult);
	if (action.calledFrom === "rpc") {
		if (serialized.type === "empty") return new Response(null, { status: serialized.status });
		return new Response(serialized.body, {
			status: serialized.status,
			headers: { "Content-Type": serialized.contentType }
		});
	}
	setActionResult(action.name, serialized);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/routing/3xx.js
function redirectTemplate({ status, absoluteLocation, relativeLocation, from }) {
	const delay = status === 302 ? 2 : 0;
	const rel = escape(String(relativeLocation));
	return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(String(absoluteLocation))}">
<body>
	<a href="${rel}">Redirecting ${from ? `from <code>${escape(from)}</code> ` : ""}to <code>${rel}</code></a>
</body>`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/routing/trailing-slash-handler.js
function handleTrailingSlash(state) {
	const url = new URL(state.request.url);
	const redirect = redirectTrailingSlash(state.manifest.trailingSlash, url.pathname);
	if (redirect === url.pathname) return;
	const addCookieHeader = state.renderOptions.addCookieHeader;
	const status = state.request.method === "GET" ? 301 : 308;
	const response = new Response(redirectTemplate({
		status,
		relativeLocation: url.pathname,
		absoluteLocation: redirect,
		from: state.request.url
	}), {
		status,
		headers: { location: redirect + url.search }
	});
	prepareResponse(response, { addCookieHeader });
	return response;
}
function redirectTrailingSlash(trailingSlash, pathname) {
	if (pathname === "/" || isInternalPath(pathname)) return pathname;
	const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
	if (path !== pathname) return path;
	if (trailingSlash === "ignore") return pathname;
	if (trailingSlash === "always" && !hasFileExtension(pathname)) return appendForwardSlash(pathname);
	if (trailingSlash === "never") return removeTrailingForwardSlash(pathname);
	return pathname;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/cache/provider.js
var cacheProviderMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.cacheProvider) {
		const factory = (await manifest.cacheProvider())?.default || null;
		return factory ? factory(manifest.cacheConfig?.options) : null;
	}
	return null;
});
function getCacheProvider(manifest) {
	return cacheProviderMemo.get(manifest);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/cache/runtime/utils.js
function defaultSetHeaders(options) {
	const headers = new Headers();
	const directives = [];
	if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
	if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
	if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
	if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
	if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
	if (options.etag) headers.set("ETag", options.etag);
	return headers;
}
function isLiveDataEntry(value) {
	return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/cache/runtime/cache.js
var APPLY_HEADERS = /* @__PURE__ */ Symbol.for("astro:cache:apply");
var IS_ACTIVE = /* @__PURE__ */ Symbol.for("astro:cache:active");
var AstroCache = class {
	#options = {};
	#tags = /* @__PURE__ */ new Set();
	#disabled = false;
	#provider;
	enabled = true;
	constructor(provider) {
		this.#provider = provider;
	}
	set(input) {
		if (input === false) {
			this.#disabled = true;
			this.#tags.clear();
			this.#options = {};
			return;
		}
		this.#disabled = false;
		let options;
		if (isLiveDataEntry(input)) {
			if (!input.cacheHint) return;
			options = input.cacheHint;
		} else options = input;
		if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
		if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
		if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
		if (options.lastModified !== void 0) {
			if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
		}
		if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
	}
	get tags() {
		return [...this.#tags];
	}
	/**
	* Get the current cache options (read-only snapshot).
	* Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
	*/
	get options() {
		return {
			...this.#options,
			tags: this.tags
		};
	}
	async invalidate(input) {
		if (!this.#provider) throw new AstroError(CacheNotEnabled);
		let options;
		if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
		else options = input;
		return this.#provider.invalidate(options);
	}
	/** @internal */
	[APPLY_HEADERS](response, request) {
		if (this.#disabled) return;
		const finalOptions = {
			...this.#options,
			tags: this.tags
		};
		if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
		const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
		for (const [key, value] of headers) response.headers.set(key, value);
	}
	/** @internal */
	get [IS_ACTIVE]() {
		return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
	}
};
function applyCacheHeaders(cache, response, request) {
	if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/cache/runtime/route-matching.js
function compileCacheRoutes(routes, base, trailingSlash) {
	const compiled = Object.entries(routes).map(([path, options]) => {
		const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
		return {
			pattern: getPattern(segments, base, trailingSlash),
			options,
			segments,
			route: path
		};
	});
	compiled.sort((a, b) => routeComparator({
		segments: a.segments,
		route: a.route,
		type: "page"
	}, {
		segments: b.segments,
		route: b.route,
		type: "page"
	}));
	return compiled;
}
function matchCacheRoute(pathname, compiledRoutes) {
	for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
	return null;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/cache/handler.js
var CACHE_KEY = "cache";
function provideCache(state) {
	const manifest = state.manifest;
	if (!manifest.cacheConfig) {
		state.provide(CACHE_KEY, { create: () => new DisabledAstroCache(state.logger) });
		return;
	}
	if (getEnvironment(manifest).runtimeMode === "development") {
		state.provide(CACHE_KEY, { create: () => new NoopAstroCache() });
		return;
	}
	return provideCacheAsync(state, manifest);
}
async function provideCacheAsync(state, manifest) {
	const cacheProvider = await getCacheProvider(manifest);
	state.provide(CACHE_KEY, { create() {
		const cache = new AstroCache(cacheProvider);
		if (manifest.cacheConfig?.routes) {
			const matched = matchCacheRoute(state.pathname, getCompiledCacheRoutes(manifest));
			if (matched) cache.set(matched);
		}
		return cache;
	} });
}
async function handleCache(state, next) {
	markFeatureUsed(state.manifest, FetchFeatures.cache);
	if (!state.manifest.cacheProvider) return next();
	const cache = state.resolve(CACHE_KEY);
	const cacheProvider = await getCacheProvider(state.manifest);
	if (cacheProvider?.onRequest) {
		const response2 = await cacheProvider.onRequest({
			request: state.request,
			url: new URL(state.request.url),
			waitUntil: state.renderOptions.waitUntil
		}, async () => {
			const res = await next();
			applyCacheHeaders(cache, res, state.request);
			return res;
		});
		response2.headers.delete("CDN-Cache-Control");
		response2.headers.delete("Cache-Tag");
		return response2;
	}
	const response = await next();
	applyCacheHeaders(cache, response, state.request);
	return response;
}
var compiledCacheRoutesMemo = createManifestMemo((manifest) => manifest.cacheConfig?.routes ? compileCacheRoutes(manifest.cacheConfig.routes, manifest.base, manifest.trailingSlash) : []);
function getCompiledCacheRoutes(manifest) {
	return compiledCacheRoutesMemo.get(manifest);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/redirects/render.js
function isExternalURL(url) {
	return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
	if (typeof redirect === "string") return isExternalURL(redirect);
	else return isExternalURL(redirect.destination);
}
function computeRedirectStatus(method, redirect, redirectRoute) {
	return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
	if (typeof redirectRoute !== "undefined") return getRouteGenerator(redirectRoute.segments, trailingSlash)(params) || redirectRoute?.pathname || "/";
	else if (typeof redirect === "string") {
		if (redirectIsExternal(redirect)) return redirect;
		else {
			let target = redirect;
			for (const param of Object.keys(params)) {
				const paramValue = params[param];
				target = target.replace(`[${param}]`, paramValue).replace(`[...${param}]`, paramValue);
			}
			return target;
		}
	} else if (typeof redirect === "undefined") return "/";
	return redirect.destination;
}
async function renderRedirect(state) {
	markFeatureUsed(state.manifest, FetchFeatures.redirects);
	const { redirect, redirectRoute } = state.routeData;
	const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
	const headers = { location: encodeURI(resolveRedirectTarget(state.params, redirect, redirectRoute, state.manifest.trailingSlash)) };
	if (redirect && redirectIsExternal(redirect)) {
		if (typeof redirect === "string") return Response.redirect(redirect, status);
		else return Response.redirect(redirect.destination, status);
	}
	return new Response(null, {
		status,
		headers
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/routing/handler.js
function logRequestFromState(state, payload) {
	if (state.logRequest) state.logRequest(payload);
	else getEnvironment(state.manifest).logRequest(state.manifest, payload);
}
function actionsAndPages(state, ctx) {
	if (!state.skipMiddleware) {
		const actionResult = handleAction(ctx, state);
		if (actionResult) return actionResult.then((response) => response ?? handlePages(state, ctx));
	}
	return handlePages(state, ctx);
}
async function handleRequest(state) {
	await getResolvedLogger(state.manifest);
	markFeatureUsed(state.manifest, ALL_FETCH_FEATURES);
	if (state.invalidEncoding) return new Response(null, {
		status: 400,
		statusText: "Bad Request"
	});
	const trailingSlashRedirect = handleTrailingSlash(state);
	if (trailingSlashRedirect) return trailingSlashRedirect;
	if (!state.routeData) return renderErrorFromState(state, state.request, {
		...state.renderOptions,
		status: 404,
		pathname: state.pathname
	});
	return render(state);
}
async function render(state) {
	const routeData = state.routeData;
	const pathname = state.pathname;
	const request = state.request;
	const { addCookieHeader } = state.renderOptions;
	state.status = getDefaultStatusCode(state.manifest, routeData, pathname);
	let response;
	let finalizeError;
	try {
		const sessionP = state.manifest.sessionConfig ? provideSession(state) : void 0;
		const cacheP = provideCache(state);
		if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
		markFeatureUsed(state.manifest, FetchFeatures.sessions);
		if (routeData.type === "redirect") {
			const redirectResponse = await renderRedirect(state);
			logRequestFromState(state, {
				pathname,
				method: request.method,
				statusCode: redirectResponse.status,
				isRewrite: false,
				timeStart: state.timeStart
			});
			prepareResponse(redirectResponse, { addCookieHeader });
			state.logger.flush();
			return redirectResponse;
		}
		const i18n = getI18n(state.manifest);
		if (!state.manifest.cacheProvider) {
			markFeatureUsed(state.manifest, FetchFeatures.cache);
			response = await handleMiddleware(state, actionsAndPages);
			if (i18n) response = await finalizeI18n(i18n, state, response);
		} else {
			const runPipeline = async () => {
				let res = await handleMiddleware(state, actionsAndPages);
				if (i18n) res = await finalizeI18n(i18n, state, res);
				return res;
			};
			response = await handleCache(state, runPipeline);
		}
		logRequestFromState(state, {
			pathname,
			method: request.method,
			statusCode: response.status,
			isRewrite: state.isRewriting,
			timeStart: state.timeStart
		});
	} catch (err) {
		state.logger.error(null, err.stack || err.message || String(err));
		return renderErrorFromState(state, request, {
			...state.renderOptions,
			status: 500,
			error: err,
			pathname: state.pathname
		});
	} finally {
		try {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		} catch (err) {
			finalizeError = err;
			state.logger.error(null, err.stack || err.message || String(err));
		}
	}
	if (finalizeError) return renderErrorFromState(state, request, {
		...state.renderOptions,
		status: 500,
		error: finalizeError,
		pathname: state.pathname
	});
	if (REROUTABLE_STATUS_CODES.includes(response.status) && response.body === null && !state.skipErrorReroute) return renderErrorFromState(state, request, {
		...state.renderOptions,
		response,
		status: response.status,
		error: response.status === 500 ? null : void 0,
		pathname: state.pathname
	});
	prepareResponse(response, { addCookieHeader });
	state.logger.flush();
	return response;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/routing/match-request.js
function safeDecodeURI(manifest, pathname) {
	try {
		return decodeURI(pathname);
	} catch (e) {
		new AstroIntegrationLogger(getLogger(manifest).options, manifest.adapterName).debug(e.toString());
		return pathname;
	}
}
function matchRequest(manifest, request, allowPrerenderedRoutes = false) {
	const url = new URL(request.url);
	if (manifest.assets.has(url.pathname)) return void 0;
	let pathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, getLogger(manifest));
	if (!pathname) pathname = prependForwardSlash(stripRequestBase(url.pathname, manifest.base));
	const routeData = matchRoute(manifest, safeDecodeURI(manifest, pathname));
	if (!routeData) return void 0;
	if (allowPrerenderedRoutes) return routeData;
	if (routeData.prerender) {
		if (routeData.params.length > 0) return matchAllRoutes(manifest, safeDecodeURI(manifest, pathname)).find((r) => !r.prerender);
		return;
	}
	return routeData;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/app/base.js
var BaseApp = class BaseApp {
	manifest;
	#adapterLogger;
	baseWithoutTrailingSlash;
	/**
	* The streaming flag passed to the constructor, surfaced through the
	* protected `resolveStreaming()` hook and fed into the internal
	* `FetchState` facade hooks on the fast path.
	*/
	#streaming;
	/**
	* The handler that turns incoming `Request` objects into `Response`s.
	* Defaults to a `DefaultFetchHandler` pinned to this app and can be
	* overridden via `setFetchHandler` — typically by the bundled
	* entrypoint after importing `virtual:astro:fetchable`.
	*/
	#fetchHandler;
	#errorHandler;
	/**
	* Whether a custom fetch handler (from `src/fetch.ts`) has been set
	* via `setFetchHandler`. When false, the `DefaultFetchHandler` is
	* in use and all features are implicitly active.
	*/
	#hasCustomFetchHandler = false;
	/**
	* Whether the missing-feature check has already run. We only want
	* to warn once — after the first request in dev, or at build end.
	*/
	#featureCheckDone = false;
	get logger() {
		return getLogger(this.manifest);
	}
	/**
	* Route data derived from the manifest, used for route matching. Reads and
	* writes go through the single per-manifest route table, so HMR updates are
	* visible to every consumer at once.
	*/
	get manifestData() {
		return getRouteTable(this.manifest);
	}
	set manifestData(routesList) {
		updateRouteTable(this.manifest, routesList.routes);
	}
	get adapterLogger() {
		const currentOptions = this.logger.options;
		if (!this.#adapterLogger || this.#adapterLogger.options !== currentOptions) this.#adapterLogger = new AstroIntegrationLogger(currentOptions, this.manifest.adapterName);
		return this.#adapterLogger;
	}
	constructor(manifest, streaming = true) {
		this.manifest = manifest;
		this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
		this.#streaming = streaming;
		getRouteTable(manifest);
		getLogger(manifest);
		this.#fetchHandler = new DefaultFetchHandler(this);
		this.#errorHandler = this.createErrorHandler();
	}
	/**
	* Resolves the user-configured logger destination from the manifest and
	* returns the logger. Lazy and only resolves once; safe to call before
	* the first render (adapters use this to log startup messages through
	* the configured destination).
	*/
	getLogger() {
		return getResolvedLogger(this.manifest);
	}
	/**
	* The streaming flag fed into the internal `FetchState` facade hooks on
	* the fast path. Returns the constructor flag by
	* default; `BuildApp` overrides this to return `undefined` so streaming
	* falls through to the environment default (`manifest.serverLike`).
	*/
	resolveStreaming() {
		return this.#streaming;
	}
	/**
	* Override the fetch handler used to dispatch requests. Entrypoints
	* call this with the default export of `virtual:astro:fetchable` to
	* plug in a user-authored handler from `src/fetch.ts`.
	*/
	setFetchHandler(handler) {
		this.#fetchHandler = handler;
		this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
	}
	/**
	* Returns the error handler used by this app. The default is a thin
	* bridge over the functional error API — strategy selection (production
	* default / dev / build) is environment-driven inside `renderErrorPage`.
	* External subclasses can override this to customize error rendering.
	*/
	createErrorHandler() {
		return { renderError: (request, options) => renderErrorPage(this.manifest, request, options) };
	}
	/**
	* Resets the cached adapter logger so it picks up a new logger instance.
	* Used by BuildApp when the logger is replaced via setOptions().
	*/
	resetAdapterLogger() {
		this.#adapterLogger = void 0;
	}
	getAllowedDomains() {
		return this.manifest.allowedDomains;
	}
	matchesAllowedDomains(forwardedHost, protocol) {
		return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
	}
	static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
		if (!allowedDomains || allowedDomains.length === 0) return false;
		try {
			const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
			return allowedDomains.some((pattern) => {
				return matchPattern(testUrl, pattern);
			});
		} catch {
			return false;
		}
	}
	set setManifestData(newManifestData) {
		updateRouteTable(this.manifest, newManifestData.routes);
	}
	removeBase(pathname) {
		return stripRequestBase(pathname, this.manifest.base);
	}
	/**
	* Decodes a pathname with `decodeURI`, falling back to the raw pathname when it
	* contains an invalid percent-sequence (e.g. `%C0%AF`, an overlong-UTF-8 encoding of
	* `/` commonly sent by path-traversal scanners). A raw `decodeURI()` would throw
	* `URIError: URI malformed`, and because `match()` runs before `render()` that error
	* escapes the adapter's request handler as an uncaught exception (HTTP 500) that user
	* middleware can't catch.
	*/
	safeDecodeURI(pathname) {
		try {
			return decodeURI(pathname);
		} catch (e) {
			this.adapterLogger.debug(e.toString());
			return pathname;
		}
	}
	/**
	* Extracts the base-stripped, decoded pathname from a request.
	* Used by adapters to compute the pathname for dev-mode route matching.
	*/
	getPathnameFromRequest(request) {
		const url = new URL(request.url);
		const pathname = prependForwardSlash(this.removeBase(url.pathname));
		return this.safeDecodeURI(pathname);
	}
	/**
	* Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
	* routes aren't returned, even if they are matched.
	*
	* When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
	* @param request
	* @param allowPrerenderedRoutes
	*/
	match(request, allowPrerenderedRoutes = false) {
		return matchRequest(this.manifest, request, allowPrerenderedRoutes);
	}
	/**
	* A matching route function to use in the development server.
	* Contrary to the `.match` function, this function resolves props and params, returning the correct
	* route based on the priority, segments. It also returns the correct, resolved pathname.
	* @param pathname
	*/
	devMatch(pathname) {}
	computePathnameFromDomain(request) {
		return computePathnameFromDomain(request, new URL(request.url), this.manifest.i18n, this.manifest.base, this.manifest.trailingSlash, this.logger);
	}
	async render(request, { addCookieHeader = false, clientAddress = Reflect.get(request, clientAddressSymbol), locals, prerenderedErrorPageFetch = fetch, routeData, waitUntil } = {}) {
		await getResolvedLogger(this.manifest);
		if (routeData) {
			this.logger.debug("router", "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ", request.url);
			this.logger.debug("router", "RouteData");
			this.logger.debug("router", routeData);
		}
		if (locals) {
			if (typeof locals !== "object") {
				const error = new AstroError(LocalsNotAnObject);
				this.logger.error(null, error.stack);
				return this.renderError(request, {
					addCookieHeader,
					clientAddress,
					prerenderedErrorPageFetch,
					locals: void 0,
					routeData,
					waitUntil,
					status: 500,
					error
				});
			}
		}
		if (!routeData) {
			const domainPathname = this.computePathnameFromDomain(request);
			if (domainPathname) routeData = matchRoute(this.manifest, this.safeDecodeURI(domainPathname));
		}
		const resolvedOptions = {
			addCookieHeader,
			clientAddress,
			prerenderedErrorPageFetch,
			locals,
			routeData,
			waitUntil
		};
		let response;
		if (this.#fetchHandler instanceof DefaultFetchHandler) response = await handleRequest(new FetchState(this.manifest, request, resolvedOptions, {
			streaming: this.resolveStreaming(),
			renderError: (req, opts) => this.renderError(req, opts),
			logRequest: (payload) => this.logThisRequest(payload)
		}));
		else {
			setRenderOptions(request, resolvedOptions);
			response = await this.#fetchHandler.fetch(request);
		}
		this.#warnMissingFeatures();
		if (response.headers.get("X-Astro-Error")) {
			response.headers.delete(ASTRO_ERROR_HEADER);
			return this.renderError(request, {
				addCookieHeader,
				clientAddress,
				prerenderedErrorPageFetch,
				locals,
				routeData,
				waitUntil,
				response,
				status: response.status,
				error: response.status === 500 ? null : void 0
			});
		}
		return response;
	}
	setCookieHeaders(response) {
		return getSetCookiesFromResponse(response);
	}
	/**
	* Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
	* For example,
	* ```ts
	* for (const cookie_ of App.getSetCookieFromResponse(response)) {
	*     const cookie: string = cookie_
	* }
	* ```
	* @param response The response to read cookies from.
	* @returns An iterator that yields key-value pairs as equal-sign-separated strings.
	*/
	static getSetCookieFromResponse = getSetCookiesFromResponse;
	/**
	* If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
	* This also handles pre-rendered /404 or /500 routes.
	*
	* Delegates to the app's configured `ErrorHandler`. To customize behavior
	* for a specific environment, override `createErrorHandler()` rather than
	* this method.
	*/
	async renderError(request, options) {
		return this.#errorHandler.renderError(request, options);
	}
	/**
	* One-shot check: after the first request with a custom `src/fetch.ts`,
	* compare `usedFeatures` against the manifest and warn about any
	* configured features the user's pipeline doesn't call.
	*/
	#warnMissingFeatures() {
		if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
		this.#featureCheckDone = true;
		const manifest = this.manifest;
		const missing = [];
		const used = getUsedFeatures(this.manifest);
		if (manifest.routes.some((r) => r.routeData.type === "redirect") && !(used & FetchFeatures.redirects)) missing.push("redirects");
		if (manifest.sessionConfig && !(used & FetchFeatures.sessions)) missing.push("sessions");
		if (manifest.actions && !(used & FetchFeatures.actions)) missing.push("actions");
		if (manifest.middleware && !(used & FetchFeatures.middleware)) missing.push("middleware");
		if (manifest.i18n && manifest.i18n.strategy !== "manual" && !(used & FetchFeatures.i18n)) missing.push("i18n");
		if (manifest.cacheConfig && !(used & FetchFeatures.cache)) missing.push("cache");
		for (const feature of missing) this.logger.warn("router", `Your project uses ${feature}, but your custom src/fetch.ts does not call the ${feature}() handler. This feature will not work unless your fetch handler calls it.`);
	}
	getDefaultStatusCode(routeData, pathname) {
		return getDefaultStatusCode(this.manifest, routeData, pathname);
	}
	getManifest() {
		return this.manifest;
	}
	logThisRequest({ pathname, method, statusCode, isRewrite, timeStart }) {
		const timeEnd = performance.now();
		this.logRequest({
			pathname,
			method,
			statusCode,
			isRewrite,
			reqTime: timeEnd - timeStart
		});
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/app/app.js
var App = class extends BaseApp {
	isDev() {
		return false;
	}
	logRequest(_options) {}
};
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"component": "_server-islands.astro",
			"params": ["name"],
			"segments": [[{
				"content": "_server-islands",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "name",
				"dynamic": true,
				"spread": false
			}]],
			"pattern": "^\\/_server-islands\\/([^/]+?)\\/?$",
			"prerender": false,
			"isIndex": false,
			"fallbackRoutes": [],
			"route": "/_server-islands/[name]",
			"origin": "internal",
			"distURL": [],
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/_image",
			"component": "node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/assets/endpoint/generic.js",
			"params": [],
			"pathname": "/_image",
			"pattern": "^\\/_image\\/?$",
			"segments": [[{
				"content": "_image",
				"dynamic": false,
				"spread": false
			}]],
			"type": "endpoint",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"isIndex": false,
			"origin": "internal",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/tina-island/[name]",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/tina-island\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "tina-island",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "name",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["name"],
			"component": "src/pages/tina-island/[name].ts",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	}
].map(deserializeRouteInfo);
//#endregion
//#region \0virtual:astro:pages
var _page0 = () => import("./chunks/generic_1LGh6Sqd.mjs").then((n) => n.t);
var _page1 = () => import("./chunks/_name__-n5u9BIP.mjs");
var pageMap = /* @__PURE__ */ new Map([["node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/assets/endpoint/generic.js", _page0], ["src/pages/tina-island/[name].ts", _page1]]);
//#endregion
//#region \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///Users/alejandro/Desktop/trabajo/AccessibleTravel/","cacheDir":"file:///Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.astro/","outDir":"file:///Users/alejandro/Desktop/trabajo/AccessibleTravel/dist/","srcDir":"file:///Users/alejandro/Desktop/trabajo/AccessibleTravel/src/","publicDir":"file:///Users/alejandro/Desktop/trabajo/AccessibleTravel/public/","buildClientDir":"file:///Users/alejandro/Desktop/trabajo/AccessibleTravel/dist/client/","buildServerDir":"file:///Users/alejandro/Desktop/trabajo/AccessibleTravel/.vercel/output/server/","adapterName":"@astrojs/vercel","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/_image","component":"node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/assets/endpoint/generic.js","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"/*! tailwindcss v4.1.11 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-font-weight:initial;--tw-duration:initial;--tw-ease:initial}}}.toast-share{pointer-events:none;bottom:calc(var(--spacing,.25rem)*6);z-index:9999;--tw-translate-x:calc(calc(1/2*100%)*-1);translate:var(--tw-translate-x)var(--tw-translate-y);--tw-translate-y:calc(var(--spacing,.25rem)*3);translate:var(--tw-translate-x)var(--tw-translate-y);border-radius:var(--radius-lg,.5rem);background-color:var(--color-slate-800,oklch(27.9% .041 260.031));padding-inline:calc(var(--spacing,.25rem)*5);padding-block:calc(var(--spacing,.25rem)*2.5);font-size:var(--text-sm,.875rem);line-height:var(--tw-leading,var(--text-sm--line-height,calc(1.25/.875)));--tw-font-weight:var(--font-weight-semibold,600);font-weight:var(--font-weight-semibold,600);color:var(--color-white,#fff);opacity:0;transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function,cubic-bezier(.4,0,.2,1)));transition-duration:var(--tw-duration,var(--default-transition-duration,.15s));--tw-duration:.3s;--tw-ease:var(--ease-out,cubic-bezier(0,0,.2,1));transition-duration:.3s;transition-timing-function:var(--ease-out,cubic-bezier(0,0,.2,1));position:fixed;left:50%}.toast-share.show{--tw-translate-y:calc(var(--spacing,.25rem)*0);translate:var(--tw-translate-x)var(--tw-translate-y);opacity:1}@property --tw-translate-x{syntax:\"*\";inherits:false;initial-value:0}@property --tw-translate-y{syntax:\"*\";inherits:false;initial-value:0}@property --tw-translate-z{syntax:\"*\";inherits:false;initial-value:0}@property --tw-font-weight{syntax:\"*\";inherits:false}@property --tw-duration{syntax:\"*\";inherits:false}@property --tw-ease{syntax:\"*\";inherits:false}\n"}],"routeData":{"route":"/tina-island/[name]","isIndex":false,"type":"endpoint","pattern":"^\\/tina-island\\/([^/]+?)\\/?$","segments":[[{"content":"tina-island","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"params":["name"],"component":"src/pages/tina-island/[name].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/[locale]/aboutUs","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/aboutUs\\/?$","segments":[[{"content":"locale","dynamic":true,"spread":false}],[{"content":"aboutUs","dynamic":false,"spread":false}]],"params":["locale"],"component":"src/pages/[locale]/aboutUs.astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/[locale]/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"locale","dynamic":true,"spread":false}],[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["locale","slug"],"component":"src/pages/[locale]/blog/[slug].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/[locale]/blog","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/blog\\/?$","segments":[[{"content":"locale","dynamic":true,"spread":false}],[{"content":"blog","dynamic":false,"spread":false}]],"params":["locale"],"component":"src/pages/[locale]/blog.astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/[locale]/contactUs","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/contactUs\\/?$","segments":[[{"content":"locale","dynamic":true,"spread":false}],[{"content":"contactUs","dynamic":false,"spread":false}]],"params":["locale"],"component":"src/pages/[locale]/contactUs.astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/[locale]/destino/tour/[titleLink]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/destino\\/tour\\/([^/]+?)\\/?$","segments":[[{"content":"locale","dynamic":true,"spread":false}],[{"content":"destino","dynamic":false,"spread":false}],[{"content":"tour","dynamic":false,"spread":false}],[{"content":"titleLink","dynamic":true,"spread":false}]],"params":["locale","titleLink"],"component":"src/pages/[locale]/destino/tour/[titleLink].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/[locale]/destino/[titleLink]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/destino\\/([^/]+?)\\/?$","segments":[[{"content":"locale","dynamic":true,"spread":false}],[{"content":"destino","dynamic":false,"spread":false}],[{"content":"titleLink","dynamic":true,"spread":false}]],"params":["locale","titleLink"],"component":"src/pages/[locale]/destino/[titleLink].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/[locale]/group/[titleLink]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/group\\/([^/]+?)\\/?$","segments":[[{"content":"locale","dynamic":true,"spread":false}],[{"content":"group","dynamic":false,"spread":false}],[{"content":"titleLink","dynamic":true,"spread":false}]],"params":["locale","titleLink"],"component":"src/pages/[locale]/group/[titleLink].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/[locale]/groupTours","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/groupTours\\/?$","segments":[[{"content":"locale","dynamic":true,"spread":false}],[{"content":"groupTours","dynamic":false,"spread":false}]],"params":["locale"],"component":"src/pages/[locale]/groupTours.astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/[locale]/terminosCondiciones","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/terminosCondiciones\\/?$","segments":[[{"content":"locale","dynamic":true,"spread":false}],[{"content":"terminosCondiciones","dynamic":false,"spread":false}]],"params":["locale"],"component":"src/pages/[locale]/terminosCondiciones.astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/[locale]/tourDestino","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/tourDestino\\/?$","segments":[[{"content":"locale","dynamic":true,"spread":false}],[{"content":"tourDestino","dynamic":false,"spread":false}]],"params":["locale"],"component":"src/pages/[locale]/tourDestino.astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/[locale]","isIndex":true,"type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"locale","dynamic":true,"spread":false}]],"params":["locale"],"component":"src/pages/[locale]/index.astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"redirect","isIndex":false,"route":"/","pattern":"^\\/$","segments":[],"params":[],"component":"/","pathname":"/","prerender":true,"redirect":"/en/","fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"serverLike":true,"middlewareMode":"classic","site":"https://accessibletravelperu.com","base":"/","trailingSlash":"ignore","compressHTML":"jsx","componentMetadata":[["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/pages/[locale]/aboutUs.astro",{"propagation":"in-tree","containsHead":true}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/pages/[locale]/blog.astro",{"propagation":"in-tree","containsHead":true}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/pages/[locale]/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/pages/[locale]/contactUs.astro",{"propagation":"in-tree","containsHead":true}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/pages/[locale]/destino/[titleLink].astro",{"propagation":"in-tree","containsHead":true}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/pages/[locale]/destino/tour/[titleLink].astro",{"propagation":"in-tree","containsHead":true}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/pages/[locale]/group/[titleLink].astro",{"propagation":"in-tree","containsHead":true}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/pages/[locale]/groupTours.astro",{"propagation":"in-tree","containsHead":true}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/pages/[locale]/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/pages/[locale]/terminosCondiciones.astro",{"propagation":"in-tree","containsHead":true}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/pages/[locale]/tourDestino.astro",{"propagation":"in-tree","containsHead":true}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/content/blog/es/valle-sagrado.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/.astro/content-modules.mjs",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/content/runtime.js",{"propagation":"in-tree","containsHead":false}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/Footer.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:pages",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:manifest",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/manifest/ambient.js",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/fetch/default-handler.js",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/app/base.js",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/app/app.js",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/app/entrypoints/index.js",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:routes",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/build/app.js",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/entrypoints/prerender.js",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[locale]/aboutUs@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[locale]/blog@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[locale]/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[locale]/contactUs@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[locale]/destino/[titleLink]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[locale]/destino/tour/[titleLink]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[locale]/group/[titleLink]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[locale]/groupTours@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[locale]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[locale]/terminosCondiciones@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[locale]/tourDestino@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/lib/tina/islands.ts",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/Header.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Certificaciones.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/ui/AsideTravel.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Infotravel.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/HeroGroup.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/HeroHome.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Informacion.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/MensajeApp.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Pago.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/ui/BlogAside.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/ui/FormAside.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/ui/Modalcontac.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/ui/ShareButtons.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/ui/WhatsappCta.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/ContactoForm.astro",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/content/blog/en/valle-sagrado.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/content/blog/es/viaje-cusco.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/content/blog/en/viaje-cusco.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"astro/entrypoints/prerender":"prerender-entry.BVFi28A1.mjs","\u0000virtual:astro:page:src/pages/404@_@astro":"chunks/404_tQ7DFxpj.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_CKXQ-oey.mjs","\u0000virtual:astro:page:src/pages/[locale]/blog/[slug]@_@astro":"chunks/_slug__C5H68ISd.mjs","\u0000virtual:astro:page:src/pages/[locale]/destino/tour/[titleLink]@_@astro":"chunks/_titleLink__CK0t3Wjw.mjs","\u0000virtual:astro:page:src/pages/[locale]/group/[titleLink]@_@astro":"chunks/_titleLink__Ca1AXAIE.mjs","\u0000virtual:astro:page:src/pages/[locale]/destino/[titleLink]@_@astro":"chunks/_titleLink__D9Ztu15a.mjs","\u0000virtual:astro:get-image":"chunks/_virtual_astro_get-image_BA6moI0J.mjs","\u0000virtual:astro:middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_C-PI1Pas.mjs","\u0000virtual:astro:page:src/pages/[locale]/aboutUs@_@astro":"chunks/aboutUs_BuC_OrNv.mjs","\u0000virtual:astro:page:src/pages/[locale]/blog@_@astro":"chunks/blog_CbIqlBWX.mjs","\u0000virtual:astro:page:src/pages/[locale]/contactUs@_@astro":"chunks/contactUs_CrECnfBc.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/.astro/content-assets.mjs":"chunks/content-assets_BNW1matP.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/.astro/content-modules.mjs":"chunks/content-modules_m09YZ0ut.mjs","\u0000virtual:astro:page:src/pages/[locale]/groupTours@_@astro":"chunks/groupTours_DBr62sEM.mjs","\u0000virtual:astro:page:src/pages/[locale]/index@_@astro":"chunks/index_BKldu0Mq.mjs","\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_Z3zFhrGC.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CiIHPk80.mjs","\u0000virtual:astro:page:src/pages/[locale]/terminosCondiciones@_@astro":"chunks/terminosCondiciones_DeLzuYfq.mjs","\u0000virtual:astro:page:src/pages/[locale]/tourDestino@_@astro":"chunks/tourDestino_DFrpQ9uh.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/content/blog/es/valle-sagrado.mdx":"chunks/valle-sagrado_BRWpfzzX.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/content/blog/es/valle-sagrado.mdx?astroPropagatedAssets":"chunks/valle-sagrado_D4TNbDcV.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/content/blog/en/valle-sagrado.mdx":"chunks/valle-sagrado_Fv15kmlE.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/content/blog/en/valle-sagrado.mdx?astroPropagatedAssets":"chunks/valle-sagrado_RC61_lYG.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/content/blog/en/viaje-cusco.mdx":"chunks/viaje-cusco_CIfm0f5L.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/content/blog/es/viaje-cusco.mdx?astroPropagatedAssets":"chunks/viaje-cusco_CtRZPQwv.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/content/blog/en/viaje-cusco.mdx?astroPropagatedAssets":"chunks/viaje-cusco_D3SzJ9cp.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/content/blog/es/viaje-cusco.mdx":"chunks/viaje-cusco_bF8LADOp.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/@astrojs+react@6.0.4_@types+node@26.2.0_@types+react-dom@19.2.5_@types+react@19.2.18__@_2f479483ed439bcef5512778584f2fc1/node_modules/@astrojs/react/dist/vnode-children.js":"chunks/vnode-children_C8gOdPzT.mjs","@astrojs/vercel/entrypoint":"entry.mjs","\u0000virtual:astro:page:src/pages/tina-island/[name]@_@ts":"chunks/_name__-n5u9BIP.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/sharp@0.35.3_@types+node@26.2.0/node_modules/sharp/dist/index.mjs":"chunks/dist_BbJnpzdD.mjs","\u0000virtual:astro:page:node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_1LGh6Sqd.mjs","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Actividades.astro?astro&type=script&index=0&lang.ts":"_astro/Actividades.astro_astro_type_script_index_0_lang.B4xQIjx9.js","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Comentarios.astro?astro&type=script&index=0&lang.ts":"_astro/Comentarios.astro_astro_type_script_index_0_lang.BvSxiBF9.js","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/GaleriaModal.astro?astro&type=script&index=0&lang.ts":"_astro/GaleriaModal.astro_astro_type_script_index_0_lang.RYIz2Ccx.js","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Infotravel.astro?astro&type=script&index=0&lang.ts":"_astro/Infotravel.astro_astro_type_script_index_0_lang.B-am-rvP.js","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/MensajeApp.astro?astro&type=script&index=0&lang.ts":"_astro/MensajeApp.astro_astro_type_script_index_0_lang.BLgr8gmL.js","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/Metadata.astro?astro&type=script&index=0&lang.ts":"_astro/Metadata.astro_astro_type_script_index_0_lang.ByLlB0Um.js","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/Metadata.astro?astro&type=script&index=1&lang.ts":"_astro/Metadata.astro_astro_type_script_index_1_lang.DWYIHWUE.js","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/PortadaDinamica.astro?astro&type=script&index=0&lang.ts":"_astro/PortadaDinamica.astro_astro_type_script_index_0_lang.CGrYwgf-.js","/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/constructor/Times.astro?astro&type=script&index=0&lang.ts":"_astro/Times.astro_astro_type_script_index_0_lang.BS9LW35K.js","@astrojs/react/client.js":"_astro/client.B3v6l__6.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Actividades.astro?astro&type=script&index=0&lang.ts","var e=`bg-azul-travel text-white scale-105`,t=0,n=null,r=!1,i=document.querySelectorAll(`[data-activity-btn]`),a=i.length;a===0&&console.warn(`No se encontraron botones de actividades`);function o(t){i.forEach(t=>{t.classList.remove(...e.split(` `));let n=t.querySelector(`svg`);n&&(n.style.color=``)});let n=i[t];if(n){n.classList.add(...e.split(` `));let t=n.querySelector(`svg`);t&&(t.style.color=`white`)}}function s(){r||(t=(t+1)%a,o(t))}function c(){n||=(o(t),window.setInterval(s,2e3))}function l(){n&&=(clearInterval(n),null)}function u(e){l(),typeof e==`number`&&(t=e),c()}i.forEach((e,n)=>{e.addEventListener(`mouseenter`,()=>{r=!0,l(),o(n)}),e.addEventListener(`mouseleave`,()=>{r=!1,t=n,u()}),e.addEventListener(`click`,()=>{t=n,o(n)})}),document.addEventListener(`visibilitychange`,()=>{document.hidden?l():r||c()}),document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,c):c(),window.addEventListener(`beforeunload`,l);"],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Comentarios.astro?astro&type=script&index=0&lang.ts","var e=class extends HTMLElement{constructor(){super();let e=0,t=this.querySelectorAll(`.testimonio-img-group`),n=this.querySelectorAll(`.testimonio-text`),r=this.querySelectorAll(`.btn-avatar`),i=n.length;if(i===0)return;let a,o=i=>{if(t[e]){t[e].classList.remove(`opacity-100`,`z-10`),t[e].classList.add(`opacity-0`,`z-0`,`pointer-events-none`),n[e].classList.remove(`opacity-100`,`z-10`),n[e].classList.add(`opacity-0`,`z-0`,`pointer-events-none`);let r=t[e].querySelector(`.imagen-secundaria`);r&&(r.style.zIndex=`10`)}e=i,t[e]&&(t[e].classList.remove(`opacity-0`,`z-0`,`pointer-events-none`),t[e].classList.add(`opacity-100`,`z-50`),n[e].classList.remove(`opacity-0`,`z-0`,`pointer-events-none`),n[e].classList.add(`opacity-100`,`z-50`),clearTimeout(a),a=setTimeout(()=>{let n=t[e].querySelector(`.imagen-secundaria`);n&&(n.style.zIndex=`30`)},5e3));let o=Math.floor(e/3)*3,s=o+3;r.forEach((e,t)=>{e.hidden=!(t>=o&&t<s)})};this.querySelector(`#next-btnc`)?.addEventListener(`click`,()=>{o((e+1)%i)}),this.querySelector(`#prev-btnc`)?.addEventListener(`click`,()=>{o((e-1+i)%i)}),r.forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.dataset.index||`0`,10);o(t)})}),a=setTimeout(()=>{if(t[0]){let e=t[0].querySelector(`.imagen-secundaria`);e&&(e.style.zIndex=`30`)}},5e3),setInterval(()=>{o((e+1)%i)},12e3);let s=document.createElement(`div`);s.className=`fixed inset-0 bg-[#000000d9] z-30 hidden cursor-zoom-out backdrop-blur-sm transition-opacity duration-300 opacity-0`,document.body.appendChild(s);let c=this.querySelectorAll(`.imagen-principal, .imagen-secundaria`),l=Array.from(c),u=null,d=null,f=null,p=0,m=this.querySelector(`#zoom-controls`),h=this.querySelector(`#zoom-next`),g=this.querySelector(`#zoom-prev`);m&&document.body.appendChild(m);let _=()=>{u&&(u.classList.remove(`imagen-enlarged`),d&&d.insertBefore(u,f),u=null,d=null,f=null,s.classList.remove(`opacity-100`),m?.classList.remove(`opacity-100`),setTimeout(()=>{s.classList.add(`hidden`),m?.classList.add(`hidden`)},300),document.body.style.overflow=``)},v=e=>{u&&d&&(u.classList.remove(`imagen-enlarged`),d.insertBefore(u,f));let t=l[e];u=t,d=t.parentElement,f=t.nextElementSibling,p=e,document.body.appendChild(t),t.classList.add(`imagen-enlarged`)};h?.addEventListener(`click`,e=>{e.stopPropagation(),v((p+1)%l.length)}),g?.addEventListener(`click`,e=>{e.stopPropagation(),v((p-1+l.length)%l.length)}),s.addEventListener(`click`,_),window.addEventListener(`scroll`,_,{passive:!0}),l.forEach((e,t)=>{e.classList.add(`cursor-zoom-in`,`hover:scale-105`),e.addEventListener(`click`,e=>{e.stopPropagation();let n=e.currentTarget;if(u===n){_();return}u&&_(),u=n,d=n.parentElement,f=n.nextElementSibling,p=t,document.body.appendChild(n),n.classList.add(`imagen-enlarged`),s.classList.remove(`hidden`),m?.classList.remove(`hidden`),s.offsetWidth,s.classList.add(`opacity-100`),m?.classList.add(`opacity-100`),document.body.style.overflow=`hidden`})})}};customElements.define(`slider-comentarios`,e);"],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/GaleriaModal.astro?astro&type=script&index=0&lang.ts","var e=class extends HTMLElement{constructor(){super();let e=Array.from(this.querySelectorAll(`.gallery-image`)),t=this.querySelector(`#image-modal`),n=this.querySelector(`#modal-image`),r=this.querySelector(`#close-modal`),i=this.querySelector(`#prev-modal-btn`),a=this.querySelector(`#next-modal-btn`),o=this.querySelector(`#modal-counter`),s=this.querySelector(`#modal-content-area`),c=0,l=e.length;if(l===0||!t||!n)return;let u=e=>e.dataset.highres||e.src,d=t=>{n.classList.remove(`scale-100`),n.classList.add(`scale-95`,`opacity-50`),setTimeout(()=>{c=t,n.src=u(e[c]),o&&(o.textContent=`${c+1} / ${l}`),n.classList.remove(`scale-95`,`opacity-50`),n.classList.add(`scale-100`,`opacity-100`)},150)},f=r=>{c=r,n.src=u(e[c]),o&&(o.textContent=`${c+1} / ${l}`),n.classList.remove(`scale-95`),n.classList.add(`scale-100`),document.body.style.overflow=`hidden`,t.showModal()},p=()=>{t.close(),document.body.style.overflow=``};e.forEach(t=>{t.addEventListener(`click`,()=>{let n=u(t),r=e.findIndex(e=>u(e)===n);f(r===-1?0:r)})}),r?.addEventListener(`click`,p),s?.addEventListener(`click`,e=>{e.target===s&&p()}),i?.addEventListener(`click`,e=>{e.stopPropagation(),d((c-1+l)%l)}),a?.addEventListener(`click`,e=>{e.stopPropagation(),d((c+1)%l)}),window.addEventListener(`keydown`,e=>{t.open&&(e.key===`Escape`&&p(),e.key===`ArrowRight`&&a?.click(),e.key===`ArrowLeft`&&i?.click())})}};customElements.define(`galeria-modal`,e);"],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Infotravel.astro?astro&type=script&index=0&lang.ts","function e(){let e=document.getElementById(`wetravel_package_listing`);if(!e)return;let{uid:i,uuid:a,color:o,text:s,showreviews:c,env:l}=e.dataset;if(!a){e.innerHTML=`<p class=\"text-sm text-gray-500\">Booking information is not available yet.</p>`;return}let u=`${l}/packages_embed?uuid=${a}&btn_color=${o}&btn_name=${encodeURIComponent(s)}&show_reviews=${c}&env=${l}`,d=document.createElement(`iframe`);d.setAttribute(`frameborder`,`0`),d.src=u,d.className=`flex w-full h-full justify-center min-h-130`,e.innerHTML=``,e.appendChild(d),window.addEventListener(`message`,e=>{if(e.data){if(typeof e.data==`string`&&e.data.includes(`WTRVL_checkout`)){let[,n]=e.data.split(`WTRVL_checkout`);n&&t(n)}e.data===`wtrvlCheckoutClosed`&&n()}}),r(`load`,i,l)}function t(e){if(document.querySelector(`.wtrvl-checkout-iframe`))return;let t=document.createElement(`iframe`);t.className=`wtrvl-checkout-iframe fixed top-0 left-0 w-screen h-screen border-0`,t.style.zIndex=`999999`,t.src=e,document.body.classList.add(`overflow-hidden`),document.body.appendChild(t),setTimeout(()=>{t.contentWindow?.postMessage(`packageWidget`,`*`)},3e3)}function n(){let e=document.querySelector(`.wtrvl-checkout-iframe`);e&&(e.remove(),document.body.classList.remove(`overflow-hidden`))}function r(e,t,n){let r={version:`v0.3`,user_id:t,embed_type:`packages`,action_type:e,url:window.location.href};fetch(`https://t.wetravel.com/widgets`,{method:`POST`,headers:{\"Content-Type\":`application/json`},body:JSON.stringify(r)}).catch(()=>{})}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,e):e();"],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/MensajeApp.astro?astro&type=script&index=0&lang.ts","var e={classes:{hidden:[`translate-y-[200%]`,`opacity-0`,`pointer-events-none`],visible:[`translate-y-0`,`opacity-100`,`pointer-events-auto`]},animationDuration:300},t=!1,n={openBtn:document.getElementById(`contact-open-btn`),closeBtn:document.getElementById(`contact-close-btn`),panel:document.getElementById(`contact-panel`)},r=()=>{let{openBtn:e,closeBtn:t,panel:r}=n;return!e||!t||!r?(console.error(`Contact Panel: Faltan elementos necesarios`),!1):!0},i=(e,t,n)=>{let r=n?`add`:`remove`;t.forEach(t=>e.classList[r](...t.split(` `)))},a=()=>{if(t||!n.openBtn||!n.panel)return;t=!0;let{openBtn:r,closeBtn:a,panel:o}=n;i(r,e.classes.hidden,!0),r.setAttribute(`aria-hidden`,`true`),r.disabled=!0,requestAnimationFrame(()=>{i(o,e.classes.hidden,!1),o.setAttribute(`aria-hidden`,`false`)}),setTimeout(()=>a?.focus(),e.animationDuration)},o=()=>{if(!t||!n.openBtn||!n.panel)return;t=!1;let{openBtn:r,panel:a}=n;i(a,e.classes.hidden,!0),a.setAttribute(`aria-hidden`,`true`),setTimeout(()=>{i(r,e.classes.hidden,!1),r.setAttribute(`aria-hidden`,`false`),r.disabled=!1,r.focus()},e.animationDuration)},s=e=>{e.key===`Escape`&&t&&o()},c=e=>{if(!t||!n.panel)return;let r=e.target,{openBtn:i,panel:a}=n;!a.contains(r)&&r!==i&&!i?.contains(r)&&o()},l=()=>{document.removeEventListener(`keydown`,s),document.removeEventListener(`click`,c)},u=()=>{if(!r())return;let{openBtn:e,closeBtn:t}=n;e?.addEventListener(`click`,a),t?.addEventListener(`click`,o),document.addEventListener(`keydown`,s),setTimeout(()=>{document.addEventListener(`click`,c)},100),window.addEventListener(`beforeunload`,l),console.log(`Contact Panel: Inicializado correctamente`)};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,u):u();"],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/Metadata.astro?astro&type=script&index=0&lang.ts","(function(e,t,n,r,i,a,o){e.fbq||(i=e.fbq=function(){i.callMethod?i.callMethod.apply(i,arguments):i.queue.push(arguments)},e._fbq||=i,i.push=i,i.loaded=!0,i.version=`2.0`,i.queue=[],a=t.createElement(n),a.async=!0,a.src=r,o=t.getElementsByTagName(n)[0],o.parentNode.insertBefore(a,o))})(window,document,`script`,`https://connect.facebook.net/en_US/fbevents.js`),fbq(`init`,`1330796461770005`),fbq(`track`,`PageView`);"],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/Metadata.astro?astro&type=script&index=1&lang.ts","(function(e,t,n,r,i){e[r]=e[r]||[],e[r].push({\"gtm.start\":new Date().getTime(),event:`gtm.js`});var a=t.getElementsByTagName(n)[0],o=t.createElement(n),s=r==`dataLayer`?``:`&l=`+r;o.async=!0,o.src=`https://www.googletagmanager.com/gtm.js?id=`+i+s,a.parentNode.insertBefore(o,a)})(window,document,`script`,`dataLayer`,`GTM-57SC589G`);"],["/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/PortadaDinamica.astro?astro&type=script&index=0&lang.ts","var e=class extends HTMLElement{constructor(){super();let e=0,t=this.querySelectorAll(`.banner-slide`),n=this.querySelector(`#prev-btn`),r=this.querySelector(`#next-btn`),i=t.length;if(i<=1)return;let a=n=>{t[e].classList.remove(`opacity-100`,`z-10`),t[e].classList.add(`opacity-0`,`z-0`),e=n,t[e].classList.remove(`opacity-0`,`z-0`),t[e].classList.add(`opacity-100`,`z-10`)};n?.addEventListener(`click`,()=>{let t=(e-1+i)%i;a(t)}),r?.addEventListener(`click`,()=>{let t=(e+1)%i;a(t)}),setInterval(()=>{let t=(e+1)%i;a(t)},1e4)}};customElements.define(`slider-portada`,e);"]],"assets":["/favicon.ico","/robots.txt","/_astro/Times.astro_astro_type_script_index_0_lang.BS9LW35K.js","/_astro/client.B3v6l__6.js","/admin/index.html","/fonts/Poppins-Bold.ttf","/fonts/Poppins-Regular.ttf","/fonts/Poppins-SemiBold.ttf","/fonts/Satisfy-Regular.ttf","/fonts/TAN-NIMBUS.ttf","/images/about1.webp","/images/about2.webp","/images/autor.webp","/images/banner1.webp","/images/banner2.webp","/images/banner7.webp","/images/bannerAmaz.jpeg","/images/bonito.jpg","/images/cart1.webp","/images/cart2.webp","/images/cart3.webp","/images/cart4.webp","/images/catorceprincipal.webp","/images/contacto.webp","/images/cuatroprincipal.webp","/images/diecinueveprincipal.webp","/images/dieciochoprincipal.webp","/images/diesiseisprincipal.webp","/images/diesisieteprincipal.webp","/images/diesprincipal.webp","/images/doceprincipal.webp","/images/dosprincipal.webp","/images/footers.webp","/images/francisco.webp","/images/gato.jpg","/images/grupal-image.webp","/images/grupal-image1.webp","/images/grupal-image2.webp","/images/grupal1.webp","/images/grupal2.webp","/images/grupal3.webp","/images/lima.webp","/images/lima2.webp","/images/machu.webp","/images/misti.webp","/images/new2principal.webp","/images/newprincipal.webp","/images/nice.jpeg","/images/nueveprincipal.webp","/images/ochoprincipal.webp","/images/onceprincipal.webp","/images/perdidoprincipal.webp","/images/quinceprincipal.webp","/images/sieteprincipal.webp","/images/treceprincipal.webp","/images/tresprincipal.webp","/images/unoprincipal.webp","/images/veinteprincipal.webp","/images/veinticincoprincipal.webp","/images/veinticuatroprincipal.webp","/images/veintidosprincipal.webp","/images/veintitresprincipal.webp","/images/veintiunoprincipal.webp","/images/vicunas.png","/admin/assets/Range-CZNrBk8u.js","/admin/assets/SchemaReference.es-ChUCVrGI.js","/admin/assets/abnfDiagram-VCTEODGH-BepQbBin.js","/admin/assets/arc-BRrWih8U.js","/admin/assets/architectureDiagram-5GKGNRK7-DSIZJRjf.js","/admin/assets/blockDiagram-NRAW4CY4-frD42HNk.js","/admin/assets/brace-fold.es-roK_OWm2.js","/admin/assets/c4Diagram-UCG6FXSJ-BGzhFGkX.js","/admin/assets/channel-BYNZr_-p.js","/admin/assets/chunk-2Q5K7J3B-C-H4_Qub.js","/admin/assets/chunk-5VM5RSS4-C6__2OFv.js","/admin/assets/chunk-F27PBJKO-CrMe6IeI.js","/admin/assets/chunk-G27WJ6UU-C1CRgHnA.js","/admin/assets/chunk-JWPE2WC7-2r6bSL8a.js","/admin/assets/chunk-LCL6LL3I-CKWoxv36.js","/admin/assets/chunk-POPQ4Y6H-0T2zaCDI.js","/admin/assets/chunk-SVP7TREG-Dx52_1Ca.js","/admin/assets/chunk-XXDRQBXY-CJLZzRnU.js","/admin/assets/classDiagram-DTDB5LWJ-DUC2tJTh.js","/admin/assets/classDiagram-v2-JRS7N3AN-DUC2tJTh.js","/admin/assets/closebrackets.es-B20mAPD-.js","/admin/assets/codemirror.es-9BNAePVk.js","/admin/assets/codemirror.es2-BD8wFiuH.js","/admin/assets/comment.es-DB82GS_u.js","/admin/assets/cose-bilkent-JH36ORCC-BAHgZcGF.js","/admin/assets/cynefin-OW5HDTMX-CkU4nZH7.js","/admin/assets/cynefinDiagram-5FMLGOSQ-nORJp_gg.js","/admin/assets/cytoscape.esm-BjAbmLdb.js","/admin/assets/dagre-3AP2YEHR-DTBzypnF.js","/admin/assets/defaultLocale-DX6XiGOO.js","/admin/assets/diagram-S7CK7UJ4-BV0OCPUE.js","/admin/assets/diagram-UQ7AKVKN-DdTWFe85.js","/admin/assets/diagram-VSXAHHWV-CXt1g-vX.js","/admin/assets/diagram-VX7I27RA-Boy4m-OW.js","/admin/assets/diagram-Z3DM3KII-CYPDKXuv.js","/admin/assets/dialog.es-Bzrst__D.js","/admin/assets/dialog.es2-ar68v5RU.js","/admin/assets/ebnfDiagram-PWID7BFC-B9MCMzpB.js","/admin/assets/erDiagram-SSCWMZ5O-CSHCIGAV.js","/admin/assets/favicon-CCqH8YbW.svg","/admin/assets/flowDiagram-A5DVABFB-BGdYTV2T.js","/admin/assets/foldgutter.es-Cf9XSqV5.js","/admin/assets/forEachState.es-9rFR5OrC.js","/admin/assets/ganttDiagram-EL5Y4UJY-B3nNYk-1.js","/admin/assets/gitGraphDiagram-WWUBYQGX-BU4t4g4m.js","/admin/assets/hint.es-CoiEKvx9.js","/admin/assets/hint.es2-BgIr7EPm.js","/admin/assets/index-C6dwzdUH.js","/admin/assets/index-DOFK9ZeZ.js","/admin/assets/index-f7x0qNpp.css","/admin/assets/info-addon.es-Bree9X7l.js","/admin/assets/info.es-DEGDTgeo.js","/admin/assets/infoDiagram-RXCK75RN-Cvw0pDGD.js","/admin/assets/init-Gi6I4Gst.js","/admin/assets/ishikawaDiagram-5VMMS53U-C8vL1V8i.js","/admin/assets/javascript.es-5eciyBgC.js","/admin/assets/journeyDiagram-EYS64GPL-W7BsBQer.js","/admin/assets/jump-to-line.es-CYjfQRzz.js","/admin/assets/jump.es-DHgP9AfQ.js","/admin/assets/kanban-definition-3QL26DDD-jskB7Uuj.js","/admin/assets/katex-C5jXJg4s.js","/admin/assets/layout-Cc5u6G1i.js","/admin/assets/linear-BdeBijax.js","/admin/assets/lint.es-BfO6MlJA.js","/admin/assets/lint.es2-DsPR-utN.js","/admin/assets/lint.es3-H6qBzYjs.js","/admin/assets/matchbrackets.es-C31cRxwd.js","/admin/assets/matchbrackets.es2-9QT1w37V.js","/admin/assets/mindmap-definition-FBJOCRG2-BkWATO8G.js","/admin/assets/mode-indent.es-D4xOu4VW.js","/admin/assets/mode.es-BIyccx9t.js","/admin/assets/mode.es2-B9Vm47Vh.js","/admin/assets/mode.es3-6cksAtrM.js","/admin/assets/ordinal-Cboi1Yqb.js","/admin/assets/pegDiagram-XKGWAZYB-BRL9QwNV.js","/admin/assets/pieDiagram-E7YTZNPT-BeOEPX5w.js","/admin/assets/quadrantDiagram-AXDQQJYC-CGz2mb38.js","/admin/assets/railroadDiagram-O6MQD6OU-CC-JdKZl.js","/admin/assets/requirementDiagram-EFPCY7ZU-Den8ztjH.js","/admin/assets/sankeyDiagram-P5KCCOFB-Bl5RGuPt.js","/admin/assets/search.es-CsMQgJ3z.js","/admin/assets/searchcursor.es-AKcbbp-N.js","/admin/assets/searchcursor.es2-DYboLViQ.js","/admin/assets/sequenceDiagram-WJ2MYXX4-CNofMvZW.js","/admin/assets/show-hint.es-C3t0POR-.js","/admin/assets/sizeCapture-X5ZJPWSS-CaTPjSiD.js","/admin/assets/stateDiagram-HBIQ2CUA-DlMQDktZ.js","/admin/assets/stateDiagram-v2-4QOOHH4V-mAC2fQTi.js","/admin/assets/sublime.es-1VoLuMtO.js","/admin/assets/swimlanes-XN3QIQJK-BRTcRf_b.js","/admin/assets/swimlanesDiagram-VK2B7HYN-DZIiIJp1.js","/admin/assets/timeline-definition-24CTP7MA-Dj_qmGFd.js","/admin/assets/vennDiagram-4TSXK5OY-fFFjP3RU.js","/admin/assets/wardleyDiagram-VM6X3IG4-CH3eiuYO.js","/admin/assets/xychartDiagram-S5SC5T6Z-CrQGs_dN.js","/images/logos/AccessibleTravel.webp","/images/logos/Enat.webp","/images/logos/LOGO ATP 2022 CORREGIDO-min.webp","/images/logos/LOGOATPsinfondo.webp","/images/logos/LOGOCIRCULO.webp","/images/logos/LOGOatp.webp","/images/logos/PANTOU-min.webp","/images/logos/WeTravel.webp","/images/logos/logo-amex-min.webp","/images/logos/logo-diners-min.webp","/images/logos/logo-mastercard-min.webp","/images/logos/logo-visa-min.webp","/images/logos/mincetur.webp","/images/blog/bonito.jpg","/images/blog/chincheros.jpg","/images/blog/moray.jpg","/images/tours/tour-0FR0NdnMRVCeXx5ZIJWs.webp","/images/tours/tour-0hy2UFuRPGjSbRnrPsqb.webp","/images/tours/tour-2ORIr0IdRGyStPdyvGtp.webp","/images/tours/tour-5LZA6mmyRwqIakPIRGwU.webp","/images/tours/tour-7kqCiexgRt6kWT8aizS4.webp","/images/tours/tour-82R7b1cFT3SMzfNiBCem.webp","/images/tours/tour-Cf1ucBCeQ96LGsCKpSPW.webp","/images/tours/tour-DXa4j6oATRiSmsA1KmE4.webp","/images/tours/tour-DtdxsYr9TeKIX0SNoxdc.webp","/images/tours/tour-ESArl1VeQGmBnzyfvW44.webp","/images/tours/tour-FtYMHKMTYqoE5AHQ3S44.webp","/images/tours/tour-INcWyGzTnKtDfwkGnilg.webp","/images/tours/tour-JrfbKtBlR4GJjhhwOKr0.webp","/images/tours/tour-KMXRVtqRKW33rLycW96y.webp","/images/tours/tour-KmmUEZUSSiEgNOqCZlgC.webp","/images/tours/tour-LusfoBh7SmWgcwf8wWLt.webp","/images/tours/tour-PLME1AQRqcaEAPUponwH.webp","/images/tours/tour-QITjIS97QXiinkc9ezMH.webp","/images/tours/tour-RcPpYAexR3SH8tTXyxfv.webp","/images/tours/tour-T6rqFanTwKF4BfdJ5dTM.webp","/images/tours/tour-TYzUlFAAQnWEphQ7Oe6X.webp","/images/tours/tour-YGaGsA0wTSycd44At8eA.webp","/images/tours/tour-axXnc1s1RGSRothARS62.webp","/images/tours/tour-cXjkksuSW6kAcqm5nzdp.webp","/images/tours/tour-e1Kp0AJRNy2r8xfABykw.webp","/images/tours/tour-eO9RiisGRRaQ8sCM9G9j.webp","/images/tours/tour-eOCh3aJRhopmNSGyhgEg.webp","/images/tours/tour-hcVX7U6nRKqJgwxAJYpf.webp","/images/tours/tour-hdQ3AgvlTLqBjDY4LwDO.webp","/images/tours/tour-opRsbwtJT7KY73IID9Cy.webp","/images/tours/tour-orMIQiGKSBmR5gmPtYxn.webp","/images/tours/tour-qOpH8tZrQcefCDR9bXWg.webp","/images/tours/tour-r1Sc8RQVREORME86GjDA.webp","/images/tours/tour-sn05OHvYSvSQRCH069f6.webp","/images/tours/tour-xKJItWlQyG7sEE4JnVHM.webp","/images/tours/tour-xg7cvCHyQvCXJPCMv2zX.webp","/_astro/Layout.Dlmnc_qP.css","/404.html","/index.html"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-always-no-redirect","locales":["es","en"],"defaultLocale":"en","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":true,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"xCB6swIZ9Z7PEQfhdeommbbrqqe6aOV9SfbPcrizHWI=","image":{"layout":"constrained"},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./chunks/noop-entrypoint_Z3zFhrGC.mjs"),
	middleware: () => import("./virtual_astro_middleware.mjs"),
	sessionDriver: () => import("./chunks/_virtual_astro_session-driver_C-PI1Pas.mjs"),
	serverIslandMappings: () => import("./chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs"),
	routes: manifestRoutes,
	pageMap
});
function getAmbientManifest() {
	const manifest$1 = manifest;
	if (!manifest$1) throw new AstroError(NoManifestAvailable);
	return manifest$1;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/fetch/default-handler.js
var DefaultFetchHandler = class {
	#manifest;
	/**
	* `BaseApp` passes itself so states resolve that app's manifest ahead of
	* the ambient one; generated builds construct the handler with no
	* arguments and use the ambient manifest.
	*/
	constructor(app) {
		this.#manifest = app?.manifest;
	}
	fetch = (request) => {
		const options = getRenderOptions(request);
		const manifest = this.#manifest ?? getAmbientManifest();
		return handleRequest(new FetchState(manifest, request, options));
	};
};
//#endregion
//#region \0virtual:astro:fetchable
var _virtual_astro_fetchable_default = new DefaultFetchHandler();
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/app/entrypoints/virtual/prod.js
var createApp$1 = ({ streaming } = {}) => {
	const app = new App(manifest, streaming);
	app.setFetchHandler(_virtual_astro_fetchable_default);
	return app;
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/app/entrypoints/virtual/index.js
var createApp = createApp$1;
//#endregion
//#region node_modules/.pnpm/@astrojs+internal-helpers@0.11.0/node_modules/@astrojs/internal-helpers/dist/request.js
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString()?.split(",").map((e) => e.trim())?.[0];
}
var IP_RE = /^[0-9a-fA-F.:]{1,45}$/;
function isValidIpAddress(value) {
	return IP_RE.test(value);
}
function getValidatedIpFromHeader(headerValue) {
	const raw = getFirstForwardedValue(headerValue);
	if (raw && isValidIpAddress(raw)) return raw;
}
function getClientIpAddress(request) {
	return getValidatedIpFromHeader(request.headers.get("x-forwarded-for"));
}
var app = createApp();
var entrypoint_default = { async fetch(request) {
	const url = new URL(request.url);
	const hasValidMiddlewareSecret = request.headers.get(ASTRO_MIDDLEWARE_SECRET_HEADER) === middlewareSecret;
	let realPath = void 0;
	if (hasValidMiddlewareSecret) realPath = request.headers.get(ASTRO_PATH_HEADER);
	else if (url.searchParams.get("x_astro_path_token") === "26d31c33-4de0-4388-ae1d-169b6a0d6eca") realPath = url.searchParams.get(ASTRO_PATH_PARAM);
	if (typeof realPath === "string") {
		const target = new URL(realPath, url);
		const search = target.search || url.search;
		url.pathname = target.pathname;
		url.search = search;
		url.searchParams.delete(ASTRO_PATH_PARAM);
		url.searchParams.delete(ASTRO_PATH_TOKEN_PARAM);
		request = new Request(url.toString(), {
			method: request.method,
			headers: request.headers,
			...request.body ? {
				body: request.body,
				duplex: "half"
			} : {}
		});
	}
	const routeData = app.match(request);
	let locals = {};
	const astroLocalsHeader = request.headers.get(ASTRO_LOCALS_HEADER);
	if (astroLocalsHeader) {
		if (!hasValidMiddlewareSecret) return new Response("Forbidden", { status: 403 });
		locals = JSON.parse(astroLocalsHeader);
	}
	if (hasValidMiddlewareSecret) request.headers.delete(ASTRO_MIDDLEWARE_SECRET_HEADER);
	const response = await app.render(request, {
		routeData,
		clientAddress: getClientIpAddress(request),
		locals
	});
	if (app.setCookieHeaders) for (const setCookieHeader of app.setCookieHeaders(response)) response.headers.append("Set-Cookie", setCookieHeader);
	return response;
} };
//#endregion
export { entrypoint_default as default };
