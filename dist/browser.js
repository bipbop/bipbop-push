/* bipbop-push version 1.0.8 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('bipbop-webservice')) :
    typeof define === 'function' && define.amd ? define(['bipbop-webservice'], factory) :
    (global = global || self, global.BipbopPushManager = factory(global.bipbop.WebService));
}(this, function (WebService) { 'use strict';

    WebService = WebService && WebService.hasOwnProperty('default') ? WebService['default'] : WebService;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var xpath_1 = createCommonjsModule(function (module, exports) {
    /*
     * xpath.js
     *
     * An XPath 1.0 library for JavaScript.
     *
     * Cameron McCormack <cam (at) mcc.id.au>
     *
     * This work is licensed under the MIT License.
     *
     * Revision 20: April 26, 2011
     *   Fixed a typo resulting in FIRST_ORDERED_NODE_TYPE results being wrong,
     *   thanks to <shi_a009 (at) hotmail.com>.
     *
     * Revision 19: November 29, 2005
     *   Nodesets now store their nodes in a height balanced tree, increasing
     *   performance for the common case of selecting nodes in document order,
     *   thanks to S閎astien Cramatte <contact (at) zeninteractif.com>.
     *   AVL tree code adapted from Raimund Neumann <rnova (at) gmx.net>.
     *
     * Revision 18: October 27, 2005
     *   DOM 3 XPath support.  Caveats:
     *     - namespace prefixes aren't resolved in XPathEvaluator.createExpression,
     *       but in XPathExpression.evaluate.
     *     - XPathResult.invalidIteratorState is not implemented.
     *
     * Revision 17: October 25, 2005
     *   Some core XPath function fixes and a patch to avoid crashing certain
     *   versions of MSXML in PathExpr.prototype.getOwnerElement, thanks to
     *   S閎astien Cramatte <contact (at) zeninteractif.com>.
     *
     * Revision 16: September 22, 2005
     *   Workarounds for some IE 5.5 deficiencies.
     *   Fixed problem with prefix node tests on attribute nodes.
     *
     * Revision 15: May 21, 2005
     *   Fixed problem with QName node tests on elements with an xmlns="...".
     *
     * Revision 14: May 19, 2005
     *   Fixed QName node tests on attribute node regression.
     *
     * Revision 13: May 3, 2005
     *   Node tests are case insensitive now if working in an HTML DOM.
     *
     * Revision 12: April 26, 2005
     *   Updated licence.  Slight code changes to enable use of Dean
     *   Edwards' script compression, http://dean.edwards.name/packer/ .
     *
     * Revision 11: April 23, 2005
     *   Fixed bug with 'and' and 'or' operators, fix thanks to
     *   Sandy McArthur <sandy (at) mcarthur.org>.
     *
     * Revision 10: April 15, 2005
     *   Added support for a virtual root node, supposedly helpful for
     *   implementing XForms.  Fixed problem with QName node tests and
     *   the parent axis.
     *
     * Revision 9: March 17, 2005
     *   Namespace resolver tweaked so using the document node as the context
     *   for namespace lookups is equivalent to using the document element.
     *
     * Revision 8: February 13, 2005
     *   Handle implicit declaration of 'xmlns' namespace prefix.
     *   Fixed bug when comparing nodesets.
     *   Instance data can now be associated with a FunctionResolver, and
     *     workaround for MSXML not supporting 'localName' and 'getElementById',
     *     thanks to Grant Gongaware.
     *   Fix a few problems when the context node is the root node.
     *
     * Revision 7: February 11, 2005
     *   Default namespace resolver fix from Grant Gongaware
     *   <grant (at) gongaware.com>.
     *
     * Revision 6: February 10, 2005
     *   Fixed bug in 'number' function.
     *
     * Revision 5: February 9, 2005
     *   Fixed bug where text nodes not getting converted to string values.
     *
     * Revision 4: January 21, 2005
     *   Bug in 'name' function, fix thanks to Bill Edney.
     *   Fixed incorrect processing of namespace nodes.
     *   Fixed NamespaceResolver to resolve 'xml' namespace.
     *   Implemented union '|' operator.
     *
     * Revision 3: January 14, 2005
     *   Fixed bug with nodeset comparisons, bug lexing < and >.
     *
     * Revision 2: October 26, 2004
     *   QName node test namespace handling fixed.  Few other bug fixes.
     *
     * Revision 1: August 13, 2004
     *   Bug fixes from William J. Edney <bedney (at) technicalpursuit.com>.
     *   Added minimal licence.
     *
     * Initial version: June 14, 2004
     */

    // non-node wrapper
    var xpath = exports;

    (function(exports) {

    // functional helpers
    function curry( func ) {
        var slice = Array.prototype.slice,
            totalargs = func.length,
            partial = function( args, fn ) {
                return function( ) {
                    return fn.apply( this, args.concat( slice.call( arguments ) ) );
                }
            },
            fn = function( ) {
                var args = slice.call( arguments );
                return ( args.length < totalargs ) ?
                    partial( args, fn ) :
                    func.apply( this, slice.apply( arguments, [ 0, totalargs ] ) );
            };
        return fn;
    }

    var forEach = curry(function (f, xs) {
    	for (var i = 0; i < xs.length; i += 1) {
    		f(xs[i], i, xs);
    	}
    });

    var reduce = curry(function (f, seed, xs) {
    	var acc = seed;

    	forEach(function (x, i) { acc = f(acc, x, i); }, xs);

    	return acc;
    });

    var map = curry(function (f, xs) { 
    	var mapped = new Array(xs.length);
    	
    	forEach(function (x, i) { mapped[i] = f(x); }, xs);

    	return mapped;
    });

    var filter = curry(function (f, xs) {
    	var filtered = [];
    	
    	forEach(function (x, i) { if(f(x, i)) { filtered.push(x); } }, xs);
    	
    	return filtered;
    });

    function compose() {
        if (arguments.length === 0) { throw new Error('compose requires at least one argument'); }

        var funcs = Array.prototype.slice.call(arguments).reverse();
    	
        var f0 = funcs[0];
        var fRem = funcs.slice(1);

        return function () {
            return reduce(function (acc, next) {
                return next(acc);
            }, f0.apply(null, arguments), fRem);
        };
    }

    var includes = curry(function (values, value) {
    	for (var i = 0; i < values.length; i += 1) {
    		if (values[i] === value){
    			return true;
    		}
    	}
    	
    	return false;
    });

    function always(value) { return function () { return value ;} }

    var prop = curry(function (name, obj) { return obj[name]; });

    function toString (x) { return x.toString(); }
    var join = curry(function (s, xs) { return xs.join(s); });
    var wrap = curry(function (pref, suf, str) { return pref + str + suf; });

    function assign(target) { // .length of function is 2
        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }

        return to;
    }

    // XPathParser ///////////////////////////////////////////////////////////////

    XPathParser.prototype = new Object();
    XPathParser.prototype.constructor = XPathParser;
    XPathParser.superclass = Object.prototype;

    function XPathParser() {
    	this.init();
    }

    XPathParser.prototype.init = function() {
    	this.reduceActions = [];

    	this.reduceActions[3] = function(rhs) {
    		return new OrOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[5] = function(rhs) {
    		return new AndOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[7] = function(rhs) {
    		return new EqualsOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[8] = function(rhs) {
    		return new NotEqualOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[10] = function(rhs) {
    		return new LessThanOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[11] = function(rhs) {
    		return new GreaterThanOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[12] = function(rhs) {
    		return new LessThanOrEqualOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[13] = function(rhs) {
    		return new GreaterThanOrEqualOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[15] = function(rhs) {
    		return new PlusOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[16] = function(rhs) {
    		return new MinusOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[18] = function(rhs) {
    		return new MultiplyOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[19] = function(rhs) {
    		return new DivOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[20] = function(rhs) {
    		return new ModOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[22] = function(rhs) {
    		return new UnaryMinusOperation(rhs[1]);
    	};
    	this.reduceActions[24] = function(rhs) {
    		return new BarOperation(rhs[0], rhs[2]);
    	};
    	this.reduceActions[25] = function(rhs) {
    		return new PathExpr(undefined, undefined, rhs[0]);
    	};
    	this.reduceActions[27] = function(rhs) {
    		rhs[0].locationPath = rhs[2];
    		return rhs[0];
    	};
    	this.reduceActions[28] = function(rhs) {
    		rhs[0].locationPath = rhs[2];
    		rhs[0].locationPath.steps.unshift(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
    		return rhs[0];
    	};
    	this.reduceActions[29] = function(rhs) {
    		return new PathExpr(rhs[0], [], undefined);
    	};
    	this.reduceActions[30] = function(rhs) {
    		if (Utilities.instance_of(rhs[0], PathExpr)) {
    			if (rhs[0].filterPredicates == undefined) {
    				rhs[0].filterPredicates = [];
    			}
    			rhs[0].filterPredicates.push(rhs[1]);
    			return rhs[0];
    		} else {
    			return new PathExpr(rhs[0], [rhs[1]], undefined);
    		}
    	};
    	this.reduceActions[32] = function(rhs) {
    		return rhs[1];
    	};
    	this.reduceActions[33] = function(rhs) {
    		return new XString(rhs[0]);
    	};
    	this.reduceActions[34] = function(rhs) {
    		return new XNumber(rhs[0]);
    	};
    	this.reduceActions[36] = function(rhs) {
    		return new FunctionCall(rhs[0], []);
    	};
    	this.reduceActions[37] = function(rhs) {
    		return new FunctionCall(rhs[0], rhs[2]);
    	};
    	this.reduceActions[38] = function(rhs) {
    		return [ rhs[0] ];
    	};
    	this.reduceActions[39] = function(rhs) {
    		rhs[2].unshift(rhs[0]);
    		return rhs[2];
    	};
    	this.reduceActions[43] = function(rhs) {
    		return new LocationPath(true, []);
    	};
    	this.reduceActions[44] = function(rhs) {
    		rhs[1].absolute = true;
    		return rhs[1];
    	};
    	this.reduceActions[46] = function(rhs) {
    		return new LocationPath(false, [ rhs[0] ]);
    	};
    	this.reduceActions[47] = function(rhs) {
    		rhs[0].steps.push(rhs[2]);
    		return rhs[0];
    	};
    	this.reduceActions[49] = function(rhs) {
    		return new Step(rhs[0], rhs[1], []);
    	};
    	this.reduceActions[50] = function(rhs) {
    		return new Step(Step.CHILD, rhs[0], []);
    	};
    	this.reduceActions[51] = function(rhs) {
    		return new Step(rhs[0], rhs[1], rhs[2]);
    	};
    	this.reduceActions[52] = function(rhs) {
    		return new Step(Step.CHILD, rhs[0], rhs[1]);
    	};
    	this.reduceActions[54] = function(rhs) {
    		return [ rhs[0] ];
    	};
    	this.reduceActions[55] = function(rhs) {
    		rhs[1].unshift(rhs[0]);
    		return rhs[1];
    	};
    	this.reduceActions[56] = function(rhs) {
    		if (rhs[0] == "ancestor") {
    			return Step.ANCESTOR;
    		} else if (rhs[0] == "ancestor-or-self") {
    			return Step.ANCESTORORSELF;
    		} else if (rhs[0] == "attribute") {
    			return Step.ATTRIBUTE;
    		} else if (rhs[0] == "child") {
    			return Step.CHILD;
    		} else if (rhs[0] == "descendant") {
    			return Step.DESCENDANT;
    		} else if (rhs[0] == "descendant-or-self") {
    			return Step.DESCENDANTORSELF;
    		} else if (rhs[0] == "following") {
    			return Step.FOLLOWING;
    		} else if (rhs[0] == "following-sibling") {
    			return Step.FOLLOWINGSIBLING;
    		} else if (rhs[0] == "namespace") {
    			return Step.NAMESPACE;
    		} else if (rhs[0] == "parent") {
    			return Step.PARENT;
    		} else if (rhs[0] == "preceding") {
    			return Step.PRECEDING;
    		} else if (rhs[0] == "preceding-sibling") {
    			return Step.PRECEDINGSIBLING;
    		} else if (rhs[0] == "self") {
    			return Step.SELF;
    		}
    		return -1;
    	};
    	this.reduceActions[57] = function(rhs) {
    		return Step.ATTRIBUTE;
    	};
    	this.reduceActions[59] = function(rhs) {
    		if (rhs[0] == "comment") {
    			return NodeTest.commentTest;
    		} else if (rhs[0] == "text") {
    			return NodeTest.textTest;
    		} else if (rhs[0] == "processing-instruction") {
    			return NodeTest.anyPiTest;
    		} else if (rhs[0] == "node") {
    			return NodeTest.nodeTest;
    		}
    		return new NodeTest(-1, undefined);
    	};
    	this.reduceActions[60] = function(rhs) {
    		return new NodeTest.PITest(rhs[2]);
    	};
    	this.reduceActions[61] = function(rhs) {
    		return rhs[1];
    	};
    	this.reduceActions[63] = function(rhs) {
    		rhs[1].absolute = true;
    		rhs[1].steps.unshift(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
    		return rhs[1];
    	};
    	this.reduceActions[64] = function(rhs) {
    		rhs[0].steps.push(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
    		rhs[0].steps.push(rhs[2]);
    		return rhs[0];
    	};
    	this.reduceActions[65] = function(rhs) {
    		return new Step(Step.SELF, NodeTest.nodeTest, []);
    	};
    	this.reduceActions[66] = function(rhs) {
    		return new Step(Step.PARENT, NodeTest.nodeTest, []);
    	};
    	this.reduceActions[67] = function(rhs) {
    		return new VariableReference(rhs[1]);
    	};
    	this.reduceActions[68] = function(rhs) {
    		return NodeTest.nameTestAny;
    	};
    	this.reduceActions[69] = function(rhs) {
    		return new NodeTest.NameTestPrefixAny(rhs[0].split(':')[0]);
    	};
    	this.reduceActions[70] = function(rhs) {
    		return new NodeTest.NameTestQName(rhs[0]);
    	};
    };

    XPathParser.actionTable = [
    	" s s        sssssssss    s ss  s  ss",
    	"                 s                  ",
    	"r  rrrrrrrrr         rrrrrrr rr  r  ",
    	"                rrrrr               ",
    	" s s        sssssssss    s ss  s  ss",
    	"rs  rrrrrrrr s  sssssrrrrrr  rrs rs ",
    	" s s        sssssssss    s ss  s  ss",
    	"                            s       ",
    	"                            s       ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"  s                                 ",
    	"                            s       ",
    	" s           s  sssss          s  s ",
    	"r  rrrrrrrrr         rrrrrrr rr  r  ",
    	"a                                   ",
    	"r       s                    rr  r  ",
    	"r      sr                    rr  r  ",
    	"r   s  rr            s       rr  r  ",
    	"r   rssrr            rss     rr  r  ",
    	"r   rrrrr            rrrss   rr  r  ",
    	"r   rrrrrsss         rrrrr   rr  r  ",
    	"r   rrrrrrrr         rrrrr   rr  r  ",
    	"r   rrrrrrrr         rrrrrs  rr  r  ",
    	"r   rrrrrrrr         rrrrrr  rr  r  ",
    	"r   rrrrrrrr         rrrrrr  rr  r  ",
    	"r  srrrrrrrr         rrrrrrs rr sr  ",
    	"r  srrrrrrrr         rrrrrrs rr  r  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"r   rrrrrrrr         rrrrrr  rr  r  ",
    	"r   rrrrrrrr         rrrrrr  rr  r  ",
    	"r  rrrrrrrrr         rrrrrrr rr  r  ",
    	"r  rrrrrrrrr         rrrrrrr rr  r  ",
    	"                sssss               ",
    	"r  rrrrrrrrr         rrrrrrr rr sr  ",
    	"r  rrrrrrrrr         rrrrrrr rr  r  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"                             s      ",
    	"r  srrrrrrrr         rrrrrrs rr  r  ",
    	"r   rrrrrrrr         rrrrr   rr  r  ",
    	"              s                     ",
    	"                             s      ",
    	"                rrrrr               ",
    	" s s        sssssssss    s sss s  ss",
    	"r  srrrrrrrr         rrrrrrs rr  r  ",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s s        sssssssss      ss  s  ss",
    	" s s        sssssssss    s ss  s  ss",
    	" s           s  sssss          s  s ",
    	" s           s  sssss          s  s ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	" s           s  sssss          s  s ",
    	" s           s  sssss          s  s ",
    	"r  rrrrrrrrr         rrrrrrr rr sr  ",
    	"r  rrrrrrrrr         rrrrrrr rr sr  ",
    	"r  rrrrrrrrr         rrrrrrr rr  r  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"                             s      ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"                             rr     ",
    	"                             s      ",
    	"                             rs     ",
    	"r      sr                    rr  r  ",
    	"r   s  rr            s       rr  r  ",
    	"r   rssrr            rss     rr  r  ",
    	"r   rssrr            rss     rr  r  ",
    	"r   rrrrr            rrrss   rr  r  ",
    	"r   rrrrr            rrrss   rr  r  ",
    	"r   rrrrr            rrrss   rr  r  ",
    	"r   rrrrr            rrrss   rr  r  ",
    	"r   rrrrrsss         rrrrr   rr  r  ",
    	"r   rrrrrsss         rrrrr   rr  r  ",
    	"r   rrrrrrrr         rrrrr   rr  r  ",
    	"r   rrrrrrrr         rrrrr   rr  r  ",
    	"r   rrrrrrrr         rrrrr   rr  r  ",
    	"r   rrrrrrrr         rrrrrr  rr  r  ",
    	"                                 r  ",
    	"                                 s  ",
    	"r  srrrrrrrr         rrrrrrs rr  r  ",
    	"r  srrrrrrrr         rrrrrrs rr  r  ",
    	"r  rrrrrrrrr         rrrrrrr rr  r  ",
    	"r  rrrrrrrrr         rrrrrrr rr  r  ",
    	"r  rrrrrrrrr         rrrrrrr rr  r  ",
    	"r  rrrrrrrrr         rrrrrrr rr  r  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	" s s        sssssssss    s ss  s  ss",
    	"r  rrrrrrrrr         rrrrrrr rr rr  ",
    	"                             r      "
    ];

    XPathParser.actionTableNumber = [
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	"                 J                  ",
    	"a  aaaaaaaaa         aaaaaaa aa  a  ",
    	"                YYYYY               ",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	"K1  KKKKKKKK .  +*)('KKKKKK  KK# K\" ",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	"                            N       ",
    	"                            O       ",
    	"e  eeeeeeeee         eeeeeee ee ee  ",
    	"f  fffffffff         fffffff ff ff  ",
    	"d  ddddddddd         ddddddd dd dd  ",
    	"B  BBBBBBBBB         BBBBBBB BB BB  ",
    	"A  AAAAAAAAA         AAAAAAA AA AA  ",
    	"  P                                 ",
    	"                            Q       ",
    	" 1           .  +*)('          #  \" ",
    	"b  bbbbbbbbb         bbbbbbb bb  b  ",
    	"                                    ",
    	"!       S                    !!  !  ",
    	"\"      T\"                    \"\"  \"  ",
    	"$   V  $$            U       $$  $  ",
    	"&   &ZY&&            &XW     &&  &  ",
    	")   )))))            )))\\[   ))  )  ",
    	".   ....._^]         .....   ..  .  ",
    	"1   11111111         11111   11  1  ",
    	"5   55555555         55555`  55  5  ",
    	"7   77777777         777777  77  7  ",
    	"9   99999999         999999  99  9  ",
    	":  c::::::::         ::::::b :: a:  ",
    	"I  fIIIIIIII         IIIIIIe II  I  ",
    	"=  =========         ======= == ==  ",
    	"?  ?????????         ??????? ?? ??  ",
    	"C  CCCCCCCCC         CCCCCCC CC CC  ",
    	"J   JJJJJJJJ         JJJJJJ  JJ  J  ",
    	"M   MMMMMMMM         MMMMMM  MM  M  ",
    	"N  NNNNNNNNN         NNNNNNN NN  N  ",
    	"P  PPPPPPPPP         PPPPPPP PP  P  ",
    	"                +*)('               ",
    	"R  RRRRRRRRR         RRRRRRR RR aR  ",
    	"U  UUUUUUUUU         UUUUUUU UU  U  ",
    	"Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ",
    	"c  ccccccccc         ccccccc cc cc  ",
    	"                             j      ",
    	"L  fLLLLLLLL         LLLLLLe LL  L  ",
    	"6   66666666         66666   66  6  ",
    	"              k                     ",
    	"                             l      ",
    	"                XXXXX               ",
    	" 1 0        /.-,+*)('    & %$m #  \"!",
    	"_  f________         ______e __  _  ",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1 0        /.-,+*)('      %$  #  \"!",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	" 1           .  +*)('          #  \" ",
    	" 1           .  +*)('          #  \" ",
    	">  >>>>>>>>>         >>>>>>> >> >>  ",
    	" 1           .  +*)('          #  \" ",
    	" 1           .  +*)('          #  \" ",
    	"Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ",
    	"V  VVVVVVVVV         VVVVVVV VV aV  ",
    	"T  TTTTTTTTT         TTTTTTT TT  T  ",
    	"@  @@@@@@@@@         @@@@@@@ @@ @@  ",
    	"                             \x87      ",
    	"[  [[[[[[[[[         [[[[[[[ [[ [[  ",
    	"D  DDDDDDDDD         DDDDDDD DD DD  ",
    	"                             HH     ",
    	"                             \x88      ",
    	"                             F\x89     ",
    	"#      T#                    ##  #  ",
    	"%   V  %%            U       %%  %  ",
    	"'   'ZY''            'XW     ''  '  ",
    	"(   (ZY((            (XW     ((  (  ",
    	"+   +++++            +++\\[   ++  +  ",
    	"*   *****            ***\\[   **  *  ",
    	"-   -----            ---\\[   --  -  ",
    	",   ,,,,,            ,,,\\[   ,,  ,  ",
    	"0   00000_^]         00000   00  0  ",
    	"/   /////_^]         /////   //  /  ",
    	"2   22222222         22222   22  2  ",
    	"3   33333333         33333   33  3  ",
    	"4   44444444         44444   44  4  ",
    	"8   88888888         888888  88  8  ",
    	"                                 ^  ",
    	"                                 \x8a  ",
    	";  f;;;;;;;;         ;;;;;;e ;;  ;  ",
    	"<  f<<<<<<<<         <<<<<<e <<  <  ",
    	"O  OOOOOOOOO         OOOOOOO OO  O  ",
    	"`  `````````         ``````` ``  `  ",
    	"S  SSSSSSSSS         SSSSSSS SS  S  ",
    	"W  WWWWWWWWW         WWWWWWW WW  W  ",
    	"\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ",
    	"E  EEEEEEEEE         EEEEEEE EE EE  ",
    	" 1 0        /.-,+*)('    & %$  #  \"!",
    	"]  ]]]]]]]]]         ]]]]]]] ]] ]]  ",
    	"                             G      "
    ];

    XPathParser.gotoTable = [
    	"3456789:;<=>?@ AB  CDEFGH IJ ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"L456789:;<=>?@ AB  CDEFGH IJ ",
    	"            M        EFGH IJ ",
    	"       N;<=>?@ AB  CDEFGH IJ ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"            S        EFGH IJ ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"              e              ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                        h  J ",
    	"              i          j   ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"o456789:;<=>?@ ABpqCDEFGH IJ ",
    	"                             ",
    	"  r6789:;<=>?@ AB  CDEFGH IJ ",
    	"   s789:;<=>?@ AB  CDEFGH IJ ",
    	"    t89:;<=>?@ AB  CDEFGH IJ ",
    	"    u89:;<=>?@ AB  CDEFGH IJ ",
    	"     v9:;<=>?@ AB  CDEFGH IJ ",
    	"     w9:;<=>?@ AB  CDEFGH IJ ",
    	"     x9:;<=>?@ AB  CDEFGH IJ ",
    	"     y9:;<=>?@ AB  CDEFGH IJ ",
    	"      z:;<=>?@ AB  CDEFGH IJ ",
    	"      {:;<=>?@ AB  CDEFGH IJ ",
    	"       |;<=>?@ AB  CDEFGH IJ ",
    	"       };<=>?@ AB  CDEFGH IJ ",
    	"       ~;<=>?@ AB  CDEFGH IJ ",
    	"         \x7f=>?@ AB  CDEFGH IJ ",
    	"\x80456789:;<=>?@ AB  CDEFGH IJ\x81",
    	"            \x82        EFGH IJ ",
    	"            \x83        EFGH IJ ",
    	"                             ",
    	"                     \x84 GH IJ ",
    	"                     \x85 GH IJ ",
    	"              i          \x86   ",
    	"              i          \x87   ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"                             ",
    	"o456789:;<=>?@ AB\x8cqCDEFGH IJ ",
    	"                             ",
    	"                             "
    ];

    XPathParser.productions = [
    	[1, 1, 2],
    	[2, 1, 3],
    	[3, 1, 4],
    	[3, 3, 3, -9, 4],
    	[4, 1, 5],
    	[4, 3, 4, -8, 5],
    	[5, 1, 6],
    	[5, 3, 5, -22, 6],
    	[5, 3, 5, -5, 6],
    	[6, 1, 7],
    	[6, 3, 6, -23, 7],
    	[6, 3, 6, -24, 7],
    	[6, 3, 6, -6, 7],
    	[6, 3, 6, -7, 7],
    	[7, 1, 8],
    	[7, 3, 7, -25, 8],
    	[7, 3, 7, -26, 8],
    	[8, 1, 9],
    	[8, 3, 8, -12, 9],
    	[8, 3, 8, -11, 9],
    	[8, 3, 8, -10, 9],
    	[9, 1, 10],
    	[9, 2, -26, 9],
    	[10, 1, 11],
    	[10, 3, 10, -27, 11],
    	[11, 1, 12],
    	[11, 1, 13],
    	[11, 3, 13, -28, 14],
    	[11, 3, 13, -4, 14],
    	[13, 1, 15],
    	[13, 2, 13, 16],
    	[15, 1, 17],
    	[15, 3, -29, 2, -30],
    	[15, 1, -15],
    	[15, 1, -16],
    	[15, 1, 18],
    	[18, 3, -13, -29, -30],
    	[18, 4, -13, -29, 19, -30],
    	[19, 1, 20],
    	[19, 3, 20, -31, 19],
    	[20, 1, 2],
    	[12, 1, 14],
    	[12, 1, 21],
    	[21, 1, -28],
    	[21, 2, -28, 14],
    	[21, 1, 22],
    	[14, 1, 23],
    	[14, 3, 14, -28, 23],
    	[14, 1, 24],
    	[23, 2, 25, 26],
    	[23, 1, 26],
    	[23, 3, 25, 26, 27],
    	[23, 2, 26, 27],
    	[23, 1, 28],
    	[27, 1, 16],
    	[27, 2, 16, 27],
    	[25, 2, -14, -3],
    	[25, 1, -32],
    	[26, 1, 29],
    	[26, 3, -20, -29, -30],
    	[26, 4, -21, -29, -15, -30],
    	[16, 3, -33, 30, -34],
    	[30, 1, 2],
    	[22, 2, -4, 14],
    	[24, 3, 14, -4, 23],
    	[28, 1, -35],
    	[28, 1, -2],
    	[17, 2, -36, -18],
    	[29, 1, -17],
    	[29, 1, -19],
    	[29, 1, -18]
    ];

    XPathParser.DOUBLEDOT = 2;
    XPathParser.DOUBLECOLON = 3;
    XPathParser.DOUBLESLASH = 4;
    XPathParser.NOTEQUAL = 5;
    XPathParser.LESSTHANOREQUAL = 6;
    XPathParser.GREATERTHANOREQUAL = 7;
    XPathParser.AND = 8;
    XPathParser.OR = 9;
    XPathParser.MOD = 10;
    XPathParser.DIV = 11;
    XPathParser.MULTIPLYOPERATOR = 12;
    XPathParser.FUNCTIONNAME = 13;
    XPathParser.AXISNAME = 14;
    XPathParser.LITERAL = 15;
    XPathParser.NUMBER = 16;
    XPathParser.ASTERISKNAMETEST = 17;
    XPathParser.QNAME = 18;
    XPathParser.NCNAMECOLONASTERISK = 19;
    XPathParser.NODETYPE = 20;
    XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL = 21;
    XPathParser.EQUALS = 22;
    XPathParser.LESSTHAN = 23;
    XPathParser.GREATERTHAN = 24;
    XPathParser.PLUS = 25;
    XPathParser.MINUS = 26;
    XPathParser.BAR = 27;
    XPathParser.SLASH = 28;
    XPathParser.LEFTPARENTHESIS = 29;
    XPathParser.RIGHTPARENTHESIS = 30;
    XPathParser.COMMA = 31;
    XPathParser.AT = 32;
    XPathParser.LEFTBRACKET = 33;
    XPathParser.RIGHTBRACKET = 34;
    XPathParser.DOT = 35;
    XPathParser.DOLLAR = 36;

    XPathParser.prototype.tokenize = function(s1) {
    	var types = [];
    	var values = [];
    	var s = s1 + '\0';

    	var pos = 0;
    	var c = s.charAt(pos++);
    	while (1) {
    		while (c == ' ' || c == '\t' || c == '\r' || c == '\n') {
    			c = s.charAt(pos++);
    		}
    		if (c == '\0' || pos >= s.length) {
    			break;
    		}

    		if (c == '(') {
    			types.push(XPathParser.LEFTPARENTHESIS);
    			values.push(c);
    			c = s.charAt(pos++);
    			continue;
    		}
    		if (c == ')') {
    			types.push(XPathParser.RIGHTPARENTHESIS);
    			values.push(c);
    			c = s.charAt(pos++);
    			continue;
    		}
    		if (c == '[') {
    			types.push(XPathParser.LEFTBRACKET);
    			values.push(c);
    			c = s.charAt(pos++);
    			continue;
    		}
    		if (c == ']') {
    			types.push(XPathParser.RIGHTBRACKET);
    			values.push(c);
    			c = s.charAt(pos++);
    			continue;
    		}
    		if (c == '@') {
    			types.push(XPathParser.AT);
    			values.push(c);
    			c = s.charAt(pos++);
    			continue;
    		}
    		if (c == ',') {
    			types.push(XPathParser.COMMA);
    			values.push(c);
    			c = s.charAt(pos++);
    			continue;
    		}
    		if (c == '|') {
    			types.push(XPathParser.BAR);
    			values.push(c);
    			c = s.charAt(pos++);
    			continue;
    		}
    		if (c == '+') {
    			types.push(XPathParser.PLUS);
    			values.push(c);
    			c = s.charAt(pos++);
    			continue;
    		}
    		if (c == '-') {
    			types.push(XPathParser.MINUS);
    			values.push(c);
    			c = s.charAt(pos++);
    			continue;
    		}
    		if (c == '=') {
    			types.push(XPathParser.EQUALS);
    			values.push(c);
    			c = s.charAt(pos++);
    			continue;
    		}
    		if (c == '$') {
    			types.push(XPathParser.DOLLAR);
    			values.push(c);
    			c = s.charAt(pos++);
    			continue;
    		}

    		if (c == '.') {
    			c = s.charAt(pos++);
    			if (c == '.') {
    				types.push(XPathParser.DOUBLEDOT);
    				values.push("..");
    				c = s.charAt(pos++);
    				continue;
    			}
    			if (c >= '0' && c <= '9') {
    				var number = "." + c;
    				c = s.charAt(pos++);
    				while (c >= '0' && c <= '9') {
    					number += c;
    					c = s.charAt(pos++);
    				}
    				types.push(XPathParser.NUMBER);
    				values.push(number);
    				continue;
    			}
    			types.push(XPathParser.DOT);
    			values.push('.');
    			continue;
    		}

    		if (c == '\'' || c == '"') {
    			var delimiter = c;
    			var literal = "";
    			while (pos < s.length && (c = s.charAt(pos)) !== delimiter) {
    				literal += c;
                    pos += 1;
    			}
                if (c !== delimiter) {
                    throw XPathException.fromMessage("Unterminated string literal: " + delimiter + literal);
                }
                pos += 1;
    			types.push(XPathParser.LITERAL);
    			values.push(literal);
    			c = s.charAt(pos++);
    			continue;
    		}

    		if (c >= '0' && c <= '9') {
    			var number = c;
    			c = s.charAt(pos++);
    			while (c >= '0' && c <= '9') {
    				number += c;
    				c = s.charAt(pos++);
    			}
    			if (c == '.') {
    				if (s.charAt(pos) >= '0' && s.charAt(pos) <= '9') {
    					number += c;
    					number += s.charAt(pos++);
    					c = s.charAt(pos++);
    					while (c >= '0' && c <= '9') {
    						number += c;
    						c = s.charAt(pos++);
    					}
    				}
    			}
    			types.push(XPathParser.NUMBER);
    			values.push(number);
    			continue;
    		}

    		if (c == '*') {
    			if (types.length > 0) {
    				var last = types[types.length - 1];
    				if (last != XPathParser.AT
    						&& last != XPathParser.DOUBLECOLON
    						&& last != XPathParser.LEFTPARENTHESIS
    						&& last != XPathParser.LEFTBRACKET
    						&& last != XPathParser.AND
    						&& last != XPathParser.OR
    						&& last != XPathParser.MOD
    						&& last != XPathParser.DIV
    						&& last != XPathParser.MULTIPLYOPERATOR
    						&& last != XPathParser.SLASH
    						&& last != XPathParser.DOUBLESLASH
    						&& last != XPathParser.BAR
    						&& last != XPathParser.PLUS
    						&& last != XPathParser.MINUS
    						&& last != XPathParser.EQUALS
    						&& last != XPathParser.NOTEQUAL
    						&& last != XPathParser.LESSTHAN
    						&& last != XPathParser.LESSTHANOREQUAL
    						&& last != XPathParser.GREATERTHAN
    						&& last != XPathParser.GREATERTHANOREQUAL) {
    					types.push(XPathParser.MULTIPLYOPERATOR);
    					values.push(c);
    					c = s.charAt(pos++);
    					continue;
    				}
    			}
    			types.push(XPathParser.ASTERISKNAMETEST);
    			values.push(c);
    			c = s.charAt(pos++);
    			continue;
    		}

    		if (c == ':') {
    			if (s.charAt(pos) == ':') {
    				types.push(XPathParser.DOUBLECOLON);
    				values.push("::");
    				pos++;
    				c = s.charAt(pos++);
    				continue;
    			}
    		}

    		if (c == '/') {
    			c = s.charAt(pos++);
    			if (c == '/') {
    				types.push(XPathParser.DOUBLESLASH);
    				values.push("//");
    				c = s.charAt(pos++);
    				continue;
    			}
    			types.push(XPathParser.SLASH);
    			values.push('/');
    			continue;
    		}

    		if (c == '!') {
    			if (s.charAt(pos) == '=') {
    				types.push(XPathParser.NOTEQUAL);
    				values.push("!=");
    				pos++;
    				c = s.charAt(pos++);
    				continue;
    			}
    		}

    		if (c == '<') {
    			if (s.charAt(pos) == '=') {
    				types.push(XPathParser.LESSTHANOREQUAL);
    				values.push("<=");
    				pos++;
    				c = s.charAt(pos++);
    				continue;
    			}
    			types.push(XPathParser.LESSTHAN);
    			values.push('<');
    			c = s.charAt(pos++);
    			continue;
    		}

    		if (c == '>') {
    			if (s.charAt(pos) == '=') {
    				types.push(XPathParser.GREATERTHANOREQUAL);
    				values.push(">=");
    				pos++;
    				c = s.charAt(pos++);
    				continue;
    			}
    			types.push(XPathParser.GREATERTHAN);
    			values.push('>');
    			c = s.charAt(pos++);
    			continue;
    		}

    		if (c == '_' || Utilities.isLetter(c.charCodeAt(0))) {
    			var name = c;
    			c = s.charAt(pos++);
    			while (Utilities.isNCNameChar(c.charCodeAt(0))) {
    				name += c;
    				c = s.charAt(pos++);
    			}
    			if (types.length > 0) {
    				var last = types[types.length - 1];
    				if (last != XPathParser.AT
    						&& last != XPathParser.DOUBLECOLON
    						&& last != XPathParser.LEFTPARENTHESIS
    						&& last != XPathParser.LEFTBRACKET
    						&& last != XPathParser.AND
    						&& last != XPathParser.OR
    						&& last != XPathParser.MOD
    						&& last != XPathParser.DIV
    						&& last != XPathParser.MULTIPLYOPERATOR
    						&& last != XPathParser.SLASH
    						&& last != XPathParser.DOUBLESLASH
    						&& last != XPathParser.BAR
    						&& last != XPathParser.PLUS
    						&& last != XPathParser.MINUS
    						&& last != XPathParser.EQUALS
    						&& last != XPathParser.NOTEQUAL
    						&& last != XPathParser.LESSTHAN
    						&& last != XPathParser.LESSTHANOREQUAL
    						&& last != XPathParser.GREATERTHAN
    						&& last != XPathParser.GREATERTHANOREQUAL) {
    					if (name == "and") {
    						types.push(XPathParser.AND);
    						values.push(name);
    						continue;
    					}
    					if (name == "or") {
    						types.push(XPathParser.OR);
    						values.push(name);
    						continue;
    					}
    					if (name == "mod") {
    						types.push(XPathParser.MOD);
    						values.push(name);
    						continue;
    					}
    					if (name == "div") {
    						types.push(XPathParser.DIV);
    						values.push(name);
    						continue;
    					}
    				}
    			}
    			if (c == ':') {
    				if (s.charAt(pos) == '*') {
    					types.push(XPathParser.NCNAMECOLONASTERISK);
    					values.push(name + ":*");
    					pos++;
    					c = s.charAt(pos++);
    					continue;
    				}
    				if (s.charAt(pos) == '_' || Utilities.isLetter(s.charCodeAt(pos))) {
    					name += ':';
    					c = s.charAt(pos++);
    					while (Utilities.isNCNameChar(c.charCodeAt(0))) {
    						name += c;
    						c = s.charAt(pos++);
    					}
    					if (c == '(') {
    						types.push(XPathParser.FUNCTIONNAME);
    						values.push(name);
    						continue;
    					}
    					types.push(XPathParser.QNAME);
    					values.push(name);
    					continue;
    				}
    				if (s.charAt(pos) == ':') {
    					types.push(XPathParser.AXISNAME);
    					values.push(name);
    					continue;
    				}
    			}
    			if (c == '(') {
    				if (name == "comment" || name == "text" || name == "node") {
    					types.push(XPathParser.NODETYPE);
    					values.push(name);
    					continue;
    				}
    				if (name == "processing-instruction") {
    					if (s.charAt(pos) == ')') {
    						types.push(XPathParser.NODETYPE);
    					} else {
    						types.push(XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL);
    					}
    					values.push(name);
    					continue;
    				}
    				types.push(XPathParser.FUNCTIONNAME);
    				values.push(name);
    				continue;
    			}
    			types.push(XPathParser.QNAME);
    			values.push(name);
    			continue;
    		}

    		throw new Error("Unexpected character " + c);
    	}
    	types.push(1);
    	values.push("[EOF]");
    	return [types, values];
    };

    XPathParser.SHIFT = 's';
    XPathParser.REDUCE = 'r';
    XPathParser.ACCEPT = 'a';

    XPathParser.prototype.parse = function(s) {
    	var types;
    	var values;
    	var res = this.tokenize(s);
    	if (res == undefined) {
    		return undefined;
    	}
    	types = res[0];
    	values = res[1];
    	var tokenPos = 0;
    	var state = [];
    	var tokenType = [];
    	var tokenValue = [];
    	var s;
    	var a;
    	var t;

    	state.push(0);
    	tokenType.push(1);
    	tokenValue.push("_S");

    	a = types[tokenPos];
    	t = values[tokenPos++];
    	while (1) {
    		s = state[state.length - 1];
    		switch (XPathParser.actionTable[s].charAt(a - 1)) {
    			case XPathParser.SHIFT:
    				tokenType.push(-a);
    				tokenValue.push(t);
    				state.push(XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32);
    				a = types[tokenPos];
    				t = values[tokenPos++];
    				break;
    			case XPathParser.REDUCE:
    				var num = XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][1];
    				var rhs = [];
    				for (var i = 0; i < num; i++) {
    					tokenType.pop();
    					rhs.unshift(tokenValue.pop());
    					state.pop();
    				}
    				var s_ = state[state.length - 1];
    				tokenType.push(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0]);
    				if (this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32] == undefined) {
    					tokenValue.push(rhs[0]);
    				} else {
    					tokenValue.push(this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32](rhs));
    				}
    				state.push(XPathParser.gotoTable[s_].charCodeAt(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0] - 2) - 33);
    				break;
    			case XPathParser.ACCEPT:
    				return new XPath(tokenValue.pop());
    			default:
    				throw new Error("XPath parse error");
    		}
    	}
    };

    // XPath /////////////////////////////////////////////////////////////////////

    XPath.prototype = new Object();
    XPath.prototype.constructor = XPath;
    XPath.superclass = Object.prototype;

    function XPath(e) {
    	this.expression = e;
    }

    XPath.prototype.toString = function() {
    	return this.expression.toString();
    };

    function setIfUnset(obj, prop, value) {
    	if (!(prop in obj)) {
    		obj[prop] = value;
    	}
    }

    XPath.prototype.evaluate = function(c) {
    	c.contextNode = c.expressionContextNode;
    	c.contextSize = 1;
    	c.contextPosition = 1;

    	// [2017-11-25] Removed usage of .implementation.hasFeature() since it does
    	//              not reliably detect HTML DOMs (always returns false in xmldom and true in browsers)
    	if (c.isHtml) {
    		setIfUnset(c, 'caseInsensitive', true);
    		setIfUnset(c, 'allowAnyNamespaceForNoPrefix', true);
    	}
    	
        setIfUnset(c, 'caseInsensitive', false);

    	return this.expression.evaluate(c);
    };

    XPath.XML_NAMESPACE_URI = "http://www.w3.org/XML/1998/namespace";
    XPath.XMLNS_NAMESPACE_URI = "http://www.w3.org/2000/xmlns/";

    // Expression ////////////////////////////////////////////////////////////////

    Expression.prototype = new Object();
    Expression.prototype.constructor = Expression;
    Expression.superclass = Object.prototype;

    function Expression() {
    }

    Expression.prototype.init = function() {
    };

    Expression.prototype.toString = function() {
    	return "<Expression>";
    };

    Expression.prototype.evaluate = function(c) {
    	throw new Error("Could not evaluate expression.");
    };

    // UnaryOperation ////////////////////////////////////////////////////////////

    UnaryOperation.prototype = new Expression();
    UnaryOperation.prototype.constructor = UnaryOperation;
    UnaryOperation.superclass = Expression.prototype;

    function UnaryOperation(rhs) {
    	if (arguments.length > 0) {
    		this.init(rhs);
    	}
    }

    UnaryOperation.prototype.init = function(rhs) {
    	this.rhs = rhs;
    };

    // UnaryMinusOperation ///////////////////////////////////////////////////////

    UnaryMinusOperation.prototype = new UnaryOperation();
    UnaryMinusOperation.prototype.constructor = UnaryMinusOperation;
    UnaryMinusOperation.superclass = UnaryOperation.prototype;

    function UnaryMinusOperation(rhs) {
    	if (arguments.length > 0) {
    		this.init(rhs);
    	}
    }

    UnaryMinusOperation.prototype.init = function(rhs) {
    	UnaryMinusOperation.superclass.init.call(this, rhs);
    };

    UnaryMinusOperation.prototype.evaluate = function(c) {
    	return this.rhs.evaluate(c).number().negate();
    };

    UnaryMinusOperation.prototype.toString = function() {
    	return "-" + this.rhs.toString();
    };

    // BinaryOperation ///////////////////////////////////////////////////////////

    BinaryOperation.prototype = new Expression();
    BinaryOperation.prototype.constructor = BinaryOperation;
    BinaryOperation.superclass = Expression.prototype;

    function BinaryOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    BinaryOperation.prototype.init = function(lhs, rhs) {
    	this.lhs = lhs;
    	this.rhs = rhs;
    };

    // OrOperation ///////////////////////////////////////////////////////////////

    OrOperation.prototype = new BinaryOperation();
    OrOperation.prototype.constructor = OrOperation;
    OrOperation.superclass = BinaryOperation.prototype;

    function OrOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    OrOperation.prototype.init = function(lhs, rhs) {
    	OrOperation.superclass.init.call(this, lhs, rhs);
    };

    OrOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " or " + this.rhs.toString() + ")";
    };

    OrOperation.prototype.evaluate = function(c) {
    	var b = this.lhs.evaluate(c).bool();
    	if (b.booleanValue()) {
    		return b;
    	}
    	return this.rhs.evaluate(c).bool();
    };

    // AndOperation //////////////////////////////////////////////////////////////

    AndOperation.prototype = new BinaryOperation();
    AndOperation.prototype.constructor = AndOperation;
    AndOperation.superclass = BinaryOperation.prototype;

    function AndOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    AndOperation.prototype.init = function(lhs, rhs) {
    	AndOperation.superclass.init.call(this, lhs, rhs);
    };

    AndOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " and " + this.rhs.toString() + ")";
    };

    AndOperation.prototype.evaluate = function(c) {
    	var b = this.lhs.evaluate(c).bool();
    	if (!b.booleanValue()) {
    		return b;
    	}
    	return this.rhs.evaluate(c).bool();
    };

    // EqualsOperation ///////////////////////////////////////////////////////////

    EqualsOperation.prototype = new BinaryOperation();
    EqualsOperation.prototype.constructor = EqualsOperation;
    EqualsOperation.superclass = BinaryOperation.prototype;

    function EqualsOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    EqualsOperation.prototype.init = function(lhs, rhs) {
    	EqualsOperation.superclass.init.call(this, lhs, rhs);
    };

    EqualsOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " = " + this.rhs.toString() + ")";
    };

    EqualsOperation.prototype.evaluate = function(c) {
    	return this.lhs.evaluate(c).equals(this.rhs.evaluate(c));
    };

    // NotEqualOperation /////////////////////////////////////////////////////////

    NotEqualOperation.prototype = new BinaryOperation();
    NotEqualOperation.prototype.constructor = NotEqualOperation;
    NotEqualOperation.superclass = BinaryOperation.prototype;

    function NotEqualOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    NotEqualOperation.prototype.init = function(lhs, rhs) {
    	NotEqualOperation.superclass.init.call(this, lhs, rhs);
    };

    NotEqualOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " != " + this.rhs.toString() + ")";
    };

    NotEqualOperation.prototype.evaluate = function(c) {
    	return this.lhs.evaluate(c).notequal(this.rhs.evaluate(c));
    };

    // LessThanOperation /////////////////////////////////////////////////////////

    LessThanOperation.prototype = new BinaryOperation();
    LessThanOperation.prototype.constructor = LessThanOperation;
    LessThanOperation.superclass = BinaryOperation.prototype;

    function LessThanOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    LessThanOperation.prototype.init = function(lhs, rhs) {
    	LessThanOperation.superclass.init.call(this, lhs, rhs);
    };

    LessThanOperation.prototype.evaluate = function(c) {
    	return this.lhs.evaluate(c).lessthan(this.rhs.evaluate(c));
    };

    LessThanOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " < " + this.rhs.toString() + ")";
    };

    // GreaterThanOperation //////////////////////////////////////////////////////

    GreaterThanOperation.prototype = new BinaryOperation();
    GreaterThanOperation.prototype.constructor = GreaterThanOperation;
    GreaterThanOperation.superclass = BinaryOperation.prototype;

    function GreaterThanOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    GreaterThanOperation.prototype.init = function(lhs, rhs) {
    	GreaterThanOperation.superclass.init.call(this, lhs, rhs);
    };

    GreaterThanOperation.prototype.evaluate = function(c) {
    	return this.lhs.evaluate(c).greaterthan(this.rhs.evaluate(c));
    };

    GreaterThanOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " > " + this.rhs.toString() + ")";
    };

    // LessThanOrEqualOperation //////////////////////////////////////////////////

    LessThanOrEqualOperation.prototype = new BinaryOperation();
    LessThanOrEqualOperation.prototype.constructor = LessThanOrEqualOperation;
    LessThanOrEqualOperation.superclass = BinaryOperation.prototype;

    function LessThanOrEqualOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    LessThanOrEqualOperation.prototype.init = function(lhs, rhs) {
    	LessThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
    };

    LessThanOrEqualOperation.prototype.evaluate = function(c) {
    	return this.lhs.evaluate(c).lessthanorequal(this.rhs.evaluate(c));
    };

    LessThanOrEqualOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " <= " + this.rhs.toString() + ")";
    };

    // GreaterThanOrEqualOperation ///////////////////////////////////////////////

    GreaterThanOrEqualOperation.prototype = new BinaryOperation();
    GreaterThanOrEqualOperation.prototype.constructor = GreaterThanOrEqualOperation;
    GreaterThanOrEqualOperation.superclass = BinaryOperation.prototype;

    function GreaterThanOrEqualOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    GreaterThanOrEqualOperation.prototype.init = function(lhs, rhs) {
    	GreaterThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
    };

    GreaterThanOrEqualOperation.prototype.evaluate = function(c) {
    	return this.lhs.evaluate(c).greaterthanorequal(this.rhs.evaluate(c));
    };

    GreaterThanOrEqualOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " >= " + this.rhs.toString() + ")";
    };

    // PlusOperation /////////////////////////////////////////////////////////////

    PlusOperation.prototype = new BinaryOperation();
    PlusOperation.prototype.constructor = PlusOperation;
    PlusOperation.superclass = BinaryOperation.prototype;

    function PlusOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    PlusOperation.prototype.init = function(lhs, rhs) {
    	PlusOperation.superclass.init.call(this, lhs, rhs);
    };

    PlusOperation.prototype.evaluate = function(c) {
    	return this.lhs.evaluate(c).number().plus(this.rhs.evaluate(c).number());
    };

    PlusOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " + " + this.rhs.toString() + ")";
    };

    // MinusOperation ////////////////////////////////////////////////////////////

    MinusOperation.prototype = new BinaryOperation();
    MinusOperation.prototype.constructor = MinusOperation;
    MinusOperation.superclass = BinaryOperation.prototype;

    function MinusOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    MinusOperation.prototype.init = function(lhs, rhs) {
    	MinusOperation.superclass.init.call(this, lhs, rhs);
    };

    MinusOperation.prototype.evaluate = function(c) {
    	return this.lhs.evaluate(c).number().minus(this.rhs.evaluate(c).number());
    };

    MinusOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " - " + this.rhs.toString() + ")";
    };

    // MultiplyOperation /////////////////////////////////////////////////////////

    MultiplyOperation.prototype = new BinaryOperation();
    MultiplyOperation.prototype.constructor = MultiplyOperation;
    MultiplyOperation.superclass = BinaryOperation.prototype;

    function MultiplyOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    MultiplyOperation.prototype.init = function(lhs, rhs) {
    	MultiplyOperation.superclass.init.call(this, lhs, rhs);
    };

    MultiplyOperation.prototype.evaluate = function(c) {
    	return this.lhs.evaluate(c).number().multiply(this.rhs.evaluate(c).number());
    };

    MultiplyOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " * " + this.rhs.toString() + ")";
    };

    // DivOperation //////////////////////////////////////////////////////////////

    DivOperation.prototype = new BinaryOperation();
    DivOperation.prototype.constructor = DivOperation;
    DivOperation.superclass = BinaryOperation.prototype;

    function DivOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    DivOperation.prototype.init = function(lhs, rhs) {
    	DivOperation.superclass.init.call(this, lhs, rhs);
    };

    DivOperation.prototype.evaluate = function(c) {
    	return this.lhs.evaluate(c).number().div(this.rhs.evaluate(c).number());
    };

    DivOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " div " + this.rhs.toString() + ")";
    };

    // ModOperation //////////////////////////////////////////////////////////////

    ModOperation.prototype = new BinaryOperation();
    ModOperation.prototype.constructor = ModOperation;
    ModOperation.superclass = BinaryOperation.prototype;

    function ModOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    ModOperation.prototype.init = function(lhs, rhs) {
    	ModOperation.superclass.init.call(this, lhs, rhs);
    };

    ModOperation.prototype.evaluate = function(c) {
    	return this.lhs.evaluate(c).number().mod(this.rhs.evaluate(c).number());
    };

    ModOperation.prototype.toString = function() {
    	return "(" + this.lhs.toString() + " mod " + this.rhs.toString() + ")";
    };

    // BarOperation //////////////////////////////////////////////////////////////

    BarOperation.prototype = new BinaryOperation();
    BarOperation.prototype.constructor = BarOperation;
    BarOperation.superclass = BinaryOperation.prototype;

    function BarOperation(lhs, rhs) {
    	if (arguments.length > 0) {
    		this.init(lhs, rhs);
    	}
    }

    BarOperation.prototype.init = function(lhs, rhs) {
    	BarOperation.superclass.init.call(this, lhs, rhs);
    };

    BarOperation.prototype.evaluate = function(c) {
    	return this.lhs.evaluate(c).nodeset().union(this.rhs.evaluate(c).nodeset());
    };

    BarOperation.prototype.toString = function() {
    	return map(toString, [this.lhs, this.rhs]).join(' | ');
    };

    // PathExpr //////////////////////////////////////////////////////////////////

    PathExpr.prototype = new Expression();
    PathExpr.prototype.constructor = PathExpr;
    PathExpr.superclass = Expression.prototype;

    function PathExpr(filter, filterPreds, locpath) {
    	if (arguments.length > 0) {
    		this.init(filter, filterPreds, locpath);
    	}
    }

    PathExpr.prototype.init = function(filter, filterPreds, locpath) {
    	PathExpr.superclass.init.call(this);
    	this.filter = filter;
    	this.filterPredicates = filterPreds;
    	this.locationPath = locpath;
    };

    /**
     * Returns the topmost node of the tree containing node
     */
    function findRoot(node) {
        while (node && node.parentNode) {
            node = node.parentNode;
        }

        return node;
    }

    PathExpr.applyPredicates = function (predicates, c, nodes) {
    	return reduce(function (inNodes, pred) {
    		var ctx = c.extend({ contextSize: inNodes.length });
    		
    		return filter(function (node, i) {
    			return PathExpr.predicateMatches(pred, ctx.extend({ contextNode: node, contextPosition: i + 1 }));
    		}, inNodes);
    	}, nodes, predicates);
    };

    PathExpr.getRoot = function (xpc, nodes) {
    	var firstNode = nodes[0];
    	
        if (firstNode.nodeType === 9 /*Node.DOCUMENT_NODE*/) {
    		return firstNode;
    	}
    	
        if (xpc.virtualRoot) {
        	return xpc.virtualRoot;
        }
    		
    	var ownerDoc = firstNode.ownerDocument;
    	
    	if (ownerDoc) {
    		return ownerDoc;
    	}
    			
        // IE 5.5 doesn't have ownerDocument?
        var n = firstNode;
        while (n.parentNode != null) {
        	n = n.parentNode;
        }
        return n;
    };

    PathExpr.applyStep = function (step, xpc, node) {
    	var newNodes = [];
        xpc.contextNode = node;
        
        switch (step.axis) {
        	case Step.ANCESTOR:
        		// look at all the ancestor nodes
        		if (xpc.contextNode === xpc.virtualRoot) {
        			break;
        		}
        		var m;
        		if (xpc.contextNode.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
        			m = PathExpr.getOwnerElement(xpc.contextNode);
        		} else {
        			m = xpc.contextNode.parentNode;
        		}
        		while (m != null) {
        			if (step.nodeTest.matches(m, xpc)) {
        				newNodes.push(m);
        			}
        			if (m === xpc.virtualRoot) {
        				break;
        			}
        			m = m.parentNode;
        		}
        		break;
        
        	case Step.ANCESTORORSELF:
        		// look at all the ancestor nodes and the current node
        		for (var m = xpc.contextNode; m != null; m = m.nodeType == 2 /*Node.ATTRIBUTE_NODE*/ ? PathExpr.getOwnerElement(m) : m.parentNode) {
        			if (step.nodeTest.matches(m, xpc)) {
        				newNodes.push(m);
        			}
        			if (m === xpc.virtualRoot) {
        				break;
        			}
        		}
        		break;
        
        	case Step.ATTRIBUTE:
        		// look at the attributes
        		var nnm = xpc.contextNode.attributes;
        		if (nnm != null) {
        			for (var k = 0; k < nnm.length; k++) {
        				var m = nnm.item(k);
        				if (step.nodeTest.matches(m, xpc)) {
        					newNodes.push(m);
        				}
        			}
        		}
        		break;
        
        	case Step.CHILD:
        		// look at all child elements
        		for (var m = xpc.contextNode.firstChild; m != null; m = m.nextSibling) {
        			if (step.nodeTest.matches(m, xpc)) {
        				newNodes.push(m);
        			}
        		}
        		break;
        
        	case Step.DESCENDANT:
        		// look at all descendant nodes
        		var st = [ xpc.contextNode.firstChild ];
        		while (st.length > 0) {
        			for (var m = st.pop(); m != null; ) {
        				if (step.nodeTest.matches(m, xpc)) {
        					newNodes.push(m);
        				}
        				if (m.firstChild != null) {
        					st.push(m.nextSibling);
        					m = m.firstChild;
        				} else {
        					m = m.nextSibling;
        				}
        			}
        		}
        		break;
        
        	case Step.DESCENDANTORSELF:
        		// look at self
        		if (step.nodeTest.matches(xpc.contextNode, xpc)) {
        			newNodes.push(xpc.contextNode);
        		}
        		// look at all descendant nodes
        		var st = [ xpc.contextNode.firstChild ];
        		while (st.length > 0) {
        			for (var m = st.pop(); m != null; ) {
        				if (step.nodeTest.matches(m, xpc)) {
        					newNodes.push(m);
        				}
        				if (m.firstChild != null) {
        					st.push(m.nextSibling);
        					m = m.firstChild;
        				} else {
        					m = m.nextSibling;
        				}
        			}
        		}
        		break;
        
        	case Step.FOLLOWING:
        		if (xpc.contextNode === xpc.virtualRoot) {
        			break;
        		}
        		var st = [];
        		if (xpc.contextNode.firstChild != null) {
        			st.unshift(xpc.contextNode.firstChild);
        		} else {
        			st.unshift(xpc.contextNode.nextSibling);
        		}
        		for (var m = xpc.contextNode.parentNode; m != null && m.nodeType != 9 /*Node.DOCUMENT_NODE*/ && m !== xpc.virtualRoot; m = m.parentNode) {
        			st.unshift(m.nextSibling);
        		}
        		do {
        			for (var m = st.pop(); m != null; ) {
        				if (step.nodeTest.matches(m, xpc)) {
        					newNodes.push(m);
        				}
        				if (m.firstChild != null) {
        					st.push(m.nextSibling);
        					m = m.firstChild;
        				} else {
        					m = m.nextSibling;
        				}
        			}
        		} while (st.length > 0);
        		break;
        
        	case Step.FOLLOWINGSIBLING:
        		if (xpc.contextNode === xpc.virtualRoot) {
        			break;
        		}
        		for (var m = xpc.contextNode.nextSibling; m != null; m = m.nextSibling) {
        			if (step.nodeTest.matches(m, xpc)) {
        				newNodes.push(m);
        			}
        		}
        		break;
        
        	case Step.NAMESPACE:
        		var n = {};
        		if (xpc.contextNode.nodeType == 1 /*Node.ELEMENT_NODE*/) {
        			n["xml"] = XPath.XML_NAMESPACE_URI;
        			n["xmlns"] = XPath.XMLNS_NAMESPACE_URI;
        			for (var m = xpc.contextNode; m != null && m.nodeType == 1 /*Node.ELEMENT_NODE*/; m = m.parentNode) {
        				for (var k = 0; k < m.attributes.length; k++) {
        					var attr = m.attributes.item(k);
        					var nm = String(attr.name);
        					if (nm == "xmlns") {
        						if (n[""] == undefined) {
        							n[""] = attr.value;
        						}
        					} else if (nm.length > 6 && nm.substring(0, 6) == "xmlns:") {
        						var pre = nm.substring(6, nm.length);
        						if (n[pre] == undefined) {
        							n[pre] = attr.value;
        						}
        					}
        				}
        			}
        			for (var pre in n) {
        				var nsn = new XPathNamespace(pre, n[pre], xpc.contextNode);
        				if (step.nodeTest.matches(nsn, xpc)) {
        					newNodes.push(nsn);
        				}
        			}
        		}
        		break;
        
        	case Step.PARENT:
        		m = null;
        		if (xpc.contextNode !== xpc.virtualRoot) {
        			if (xpc.contextNode.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
        				m = PathExpr.getOwnerElement(xpc.contextNode);
        			} else {
        				m = xpc.contextNode.parentNode;
        			}
        		}
        		if (m != null && step.nodeTest.matches(m, xpc)) {
        			newNodes.push(m);
        		}
        		break;
        
        	case Step.PRECEDING:
        		var st;
        		if (xpc.virtualRoot != null) {
        			st = [ xpc.virtualRoot ];
        		} else {
                    // cannot rely on .ownerDocument because the node may be in a document fragment
                    st = [findRoot(xpc.contextNode)];
        		}
        		outer: while (st.length > 0) {
        			for (var m = st.pop(); m != null; ) {
        				if (m == xpc.contextNode) {
        					break outer;
        				}
        				if (step.nodeTest.matches(m, xpc)) {
        					newNodes.unshift(m);
        				}
        				if (m.firstChild != null) {
        					st.push(m.nextSibling);
        					m = m.firstChild;
        				} else {
        					m = m.nextSibling;
        				}
        			}
        		}
        		break;
        
        	case Step.PRECEDINGSIBLING:
        		if (xpc.contextNode === xpc.virtualRoot) {
        			break;
        		}
        		for (var m = xpc.contextNode.previousSibling; m != null; m = m.previousSibling) {
        			if (step.nodeTest.matches(m, xpc)) {
        				newNodes.push(m);
        			}
        		}
        		break;
        
        	case Step.SELF:
        		if (step.nodeTest.matches(xpc.contextNode, xpc)) {
        			newNodes.push(xpc.contextNode);
        		}
        		break;
        
        	default:
        }
    	
    	return newNodes;
    };

    PathExpr.applySteps = function (steps, xpc, nodes) {
    	return reduce(function (inNodes, step) {
    		return [].concat.apply([], map(function (node) {
    			return PathExpr.applyPredicates(step.predicates, xpc, PathExpr.applyStep(step, xpc, node));
    		}, inNodes));
    	}, nodes, steps);
    };

    PathExpr.prototype.applyFilter = function(c, xpc) {
    	if (!this.filter) {
    		return { nodes: [ c.contextNode ] };
    	}
    	
    	var ns = this.filter.evaluate(c);

    	if (!Utilities.instance_of(ns, XNodeSet)) {
            if (this.filterPredicates != null && this.filterPredicates.length > 0 || this.locationPath != null) {
    		    throw new Error("Path expression filter must evaluate to a nodeset if predicates or location path are used");
    		}

    		return { nonNodes: ns };
    	}
    	
    	return { 
    	    nodes: PathExpr.applyPredicates(this.filterPredicates || [], xpc, ns.toUnsortedArray())
    	};
    };

    PathExpr.applyLocationPath = function (locationPath, xpc, nodes) {
    	if (!locationPath) {
    		return nodes;
    	}
    	
    	var startNodes = locationPath.absolute ? [ PathExpr.getRoot(xpc, nodes) ] : nodes;
    		
        return PathExpr.applySteps(locationPath.steps, xpc, startNodes);
    };

    PathExpr.prototype.evaluate = function(c) {
    	var xpc = assign(new XPathContext(), c);
    	
        var filterResult = this.applyFilter(c, xpc);
    	
    	if ('nonNodes' in filterResult) {
    		return filterResult.nonNodes;
    	}	
    	
    	var ns = new XNodeSet();
    	ns.addArray(PathExpr.applyLocationPath(this.locationPath, xpc, filterResult.nodes));
    	return ns;
    };

    PathExpr.predicateMatches = function(pred, c) {
    	var res = pred.evaluate(c);
    	
    	return Utilities.instance_of(res, XNumber)
    		? c.contextPosition == res.numberValue()
    		: res.booleanValue();
    };

    PathExpr.predicateString = compose(wrap('[', ']'), toString);
    PathExpr.predicatesString = compose(join(''), map(PathExpr.predicateString));

    PathExpr.prototype.toString = function() {
    	if (this.filter != undefined) {
    		var filterStr = toString(this.filter);

    		if (Utilities.instance_of(this.filter, XString)) {
    			return wrap("'", "'", filterStr);
    		}
    		if (this.filterPredicates != undefined && this.filterPredicates.length) {
    			return wrap('(', ')', filterStr) + 
    			    PathExpr.predicatesString(this.filterPredicates);
    		}
    		if (this.locationPath != undefined) {
    			return filterStr + 
    			    (this.locationPath.absolute ? '' : '/') +
    				toString(this.locationPath);
    		}

    		return filterStr;
    	}

    	return toString(this.locationPath);
    };

    PathExpr.getOwnerElement = function(n) {
    	// DOM 2 has ownerElement
    	if (n.ownerElement) {
    		return n.ownerElement;
    	}
    	// DOM 1 Internet Explorer can use selectSingleNode (ironically)
    	try {
    		if (n.selectSingleNode) {
    			return n.selectSingleNode("..");
    		}
    	} catch (e) {
    	}
    	// Other DOM 1 implementations must use this egregious search
    	var doc = n.nodeType == 9 /*Node.DOCUMENT_NODE*/
    			? n
    			: n.ownerDocument;
    	var elts = doc.getElementsByTagName("*");
    	for (var i = 0; i < elts.length; i++) {
    		var elt = elts.item(i);
    		var nnm = elt.attributes;
    		for (var j = 0; j < nnm.length; j++) {
    			var an = nnm.item(j);
    			if (an === n) {
    				return elt;
    			}
    		}
    	}
    	return null;
    };

    // LocationPath //////////////////////////////////////////////////////////////

    LocationPath.prototype = new Object();
    LocationPath.prototype.constructor = LocationPath;
    LocationPath.superclass = Object.prototype;

    function LocationPath(abs, steps) {
    	if (arguments.length > 0) {
    		this.init(abs, steps);
    	}
    }

    LocationPath.prototype.init = function(abs, steps) {
    	this.absolute = abs;
    	this.steps = steps;
    };

    LocationPath.prototype.toString = function() {
    	return (
    	    (this.absolute ? '/' : '') +
    		map(toString, this.steps).join('/')
        );
    };

    // Step //////////////////////////////////////////////////////////////////////

    Step.prototype = new Object();
    Step.prototype.constructor = Step;
    Step.superclass = Object.prototype;

    function Step(axis, nodetest, preds) {
    	if (arguments.length > 0) {
    		this.init(axis, nodetest, preds);
    	}
    }

    Step.prototype.init = function(axis, nodetest, preds) {
    	this.axis = axis;
    	this.nodeTest = nodetest;
    	this.predicates = preds;
    };

    Step.prototype.toString = function() {
    	return Step.STEPNAMES[this.axis] +
            "::" +
            this.nodeTest.toString() +
    	    PathExpr.predicatesString(this.predicates);
    };


    Step.ANCESTOR = 0;
    Step.ANCESTORORSELF = 1;
    Step.ATTRIBUTE = 2;
    Step.CHILD = 3;
    Step.DESCENDANT = 4;
    Step.DESCENDANTORSELF = 5;
    Step.FOLLOWING = 6;
    Step.FOLLOWINGSIBLING = 7;
    Step.NAMESPACE = 8;
    Step.PARENT = 9;
    Step.PRECEDING = 10;
    Step.PRECEDINGSIBLING = 11;
    Step.SELF = 12;

    Step.STEPNAMES = reduce(function (acc, x) { return acc[x[0]] = x[1], acc; }, {}, [
    	[Step.ANCESTOR, 'ancestor'],
    	[Step.ANCESTORORSELF, 'ancestor-or-self'],
    	[Step.ATTRIBUTE, 'attribute'],
    	[Step.CHILD, 'child'],
    	[Step.DESCENDANT, 'descendant'],
    	[Step.DESCENDANTORSELF, 'descendant-or-self'],
    	[Step.FOLLOWING, 'following'],
    	[Step.FOLLOWINGSIBLING, 'following-sibling'],
    	[Step.NAMESPACE, 'namespace'],
    	[Step.PARENT, 'parent'],
    	[Step.PRECEDING, 'preceding'],
    	[Step.PRECEDINGSIBLING, 'preceding-sibling'],
    	[Step.SELF, 'self']
      ]);
      
    // NodeTest //////////////////////////////////////////////////////////////////

    NodeTest.prototype = new Object();
    NodeTest.prototype.constructor = NodeTest;
    NodeTest.superclass = Object.prototype;

    function NodeTest(type, value) {
    	if (arguments.length > 0) {
    		this.init(type, value);
    	}
    }

    NodeTest.prototype.init = function(type, value) {
    	this.type = type;
    	this.value = value;
    };

    NodeTest.prototype.toString = function() {
    	return "<unknown nodetest type>";
    };

    NodeTest.prototype.matches = function (n, xpc) {
        console.warn('unknown node test type');
    };

    NodeTest.NAMETESTANY = 0;
    NodeTest.NAMETESTPREFIXANY = 1;
    NodeTest.NAMETESTQNAME = 2;
    NodeTest.COMMENT = 3;
    NodeTest.TEXT = 4;
    NodeTest.PI = 5;
    NodeTest.NODE = 6;

    NodeTest.isNodeType = function (types){
    	return compose(includes(types), prop('nodeType'));
    };

    NodeTest.makeNodeTestType = function (type, members, ctor) {
    	var newType = ctor || function () {};
    	
    	newType.prototype = new NodeTest(members.type);
    	newType.prototype.constructor = type;
    	
    	for (var key in members) {
    		newType.prototype[key] = members[key];
    	}
    	
    	return newType;
    };
    // create invariant node test for certain node types
    NodeTest.makeNodeTypeTest = function (type, nodeTypes, stringVal) {
    	return new (NodeTest.makeNodeTestType(type, {
    		matches: NodeTest.isNodeType(nodeTypes),
    		toString: always(stringVal)
    	}))();
    };

    NodeTest.hasPrefix = function (node) {
    	return node.prefix || (node.nodeName || node.tagName).indexOf(':') !== -1;
    };

    NodeTest.isElementOrAttribute = NodeTest.isNodeType([1, 2]);
    NodeTest.nameSpaceMatches = function (prefix, xpc, n) {
    	var nNamespace = (n.namespaceURI || '');
    	
    	if (!prefix) { 
    	    return !nNamespace || (xpc.allowAnyNamespaceForNoPrefix && !NodeTest.hasPrefix(n)); 
    	}
    	
        var ns = xpc.namespaceResolver.getNamespace(prefix, xpc.expressionContextNode);

    	if (ns == null) {
            throw new Error("Cannot resolve QName " + prefix);
        }

        return ns === nNamespace;
    };
    NodeTest.localNameMatches = function (localName, xpc, n) {
    	var nLocalName = (n.localName || n.nodeName);
    	
    	return xpc.caseInsensitive
    	    ? localName.toLowerCase() === nLocalName.toLowerCase()
    		: localName === nLocalName;
    };

    NodeTest.NameTestPrefixAny = NodeTest.makeNodeTestType(NodeTest.NAMETESTPREFIXANY, {
    	matches: function (n, xpc){
            return NodeTest.isElementOrAttribute(n) && 
    		    NodeTest.nameSpaceMatches(this.prefix, xpc, n);
    	},
    	toString: function () {
    		return this.prefix + ":*";
    	}
    }, function (prefix) { this.prefix = prefix; });

    NodeTest.NameTestQName = NodeTest.makeNodeTestType(NodeTest.NAMETESTQNAME, {
    	matches: function (n, xpc) {
    		return NodeTest.isNodeType([1, 2, XPathNamespace.XPATH_NAMESPACE_NODE])(n) &&
    		    NodeTest.nameSpaceMatches(this.prefix, xpc, n) &&
                NodeTest.localNameMatches(this.localName, xpc, n);
    	},
    	toString: function () {
            return this.name;
    	}
    }, function (name) { 
        var nameParts = name.split(':');
    	
    	this.name = name;
    	this.prefix = nameParts.length > 1 ? nameParts[0] : null;
    	this.localName = nameParts[nameParts.length > 1 ? 1 : 0];
    });

    NodeTest.PITest = NodeTest.makeNodeTestType(NodeTest.PI, {
    	matches: function (n, xpc) {
    		return NodeTest.isNodeType([7])(n) && (n.target || n.nodeName) === this.name;
    	},
    	toString: function () {
            return wrap('processing-instruction("', '")', this.name);
    	}
    }, function (name) { this.name = name; });

    // singletons

    // elements, attributes, namespaces
    NodeTest.nameTestAny = NodeTest.makeNodeTypeTest(NodeTest.NAMETESTANY, [1, 2, XPathNamespace.XPATH_NAMESPACE_NODE], '*');
    // text, cdata
    NodeTest.textTest = NodeTest.makeNodeTypeTest(NodeTest.TEXT, [3, 4], 'text()');
    NodeTest.commentTest = NodeTest.makeNodeTypeTest(NodeTest.COMMENT, [8], 'comment()');
    // elements, attributes, text, cdata, PIs, comments, document nodes
    NodeTest.nodeTest = NodeTest.makeNodeTypeTest(NodeTest.NODE, [1, 2, 3, 4, 7, 8, 9], 'node()');
    NodeTest.anyPiTest = NodeTest.makeNodeTypeTest(NodeTest.PI, [7], 'processing-instruction()');

    // VariableReference /////////////////////////////////////////////////////////

    VariableReference.prototype = new Expression();
    VariableReference.prototype.constructor = VariableReference;
    VariableReference.superclass = Expression.prototype;

    function VariableReference(v) {
    	if (arguments.length > 0) {
    		this.init(v);
    	}
    }

    VariableReference.prototype.init = function(v) {
    	this.variable = v;
    };

    VariableReference.prototype.toString = function() {
    	return "$" + this.variable;
    };

    VariableReference.prototype.evaluate = function(c) {
        var parts = Utilities.resolveQName(this.variable, c.namespaceResolver, c.contextNode, false);

        if (parts[0] == null) {
            throw new Error("Cannot resolve QName " + fn);
        }
    	var result = c.variableResolver.getVariable(parts[1], parts[0]);
        if (!result) {
            throw XPathException.fromMessage("Undeclared variable: " + this.toString());
        }
        return result;
    };

    // FunctionCall //////////////////////////////////////////////////////////////

    FunctionCall.prototype = new Expression();
    FunctionCall.prototype.constructor = FunctionCall;
    FunctionCall.superclass = Expression.prototype;

    function FunctionCall(fn, args) {
    	if (arguments.length > 0) {
    		this.init(fn, args);
    	}
    }

    FunctionCall.prototype.init = function(fn, args) {
    	this.functionName = fn;
    	this.arguments = args;
    };

    FunctionCall.prototype.toString = function() {
    	var s = this.functionName + "(";
    	for (var i = 0; i < this.arguments.length; i++) {
    		if (i > 0) {
    			s += ", ";
    		}
    		s += this.arguments[i].toString();
    	}
    	return s + ")";
    };

    FunctionCall.prototype.evaluate = function(c) {
        var f = FunctionResolver.getFunctionFromContext(this.functionName, c);

        if (!f) {
    		throw new Error("Unknown function " + this.functionName);
    	}

        var a = [c].concat(this.arguments);
    	return f.apply(c.functionResolver.thisArg, a);
    };

    // Operators /////////////////////////////////////////////////////////////////

    var Operators = new Object();

    Operators.equals = function(l, r) {
    	return l.equals(r);
    };

    Operators.notequal = function(l, r) {
    	return l.notequal(r);
    };

    Operators.lessthan = function(l, r) {
    	return l.lessthan(r);
    };

    Operators.greaterthan = function(l, r) {
    	return l.greaterthan(r);
    };

    Operators.lessthanorequal = function(l, r) {
    	return l.lessthanorequal(r);
    };

    Operators.greaterthanorequal = function(l, r) {
    	return l.greaterthanorequal(r);
    };

    // XString ///////////////////////////////////////////////////////////////////

    XString.prototype = new Expression();
    XString.prototype.constructor = XString;
    XString.superclass = Expression.prototype;

    function XString(s) {
    	if (arguments.length > 0) {
    		this.init(s);
    	}
    }

    XString.prototype.init = function(s) {
    	this.str = String(s);
    };

    XString.prototype.toString = function() {
    	return this.str;
    };

    XString.prototype.evaluate = function(c) {
    	return this;
    };

    XString.prototype.string = function() {
    	return this;
    };

    XString.prototype.number = function() {
    	return new XNumber(this.str);
    };

    XString.prototype.bool = function() {
    	return new XBoolean(this.str);
    };

    XString.prototype.nodeset = function() {
    	throw new Error("Cannot convert string to nodeset");
    };

    XString.prototype.stringValue = function() {
    	return this.str;
    };

    XString.prototype.numberValue = function() {
    	return this.number().numberValue();
    };

    XString.prototype.booleanValue = function() {
    	return this.bool().booleanValue();
    };

    XString.prototype.equals = function(r) {
    	if (Utilities.instance_of(r, XBoolean)) {
    		return this.bool().equals(r);
    	}
    	if (Utilities.instance_of(r, XNumber)) {
    		return this.number().equals(r);
    	}
    	if (Utilities.instance_of(r, XNodeSet)) {
    		return r.compareWithString(this, Operators.equals);
    	}
    	return new XBoolean(this.str == r.str);
    };

    XString.prototype.notequal = function(r) {
    	if (Utilities.instance_of(r, XBoolean)) {
    		return this.bool().notequal(r);
    	}
    	if (Utilities.instance_of(r, XNumber)) {
    		return this.number().notequal(r);
    	}
    	if (Utilities.instance_of(r, XNodeSet)) {
    		return r.compareWithString(this, Operators.notequal);
    	}
    	return new XBoolean(this.str != r.str);
    };

    XString.prototype.lessthan = function(r) {
    	return this.number().lessthan(r);
    };

    XString.prototype.greaterthan = function(r) {
    	return this.number().greaterthan(r);
    };

    XString.prototype.lessthanorequal = function(r) {
    	return this.number().lessthanorequal(r);
    };

    XString.prototype.greaterthanorequal = function(r) {
    	return this.number().greaterthanorequal(r);
    };

    // XNumber ///////////////////////////////////////////////////////////////////

    XNumber.prototype = new Expression();
    XNumber.prototype.constructor = XNumber;
    XNumber.superclass = Expression.prototype;

    function XNumber(n) {
    	if (arguments.length > 0) {
    		this.init(n);
    	}
    }

    XNumber.prototype.init = function(n) {
    	this.num = typeof n === "string" ? this.parse(n) : Number(n);
    };

    XNumber.prototype.numberFormat = /^\s*-?[0-9]*\.?[0-9]+\s*$/;

    XNumber.prototype.parse = function(s) {
        // XPath representation of numbers is more restrictive than what Number() or parseFloat() allow
        return this.numberFormat.test(s) ? parseFloat(s) : Number.NaN;
    };

    function padSmallNumber(numberStr) {
    	var parts = numberStr.split('e-');
    	var base = parts[0].replace('.', '');
    	var exponent = Number(parts[1]);
    	
    	for (var i = 0; i < exponent - 1; i += 1) {
    		base = '0' + base;
    	}
    	
    	return '0.' + base;
    }

    function padLargeNumber(numberStr) {
    	var parts = numberStr.split('e');
    	var base = parts[0].replace('.', '');
    	var exponent = Number(parts[1]);
    	var zerosToAppend = exponent + 1 - base.length;
    	
    	for (var i = 0; i < zerosToAppend; i += 1){
    		base += '0';
    	}
    	
    	return base;
    }

    XNumber.prototype.toString = function() {
    	var strValue = this.num.toString();

    	if (strValue.indexOf('e-') !== -1) {
    		return padSmallNumber(strValue);
    	}
        
    	if (strValue.indexOf('e') !== -1) {
    		return padLargeNumber(strValue);
    	}
    	
    	return strValue;
    };

    XNumber.prototype.evaluate = function(c) {
    	return this;
    };

    XNumber.prototype.string = function() {
    	
    	
    	return new XString(this.toString());
    };

    XNumber.prototype.number = function() {
    	return this;
    };

    XNumber.prototype.bool = function() {
    	return new XBoolean(this.num);
    };

    XNumber.prototype.nodeset = function() {
    	throw new Error("Cannot convert number to nodeset");
    };

    XNumber.prototype.stringValue = function() {
    	return this.string().stringValue();
    };

    XNumber.prototype.numberValue = function() {
    	return this.num;
    };

    XNumber.prototype.booleanValue = function() {
    	return this.bool().booleanValue();
    };

    XNumber.prototype.negate = function() {
    	return new XNumber(-this.num);
    };

    XNumber.prototype.equals = function(r) {
    	if (Utilities.instance_of(r, XBoolean)) {
    		return this.bool().equals(r);
    	}
    	if (Utilities.instance_of(r, XString)) {
    		return this.equals(r.number());
    	}
    	if (Utilities.instance_of(r, XNodeSet)) {
    		return r.compareWithNumber(this, Operators.equals);
    	}
    	return new XBoolean(this.num == r.num);
    };

    XNumber.prototype.notequal = function(r) {
    	if (Utilities.instance_of(r, XBoolean)) {
    		return this.bool().notequal(r);
    	}
    	if (Utilities.instance_of(r, XString)) {
    		return this.notequal(r.number());
    	}
    	if (Utilities.instance_of(r, XNodeSet)) {
    		return r.compareWithNumber(this, Operators.notequal);
    	}
    	return new XBoolean(this.num != r.num);
    };

    XNumber.prototype.lessthan = function(r) {
    	if (Utilities.instance_of(r, XNodeSet)) {
    		return r.compareWithNumber(this, Operators.greaterthan);
    	}
    	if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
    		return this.lessthan(r.number());
    	}
    	return new XBoolean(this.num < r.num);
    };

    XNumber.prototype.greaterthan = function(r) {
    	if (Utilities.instance_of(r, XNodeSet)) {
    		return r.compareWithNumber(this, Operators.lessthan);
    	}
    	if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
    		return this.greaterthan(r.number());
    	}
    	return new XBoolean(this.num > r.num);
    };

    XNumber.prototype.lessthanorequal = function(r) {
    	if (Utilities.instance_of(r, XNodeSet)) {
    		return r.compareWithNumber(this, Operators.greaterthanorequal);
    	}
    	if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
    		return this.lessthanorequal(r.number());
    	}
    	return new XBoolean(this.num <= r.num);
    };

    XNumber.prototype.greaterthanorequal = function(r) {
    	if (Utilities.instance_of(r, XNodeSet)) {
    		return r.compareWithNumber(this, Operators.lessthanorequal);
    	}
    	if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
    		return this.greaterthanorequal(r.number());
    	}
    	return new XBoolean(this.num >= r.num);
    };

    XNumber.prototype.plus = function(r) {
    	return new XNumber(this.num + r.num);
    };

    XNumber.prototype.minus = function(r) {
    	return new XNumber(this.num - r.num);
    };

    XNumber.prototype.multiply = function(r) {
    	return new XNumber(this.num * r.num);
    };

    XNumber.prototype.div = function(r) {
    	return new XNumber(this.num / r.num);
    };

    XNumber.prototype.mod = function(r) {
    	return new XNumber(this.num % r.num);
    };

    // XBoolean //////////////////////////////////////////////////////////////////

    XBoolean.prototype = new Expression();
    XBoolean.prototype.constructor = XBoolean;
    XBoolean.superclass = Expression.prototype;

    function XBoolean(b) {
    	if (arguments.length > 0) {
    		this.init(b);
    	}
    }

    XBoolean.prototype.init = function(b) {
    	this.b = Boolean(b);
    };

    XBoolean.prototype.toString = function() {
    	return this.b.toString();
    };

    XBoolean.prototype.evaluate = function(c) {
    	return this;
    };

    XBoolean.prototype.string = function() {
    	return new XString(this.b);
    };

    XBoolean.prototype.number = function() {
    	return new XNumber(this.b);
    };

    XBoolean.prototype.bool = function() {
    	return this;
    };

    XBoolean.prototype.nodeset = function() {
    	throw new Error("Cannot convert boolean to nodeset");
    };

    XBoolean.prototype.stringValue = function() {
    	return this.string().stringValue();
    };

    XBoolean.prototype.numberValue = function() {
    	return this.number().numberValue();
    };

    XBoolean.prototype.booleanValue = function() {
    	return this.b;
    };

    XBoolean.prototype.not = function() {
    	return new XBoolean(!this.b);
    };

    XBoolean.prototype.equals = function(r) {
    	if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
    		return this.equals(r.bool());
    	}
    	if (Utilities.instance_of(r, XNodeSet)) {
    		return r.compareWithBoolean(this, Operators.equals);
    	}
    	return new XBoolean(this.b == r.b);
    };

    XBoolean.prototype.notequal = function(r) {
    	if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
    		return this.notequal(r.bool());
    	}
    	if (Utilities.instance_of(r, XNodeSet)) {
    		return r.compareWithBoolean(this, Operators.notequal);
    	}
    	return new XBoolean(this.b != r.b);
    };

    XBoolean.prototype.lessthan = function(r) {
    	return this.number().lessthan(r);
    };

    XBoolean.prototype.greaterthan = function(r) {
    	return this.number().greaterthan(r);
    };

    XBoolean.prototype.lessthanorequal = function(r) {
    	return this.number().lessthanorequal(r);
    };

    XBoolean.prototype.greaterthanorequal = function(r) {
    	return this.number().greaterthanorequal(r);
    };

    XBoolean.true_ = new XBoolean(true);
    XBoolean.false_ = new XBoolean(false);

    // AVLTree ///////////////////////////////////////////////////////////////////

    AVLTree.prototype = new Object();
    AVLTree.prototype.constructor = AVLTree;
    AVLTree.superclass = Object.prototype;

    function AVLTree(n) {
    	this.init(n);
    }

    AVLTree.prototype.init = function(n) {
    	this.left = null;
        this.right = null;
    	this.node = n;
    	this.depth = 1;
    };

    AVLTree.prototype.balance = function() {
        var ldepth = this.left  == null ? 0 : this.left.depth;
        var rdepth = this.right == null ? 0 : this.right.depth;

    	if (ldepth > rdepth + 1) {
            // LR or LL rotation
            var lldepth = this.left.left  == null ? 0 : this.left.left.depth;
            var lrdepth = this.left.right == null ? 0 : this.left.right.depth;

            if (lldepth < lrdepth) {
                // LR rotation consists of a RR rotation of the left child
                this.left.rotateRR();
                // plus a LL rotation of this node, which happens anyway
            }
            this.rotateLL();
        } else if (ldepth + 1 < rdepth) {
            // RR or RL rorarion
    		var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
    		var rldepth = this.right.left  == null ? 0 : this.right.left.depth;

            if (rldepth > rrdepth) {
                // RR rotation consists of a LL rotation of the right child
                this.right.rotateLL();
                // plus a RR rotation of this node, which happens anyway
            }
            this.rotateRR();
        }
    };

    AVLTree.prototype.rotateLL = function() {
        // the left side is too long => rotate from the left (_not_ leftwards)
        var nodeBefore = this.node;
        var rightBefore = this.right;
        this.node = this.left.node;
        this.right = this.left;
        this.left = this.left.left;
        this.right.left = this.right.right;
        this.right.right = rightBefore;
        this.right.node = nodeBefore;
        this.right.updateInNewLocation();
        this.updateInNewLocation();
    };

    AVLTree.prototype.rotateRR = function() {
        // the right side is too long => rotate from the right (_not_ rightwards)
        var nodeBefore = this.node;
        var leftBefore = this.left;
        this.node = this.right.node;
        this.left = this.right;
        this.right = this.right.right;
        this.left.right = this.left.left;
        this.left.left = leftBefore;
        this.left.node = nodeBefore;
        this.left.updateInNewLocation();
        this.updateInNewLocation();
    };

    AVLTree.prototype.updateInNewLocation = function() {
        this.getDepthFromChildren();
    };

    AVLTree.prototype.getDepthFromChildren = function() {
        this.depth = this.node == null ? 0 : 1;
        if (this.left != null) {
            this.depth = this.left.depth + 1;
        }
        if (this.right != null && this.depth <= this.right.depth) {
            this.depth = this.right.depth + 1;
        }
    };

    function nodeOrder(n1, n2) {
    	if (n1 === n2) {
    		return 0;
    	}

    	if (n1.compareDocumentPosition) {
    	    var cpos = n1.compareDocumentPosition(n2);

            if (cpos & 0x01) {
                // not in the same document; return an arbitrary result (is there a better way to do this)
                return 1;
            }
            if (cpos & 0x0A) {
                // n2 precedes or contains n1
                return 1;
            }
            if (cpos & 0x14) {
                // n2 follows or is contained by n1
                return -1;
            }

    	    return 0;
    	}

    	var d1 = 0,
    	    d2 = 0;
    	for (var m1 = n1; m1 != null; m1 = m1.parentNode || m1.ownerElement) {
    		d1++;
    	}
    	for (var m2 = n2; m2 != null; m2 = m2.parentNode || m2.ownerElement) {
    		d2++;
    	}

        // step up to same depth
    	if (d1 > d2) {
    		while (d1 > d2) {
    			n1 = n1.parentNode || n1.ownerElement;
    			d1--;
    		}
    		if (n1 === n2) {
    			return 1;
    		}
    	} else if (d2 > d1) {
    		while (d2 > d1) {
    			n2 = n2.parentNode || n2.ownerElement;
    			d2--;
    		}
    		if (n1 === n2) {
    			return -1;
    		}
    	}

        var n1Par = n1.parentNode || n1.ownerElement,
            n2Par = n2.parentNode || n2.ownerElement;

        // find common parent
    	while (n1Par !== n2Par) {
    		n1 = n1Par;
    		n2 = n2Par;
    		n1Par = n1.parentNode || n1.ownerElement;
    	    n2Par = n2.parentNode || n2.ownerElement;
    	}
        
        var n1isAttr = Utilities.isAttribute(n1);
        var n2isAttr = Utilities.isAttribute(n2);
        
        if (n1isAttr && !n2isAttr) {
            return -1;
        }
        if (!n1isAttr && n2isAttr) {
            return 1;
        }
        
        if(n1Par) {
    	    var cn = n1isAttr ? n1Par.attributes : n1Par.childNodes,
    	        len = cn.length;
            for (var i = 0; i < len; i += 1) {
                var n = cn[i];
                if (n === n1) {
                    return -1;
                }
                if (n === n2) {
                    return 1;
                }
            }
        }        
        
        throw new Error('Unexpected: could not determine node order');
    }

    AVLTree.prototype.add = function(n)  {
    	if (n === this.node) {
            return false;
        }

    	var o = nodeOrder(n, this.node);

        var ret = false;
        if (o == -1) {
            if (this.left == null) {
                this.left = new AVLTree(n);
                ret = true;
            } else {
                ret = this.left.add(n);
                if (ret) {
                    this.balance();
                }
            }
        } else if (o == 1) {
            if (this.right == null) {
                this.right = new AVLTree(n);
                ret = true;
            } else {
                ret = this.right.add(n);
                if (ret) {
                    this.balance();
                }
            }
        }

        if (ret) {
            this.getDepthFromChildren();
        }
        return ret;
    };

    // XNodeSet //////////////////////////////////////////////////////////////////

    XNodeSet.prototype = new Expression();
    XNodeSet.prototype.constructor = XNodeSet;
    XNodeSet.superclass = Expression.prototype;

    function XNodeSet() {
    	this.init();
    }

    XNodeSet.prototype.init = function() {
        this.tree = null;
    	this.nodes = [];
    	this.size = 0;
    };

    XNodeSet.prototype.toString = function() {
    	var p = this.first();
    	if (p == null) {
    		return "";
    	}
    	return this.stringForNode(p);
    };

    XNodeSet.prototype.evaluate = function(c) {
    	return this;
    };

    XNodeSet.prototype.string = function() {
    	return new XString(this.toString());
    };

    XNodeSet.prototype.stringValue = function() {
    	return this.toString();
    };

    XNodeSet.prototype.number = function() {
    	return new XNumber(this.string());
    };

    XNodeSet.prototype.numberValue = function() {
    	return Number(this.string());
    };

    XNodeSet.prototype.bool = function() {
    	return new XBoolean(this.booleanValue());
    };

    XNodeSet.prototype.booleanValue = function() {
    	return !!this.size;
    };

    XNodeSet.prototype.nodeset = function() {
    	return this;
    };

    XNodeSet.prototype.stringForNode = function(n) {
    	if (n.nodeType == 9   /*Node.DOCUMENT_NODE*/ || 
            n.nodeType == 1   /*Node.ELEMENT_NODE */ || 
            n.nodeType === 11 /*Node.DOCUMENT_FRAGMENT*/) {
    		return this.stringForContainerNode(n);
    	}
        if (n.nodeType === 2 /* Node.ATTRIBUTE_NODE */) {
            return n.value || n.nodeValue;
        }
    	if (n.isNamespaceNode) {
    		return n.namespace;
    	}
    	return n.nodeValue;
    };

    XNodeSet.prototype.stringForContainerNode = function(n) {
    	var s = "";
    	for (var n2 = n.firstChild; n2 != null; n2 = n2.nextSibling) {
            var nt = n2.nodeType;
            //  Element,    Text,       CDATA,      Document,   Document Fragment
            if (nt === 1 || nt === 3 || nt === 4 || nt === 9 || nt === 11) {
                s += this.stringForNode(n2);
            }
    	}
    	return s;
    };

    XNodeSet.prototype.buildTree = function () {
        if (!this.tree && this.nodes.length) {
            this.tree = new AVLTree(this.nodes[0]);
            for (var i = 1; i < this.nodes.length; i += 1) {
                this.tree.add(this.nodes[i]);
            }
        }

        return this.tree;
    };

    XNodeSet.prototype.first = function() {
    	var p = this.buildTree();
    	if (p == null) {
    		return null;
    	}
    	while (p.left != null) {
    		p = p.left;
    	}
    	return p.node;
    };

    XNodeSet.prototype.add = function(n) {
        for (var i = 0; i < this.nodes.length; i += 1) {
            if (n === this.nodes[i]) {
                return;
            }
        }

        this.tree = null;
        this.nodes.push(n);
        this.size += 1;
    };

    XNodeSet.prototype.addArray = function(ns) {
    	var self = this;
    	
    	forEach(function (x) { self.add(x); }, ns);
    };

    /**
     * Returns an array of the node set's contents in document order
     */
    XNodeSet.prototype.toArray = function() {
    	var a = [];
    	this.toArrayRec(this.buildTree(), a);
    	return a;
    };

    XNodeSet.prototype.toArrayRec = function(t, a) {
    	if (t != null) {
    		this.toArrayRec(t.left, a);
    		a.push(t.node);
    		this.toArrayRec(t.right, a);
    	}
    };

    /**
     * Returns an array of the node set's contents in arbitrary order
     */
    XNodeSet.prototype.toUnsortedArray = function () {
        return this.nodes.slice();
    };

    XNodeSet.prototype.compareWithString = function(r, o) {
    	var a = this.toUnsortedArray();
    	for (var i = 0; i < a.length; i++) {
    		var n = a[i];
    		var l = new XString(this.stringForNode(n));
    		var res = o(l, r);
    		if (res.booleanValue()) {
    			return res;
    		}
    	}
    	return new XBoolean(false);
    };

    XNodeSet.prototype.compareWithNumber = function(r, o) {
    	var a = this.toUnsortedArray();
    	for (var i = 0; i < a.length; i++) {
    		var n = a[i];
    		var l = new XNumber(this.stringForNode(n));
    		var res = o(l, r);
    		if (res.booleanValue()) {
    			return res;
    		}
    	}
    	return new XBoolean(false);
    };

    XNodeSet.prototype.compareWithBoolean = function(r, o) {
    	return o(this.bool(), r);
    };

    XNodeSet.prototype.compareWithNodeSet = function(r, o) {
    	var arr = this.toUnsortedArray();
    	var oInvert = function (lop, rop) { return o(rop, lop); };
    	
    	for (var i = 0; i < arr.length; i++) {
    		var l = new XString(this.stringForNode(arr[i]));

    		var res = r.compareWithString(l, oInvert);
    		if (res.booleanValue()) {
    			return res;
    		}
    	}
    	
    	return new XBoolean(false);
    };

    XNodeSet.compareWith = curry(function (o, r) {
    	if (Utilities.instance_of(r, XString)) {
    		return this.compareWithString(r, o);
    	}
    	if (Utilities.instance_of(r, XNumber)) {
    		return this.compareWithNumber(r, o);
    	}
    	if (Utilities.instance_of(r, XBoolean)) {
    		return this.compareWithBoolean(r, o);
    	}
    	return this.compareWithNodeSet(r, o);
    });

    XNodeSet.prototype.equals = XNodeSet.compareWith(Operators.equals);
    XNodeSet.prototype.notequal = XNodeSet.compareWith(Operators.notequal);
    XNodeSet.prototype.lessthan = XNodeSet.compareWith(Operators.lessthan);
    XNodeSet.prototype.greaterthan = XNodeSet.compareWith(Operators.greaterthan);
    XNodeSet.prototype.lessthanorequal = XNodeSet.compareWith(Operators.lessthanorequal);
    XNodeSet.prototype.greaterthanorequal = XNodeSet.compareWith(Operators.greaterthanorequal);

    XNodeSet.prototype.union = function(r) {
    	var ns = new XNodeSet();
        ns.addArray(this.toUnsortedArray());
    	ns.addArray(r.toUnsortedArray());
    	return ns;
    };

    // XPathNamespace ////////////////////////////////////////////////////////////

    XPathNamespace.prototype = new Object();
    XPathNamespace.prototype.constructor = XPathNamespace;
    XPathNamespace.superclass = Object.prototype;

    function XPathNamespace(pre, ns, p) {
    	this.isXPathNamespace = true;
    	this.ownerDocument = p.ownerDocument;
    	this.nodeName = "#namespace";
    	this.prefix = pre;
    	this.localName = pre;
    	this.namespaceURI = ns;
    	this.nodeValue = ns;
    	this.ownerElement = p;
    	this.nodeType = XPathNamespace.XPATH_NAMESPACE_NODE;
    }

    XPathNamespace.prototype.toString = function() {
    	return "{ \"" + this.prefix + "\", \"" + this.namespaceURI + "\" }";
    };

    // XPathContext //////////////////////////////////////////////////////////////

    XPathContext.prototype = new Object();
    XPathContext.prototype.constructor = XPathContext;
    XPathContext.superclass = Object.prototype;

    function XPathContext(vr, nr, fr) {
    	this.variableResolver = vr != null ? vr : new VariableResolver();
    	this.namespaceResolver = nr != null ? nr : new NamespaceResolver();
    	this.functionResolver = fr != null ? fr : new FunctionResolver();
    }

    XPathContext.prototype.extend = function (newProps) {
    	return assign(new XPathContext(), this, newProps);
    };

    // VariableResolver //////////////////////////////////////////////////////////

    VariableResolver.prototype = new Object();
    VariableResolver.prototype.constructor = VariableResolver;
    VariableResolver.superclass = Object.prototype;

    function VariableResolver() {
    }

    VariableResolver.prototype.getVariable = function(ln, ns) {
    	return null;
    };

    // FunctionResolver //////////////////////////////////////////////////////////

    FunctionResolver.prototype = new Object();
    FunctionResolver.prototype.constructor = FunctionResolver;
    FunctionResolver.superclass = Object.prototype;

    function FunctionResolver(thisArg) {
    	this.thisArg = thisArg != null ? thisArg : Functions;
    	this.functions = new Object();
    	this.addStandardFunctions();
    }

    FunctionResolver.prototype.addStandardFunctions = function() {
    	this.functions["{}last"] = Functions.last;
    	this.functions["{}position"] = Functions.position;
    	this.functions["{}count"] = Functions.count;
    	this.functions["{}id"] = Functions.id;
    	this.functions["{}local-name"] = Functions.localName;
    	this.functions["{}namespace-uri"] = Functions.namespaceURI;
    	this.functions["{}name"] = Functions.name;
    	this.functions["{}string"] = Functions.string;
    	this.functions["{}concat"] = Functions.concat;
    	this.functions["{}starts-with"] = Functions.startsWith;
    	this.functions["{}contains"] = Functions.contains;
    	this.functions["{}substring-before"] = Functions.substringBefore;
    	this.functions["{}substring-after"] = Functions.substringAfter;
    	this.functions["{}substring"] = Functions.substring;
    	this.functions["{}string-length"] = Functions.stringLength;
    	this.functions["{}normalize-space"] = Functions.normalizeSpace;
    	this.functions["{}translate"] = Functions.translate;
    	this.functions["{}boolean"] = Functions.boolean_;
    	this.functions["{}not"] = Functions.not;
    	this.functions["{}true"] = Functions.true_;
    	this.functions["{}false"] = Functions.false_;
    	this.functions["{}lang"] = Functions.lang;
    	this.functions["{}number"] = Functions.number;
    	this.functions["{}sum"] = Functions.sum;
    	this.functions["{}floor"] = Functions.floor;
    	this.functions["{}ceiling"] = Functions.ceiling;
    	this.functions["{}round"] = Functions.round;
    };

    FunctionResolver.prototype.addFunction = function(ns, ln, f) {
    	this.functions["{" + ns + "}" + ln] = f;
    };

    FunctionResolver.getFunctionFromContext = function(qName, context) {
        var parts = Utilities.resolveQName(qName, context.namespaceResolver, context.contextNode, false);

        if (parts[0] === null) {
            throw new Error("Cannot resolve QName " + name);
        }

        return context.functionResolver.getFunction(parts[1], parts[0]);
    };

    FunctionResolver.prototype.getFunction = function(localName, namespace) {
    	return this.functions["{" + namespace + "}" + localName];
    };

    // NamespaceResolver /////////////////////////////////////////////////////////

    NamespaceResolver.prototype = new Object();
    NamespaceResolver.prototype.constructor = NamespaceResolver;
    NamespaceResolver.superclass = Object.prototype;

    function NamespaceResolver() {
    }

    NamespaceResolver.prototype.getNamespace = function(prefix, n) {
    	if (prefix == "xml") {
    		return XPath.XML_NAMESPACE_URI;
    	} else if (prefix == "xmlns") {
    		return XPath.XMLNS_NAMESPACE_URI;
    	}
    	if (n.nodeType == 9 /*Node.DOCUMENT_NODE*/) {
    		n = n.documentElement;
    	} else if (n.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
    		n = PathExpr.getOwnerElement(n);
    	} else if (n.nodeType != 1 /*Node.ELEMENT_NODE*/) {
    		n = n.parentNode;
    	}
    	while (n != null && n.nodeType == 1 /*Node.ELEMENT_NODE*/) {
    		var nnm = n.attributes;
    		for (var i = 0; i < nnm.length; i++) {
    			var a = nnm.item(i);
    			var aname = a.name || a.nodeName;
    			if ((aname === "xmlns" && prefix === "")
    					|| aname === "xmlns:" + prefix) {
    				return String(a.value || a.nodeValue);
    			}
    		}
    		n = n.parentNode;
    	}
    	return null;
    };

    // Functions /////////////////////////////////////////////////////////////////

    var Functions = new Object();

    Functions.last = function(c) {
    	if (arguments.length != 1) {
    		throw new Error("Function last expects ()");
    	}

    	return new XNumber(c.contextSize);
    };

    Functions.position = function(c) {
    	if (arguments.length != 1) {
    		throw new Error("Function position expects ()");
    	}

    	return new XNumber(c.contextPosition);
    };

    Functions.count = function() {
    	var c = arguments[0];
    	var ns;
    	if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) {
    		throw new Error("Function count expects (node-set)");
    	}
    	return new XNumber(ns.size);
    };

    Functions.id = function() {
    	var c = arguments[0];
    	var id;
    	if (arguments.length != 2) {
    		throw new Error("Function id expects (object)");
    	}
    	id = arguments[1].evaluate(c);
    	if (Utilities.instance_of(id, XNodeSet)) {
    		id = id.toArray().join(" ");
    	} else {
    		id = id.stringValue();
    	}
    	var ids = id.split(/[\x0d\x0a\x09\x20]+/);
    	var ns = new XNodeSet();
    	var doc = c.contextNode.nodeType == 9 /*Node.DOCUMENT_NODE*/
    			? c.contextNode
    			: c.contextNode.ownerDocument;
    	for (var i = 0; i < ids.length; i++) {
    		var n;
    		if (doc.getElementById) {
    			n = doc.getElementById(ids[i]);
    		} else {
    			n = Utilities.getElementById(doc, ids[i]);
    		}
    		if (n != null) {
    			ns.add(n);
    		}
    	}
    	return ns;
    };

    Functions.localName = function(c, eNode) {
    	var n;
    	
    	if (arguments.length == 1) {
    		n = c.contextNode;
    	} else if (arguments.length == 2) {
    		n = eNode.evaluate(c).first();
    	} else {
    		throw new Error("Function local-name expects (node-set?)");
    	}
    	
    	if (n == null) {
    		return new XString("");
    	}

    	return new XString(n.localName ||     //  standard elements and attributes
    	                   n.baseName  ||     //  IE
    					   n.target    ||     //  processing instructions
                           n.nodeName  ||     //  DOM1 elements
    					   "");               //  fallback
    };

    Functions.namespaceURI = function() {
    	var c = arguments[0];
    	var n;
    	if (arguments.length == 1) {
    		n = c.contextNode;
    	} else if (arguments.length == 2) {
    		n = arguments[1].evaluate(c).first();
    	} else {
    		throw new Error("Function namespace-uri expects (node-set?)");
    	}
    	if (n == null) {
    		return new XString("");
    	}
    	return new XString(n.namespaceURI);
    };

    Functions.name = function() {
    	var c = arguments[0];
    	var n;
    	if (arguments.length == 1) {
    		n = c.contextNode;
    	} else if (arguments.length == 2) {
    		n = arguments[1].evaluate(c).first();
    	} else {
    		throw new Error("Function name expects (node-set?)");
    	}
    	if (n == null) {
    		return new XString("");
    	}
    	if (n.nodeType == 1 /*Node.ELEMENT_NODE*/) {
    		return new XString(n.nodeName);
    	} else if (n.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
    		return new XString(n.name || n.nodeName);
    	} else if (n.nodeType === 7 /*Node.PROCESSING_INSTRUCTION_NODE*/) {
    	    return new XString(n.target || n.nodeName);
    	} else if (n.localName == null) {
    		return new XString("");
    	} else {
    		return new XString(n.localName);
    	}
    };

    Functions.string = function() {
    	var c = arguments[0];
    	if (arguments.length == 1) {
    		return new XString(XNodeSet.prototype.stringForNode(c.contextNode));
    	} else if (arguments.length == 2) {
    		return arguments[1].evaluate(c).string();
    	}
    	throw new Error("Function string expects (object?)");
    };

    Functions.concat = function(c) {
    	if (arguments.length < 3) {
    		throw new Error("Function concat expects (string, string[, string]*)");
    	}
    	var s = "";
    	for (var i = 1; i < arguments.length; i++) {
    		s += arguments[i].evaluate(c).stringValue();
    	}
    	return new XString(s);
    };

    Functions.startsWith = function() {
    	var c = arguments[0];
    	if (arguments.length != 3) {
    		throw new Error("Function startsWith expects (string, string)");
    	}
    	var s1 = arguments[1].evaluate(c).stringValue();
    	var s2 = arguments[2].evaluate(c).stringValue();
    	return new XBoolean(s1.substring(0, s2.length) == s2);
    };

    Functions.contains = function() {
    	var c = arguments[0];
    	if (arguments.length != 3) {
    		throw new Error("Function contains expects (string, string)");
    	}
    	var s1 = arguments[1].evaluate(c).stringValue();
    	var s2 = arguments[2].evaluate(c).stringValue();
    	return new XBoolean(s1.indexOf(s2) !== -1);
    };

    Functions.substringBefore = function() {
    	var c = arguments[0];
    	if (arguments.length != 3) {
    		throw new Error("Function substring-before expects (string, string)");
    	}
    	var s1 = arguments[1].evaluate(c).stringValue();
    	var s2 = arguments[2].evaluate(c).stringValue();
    	return new XString(s1.substring(0, s1.indexOf(s2)));
    };

    Functions.substringAfter = function() {
    	var c = arguments[0];
    	if (arguments.length != 3) {
    		throw new Error("Function substring-after expects (string, string)");
    	}
    	var s1 = arguments[1].evaluate(c).stringValue();
    	var s2 = arguments[2].evaluate(c).stringValue();
    	if (s2.length == 0) {
    		return new XString(s1);
    	}
    	var i = s1.indexOf(s2);
    	if (i == -1) {
    		return new XString("");
    	}
    	return new XString(s1.substring(i + s2.length));
    };

    Functions.substring = function() {
    	var c = arguments[0];
    	if (!(arguments.length == 3 || arguments.length == 4)) {
    		throw new Error("Function substring expects (string, number, number?)");
    	}
    	var s = arguments[1].evaluate(c).stringValue();
    	var n1 = Math.round(arguments[2].evaluate(c).numberValue()) - 1;
    	var n2 = arguments.length == 4 ? n1 + Math.round(arguments[3].evaluate(c).numberValue()) : undefined;
    	return new XString(s.substring(n1, n2));
    };

    Functions.stringLength = function() {
    	var c = arguments[0];
    	var s;
    	if (arguments.length == 1) {
    		s = XNodeSet.prototype.stringForNode(c.contextNode);
    	} else if (arguments.length == 2) {
    		s = arguments[1].evaluate(c).stringValue();
    	} else {
    		throw new Error("Function string-length expects (string?)");
    	}
    	return new XNumber(s.length);
    };

    Functions.normalizeSpace = function() {
    	var c = arguments[0];
    	var s;
    	if (arguments.length == 1) {
    		s = XNodeSet.prototype.stringForNode(c.contextNode);
    	} else if (arguments.length == 2) {
    		s = arguments[1].evaluate(c).stringValue();
    	} else {
    		throw new Error("Function normalize-space expects (string?)");
    	}
    	var i = 0;
    	var j = s.length - 1;
    	while (Utilities.isSpace(s.charCodeAt(j))) {
    		j--;
    	}
    	var t = "";
    	while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
    		i++;
    	}
    	while (i <= j) {
    		if (Utilities.isSpace(s.charCodeAt(i))) {
    			t += " ";
    			while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
    				i++;
    			}
    		} else {
    			t += s.charAt(i);
    			i++;
    		}
    	}
    	return new XString(t);
    };

    Functions.translate = function(c, eValue, eFrom, eTo) {
    	if (arguments.length != 4) {
    		throw new Error("Function translate expects (string, string, string)");
    	}

    	var value = eValue.evaluate(c).stringValue();
    	var from = eFrom.evaluate(c).stringValue();
    	var to = eTo.evaluate(c).stringValue();
    	
    	var cMap = reduce(function (acc, ch, i) {
    		if (!(ch in acc)) {
    			acc[ch] = i > to.length ? '' : to[i];
    		}
    		return acc;
    	}, {}, from);

        var t = join('', map(function (ch) {
            return ch in cMap ? cMap[ch] : ch;
        }, value));

    	return new XString(t);
    };

    Functions.boolean_ = function() {
    	var c = arguments[0];
    	if (arguments.length != 2) {
    		throw new Error("Function boolean expects (object)");
    	}
    	return arguments[1].evaluate(c).bool();
    };

    Functions.not = function(c, eValue) {
    	if (arguments.length != 2) {
    		throw new Error("Function not expects (object)");
    	}
    	return eValue.evaluate(c).bool().not();
    };

    Functions.true_ = function() {
    	if (arguments.length != 1) {
    		throw new Error("Function true expects ()");
    	}
    	return XBoolean.true_;
    };

    Functions.false_ = function() {
    	if (arguments.length != 1) {
    		throw new Error("Function false expects ()");
    	}
    	return XBoolean.false_;
    };

    Functions.lang = function() {
    	var c = arguments[0];
    	if (arguments.length != 2) {
    		throw new Error("Function lang expects (string)");
    	}
    	var lang;
    	for (var n = c.contextNode; n != null && n.nodeType != 9 /*Node.DOCUMENT_NODE*/; n = n.parentNode) {
    		var a = n.getAttributeNS(XPath.XML_NAMESPACE_URI, "lang");
    		if (a != null) {
    			lang = String(a);
    			break;
    		}
    	}
    	if (lang == null) {
    		return XBoolean.false_;
    	}
    	var s = arguments[1].evaluate(c).stringValue();
    	return new XBoolean(lang.substring(0, s.length) == s
    				&& (lang.length == s.length || lang.charAt(s.length) == '-'));
    };

    Functions.number = function() {
    	var c = arguments[0];
    	if (!(arguments.length == 1 || arguments.length == 2)) {
    		throw new Error("Function number expects (object?)");
    	}
    	if (arguments.length == 1) {
    		return new XNumber(XNodeSet.prototype.stringForNode(c.contextNode));
    	}
    	return arguments[1].evaluate(c).number();
    };

    Functions.sum = function() {
    	var c = arguments[0];
    	var ns;
    	if (arguments.length != 2 || !Utilities.instance_of((ns = arguments[1].evaluate(c)), XNodeSet)) {
    		throw new Error("Function sum expects (node-set)");
    	}
    	ns = ns.toUnsortedArray();
    	var n = 0;
    	for (var i = 0; i < ns.length; i++) {
    		n += new XNumber(XNodeSet.prototype.stringForNode(ns[i])).numberValue();
    	}
    	return new XNumber(n);
    };

    Functions.floor = function() {
    	var c = arguments[0];
    	if (arguments.length != 2) {
    		throw new Error("Function floor expects (number)");
    	}
    	return new XNumber(Math.floor(arguments[1].evaluate(c).numberValue()));
    };

    Functions.ceiling = function() {
    	var c = arguments[0];
    	if (arguments.length != 2) {
    		throw new Error("Function ceiling expects (number)");
    	}
    	return new XNumber(Math.ceil(arguments[1].evaluate(c).numberValue()));
    };

    Functions.round = function() {
    	var c = arguments[0];
    	if (arguments.length != 2) {
    		throw new Error("Function round expects (number)");
    	}
    	return new XNumber(Math.round(arguments[1].evaluate(c).numberValue()));
    };

    // Utilities /////////////////////////////////////////////////////////////////

    var Utilities = new Object();

    Utilities.isAttribute = function (val) {
        return val && (val.nodeType === 2 || val.ownerElement);
    };

    Utilities.splitQName = function(qn) {
    	var i = qn.indexOf(":");
    	if (i == -1) {
    		return [ null, qn ];
    	}
    	return [ qn.substring(0, i), qn.substring(i + 1) ];
    };

    Utilities.resolveQName = function(qn, nr, n, useDefault) {
    	var parts = Utilities.splitQName(qn);
    	if (parts[0] != null) {
    		parts[0] = nr.getNamespace(parts[0], n);
    	} else {
    		if (useDefault) {
    			parts[0] = nr.getNamespace("", n);
    			if (parts[0] == null) {
    				parts[0] = "";
    			}
    		} else {
    			parts[0] = "";
    		}
    	}
    	return parts;
    };

    Utilities.isSpace = function(c) {
    	return c == 0x9 || c == 0xd || c == 0xa || c == 0x20;
    };

    Utilities.isLetter = function(c) {
    	return c >= 0x0041 && c <= 0x005A ||
    		c >= 0x0061 && c <= 0x007A ||
    		c >= 0x00C0 && c <= 0x00D6 ||
    		c >= 0x00D8 && c <= 0x00F6 ||
    		c >= 0x00F8 && c <= 0x00FF ||
    		c >= 0x0100 && c <= 0x0131 ||
    		c >= 0x0134 && c <= 0x013E ||
    		c >= 0x0141 && c <= 0x0148 ||
    		c >= 0x014A && c <= 0x017E ||
    		c >= 0x0180 && c <= 0x01C3 ||
    		c >= 0x01CD && c <= 0x01F0 ||
    		c >= 0x01F4 && c <= 0x01F5 ||
    		c >= 0x01FA && c <= 0x0217 ||
    		c >= 0x0250 && c <= 0x02A8 ||
    		c >= 0x02BB && c <= 0x02C1 ||
    		c == 0x0386 ||
    		c >= 0x0388 && c <= 0x038A ||
    		c == 0x038C ||
    		c >= 0x038E && c <= 0x03A1 ||
    		c >= 0x03A3 && c <= 0x03CE ||
    		c >= 0x03D0 && c <= 0x03D6 ||
    		c == 0x03DA ||
    		c == 0x03DC ||
    		c == 0x03DE ||
    		c == 0x03E0 ||
    		c >= 0x03E2 && c <= 0x03F3 ||
    		c >= 0x0401 && c <= 0x040C ||
    		c >= 0x040E && c <= 0x044F ||
    		c >= 0x0451 && c <= 0x045C ||
    		c >= 0x045E && c <= 0x0481 ||
    		c >= 0x0490 && c <= 0x04C4 ||
    		c >= 0x04C7 && c <= 0x04C8 ||
    		c >= 0x04CB && c <= 0x04CC ||
    		c >= 0x04D0 && c <= 0x04EB ||
    		c >= 0x04EE && c <= 0x04F5 ||
    		c >= 0x04F8 && c <= 0x04F9 ||
    		c >= 0x0531 && c <= 0x0556 ||
    		c == 0x0559 ||
    		c >= 0x0561 && c <= 0x0586 ||
    		c >= 0x05D0 && c <= 0x05EA ||
    		c >= 0x05F0 && c <= 0x05F2 ||
    		c >= 0x0621 && c <= 0x063A ||
    		c >= 0x0641 && c <= 0x064A ||
    		c >= 0x0671 && c <= 0x06B7 ||
    		c >= 0x06BA && c <= 0x06BE ||
    		c >= 0x06C0 && c <= 0x06CE ||
    		c >= 0x06D0 && c <= 0x06D3 ||
    		c == 0x06D5 ||
    		c >= 0x06E5 && c <= 0x06E6 ||
    		c >= 0x0905 && c <= 0x0939 ||
    		c == 0x093D ||
    		c >= 0x0958 && c <= 0x0961 ||
    		c >= 0x0985 && c <= 0x098C ||
    		c >= 0x098F && c <= 0x0990 ||
    		c >= 0x0993 && c <= 0x09A8 ||
    		c >= 0x09AA && c <= 0x09B0 ||
    		c == 0x09B2 ||
    		c >= 0x09B6 && c <= 0x09B9 ||
    		c >= 0x09DC && c <= 0x09DD ||
    		c >= 0x09DF && c <= 0x09E1 ||
    		c >= 0x09F0 && c <= 0x09F1 ||
    		c >= 0x0A05 && c <= 0x0A0A ||
    		c >= 0x0A0F && c <= 0x0A10 ||
    		c >= 0x0A13 && c <= 0x0A28 ||
    		c >= 0x0A2A && c <= 0x0A30 ||
    		c >= 0x0A32 && c <= 0x0A33 ||
    		c >= 0x0A35 && c <= 0x0A36 ||
    		c >= 0x0A38 && c <= 0x0A39 ||
    		c >= 0x0A59 && c <= 0x0A5C ||
    		c == 0x0A5E ||
    		c >= 0x0A72 && c <= 0x0A74 ||
    		c >= 0x0A85 && c <= 0x0A8B ||
    		c == 0x0A8D ||
    		c >= 0x0A8F && c <= 0x0A91 ||
    		c >= 0x0A93 && c <= 0x0AA8 ||
    		c >= 0x0AAA && c <= 0x0AB0 ||
    		c >= 0x0AB2 && c <= 0x0AB3 ||
    		c >= 0x0AB5 && c <= 0x0AB9 ||
    		c == 0x0ABD ||
    		c == 0x0AE0 ||
    		c >= 0x0B05 && c <= 0x0B0C ||
    		c >= 0x0B0F && c <= 0x0B10 ||
    		c >= 0x0B13 && c <= 0x0B28 ||
    		c >= 0x0B2A && c <= 0x0B30 ||
    		c >= 0x0B32 && c <= 0x0B33 ||
    		c >= 0x0B36 && c <= 0x0B39 ||
    		c == 0x0B3D ||
    		c >= 0x0B5C && c <= 0x0B5D ||
    		c >= 0x0B5F && c <= 0x0B61 ||
    		c >= 0x0B85 && c <= 0x0B8A ||
    		c >= 0x0B8E && c <= 0x0B90 ||
    		c >= 0x0B92 && c <= 0x0B95 ||
    		c >= 0x0B99 && c <= 0x0B9A ||
    		c == 0x0B9C ||
    		c >= 0x0B9E && c <= 0x0B9F ||
    		c >= 0x0BA3 && c <= 0x0BA4 ||
    		c >= 0x0BA8 && c <= 0x0BAA ||
    		c >= 0x0BAE && c <= 0x0BB5 ||
    		c >= 0x0BB7 && c <= 0x0BB9 ||
    		c >= 0x0C05 && c <= 0x0C0C ||
    		c >= 0x0C0E && c <= 0x0C10 ||
    		c >= 0x0C12 && c <= 0x0C28 ||
    		c >= 0x0C2A && c <= 0x0C33 ||
    		c >= 0x0C35 && c <= 0x0C39 ||
    		c >= 0x0C60 && c <= 0x0C61 ||
    		c >= 0x0C85 && c <= 0x0C8C ||
    		c >= 0x0C8E && c <= 0x0C90 ||
    		c >= 0x0C92 && c <= 0x0CA8 ||
    		c >= 0x0CAA && c <= 0x0CB3 ||
    		c >= 0x0CB5 && c <= 0x0CB9 ||
    		c == 0x0CDE ||
    		c >= 0x0CE0 && c <= 0x0CE1 ||
    		c >= 0x0D05 && c <= 0x0D0C ||
    		c >= 0x0D0E && c <= 0x0D10 ||
    		c >= 0x0D12 && c <= 0x0D28 ||
    		c >= 0x0D2A && c <= 0x0D39 ||
    		c >= 0x0D60 && c <= 0x0D61 ||
    		c >= 0x0E01 && c <= 0x0E2E ||
    		c == 0x0E30 ||
    		c >= 0x0E32 && c <= 0x0E33 ||
    		c >= 0x0E40 && c <= 0x0E45 ||
    		c >= 0x0E81 && c <= 0x0E82 ||
    		c == 0x0E84 ||
    		c >= 0x0E87 && c <= 0x0E88 ||
    		c == 0x0E8A ||
    		c == 0x0E8D ||
    		c >= 0x0E94 && c <= 0x0E97 ||
    		c >= 0x0E99 && c <= 0x0E9F ||
    		c >= 0x0EA1 && c <= 0x0EA3 ||
    		c == 0x0EA5 ||
    		c == 0x0EA7 ||
    		c >= 0x0EAA && c <= 0x0EAB ||
    		c >= 0x0EAD && c <= 0x0EAE ||
    		c == 0x0EB0 ||
    		c >= 0x0EB2 && c <= 0x0EB3 ||
    		c == 0x0EBD ||
    		c >= 0x0EC0 && c <= 0x0EC4 ||
    		c >= 0x0F40 && c <= 0x0F47 ||
    		c >= 0x0F49 && c <= 0x0F69 ||
    		c >= 0x10A0 && c <= 0x10C5 ||
    		c >= 0x10D0 && c <= 0x10F6 ||
    		c == 0x1100 ||
    		c >= 0x1102 && c <= 0x1103 ||
    		c >= 0x1105 && c <= 0x1107 ||
    		c == 0x1109 ||
    		c >= 0x110B && c <= 0x110C ||
    		c >= 0x110E && c <= 0x1112 ||
    		c == 0x113C ||
    		c == 0x113E ||
    		c == 0x1140 ||
    		c == 0x114C ||
    		c == 0x114E ||
    		c == 0x1150 ||
    		c >= 0x1154 && c <= 0x1155 ||
    		c == 0x1159 ||
    		c >= 0x115F && c <= 0x1161 ||
    		c == 0x1163 ||
    		c == 0x1165 ||
    		c == 0x1167 ||
    		c == 0x1169 ||
    		c >= 0x116D && c <= 0x116E ||
    		c >= 0x1172 && c <= 0x1173 ||
    		c == 0x1175 ||
    		c == 0x119E ||
    		c == 0x11A8 ||
    		c == 0x11AB ||
    		c >= 0x11AE && c <= 0x11AF ||
    		c >= 0x11B7 && c <= 0x11B8 ||
    		c == 0x11BA ||
    		c >= 0x11BC && c <= 0x11C2 ||
    		c == 0x11EB ||
    		c == 0x11F0 ||
    		c == 0x11F9 ||
    		c >= 0x1E00 && c <= 0x1E9B ||
    		c >= 0x1EA0 && c <= 0x1EF9 ||
    		c >= 0x1F00 && c <= 0x1F15 ||
    		c >= 0x1F18 && c <= 0x1F1D ||
    		c >= 0x1F20 && c <= 0x1F45 ||
    		c >= 0x1F48 && c <= 0x1F4D ||
    		c >= 0x1F50 && c <= 0x1F57 ||
    		c == 0x1F59 ||
    		c == 0x1F5B ||
    		c == 0x1F5D ||
    		c >= 0x1F5F && c <= 0x1F7D ||
    		c >= 0x1F80 && c <= 0x1FB4 ||
    		c >= 0x1FB6 && c <= 0x1FBC ||
    		c == 0x1FBE ||
    		c >= 0x1FC2 && c <= 0x1FC4 ||
    		c >= 0x1FC6 && c <= 0x1FCC ||
    		c >= 0x1FD0 && c <= 0x1FD3 ||
    		c >= 0x1FD6 && c <= 0x1FDB ||
    		c >= 0x1FE0 && c <= 0x1FEC ||
    		c >= 0x1FF2 && c <= 0x1FF4 ||
    		c >= 0x1FF6 && c <= 0x1FFC ||
    		c == 0x2126 ||
    		c >= 0x212A && c <= 0x212B ||
    		c == 0x212E ||
    		c >= 0x2180 && c <= 0x2182 ||
    		c >= 0x3041 && c <= 0x3094 ||
    		c >= 0x30A1 && c <= 0x30FA ||
    		c >= 0x3105 && c <= 0x312C ||
    		c >= 0xAC00 && c <= 0xD7A3 ||
    		c >= 0x4E00 && c <= 0x9FA5 ||
    		c == 0x3007 ||
    		c >= 0x3021 && c <= 0x3029;
    };

    Utilities.isNCNameChar = function(c) {
    	return c >= 0x0030 && c <= 0x0039
    		|| c >= 0x0660 && c <= 0x0669
    		|| c >= 0x06F0 && c <= 0x06F9
    		|| c >= 0x0966 && c <= 0x096F
    		|| c >= 0x09E6 && c <= 0x09EF
    		|| c >= 0x0A66 && c <= 0x0A6F
    		|| c >= 0x0AE6 && c <= 0x0AEF
    		|| c >= 0x0B66 && c <= 0x0B6F
    		|| c >= 0x0BE7 && c <= 0x0BEF
    		|| c >= 0x0C66 && c <= 0x0C6F
    		|| c >= 0x0CE6 && c <= 0x0CEF
    		|| c >= 0x0D66 && c <= 0x0D6F
    		|| c >= 0x0E50 && c <= 0x0E59
    		|| c >= 0x0ED0 && c <= 0x0ED9
    		|| c >= 0x0F20 && c <= 0x0F29
    		|| c == 0x002E
    		|| c == 0x002D
    		|| c == 0x005F
    		|| Utilities.isLetter(c)
    		|| c >= 0x0300 && c <= 0x0345
    		|| c >= 0x0360 && c <= 0x0361
    		|| c >= 0x0483 && c <= 0x0486
    		|| c >= 0x0591 && c <= 0x05A1
    		|| c >= 0x05A3 && c <= 0x05B9
    		|| c >= 0x05BB && c <= 0x05BD
    		|| c == 0x05BF
    		|| c >= 0x05C1 && c <= 0x05C2
    		|| c == 0x05C4
    		|| c >= 0x064B && c <= 0x0652
    		|| c == 0x0670
    		|| c >= 0x06D6 && c <= 0x06DC
    		|| c >= 0x06DD && c <= 0x06DF
    		|| c >= 0x06E0 && c <= 0x06E4
    		|| c >= 0x06E7 && c <= 0x06E8
    		|| c >= 0x06EA && c <= 0x06ED
    		|| c >= 0x0901 && c <= 0x0903
    		|| c == 0x093C
    		|| c >= 0x093E && c <= 0x094C
    		|| c == 0x094D
    		|| c >= 0x0951 && c <= 0x0954
    		|| c >= 0x0962 && c <= 0x0963
    		|| c >= 0x0981 && c <= 0x0983
    		|| c == 0x09BC
    		|| c == 0x09BE
    		|| c == 0x09BF
    		|| c >= 0x09C0 && c <= 0x09C4
    		|| c >= 0x09C7 && c <= 0x09C8
    		|| c >= 0x09CB && c <= 0x09CD
    		|| c == 0x09D7
    		|| c >= 0x09E2 && c <= 0x09E3
    		|| c == 0x0A02
    		|| c == 0x0A3C
    		|| c == 0x0A3E
    		|| c == 0x0A3F
    		|| c >= 0x0A40 && c <= 0x0A42
    		|| c >= 0x0A47 && c <= 0x0A48
    		|| c >= 0x0A4B && c <= 0x0A4D
    		|| c >= 0x0A70 && c <= 0x0A71
    		|| c >= 0x0A81 && c <= 0x0A83
    		|| c == 0x0ABC
    		|| c >= 0x0ABE && c <= 0x0AC5
    		|| c >= 0x0AC7 && c <= 0x0AC9
    		|| c >= 0x0ACB && c <= 0x0ACD
    		|| c >= 0x0B01 && c <= 0x0B03
    		|| c == 0x0B3C
    		|| c >= 0x0B3E && c <= 0x0B43
    		|| c >= 0x0B47 && c <= 0x0B48
    		|| c >= 0x0B4B && c <= 0x0B4D
    		|| c >= 0x0B56 && c <= 0x0B57
    		|| c >= 0x0B82 && c <= 0x0B83
    		|| c >= 0x0BBE && c <= 0x0BC2
    		|| c >= 0x0BC6 && c <= 0x0BC8
    		|| c >= 0x0BCA && c <= 0x0BCD
    		|| c == 0x0BD7
    		|| c >= 0x0C01 && c <= 0x0C03
    		|| c >= 0x0C3E && c <= 0x0C44
    		|| c >= 0x0C46 && c <= 0x0C48
    		|| c >= 0x0C4A && c <= 0x0C4D
    		|| c >= 0x0C55 && c <= 0x0C56
    		|| c >= 0x0C82 && c <= 0x0C83
    		|| c >= 0x0CBE && c <= 0x0CC4
    		|| c >= 0x0CC6 && c <= 0x0CC8
    		|| c >= 0x0CCA && c <= 0x0CCD
    		|| c >= 0x0CD5 && c <= 0x0CD6
    		|| c >= 0x0D02 && c <= 0x0D03
    		|| c >= 0x0D3E && c <= 0x0D43
    		|| c >= 0x0D46 && c <= 0x0D48
    		|| c >= 0x0D4A && c <= 0x0D4D
    		|| c == 0x0D57
    		|| c == 0x0E31
    		|| c >= 0x0E34 && c <= 0x0E3A
    		|| c >= 0x0E47 && c <= 0x0E4E
    		|| c == 0x0EB1
    		|| c >= 0x0EB4 && c <= 0x0EB9
    		|| c >= 0x0EBB && c <= 0x0EBC
    		|| c >= 0x0EC8 && c <= 0x0ECD
    		|| c >= 0x0F18 && c <= 0x0F19
    		|| c == 0x0F35
    		|| c == 0x0F37
    		|| c == 0x0F39
    		|| c == 0x0F3E
    		|| c == 0x0F3F
    		|| c >= 0x0F71 && c <= 0x0F84
    		|| c >= 0x0F86 && c <= 0x0F8B
    		|| c >= 0x0F90 && c <= 0x0F95
    		|| c == 0x0F97
    		|| c >= 0x0F99 && c <= 0x0FAD
    		|| c >= 0x0FB1 && c <= 0x0FB7
    		|| c == 0x0FB9
    		|| c >= 0x20D0 && c <= 0x20DC
    		|| c == 0x20E1
    		|| c >= 0x302A && c <= 0x302F
    		|| c == 0x3099
    		|| c == 0x309A
    		|| c == 0x00B7
    		|| c == 0x02D0
    		|| c == 0x02D1
    		|| c == 0x0387
    		|| c == 0x0640
    		|| c == 0x0E46
    		|| c == 0x0EC6
    		|| c == 0x3005
    		|| c >= 0x3031 && c <= 0x3035
    		|| c >= 0x309D && c <= 0x309E
    		|| c >= 0x30FC && c <= 0x30FE;
    };

    Utilities.coalesceText = function(n) {
    	for (var m = n.firstChild; m != null; m = m.nextSibling) {
    		if (m.nodeType == 3 /*Node.TEXT_NODE*/ || m.nodeType == 4 /*Node.CDATA_SECTION_NODE*/) {
    			var s = m.nodeValue;
    			var first = m;
    			m = m.nextSibling;
    			while (m != null && (m.nodeType == 3 /*Node.TEXT_NODE*/ || m.nodeType == 4 /*Node.CDATA_SECTION_NODE*/)) {
    				s += m.nodeValue;
    				var del = m;
    				m = m.nextSibling;
    				del.parentNode.removeChild(del);
    			}
    			if (first.nodeType == 4 /*Node.CDATA_SECTION_NODE*/) {
    				var p = first.parentNode;
    				if (first.nextSibling == null) {
    					p.removeChild(first);
    					p.appendChild(p.ownerDocument.createTextNode(s));
    				} else {
    					var next = first.nextSibling;
    					p.removeChild(first);
    					p.insertBefore(p.ownerDocument.createTextNode(s), next);
    				}
    			} else {
    				first.nodeValue = s;
    			}
    			if (m == null) {
    				break;
    			}
    		} else if (m.nodeType == 1 /*Node.ELEMENT_NODE*/) {
    			Utilities.coalesceText(m);
    		}
    	}
    };

    Utilities.instance_of = function(o, c) {
    	while (o != null) {
    		if (o.constructor === c) {
    			return true;
    		}
    		if (o === Object) {
    			return false;
    		}
    		o = o.constructor.superclass;
    	}
    	return false;
    };

    Utilities.getElementById = function(n, id) {
    	// Note that this does not check the DTD to check for actual
    	// attributes of type ID, so this may be a bit wrong.
    	if (n.nodeType == 1 /*Node.ELEMENT_NODE*/) {
    		if (n.getAttribute("id") == id
    				|| n.getAttributeNS(null, "id") == id) {
    			return n;
    		}
    	}
    	for (var m = n.firstChild; m != null; m = m.nextSibling) {
    		var res = Utilities.getElementById(m, id);
    		if (res != null) {
    			return res;
    		}
    	}
    	return null;
    };

    // XPathException ////////////////////////////////////////////////////////////

    var XPathException = (function () {
        function getMessage(code, exception) {
            var msg = exception ? ": " + exception.toString() : "";
            switch (code) {
                case XPathException.INVALID_EXPRESSION_ERR:
                    return "Invalid expression" + msg;
                case XPathException.TYPE_ERR:
                    return "Type error" + msg;
            }
            return null;
        }

        function XPathException(code, error, message) {
            var err = Error.call(this, getMessage(code, error) || message);

            err.code = code;
            err.exception = error;

            return err;
        }

        XPathException.prototype = Object.create(Error.prototype);
        XPathException.prototype.constructor = XPathException;
        XPathException.superclass = Error;

        XPathException.prototype.toString = function() {
            return this.message;
        };

        XPathException.fromMessage = function(message, error) {
            return new XPathException(null, error, message);
        };

        XPathException.INVALID_EXPRESSION_ERR = 51;
        XPathException.TYPE_ERR = 52;

        return XPathException;
    })();

    // XPathExpression ///////////////////////////////////////////////////////////

    XPathExpression.prototype = {};
    XPathExpression.prototype.constructor = XPathExpression;
    XPathExpression.superclass = Object.prototype;

    function XPathExpression(e, r, p) {
    	this.xpath = p.parse(e);
    	this.context = new XPathContext();
    	this.context.namespaceResolver = new XPathNSResolverWrapper(r);
    }

    XPathExpression.getOwnerDocument = function (n) {
    	return n.nodeType === 9 /*Node.DOCUMENT_NODE*/ ? n : n.ownerDocument;
    };

    XPathExpression.detectHtmlDom = function (n) {
    	if (!n) { return false; }
    	
    	var doc = XPathExpression.getOwnerDocument(n);
    	
    	try {
    		return doc.implementation.hasFeature("HTML", "2.0");
    	} catch (e) {
    		return true;
    	}
    };

    XPathExpression.prototype.evaluate = function(n, t, res) {
    	this.context.expressionContextNode = n;
    	// backward compatibility - no reliable way to detect whether the DOM is HTML, but
    	// this library has been using this method up until now, so we will continue to use it
    	// ONLY when using an XPathExpression
    	this.context.caseInsensitive = XPathExpression.detectHtmlDom(n);
    	
    	var result = this.xpath.evaluate(this.context);
    	return new XPathResult(result, t);
    };

    // XPathNSResolverWrapper ////////////////////////////////////////////////////

    XPathNSResolverWrapper.prototype = {};
    XPathNSResolverWrapper.prototype.constructor = XPathNSResolverWrapper;
    XPathNSResolverWrapper.superclass = Object.prototype;

    function XPathNSResolverWrapper(r) {
    	this.xpathNSResolver = r;
    }

    XPathNSResolverWrapper.prototype.getNamespace = function(prefix, n) {
        if (this.xpathNSResolver == null) {
            return null;
        }
    	return this.xpathNSResolver.lookupNamespaceURI(prefix);
    };

    // NodeXPathNSResolver ///////////////////////////////////////////////////////

    NodeXPathNSResolver.prototype = {};
    NodeXPathNSResolver.prototype.constructor = NodeXPathNSResolver;
    NodeXPathNSResolver.superclass = Object.prototype;

    function NodeXPathNSResolver(n) {
    	this.node = n;
    	this.namespaceResolver = new NamespaceResolver();
    }

    NodeXPathNSResolver.prototype.lookupNamespaceURI = function(prefix) {
    	return this.namespaceResolver.getNamespace(prefix, this.node);
    };

    // XPathResult ///////////////////////////////////////////////////////////////

    XPathResult.prototype = {};
    XPathResult.prototype.constructor = XPathResult;
    XPathResult.superclass = Object.prototype;

    function XPathResult(v, t) {
    	if (t == XPathResult.ANY_TYPE) {
    		if (v.constructor === XString) {
    			t = XPathResult.STRING_TYPE;
    		} else if (v.constructor === XNumber) {
    			t = XPathResult.NUMBER_TYPE;
    		} else if (v.constructor === XBoolean) {
    			t = XPathResult.BOOLEAN_TYPE;
    		} else if (v.constructor === XNodeSet) {
    			t = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
    		}
    	}
    	this.resultType = t;
    	switch (t) {
    		case XPathResult.NUMBER_TYPE:
    			this.numberValue = v.numberValue();
    			return;
    		case XPathResult.STRING_TYPE:
    			this.stringValue = v.stringValue();
    			return;
    		case XPathResult.BOOLEAN_TYPE:
    			this.booleanValue = v.booleanValue();
    			return;
    		case XPathResult.ANY_UNORDERED_NODE_TYPE:
    		case XPathResult.FIRST_ORDERED_NODE_TYPE:
    			if (v.constructor === XNodeSet) {
    				this.singleNodeValue = v.first();
    				return;
    			}
    			break;
    		case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
    		case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
    			if (v.constructor === XNodeSet) {
    				this.invalidIteratorState = false;
    				this.nodes = v.toArray();
    				this.iteratorIndex = 0;
    				return;
    			}
    			break;
    		case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
    		case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
    			if (v.constructor === XNodeSet) {
    				this.nodes = v.toArray();
    				this.snapshotLength = this.nodes.length;
    				return;
    			}
    			break;
    	}
    	throw new XPathException(XPathException.TYPE_ERR);
    }
    XPathResult.prototype.iterateNext = function() {
    	if (this.resultType != XPathResult.UNORDERED_NODE_ITERATOR_TYPE
    			&& this.resultType != XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
    		throw new XPathException(XPathException.TYPE_ERR);
    	}
    	return this.nodes[this.iteratorIndex++];
    };

    XPathResult.prototype.snapshotItem = function(i) {
    	if (this.resultType != XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
    			&& this.resultType != XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
    		throw new XPathException(XPathException.TYPE_ERR);
    	}
    	return this.nodes[i];
    };

    XPathResult.ANY_TYPE = 0;
    XPathResult.NUMBER_TYPE = 1;
    XPathResult.STRING_TYPE = 2;
    XPathResult.BOOLEAN_TYPE = 3;
    XPathResult.UNORDERED_NODE_ITERATOR_TYPE = 4;
    XPathResult.ORDERED_NODE_ITERATOR_TYPE = 5;
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE = 7;
    XPathResult.ANY_UNORDERED_NODE_TYPE = 8;
    XPathResult.FIRST_ORDERED_NODE_TYPE = 9;

    // DOM 3 XPath support ///////////////////////////////////////////////////////

    function installDOM3XPathSupport(doc, p) {
    	doc.createExpression = function(e, r) {
    		try {
    			return new XPathExpression(e, r, p);
    		} catch (e) {
    			throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, e);
    		}
    	};
    	doc.createNSResolver = function(n) {
    		return new NodeXPathNSResolver(n);
    	};
    	doc.evaluate = function(e, cn, r, t, res) {
    		if (t < 0 || t > 9) {
    			throw { code: 0, toString: function() { return "Request type not supported"; } };
    		}
            return doc.createExpression(e, r, p).evaluate(cn, t, res);
    	};
    }
    // ---------------------------------------------------------------------------

    // Install DOM 3 XPath support for the current document.
    try {
    	var shouldInstall = true;
    	try {
    		if (document.implementation
    				&& document.implementation.hasFeature
    				&& document.implementation.hasFeature("XPath", null)) {
    			shouldInstall = false;
    		}
    	} catch (e) {
    	}
    	if (shouldInstall) {
    		installDOM3XPathSupport(document, new XPathParser());
    	}
    } catch (e) {
    }

    // ---------------------------------------------------------------------------
    // exports for node.js

    installDOM3XPathSupport(exports, new XPathParser());

    (function() {
        var parser = new XPathParser();

        var defaultNSResolver = new NamespaceResolver();
        var defaultFunctionResolver = new FunctionResolver();
        var defaultVariableResolver = new VariableResolver();

        function makeNSResolverFromFunction(func) {
            return {
                getNamespace: function (prefix, node) {
                    var ns = func(prefix, node);

                    return ns || defaultNSResolver.getNamespace(prefix, node);
                }
            };
        }

        function makeNSResolverFromObject(obj) {
            return makeNSResolverFromFunction(obj.getNamespace.bind(obj));
        }

        function makeNSResolverFromMap(map) {
            return makeNSResolverFromFunction(function (prefix) {
                return map[prefix];
            });
        }

        function makeNSResolver(resolver) {
            if (resolver && typeof resolver.getNamespace === "function") {
                return makeNSResolverFromObject(resolver);
            }

            if (typeof resolver === "function") {
                return makeNSResolverFromFunction(resolver);
            }

            // assume prefix -> uri mapping
            if (typeof resolver === "object") {
                return makeNSResolverFromMap(resolver);
            }

            return defaultNSResolver;
        }

        /** Converts native JavaScript types to their XPath library equivalent */
        function convertValue(value) {
            if (value === null ||
                typeof value === "undefined" ||
                value instanceof XString ||
                value instanceof XBoolean ||
                value instanceof XNumber ||
                value instanceof XNodeSet) {
                return value;
            }

            switch (typeof value) {
                case "string": return new XString(value);
                case "boolean": return new XBoolean(value);
                case "number": return new XNumber(value);
            }

            // assume node(s)
            var ns = new XNodeSet();
            ns.addArray([].concat(value));
            return ns;
        }

        function makeEvaluator(func) {
            return function (context) {
                var args = Array.prototype.slice.call(arguments, 1).map(function (arg) {
                    return arg.evaluate(context);
                });
                var result = func.apply(this, [].concat(context, args));
                return convertValue(result);
            };
        }

        function makeFunctionResolverFromFunction(func) {
            return {
                getFunction: function (name, namespace) {
                    var found = func(name, namespace);
                    if (found) {
                        return makeEvaluator(found);
                    }
                    return defaultFunctionResolver.getFunction(name, namespace);
                }
            };
        }

        function makeFunctionResolverFromObject(obj) {
            return makeFunctionResolverFromFunction(obj.getFunction.bind(obj));
        }

        function makeFunctionResolverFromMap(map) {
            return makeFunctionResolverFromFunction(function (name) {
                return map[name];
            });
        }

        function makeFunctionResolver(resolver) {
            if (resolver && typeof resolver.getFunction === "function") {
                return makeFunctionResolverFromObject(resolver);
            }

            if (typeof resolver === "function") {
                return makeFunctionResolverFromFunction(resolver);
            }

            // assume map
            if (typeof resolver === "object") {
                return makeFunctionResolverFromMap(resolver);
            }

            return defaultFunctionResolver;
        }

        function makeVariableResolverFromFunction(func) {
            return {
                getVariable: function (name, namespace) {
                    var value = func(name, namespace);
                    return convertValue(value);
                }
            };
        }

        function makeVariableResolver(resolver) {
            if (resolver) {
                if (typeof resolver.getVariable === "function") {
                    return makeVariableResolverFromFunction(resolver.getVariable.bind(resolver));
                }

                if (typeof resolver === "function") {
                    return makeVariableResolverFromFunction(resolver);
                }

                // assume map
                if (typeof resolver === "object") {
                    return makeVariableResolverFromFunction(function (name) {
                        return resolver[name];
                    });
                }
            }

            return defaultVariableResolver;
        }
    	
    	function copyIfPresent(prop, dest, source) {
    		if (prop in source) { dest[prop] = source[prop]; }
    	}

        function makeContext(options) {
            var context = new XPathContext();

            if (options) {
                context.namespaceResolver = makeNSResolver(options.namespaces);
                context.functionResolver = makeFunctionResolver(options.functions);
                context.variableResolver = makeVariableResolver(options.variables);
    			context.expressionContextNode = options.node;
    			copyIfPresent('allowAnyNamespaceForNoPrefix', context, options);
    			copyIfPresent('isHtml', context, options);
            } else {
                context.namespaceResolver = defaultNSResolver;
            }

            return context;
        }

        function evaluate(parsedExpression, options) {
            var context = makeContext(options);

            return parsedExpression.evaluate(context);
        }

        var evaluatorPrototype = {
            evaluate: function (options) {
                return evaluate(this.expression, options);
            }

            ,evaluateNumber: function (options) {
                return this.evaluate(options).numberValue();
            }

            ,evaluateString: function (options) {
                return this.evaluate(options).stringValue();
            }

            ,evaluateBoolean: function (options) {
                return this.evaluate(options).booleanValue();
            }

            ,evaluateNodeSet: function (options) {
                return this.evaluate(options).nodeset();
            }

            ,select: function (options) {
                return this.evaluateNodeSet(options).toArray()
            }

            ,select1: function (options) {
                return this.select(options)[0];
            }
        };

        function parse(xpath) {
            var parsed = parser.parse(xpath);

            return Object.create(evaluatorPrototype, {
                expression: {
                    value: parsed
                }
            });
        }

        exports.parse = parse;
    })();

    exports.XPath = XPath;
    exports.XPathParser = XPathParser;
    exports.XPathResult = XPathResult;

    exports.Step = Step;
    exports.NodeTest = NodeTest;
    exports.BarOperation = BarOperation;

    exports.NamespaceResolver = NamespaceResolver;
    exports.FunctionResolver = FunctionResolver;
    exports.VariableResolver = VariableResolver;

    exports.Utilities = Utilities;

    exports.XPathContext = XPathContext;
    exports.XNodeSet = XNodeSet;
    exports.XBoolean = XBoolean;
    exports.XString = XString;
    exports.XNumber = XNumber;

    // helper
    exports.select = function(e, doc, single) {
    	return exports.selectWithResolver(e, doc, null, single);
    };

    exports.useNamespaces = function(mappings) {
    	var resolver = {
    		mappings: mappings || {},
    		lookupNamespaceURI: function(prefix) {
    			return this.mappings[prefix];
    		}
    	};

    	return function(e, doc, single) {
    		return exports.selectWithResolver(e, doc, resolver, single);
    	};
    };

    exports.selectWithResolver = function(e, doc, resolver, single) {
    	var expression = new XPathExpression(e, resolver, new XPathParser());
    	var type = XPathResult.ANY_TYPE;

    	var result = expression.evaluate(doc, type, null);

    	if (result.resultType == XPathResult.STRING_TYPE) {
    		result = result.stringValue;
    	}
    	else if (result.resultType == XPathResult.NUMBER_TYPE) {
    		result = result.numberValue;
    	}
    	else if (result.resultType == XPathResult.BOOLEAN_TYPE) {
    		result = result.booleanValue;
    	}
    	else {
    		result = result.nodes;
    		if (single) {
    			result = result[0];
    		}
    	}

    	return result;
    };

    exports.select1 = function(e, doc) {
    	return exports.select(e, doc, true);
    };

    // end non-node wrapper
    })(xpath);
    });

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    var isArray_1 = isArray;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    var _freeGlobal = freeGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = _freeGlobal || freeSelf || Function('return this')();

    var _root = root;

    /** Built-in value references. */
    var Symbol$1 = _root.Symbol;

    var _Symbol = Symbol$1;

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Built-in value references. */
    var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    var _getRawTag = getRawTag;

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$1.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString$1.call(value);
    }

    var _objectToString = objectToString;

    /** `Object#toString` result references. */
    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';

    /** Built-in value references. */
    var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag$1 && symToStringTag$1 in Object(value))
        ? _getRawTag(value)
        : _objectToString(value);
    }

    var _baseGetTag = baseGetTag;

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    var isObjectLike_1 = isObjectLike;

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
    }

    var isSymbol_1 = isSymbol;

    /** Used to match property names within property paths. */
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/;

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray_1(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol_1(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    var _isKey = isKey;

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    var isObject_1 = isObject;

    /** `Object#toString` result references. */
    var asyncTag = '[object AsyncFunction]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        proxyTag = '[object Proxy]';

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject_1(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = _baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    var isFunction_1 = isFunction;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = _root['__core-js_shared__'];

    var _coreJsData = coreJsData;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    var _isMasked = isMasked;

    /** Used for built-in method references. */
    var funcProto = Function.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    var _toSource = toSource;

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used for built-in method references. */
    var funcProto$1 = Function.prototype,
        objectProto$2 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$1 = funcProto$1.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject_1(value) || _isMasked(value)) {
        return false;
      }
      var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
      return pattern.test(_toSource(value));
    }

    var _baseIsNative = baseIsNative;

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    var _getValue = getValue;

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = _getValue(object, key);
      return _baseIsNative(value) ? value : undefined;
    }

    var _getNative = getNative;

    /* Built-in method references that are verified to be native. */
    var nativeCreate = _getNative(Object, 'create');

    var _nativeCreate = nativeCreate;

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
      this.size = 0;
    }

    var _hashClear = hashClear;

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    var _hashDelete = hashDelete;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used for built-in method references. */
    var objectProto$3 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (_nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
    }

    var _hashGet = hashGet;

    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
    }

    var _hashHas = hashHas;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
      return this;
    }

    var _hashSet = hashSet;

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = _hashClear;
    Hash.prototype['delete'] = _hashDelete;
    Hash.prototype.get = _hashGet;
    Hash.prototype.has = _hashHas;
    Hash.prototype.set = _hashSet;

    var _Hash = Hash;

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    var _listCacheClear = listCacheClear;

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    var eq_1 = eq;

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq_1(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    var _assocIndexOf = assocIndexOf;

    /** Used for built-in method references. */
    var arrayProto = Array.prototype;

    /** Built-in value references. */
    var splice = arrayProto.splice;

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = _assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    var _listCacheDelete = listCacheDelete;

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = _assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    var _listCacheGet = listCacheGet;

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return _assocIndexOf(this.__data__, key) > -1;
    }

    var _listCacheHas = listCacheHas;

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = _assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    var _listCacheSet = listCacheSet;

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = _listCacheClear;
    ListCache.prototype['delete'] = _listCacheDelete;
    ListCache.prototype.get = _listCacheGet;
    ListCache.prototype.has = _listCacheHas;
    ListCache.prototype.set = _listCacheSet;

    var _ListCache = ListCache;

    /* Built-in method references that are verified to be native. */
    var Map$1 = _getNative(_root, 'Map');

    var _Map = Map$1;

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new _Hash,
        'map': new (_Map || _ListCache),
        'string': new _Hash
      };
    }

    var _mapCacheClear = mapCacheClear;

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    var _isKeyable = isKeyable;

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return _isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    var _getMapData = getMapData;

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = _getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    var _mapCacheDelete = mapCacheDelete;

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return _getMapData(this, key).get(key);
    }

    var _mapCacheGet = mapCacheGet;

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return _getMapData(this, key).has(key);
    }

    var _mapCacheHas = mapCacheHas;

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = _getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    var _mapCacheSet = mapCacheSet;

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = _mapCacheClear;
    MapCache.prototype['delete'] = _mapCacheDelete;
    MapCache.prototype.get = _mapCacheGet;
    MapCache.prototype.has = _mapCacheHas;
    MapCache.prototype.set = _mapCacheSet;

    var _MapCache = MapCache;

    /** Error message constants. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || _MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = _MapCache;

    var memoize_1 = memoize;

    /** Used as the maximum memoize cache size. */
    var MAX_MEMOIZE_SIZE = 500;

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize_1(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    var _memoizeCapped = memoizeCapped;

    /** Used to match property names within property paths. */
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

    /** Used to match backslashes in property paths. */
    var reEscapeChar = /\\(\\)?/g;

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = _memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    var _stringToPath = stringToPath;

    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    var _arrayMap = arrayMap;

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = _Symbol ? _Symbol.prototype : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray_1(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return _arrayMap(value, baseToString) + '';
      }
      if (isSymbol_1(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    var _baseToString = baseToString;

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : _baseToString(value);
    }

    var toString_1 = toString;

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray_1(value)) {
        return value;
      }
      return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
    }

    var _castPath = castPath;

    /** Used as references for various `Number` constants. */
    var INFINITY$1 = 1 / 0;

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol_1(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
    }

    var _toKey = toKey;

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = _castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[_toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    var _baseGet = baseGet;

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : _baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    var get_1 = get;

    var ErrorCodes;

    (function (ErrorCodes) {
      ErrorCodes[ErrorCodes["E_INTERNAL_USER_BLOCKED"] = 0] = "E_INTERNAL_USER_BLOCKED";
      ErrorCodes[ErrorCodes["E_TABLE_NOT_FOUND"] = 1] = "E_TABLE_NOT_FOUND";
      ErrorCodes[ErrorCodes["E_DATABASE_NOT_FOUND"] = 1] = "E_DATABASE_NOT_FOUND";
      ErrorCodes[ErrorCodes["E_NOT_FOUND"] = 2] = "E_NOT_FOUND";
      ErrorCodes[ErrorCodes["E_INVALID_ARGUMENT"] = 3] = "E_INVALID_ARGUMENT";
      ErrorCodes[ErrorCodes["E_SYNTAX_ERROR"] = 3] = "E_SYNTAX_ERROR";
      ErrorCodes[ErrorCodes["E_MISSING_ARGUMENT"] = 4] = "E_MISSING_ARGUMENT";
      ErrorCodes[ErrorCodes["E_MULTIPLE_RESULTS_FOUND"] = 5] = "E_MULTIPLE_RESULTS_FOUND";
      ErrorCodes[ErrorCodes["E_BLOCKED_IP"] = 6] = "E_BLOCKED_IP";
      ErrorCodes[ErrorCodes["E_UNEXPECTED_HTTP_CODE"] = 7] = "E_UNEXPECTED_HTTP_CODE";
      ErrorCodes[ErrorCodes["E_TIMEOUT"] = 7] = "E_TIMEOUT";
      ErrorCodes[ErrorCodes["E_LOAD_PAGE_FAILED"] = 7] = "E_LOAD_PAGE_FAILED";
      ErrorCodes[ErrorCodes["E_PROXY_CONFIGURATION_ERROR"] = 7] = "E_PROXY_CONFIGURATION_ERROR";
      ErrorCodes[ErrorCodes["E_REMOTE_SITE_UNDER_MAINTENANCE"] = 8] = "E_REMOTE_SITE_UNDER_MAINTENANCE";
      ErrorCodes[ErrorCodes["E_AUTHENTICATION_FAILURE"] = 9] = "E_AUTHENTICATION_FAILURE";
      ErrorCodes[ErrorCodes["E_INTERNAL_SERVER_ERROR"] = 11] = "E_INTERNAL_SERVER_ERROR";
      ErrorCodes[ErrorCodes["E_INTERNAL_ERROR"] = 11] = "E_INTERNAL_ERROR";
      ErrorCodes[ErrorCodes["E_QUERY_LIMIT"] = 12] = "E_QUERY_LIMIT";
      ErrorCodes[ErrorCodes["E_PASSWORD_REQUIRED"] = 20] = "E_PASSWORD_REQUIRED";
      ErrorCodes[ErrorCodes["E_JUSTICE_SECRET"] = 21] = "E_JUSTICE_SECRET";
      ErrorCodes[ErrorCodes["E_EXPECTED_DATA_NOT_FOUND"] = 24] = "E_EXPECTED_DATA_NOT_FOUND";
      ErrorCodes[ErrorCodes["E_CAPTCHA_BREAK_FAILED"] = 25] = "E_CAPTCHA_BREAK_FAILED";
      ErrorCodes[ErrorCodes["E_INTERNAL_PUSH_LABEL"] = 26] = "E_INTERNAL_PUSH_LABEL";
      ErrorCodes[ErrorCodes["E_UNDER_MAINTENANCE"] = 27] = "E_UNDER_MAINTENANCE";
      ErrorCodes[ErrorCodes["E_SITE_MESSAGE"] = 28] = "E_SITE_MESSAGE";
      ErrorCodes[ErrorCodes["E_BLOCKED_BY_CONFIG"] = 29] = "E_BLOCKED_BY_CONFIG";
      ErrorCodes[ErrorCodes["E_LEGAL_REVIEW"] = 30] = "E_LEGAL_REVIEW";
      ErrorCodes[ErrorCodes["E_RESOURCE_UNAVAILABLE"] = 31] = "E_RESOURCE_UNAVAILABLE";
      ErrorCodes[ErrorCodes["E_INTERNAL_EMAIL_UNCHECKED"] = 32] = "E_INTERNAL_EMAIL_UNCHECKED";
      ErrorCodes[ErrorCodes["E_INTERNAL_NOT_READY"] = 33] = "E_INTERNAL_NOT_READY";
      ErrorCodes[ErrorCodes["E_OUTDATED"] = 1522] = "E_OUTDATED";
      ErrorCodes[ErrorCodes["E_ARCHIVED_PROCESS"] = 1522] = "E_ARCHIVED_PROCESS";
      ErrorCodes[ErrorCodes["E_WITHOUT_PROCEEDINGS"] = 1523] = "E_WITHOUT_PROCEEDINGS";
      ErrorCodes[ErrorCodes["E_EMAIL_UNCHECKED"] = 1525] = "E_EMAIL_UNCHECKED";
      ErrorCodes[ErrorCodes["E_BLOCKED_USER"] = 1526] = "E_BLOCKED_USER";
      ErrorCodes[ErrorCodes["E_UNKNOWN"] = 1524] = "E_UNKNOWN";
    })(ErrorCodes || (ErrorCodes = {}));
    var ErrorCodes$1 = ErrorCodes;

    var errorCodes = ErrorCodes$1;

    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global$1 = typeof window == 'object' && window && window.Math == Math ? window
      : typeof self == 'object' && self && self.Math == Math ? self
      // eslint-disable-next-line no-new-func
      : Function('return this')();

    var fails = function (exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };

    // Thank's IE8 for his funny defineProperty
    var descriptors = !fails(function () {
      return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
    });

    var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
    var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    // Nashorn ~ JDK8 bug
    var NASHORN_BUG = nativeGetOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

    var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = nativeGetOwnPropertyDescriptor(this, V);
      return !!descriptor && descriptor.enumerable;
    } : nativePropertyIsEnumerable;

    var objectPropertyIsEnumerable = {
    	f: f
    };

    var createPropertyDescriptor = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };

    var toString$1 = {}.toString;

    var classofRaw = function (it) {
      return toString$1.call(it).slice(8, -1);
    };

    // fallback for non-array-like ES3 and non-enumerable old V8 strings


    var split = ''.split;

    var indexedObject = fails(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins
      return !Object('z').propertyIsEnumerable(0);
    }) ? function (it) {
      return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
    } : Object;

    // `RequireObjectCoercible` abstract operation
    // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
    var requireObjectCoercible = function (it) {
      if (it == undefined) throw TypeError("Can't call method on " + it);
      return it;
    };

    // toObject with fallback for non-array-like ES3 strings



    var toIndexedObject = function (it) {
      return indexedObject(requireObjectCoercible(it));
    };

    var isObject$1 = function (it) {
      return typeof it === 'object' ? it !== null : typeof it === 'function';
    };

    // 7.1.1 ToPrimitive(input [, PreferredType])

    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string
    var toPrimitive = function (it, S) {
      if (!isObject$1(it)) return it;
      var fn, val;
      if (S && typeof (fn = it.toString) == 'function' && !isObject$1(val = fn.call(it))) return val;
      if (typeof (fn = it.valueOf) == 'function' && !isObject$1(val = fn.call(it))) return val;
      if (!S && typeof (fn = it.toString) == 'function' && !isObject$1(val = fn.call(it))) return val;
      throw TypeError("Can't convert object to primitive value");
    };

    var hasOwnProperty$4 = {}.hasOwnProperty;

    var has = function (it, key) {
      return hasOwnProperty$4.call(it, key);
    };

    var document$1 = global$1.document;
    // typeof document.createElement is 'object' in old IE
    var exist = isObject$1(document$1) && isObject$1(document$1.createElement);

    var documentCreateElement = function (it) {
      return exist ? document$1.createElement(it) : {};
    };

    // Thank's IE8 for his funny defineProperty
    var ie8DomDefine = !descriptors && !fails(function () {
      return Object.defineProperty(documentCreateElement('div'), 'a', {
        get: function () { return 7; }
      }).a != 7;
    });

    var nativeGetOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

    var f$1 = descriptors ? nativeGetOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O);
      P = toPrimitive(P, true);
      if (ie8DomDefine) try {
        return nativeGetOwnPropertyDescriptor$1(O, P);
      } catch (error) { /* empty */ }
      if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
    };

    var objectGetOwnPropertyDescriptor = {
    	f: f$1
    };

    var anObject = function (it) {
      if (!isObject$1(it)) {
        throw TypeError(String(it) + ' is not an object');
      } return it;
    };

    var nativeDefineProperty = Object.defineProperty;

    var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPrimitive(P, true);
      anObject(Attributes);
      if (ie8DomDefine) try {
        return nativeDefineProperty(O, P, Attributes);
      } catch (error) { /* empty */ }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

    var objectDefineProperty = {
    	f: f$2
    };

    var hide = descriptors ? function (object, key, value) {
      return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };

    function createCommonjsModule$1(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var setGlobal = function (key, value) {
      try {
        hide(global$1, key, value);
      } catch (error) {
        global$1[key] = value;
      } return value;
    };

    var isPure = false;

    var shared = createCommonjsModule$1(function (module) {
    var SHARED = '__core-js_shared__';
    var store = global$1[SHARED] || setGlobal(SHARED, {});

    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.0.1',
      mode: 'global',
      copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
    });
    });

    var functionToString = shared('native-function-to-string', Function.toString);

    var WeakMap = global$1.WeakMap;

    var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

    var id = 0;
    var postfix = Math.random();

    var uid = function (key) {
      return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));
    };

    var shared$1 = shared('keys');


    var sharedKey = function (key) {
      return shared$1[key] || (shared$1[key] = uid(key));
    };

    var hiddenKeys = {};

    var WeakMap$1 = global$1.WeakMap;
    var set, get$1, has$1;

    var enforce = function (it) {
      return has$1(it) ? get$1(it) : set(it, {});
    };

    var getterFor = function (TYPE) {
      return function (it) {
        var state;
        if (!isObject$1(it) || (state = get$1(it)).type !== TYPE) {
          throw TypeError('Incompatible receiver, ' + TYPE + ' required');
        } return state;
      };
    };

    if (nativeWeakMap) {
      var store = new WeakMap$1();
      var wmget = store.get;
      var wmhas = store.has;
      var wmset = store.set;
      set = function (it, metadata) {
        wmset.call(store, it, metadata);
        return metadata;
      };
      get$1 = function (it) {
        return wmget.call(store, it) || {};
      };
      has$1 = function (it) {
        return wmhas.call(store, it);
      };
    } else {
      var STATE = sharedKey('state');
      hiddenKeys[STATE] = true;
      set = function (it, metadata) {
        hide(it, STATE, metadata);
        return metadata;
      };
      get$1 = function (it) {
        return has(it, STATE) ? it[STATE] : {};
      };
      has$1 = function (it) {
        return has(it, STATE);
      };
    }

    var internalState = {
      set: set,
      get: get$1,
      has: has$1,
      enforce: enforce,
      getterFor: getterFor
    };

    var redefine = createCommonjsModule$1(function (module) {
    var getInternalState = internalState.get;
    var enforceInternalState = internalState.enforce;
    var TEMPLATE = String(functionToString).split('toString');

    shared('inspectSource', function (it) {
      return functionToString.call(it);
    });

    (module.exports = function (O, key, value, options) {
      var unsafe = options ? !!options.unsafe : false;
      var simple = options ? !!options.enumerable : false;
      var noTargetGet = options ? !!options.noTargetGet : false;
      if (typeof value == 'function') {
        if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
        enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
      if (O === global$1) {
        if (simple) O[key] = value;
        else setGlobal(key, value);
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }
      if (simple) O[key] = value;
      else hide(O, key, value);
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, 'toString', function toString() {
      return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
    });
    });

    var ceil = Math.ceil;
    var floor = Math.floor;

    // `ToInteger` abstract operation
    // https://tc39.github.io/ecma262/#sec-tointeger
    var toInteger = function (argument) {
      return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
    };

    var min = Math.min;

    // `ToLength` abstract operation
    // https://tc39.github.io/ecma262/#sec-tolength
    var toLength = function (argument) {
      return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    };

    var max = Math.max;
    var min$1 = Math.min;

    // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
    var toAbsoluteIndex = function (index, length) {
      var integer = toInteger(index);
      return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
    };

    // `Array.prototype.{ indexOf, includes }` methods implementation
    // false -> Array#indexOf
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    // true  -> Array#includes
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    var arrayIncludes = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = toLength(O.length);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare
        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare
          if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
          if (O[index] === el) return IS_INCLUDES || index || 0;
        } return !IS_INCLUDES && -1;
      };
    };

    var arrayIndexOf = arrayIncludes(false);


    var objectKeysInternal = function (object, names) {
      var O = toIndexedObject(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
      // Don't enum bug & hidden keys
      while (names.length > i) if (has(O, key = names[i++])) {
        ~arrayIndexOf(result, key) || result.push(key);
      }
      return result;
    };

    // IE8- don't enum bug keys
    var enumBugKeys = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ];

    // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

    var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

    var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return objectKeysInternal(O, hiddenKeys$1);
    };

    var objectGetOwnPropertyNames = {
    	f: f$3
    };

    var f$4 = Object.getOwnPropertySymbols;

    var objectGetOwnPropertySymbols = {
    	f: f$4
    };

    var Reflect$1 = global$1.Reflect;

    // all object keys, includes non-enumerable and symbols
    var ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
      var keys = objectGetOwnPropertyNames.f(anObject(it));
      var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
    };

    var copyConstructorProperties = function (target, source) {
      var keys = ownKeys(source);
      var defineProperty = objectDefineProperty.f;
      var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    };

    var replacement = /#|\.prototype\./;

    var isForced = function (feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true
        : value == NATIVE ? false
        : typeof detection == 'function' ? fails(detection)
        : !!detection;
    };

    var normalize = isForced.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase();
    };

    var data = isForced.data = {};
    var NATIVE = isForced.NATIVE = 'N';
    var POLYFILL = isForced.POLYFILL = 'P';

    var isForced_1 = isForced;

    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;






    /*
      options.target      - name of the target object
      options.global      - target is the global object
      options.stat        - export as static methods of target
      options.proto       - export as prototype methods of target
      options.real        - real prototype method for the `pure` version
      options.forced      - export even if the native feature is available
      options.bind        - bind methods to the target, required for the `pure` version
      options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
      options.unsafe      - use the simple assignment of property instead of delete + defineProperty
      options.sham        - add a flag to not completely full polyfills
      options.enumerable  - export as enumerable property
      options.noTargetGet - prevent calling a getter on target
    */
    var _export = function (options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global$1;
      } else if (STATIC) {
        target = global$1[TARGET] || setGlobal(TARGET, {});
      } else {
        target = (global$1[TARGET] || {}).prototype;
      }
      if (target) for (key in source) {
        sourceProperty = source[key];
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty === typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          hide(sourceProperty, 'sham', true);
        }
        // extend global
        redefine(target, key, sourceProperty, options);
      }
    };

    var validateSetPrototypeOfArguments = function (O, proto) {
      anObject(O);
      if (!isObject$1(proto) && proto !== null) {
        throw TypeError("Can't set " + String(proto) + ' as a prototype');
      }
    };

    // Works with __proto__ only. Old v8 can't work with null proto objects.
    /* eslint-disable no-proto */


    var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
      var correctSetter = false;
      var test = {};
      var setter;
      try {
        setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
        setter.call(test, []);
        correctSetter = test instanceof Array;
      } catch (error) { /* empty */ }
      return function setPrototypeOf(O, proto) {
        validateSetPrototypeOfArguments(O, proto);
        if (correctSetter) setter.call(O, proto);
        else O.__proto__ = proto;
        return O;
      };
    }() : undefined);

    var $export = _export;
    var DESCRIPTORS = descriptors;
    var IS_PURE = isPure;
    var IndexedObject = indexedObject;
    var InternalStateModule = internalState;
    var anObject_1 = anObject;
    var classof = classofRaw;
    var createCommonjsModule_1 = createCommonjsModule$1;
    var createPropertyDescriptor_1 = createPropertyDescriptor;
    var definePropertyModule = objectDefineProperty;
    var documentCreateElement_1 = documentCreateElement;
    var enumBugKeys_1 = enumBugKeys;
    var fails_1 = fails;
    var global_1 = global$1;
    var has_1 = has;
    var hide_1 = hide;
    var internalObjectKeys = objectKeysInternal;
    var isForced_2 = isForced_1;
    var isObject_1$1 = isObject$1;
    var redefine_1 = redefine;
    var require$$0 = shared;
    var require$$0$1 = objectGetOwnPropertyDescriptor;
    var require$$0$2 = sharedKey;
    var require$$1 = hiddenKeys;
    var requireObjectCoercible_1 = requireObjectCoercible;
    var setPrototypeOf = objectSetPrototypeOf;
    var toInteger_1 = toInteger;
    var toLength_1 = toLength;
    var toPrimitive_1 = toPrimitive;
    var uid_1 = uid;


    var chunk57b7c416 = {
    	$export: $export,
    	DESCRIPTORS: DESCRIPTORS,
    	IS_PURE: IS_PURE,
    	IndexedObject: IndexedObject,
    	InternalStateModule: InternalStateModule,
    	anObject: anObject_1,
    	classof: classof,
    	createCommonjsModule: createCommonjsModule_1,
    	createPropertyDescriptor: createPropertyDescriptor_1,
    	definePropertyModule: definePropertyModule,
    	documentCreateElement: documentCreateElement_1,
    	enumBugKeys: enumBugKeys_1,
    	fails: fails_1,
    	global: global_1,
    	has: has_1,
    	hide: hide_1,
    	internalObjectKeys: internalObjectKeys,
    	isForced: isForced_2,
    	isObject: isObject_1$1,
    	redefine: redefine_1,
    	require$$0: require$$0,
    	require$$0$1: require$$0$1,
    	require$$0$2: require$$0$2,
    	require$$1: require$$1,
    	requireObjectCoercible: requireObjectCoercible_1,
    	setPrototypeOf: setPrototypeOf,
    	toInteger: toInteger_1,
    	toLength: toLength_1,
    	toPrimitive: toPrimitive_1,
    	uid: uid_1
    };

    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }

    function _asyncToGenerator(fn) {
      return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
          var gen = fn.apply(self, args);

          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }

          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }

          _next(undefined);
        });
      };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);

        if (typeof Object.getOwnPropertySymbols === 'function') {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }

        ownKeys.forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      }

      return target;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;

      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    function _construct(Parent, args, Class) {
      if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
      } else {
        _construct = function _construct(Parent, args, Class) {
          var a = [null];
          a.push.apply(a, args);
          var Constructor = Function.bind.apply(Parent, a);
          var instance = new Constructor();
          if (Class) _setPrototypeOf(instance, Class.prototype);
          return instance;
        };
      }

      return _construct.apply(null, arguments);
    }

    function _isNativeFunction(fn) {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    }

    function _wrapNativeSuper(Class) {
      var _cache = typeof Map === "function" ? new Map() : undefined;

      _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;

        if (typeof Class !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }

        if (typeof _cache !== "undefined") {
          if (_cache.has(Class)) return _cache.get(Class);

          _cache.set(Class, Wrapper);
        }

        function Wrapper() {
          return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }

        Wrapper.prototype = Object.create(Class.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        return _setPrototypeOf(Wrapper, Class);
      };

      return _wrapNativeSuper(Class);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
      }

      return _assertThisInitialized(self);
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      }
    }

    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    var _assertThisInitialized_1 = _assertThisInitialized;
    var _asyncToGenerator_1 = _asyncToGenerator;
    var _classCallCheck_1 = _classCallCheck;
    var _createClass_1 = _createClass;
    var _defineProperty_1 = _defineProperty;
    var _getPrototypeOf_1 = _getPrototypeOf;
    var _inherits_1 = _inherits;
    var _objectSpread_1 = _objectSpread;
    var _possibleConstructorReturn_1 = _possibleConstructorReturn;
    var _toConsumableArray_1 = _toConsumableArray;
    var _wrapNativeSuper_1 = _wrapNativeSuper;


    var chunkB1383bd1 = {
    	_assertThisInitialized: _assertThisInitialized_1,
    	_asyncToGenerator: _asyncToGenerator_1,
    	_classCallCheck: _classCallCheck_1,
    	_createClass: _createClass_1,
    	_defineProperty: _defineProperty_1,
    	_getPrototypeOf: _getPrototypeOf_1,
    	_inherits: _inherits_1,
    	_objectSpread: _objectSpread_1,
    	_possibleConstructorReturn: _possibleConstructorReturn_1,
    	_toConsumableArray: _toConsumableArray_1,
    	_wrapNativeSuper: _wrapNativeSuper_1
    };

    // `Object.setPrototypeOf` method
    // https://tc39.github.io/ecma262/#sec-object.setprototypeof
    chunk57b7c416.$export({ target: 'Object', stat: true }, {
      setPrototypeOf: chunk57b7c416.setPrototypeOf
    });

    var BIPBOPException =
    /*#__PURE__*/
    function (_Error) {
      chunkB1383bd1._inherits(BIPBOPException, _Error);

      function BIPBOPException(msg) {
        var _this;

        chunkB1383bd1._classCallCheck(this, BIPBOPException);

        _this = chunkB1383bd1._possibleConstructorReturn(this, chunkB1383bd1._getPrototypeOf(BIPBOPException).call(this, msg));
        Object.setPrototypeOf(chunkB1383bd1._assertThisInitialized(_this), BIPBOPException.prototype);
        return _this;
      }

      chunkB1383bd1._createClass(BIPBOPException, null, [{
        key: "factory",
        value: function factory(message) {
          var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : errorCodes.E_UNKNOWN;
          var push = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var exception = new this(message);
          exception.code = code;
          exception.push = push;
          return exception;
        }
      }]);

      return BIPBOPException;
    }(chunkB1383bd1._wrapNativeSuper(Error));

    var exception = BIPBOPException;

    var PushManagerException = /** @class */ (function (_super) {
        __extends(PushManagerException, _super);
        function PushManagerException(msg) {
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, PushManagerException.prototype);
            return _this;
        }
        return PushManagerException;
    }(exception));

    /**
     * Gerenciamento de PUSH da BIPBOP
     */
    var PushManager = /** @class */ (function () {
        /**
         * Inicializa o serviço de PUSH
         * @param webservice O WebService da BIPBOP
         * @param endpoint O endpoint
         */
        function PushManager(webservice, endpoint) {
            this.webservice = webservice;
            this.endpoint = endpoint || 'PUSH';
        }
        /**
         * Instância o serviço
         * @param key Chave de acesso da BIPBOP
         * @param endpoint Endereço do serviço de PUSH na BIPBOP
         */
        PushManager.fromKey = function (key, endpoint) {
            return new this(new WebService(key), endpoint);
        };
        PushManager.prototype.create = function (pushQuery, configuration, label) {
            if (configuration === void 0) { configuration = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var target, parameters, form, response, id, identificator;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            target = pushQuery.target, parameters = pushQuery.parameters;
                            form = __assign({}, parameters, PushManager.translateConfiguration(configuration), { pushQuery: target });
                            PushManager.addParameter(form, label, 'pushLabel');
                            return [4 /*yield*/, WebService.parse(this.webservice.request("INSERT INTO '" + this.endpoint + "'.'JOB'", form))];
                        case 1:
                            response = _a.sent();
                            id = xpath_1.select('string(/BPQL/body/id)', response, true);
                            if (!id)
                                throw new PushManagerException('Push ID not received as a text');
                            identificator = {
                                label: label,
                                id: id,
                            };
                            PushManager.validateIdentificator(identificator);
                            return [2 /*return*/, identificator];
                    }
                });
            });
        };
        PushManager.translateConfiguration = function (params) {
            var form = {};
            PushManager.addParameter(form, params.nextJob, 'pushNextJob');
            PushManager.addParameter(form, params.priority, 'pushPriority');
            PushManager.addParameter(form, params.interval, 'pushInterval');
            PushManager.addParameter(form, params.retryIn, 'pushRetryIn');
            PushManager.addParameter(form, params.callback, 'pushCallback');
            PushManager.addParameter(form, params.maxVersion, 'pushMaxVersion');
            PushManager.addParameter(form, params.tags, 'pushTags');
            PushManager.addParameter(form, params.webSocketDeliver, 'pushWebSocketDeliver');
            PushManager.addParameter(form, params.maxCallbackTrys, 'pushMaxCallbackTrys');
            PushManager.addParameter(form, params.weekdays, 'pushWeekdays');
            return form;
        };
        PushManager.addParameter = function (form, value, key) {
            if (value === null || typeof value === 'undefined')
                return;
            if (typeof value === "number") {
                form[key] = value.toString();
                return;
            }
            if (typeof value === "boolean") {
                form[key] = value ? 'true' : 'false';
                return;
            }
            if (Array.isArray(value)) {
                form[key] = value.join(',');
                return;
            }
            if (value instanceof Date) {
                form[key] = parseInt((value.getTime() / 1000).toFixed(0)).toString();
                return;
            }
            form[key] = value;
            return;
        };
        PushManager.validateIdentificator = function (identificator) {
            var id = identificator.id, label = identificator.label;
            var form = {};
            if (id)
                form.id = id;
            else if (label)
                form.label = label;
            else
                throw new PushManagerException('Register at least one identifier in the object.');
            return form;
        };
        PushManager.prototype.status = function (identificator) {
            return __awaiter(this, void 0, void 0, function () {
                var form, statusDocument, element, lastSuccessRun, lastRun, state, exceptionNode;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            form = PushManager.validateIdentificator(identificator);
                            return [4 /*yield*/, WebService.parse(this.webservice.request("SELECT FROM '" + this.endpoint + "'.'JOB'", form))];
                        case 1:
                            statusDocument = _a.sent();
                            element = xpath_1.select('/BPQL/body/pushObject', statusDocument, true);
                            if (!element)
                                throw new PushManagerException('Not found');
                            lastSuccessRun = xpath_1.select('string(./lastSuccessRun)', element, true);
                            lastRun = xpath_1.select('string(./lastRun)', element, true);
                            state = {
                                created: new Date(xpath_1.select('string(./created)', element, true)),
                                nextJob: new Date(xpath_1.select('string(./nextJob)', element, true)),
                                expectedNextJob: new Date(xpath_1.select('string(./expectedNextJob)', element, true)),
                                lastSuccessRun: lastSuccessRun ? new Date(lastSuccessRun) : undefined,
                                lastRun: lastRun ? new Date(lastRun) : undefined,
                                executions: parseInt(xpath_1.select('string(./executions)', element, true) || '0', 10),
                                trys: parseInt(xpath_1.select('string(./executions)', element, true) || '0', 10),
                                hasException: xpath_1.select('string(./hasException)', element, true) === 'true',
                                successExecutions: parseInt(xpath_1.select('string(./successExecutions)', element, true) || '0', 10),
                                version: parseInt(xpath_1.select('string(./version)', element, true) || '0', 10),
                            };
                            exceptionNode = xpath_1.select('./exception', element, true);
                            if (exceptionNode)
                                state.exception = {
                                    code: parseInt(xpath_1.select('string(./code)', exceptionNode, true) || '0', 10),
                                    type: xpath_1.select('string(./type)', exceptionNode, true) || '',
                                    log: xpath_1.select('string(./log)', exceptionNode, true) || '',
                                    id: xpath_1.select('string(./id)', exceptionNode, true) || '',
                                    message: xpath_1.select('string(./message)', exceptionNode, true) || '',
                                };
                            return [2 /*return*/, state];
                    }
                });
            });
        };
        PushManager.prototype.document = function (identificator) {
            return __awaiter(this, void 0, void 0, function () {
                var form, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            form = PushManager.validateIdentificator(identificator);
                            return [4 /*yield*/, WebService.parse(this.webservice.request("SELECT FROM '" + this.endpoint + "'.'DOCUMENT'", form))];
                        case 1:
                            response = _a.sent();
                            if (get_1(response, 'constructor.name') === 'Document') {
                                WebService.throwException(response);
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        PushManager.prototype.delete = function (identificator) {
            return __awaiter(this, void 0, void 0, function () {
                var form;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            form = PushManager.validateIdentificator(identificator);
                            return [4 /*yield*/, this.webservice.request("DELETE FROM '" + this.endpoint + "'.'JOB'", form)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return PushManager;
    }());

    return PushManager;

}));
/* www.bipbop.com.br */
//# sourceMappingURL=browser.js.map
