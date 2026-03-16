import StyleDictionary from 'style-dictionary';
import { register, permutateThemes } from '@tokens-studio/sd-transforms';

// Register Tokens Studio transforms
register(StyleDictionary);

// Custom transform: add px units to blur tokens
StyleDictionary.registerTransform({
  name: 'blur/px',
  type: 'value',
  filter: (token) => token.$type === 'blur' || token.type === 'blur',
  transform: (token) => `${token.$value ?? token.value}px`,
});

const sd = new StyleDictionary({
  source: ['tokens/global.json'],
  preprocessors: ['tokens-studio'],
  expand: {
    typography: true,
  },

  platforms: {
    // CSS custom properties
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['blur/px'],
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },

    // ES module (JS/TS)
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },

    // Flat JSON — useful for other tools consuming the tokens
    json: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/json/',
      files: [
        {
          destination: 'tokens-flat.json',
          format: 'json/flat',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
