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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailMerge = void 0;
var fs_1 = __importDefault(require("fs"));
/**
 * Clone inString n times and return the resulting array
 *
 * @param inString
 * @param n
 */
function cloneStringN(inString, n) {
    var retVal = [];
    for (var i = 0; i < n; i++) {
        retVal.push("" + inString);
    }
    return retVal;
}
var MailMerge = /** @class */ (function () {
    /**
     * Create a new MailMerger
     *
     * @param template the template to use, string or null, must be set before use
     */
    function MailMerge(template) {
        if (template === void 0) { template = null; }
        /** The keywords to be used */
        this._keywords = [];
        /** One for each output */
        this._instances = [];
        this._template = template;
    }
    Object.defineProperty(MailMerge.prototype, "template", {
        /**
         * Set the base template that will be used
         */
        set: function (newTemplate) {
            this._template = newTemplate;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Add an expected replacement combination
     *
     * @param inst The keywords themselves
     * @param fileName Where the output will eventually be written, optional, if not included no writing is possible
     * @example add({"%%hello": "replaced text"})
     */
    MailMerge.prototype.add = function (inst, fileName) {
        if (fileName === void 0) { fileName = null; }
        this._instances.push({
            outputFileName: fileName,
            keywords: __assign({}, inst)
        });
        for (var i in inst) {
            if (!(i in this._keywords)) {
                this._keywords.push(i);
            }
        }
    };
    /**
     * Process all the instances, returning one string for each instance.
     *
     * Keywords are processed in order of appearance in an internal list.
     *
     * If a keyword does not appear in an instance, nothing will happen for that keyword.
     *
     * Writes output to the appropriate filenames unless...
     *
     * @param skipWritingToFile optional argument, defaults to false, if true doesn't write to files
     *
     * @throws an error if the template is not set
     */
    MailMerge.prototype.processAll = function (skipWritingToFile) {
        if (skipWritingToFile === void 0) { skipWritingToFile = false; }
        if (this._template === null) {
            throw new Error('Template not set! Use template(string) to set it first!');
        }
        var templateClones = cloneStringN(this._template, this._instances.length);
        for (var _i = 0, _a = this._keywords; _i < _a.length; _i++) {
            var keyWord = _a[_i];
            for (var index = 0; index < templateClones.length; index++) {
                if (keyWord in this._instances[index].keywords) {
                    console.log(keyWord);
                    templateClones[index] = templateClones[index].replace(keyWord, this._instances[index].keywords[keyWord]);
                }
            }
        }
        if (!(skipWritingToFile)) {
            for (var index = 0; index < templateClones.length; index++) {
                var itm = this._instances[index];
                if (itm.outputFileName !== null) {
                    fs_1.default.writeFileSync(itm.outputFileName, templateClones[index]);
                }
            }
        }
        return templateClones;
    };
    return MailMerge;
}());
exports.MailMerge = MailMerge;
exports.default = MailMerge;
