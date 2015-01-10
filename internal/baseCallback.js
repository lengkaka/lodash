import baseMatches from './baseMatches';
import baseProperty from './baseProperty';
import bindCallback from './bindCallback';
import identity from '../utility/identity';
import isBindable from './isBindable';

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;

  if (type == 'function') {
    return (typeof thisArg != 'undefined' && isBindable(func))
      ? bindCallback(func, thisArg, argCount)
      : func;
  }
  if (func == null) {
    return identity;
  }
  // Handle "_.property" and "_.matches" style callback shorthands.
  return type == 'object'
    ? baseMatches(func, !argCount)
    : baseProperty(argCount ? (func + '') : func);
}

export default baseCallback;
