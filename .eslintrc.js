module.exports = {

  // I want to use babel-eslint for parsing!
  "parser": "babel-eslint",

  "env": {
    "browser": true,
    "es6": true
  },

  "plugins": ["react", "import", "react-hooks"],

  "extends": "eslint-config-ali/react",

  "globals": {
    "__VERSION__": true,
    "__ONLINE__": true,
    "__OFFLINE_TRIP__": true,
    "__OFFLINE_TAOBAO__": true,
    "__OFFLINE_ALIPAY__": true,
    "__CURRENT_GRUNT_TASK__": true
  },

  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },

  "rules": {
    /**------CORE RULES START------**/
    // errors
    // disallow assignment in conditional expressions
    "no-cond-assign": [2, "always"],
    // disallow use of console
    "no-console": 1,
    // disallow use of constant expressions in conditions
    "no-constant-condition": 1,
    // disallow control characters in regular expressions
    "no-control-regex": 2,
    // disallow use of debugger
    "no-debugger": 1,
    // disallow duplicate arguments in functions
    "no-dupe-args": 2,
    // disallow duplicate keys when creating object literals
    "no-dupe-keys": 2,
    // disallow a duplicate case label.
    "no-duplicate-case": 2,
    // disallow the use of empty character classes in regular expressions
    "no-empty-character-class": 2,
    // disallow empty statements
    "no-empty": 2,
    // disallow assigning to the exception in a catch block
    "no-ex-assign": 2,
    // disallow double-negation boolean casts in a boolean context
    "no-extra-boolean-cast": 0,
    // disallow unnecessary parentheses
    // http://eslint.org/docs/rules/no-extra-parens
    "no-extra-parens": [0, "all", {
      "conditionalAssign": true,
      "nestedBinaryExpressions": false,
    }],
    // disallow unnecessary semicolons
    "no-extra-semi": 2,
    // disallow overwriting functions written as function declarations
    "no-func-assign": 2,
    // disallow function or variable declarations in nested blocks
    "no-inner-declarations": 2,
    // disallow invalid regular expression strings in the RegExp constructor
    "no-invalid-regexp": 2,
    // disallow irregular whitespace outside of strings and comments
    "no-irregular-whitespace": 2,
    // disallow negation of the left operand of an in expression
    "no-negated-in-lhs": 2,
    // disallow the use of object properties of the global object (Math and JSON) as functions
    "no-obj-calls": 2,
    // disallow multiple spaces in a regular expression literal
    "no-regex-spaces": 2,
    // disallow sparse arrays
    "no-sparse-arrays": 2,
    // disallow trailing whitespace at the end of lines
    "no-trailing-spaces": [2, { "skipBlankLines": true }],
    // disallow unreachable statements after a return, throw, continue, or break statement
    "no-unreachable": 2,
    // disallow comparisons with the value NaN
    "use-isnan": 2,
    // ensure JSDoc comments are valid
    // http://eslint.org/docs/rules/valid-jsdoc
    "valid-jsdoc": 0,
    // ensure that the results of typeof are compared against a valid string
    "valid-typeof": 2,
    // Avoid code that looks like two expressions but is actually one
    "no-unexpected-multiline": 0,

    // es6
    // disallow invalid exports, e.g. multiple defaults
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md
    "import/export": 2,
    // ensure default import coupled with default export
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md#when-not-to-use-it
    "import/default": 0,
    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    "import/extensions": [0, "never"],
    // ensure named imports coupled with named exports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md#when-not-to-use-it
    "import/named": 2,
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md
    "import/namespace": 0,
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    "import/no-extraneous-dependencies": [0, {
      "devDependencies": false,
      "optionalDependencies": false,
    }],
    // ensure imports point to files/modules that can be resolved
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    "import/no-unresolved": 2,
    // do not allow a default import name to match a named export
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
    "import/no-named-as-default": 0,
    // disallow require()
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md
    "import/no-commonjs": 0,
    // disallow AMD require/define
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md
    "import/no-amd": 2,
    // disallow non-import statements appearing before import statements
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/imports-first.md
    "import/imports-first": [0, "absolute-first"],
    // disallow duplicate imports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
    "import/no-duplicates": 2,
    // disallow use of jsdoc-marked-deprecated imports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md
    "import/no-deprecated": 0,
    // disallow namespace imports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-namespace.md
    "import/no-namespace": 0,
    // warn on accessing default export property names that are also named exports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
    "import/no-named-as-default-member": 0,
    // No Node.js builtin modules
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md
    "import/no-nodejs-modules": 0,
    // Enforce a convention in module import order
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    "import/order": [0, {
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      "newlines-between": "never",
    }],
    // Require a newline after the last import/require in a group
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
    "import/newline-after-import": 0,
    // Forbid mutable exports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
    "import/no-mutable-exports": 2,
    // Rules of React Hooks
    // https://reactjs.org/docs/hooks-rules.html
    "react-hooks/rules-of-hooks": "error",
    /**------CORE RULES END------**/

    /*------?????????????????????????????????????????? code styles------**/
    "comma-dangle": [2, "only-multiline"],
    "react/jsx-closing-bracket-location": [1, "after-props"],
    "no-new": 1,
    "new-cap": ["warn", {"capIsNewExceptions": ["CSSModules"]}]
  },

  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./webpack.eslint.js"
      }
    }
  }
}