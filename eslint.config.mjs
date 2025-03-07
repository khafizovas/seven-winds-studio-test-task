import configCommon from './eslint.config.common.mjs';
import configRequires from './eslint.config.requires.mjs';
import configSrc from './eslint.config.src.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [...configCommon, ...configRequires, ...configSrc];
