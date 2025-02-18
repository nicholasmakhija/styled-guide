import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: ['dist/*']
  }, 
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parser: babelParser,
      parserOptions: {
        ecmaFeatures: {
          legacyDecorators: true,
          jsx: true
        }
      }
    },
    plugins: {
      ...pluginJs.configs.recommended,
      'react': react,
      'react-hooks': reactHooks,
      '@stylistic': stylistic
    },
    rules: {
      'no-console': 1,
      'vars-on-top': 1,
      'eol-last': ['error', 'always'],

      '@stylistic/arrow-parens': ['error'],
      '@stylistic/comma-dangle': ['error'],
      '@stylistic/indent': ['error', 2, {
        SwitchCase: 1
      }],
      '@stylistic/keyword-spacing': ['error', {
        before: true,
        after: true
      }],
      '@stylistic/no-multiple-empty-lines': ['error', {
        max: 1,
        maxBOF: 0,
        maxEOF: 1
      }],
      '@stylistic/quotes': [2, 'single'],
      '@stylistic/semi': [2, 'always'],
      '@stylistic/space-before-blocks': ['error', 'always'],

      'react/boolean-prop-naming': ['error', { 
        rule: '^(is|has|can)[A-Z]([A-Za-z0-9]?)+' 
      }],
      'react/jsx-no-duplicate-props': 2,
      'react/jsx-tag-spacing': ['error', { 
        beforeSelfClosing: 'always'
      }],
      'react/no-unused-prop-types': 2,
      'react/prop-types': [0, { 
        ignore: ['children', 'className', 'style', 'defaultChecked']
      }],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
    settings: {
      react: {
        createClass: 'createReactClass',
        pragma: 'React',
        version: 'detect',
        flowVersion: 0.53
      },
      propWrapperFunctions: [
        'forbidExtraProps',
        { 
          property: 'freeze', 
          object: 'Object'
        }
      ]
    }
  }
];
