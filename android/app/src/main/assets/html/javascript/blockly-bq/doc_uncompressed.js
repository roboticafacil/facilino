"use strict";
Blockly.Doc = new Blockly.Generator("Doc"), Blockly.Doc.RESERVED_WORDS_ || (Blockly.Doc.RESERVED_WORDS_ = ""), Blockly.Doc.RESERVED_WORDS_ += "", Blockly.Doc.ORDER_ATOMIC = 0, Blockly.Doc.ORDER_UNARY_POSTFIX = 1, Blockly.Doc.ORDER_UNARY_PREFIX = 2, Blockly.Doc.ORDER_MULTIPLICATIVE = 3, Blockly.Doc.ORDER_ADDITIVE = 4, Blockly.Doc.ORDER_SHIFT = 5, Blockly.Doc.ORDER_RELATIONAL = 6, Blockly.Doc.ORDER_EQUALITY = 7, Blockly.Doc.ORDER_BITWISE_AND = 8, Blockly.Doc.ORDER_BITWISE_XOR = 9, Blockly.Doc.ORDER_BITWISE_OR = 10, Blockly.Doc.ORDER_LOGICAL_AND = 11, Blockly.Doc.ORDER_LOGICAL_OR = 12, Blockly.Doc.ORDER_CONDITIONAL = 13, Blockly.Doc.ORDER_ASSIGNMENT = 14, Blockly.Doc.ORDER_NONE = 99;
Blockly.Doc.init = function() {
    Blockly.Doc.definitions_ = {}, Blockly.Doc.setups_ = {}, Blockly.Doc.int0_ = {}, Blockly.Variables && (Blockly.Doc.variableDB_ ? Blockly.Doc.variableDB_.reset() : Blockly.Doc.variableDB_ = new Blockly.Names(Blockly.Doc.RESERVED_WORDS_))
}, Blockly.Doc.finish = function(n) {
	return n;
}, Blockly.Doc.orderDefinitions = function(n) {
    var o, l = [],
        e = [];
    for (o in n) {
        var i = n[o].substring(0, n[o].search("\\)") + 1);
        i.replace("\n", ""), "" !== i && (i += ";\n", l += i, e += n[o])
    }
    return [l, e]
}, Blockly.Doc.scrubNakedValue = function(n) {
    return n
}, Blockly.Doc.quote_ = function(n) {
    return '"' + (n = n.replace(/\\/g, "\\\\").replace(/\n/g, "\\\n").replace(/\$/g, "\\$").replace(/'/g, "\\'")) + '"'
}, Blockly.Doc.scrub_ = function(n, o) {
    if (null === o) return "";
    return o.length && o
};