"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.concat = exports.mergeWith = exports.sum = exports.add2 = exports.add = exports.joinWith = exports.flatten = exports.includes = exports.lookup = exports.length = void 0;
var R = require("ramda");
function length(arr) {
    return arr.length;
}
exports.length = length;
function lookup(record) {
    return function get(key) {
        return record[key];
    };
}
exports.lookup = lookup;
function includes(arr) {
    return function (el) {
        return arr.includes(el);
    };
}
exports.includes = includes;
function flatten(arr) {
    return R.reduce(function (el1, el2) { return R.concat(el1, el2); }, [], arr);
}
exports.flatten = flatten;
function joinWith(delim) {
    return function join(arr) {
        return arr.join(delim);
    };
}
exports.joinWith = joinWith;
function add(el1) {
    return function (el2) {
        return el1 + el2;
    };
}
exports.add = add;
function add2(el1, el2) {
    return add(el1)(el2);
}
exports.add2 = add2;
function sum(arr) {
    return R.reduce(add2, 0, arr);
}
exports.sum = sum;
function mergeWith(f, rec1, rec2) {
    var res = __assign({}, rec1);
    R.forEachObjIndexed(function (value, key) {
        if (key in res) {
            res[key] = f(res[key], value);
        }
        else {
            res[key] = value;
        }
    }, rec2);
    return res;
}
exports.mergeWith = mergeWith;
function concat(list1, list2) {
    return R.concat(list1, list2);
}
exports.concat = concat;
