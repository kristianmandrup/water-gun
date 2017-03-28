'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCsp = exports.addObservable = undefined;
exports.add = add;

exports.default = function (Gun) {
  return add.apply(undefined, [Gun].concat(allNames));
};

var _observable = require('./observable');

var _observable2 = _interopRequireDefault(_observable);

var _csp = require('./channel/csp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chains = {
  addObservable: _observable2.default,
  addCsp: _csp.addCsp
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function add(Gun) {
  for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  names.forEach(function (name) {
    var nameCap = capitalize(name);
    var fun = 'add' + nameCap;
    chains[fun]({
      chain: Gun.chain,
      Gun: Gun
    });
  });
  return Gun;
}

var allNames = ['observable', 'csp'];

exports.addObservable = _observable2.default;
exports.addCsp = _csp.addCsp;
//# sourceMappingURL=all.js.map
