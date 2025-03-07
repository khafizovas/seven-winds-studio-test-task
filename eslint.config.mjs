import configCommon from './eslint.config.common.mjs';
import configJS from './eslint.config.js.mjs';
import configSrc from './eslint.config.src.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [...configCommon, ...configJS, ...configSrc];
