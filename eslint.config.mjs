import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import stylisticJsx from '@stylistic/eslint-plugin-jsx'
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: ['dist/*']
  }, 
  {
    files: [
      '**/*.js',
      '**/*.jsx'
    ],
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
      'react-hooks': reactHooks,
      '@stylistic': stylistic,
      '@stylistic/jsx': stylisticJsx
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
      
      '@stylistic/jsx-closing-bracket-location': [1, 'tag-aligned'],
      '@stylistic/jsx/jsx-curly-spacing': [2, 'never'],
      '@stylistic/jsx/jsx-equals-spacing': [2, 'never'],
      '@stylistic/jsx/jsx-max-props-per-line': [2, {
        maximum: {
          single: 2,
          multi: 1
        }
      }],
      '@stylistic/jsx/jsx-pascal-case': [2, {
        allowNamespace: true  
      }],
      '@stylistic/jsx/jsx-props-no-multi-spaces': 2,
      // FIXME:
      // '@stylistic/jsx/jsx-tag-spacing': ['error', { 
      //   closingSlash: 'never',
      //   beforeSelfClosing: 'never',
      //   afterOpening: 'never',
      //   beforeClosing: 'proportional-always'
      // }],
      '@stylistic/jsx/jsx-wrap-multilines': [2, {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
        propertyValue: 'parens-new-line'
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
