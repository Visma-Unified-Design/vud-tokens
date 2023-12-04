const { registerTransforms, permutateThemes } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');
const { promises } = require('fs');

registerTransforms(StyleDictionary);

// StyleDictionary.registerTransform({
//   type: `value`,
//   transitive: true,
//   name: `figma/calc`,
//   matcher: ({ value }) => typeof value === 'string' && value?.includes('*'),
//   transformer: ({ value }) => `calc(${value})`,
// });

StyleDictionary.registerTransform({
  name: 'transform/pxToRem',
  type: `value`,
  transitive: true,
  matcher: (token) => typeof token.value === "string" && token.value.indexOf("px") !== -1,
  // matcher: token => ['sizing', 'spacing', 'borderRadius', 'borderWidth', 'fontSizes', 'dimension'].includes(token.type),
  transformer: (token) => {
    const baseFont = 10; // 1rem = 10px
    const floatVal = parseFloat(token.value);

    if (isNaN(floatVal)) {
      throwSizeError(token.name, token.value, 'rem');
    }

    if (floatVal === 0) { return '0'; }

    return `${floatVal / baseFont}rem`;
  },
});

const cssTransforms = [
    'attribute/cti',
    'content/quote',
    'ts/descriptionToComment',
    'ts/size/px',
    'ts/resolveMath',
    // 'size/pxToRem',
    'transform/pxToRem',
    // 'figma/calc',
    'ts/opacity',
    'ts/size/lineheight',
    'ts/typography/fontWeight',
    'ts/size/css/letterspacing',
    'ts/typography/css/fontFamily',
    'ts/typography/css/shorthand',
    'ts/border/css/shorthand',
    'ts/shadow/css/shorthand',
    'ts/color/css/hexrgba',
    'ts/color/modifiers',
    'content/icon',
    'time/seconds',
    'name/cti/kebab',
  ];

const sdLight = StyleDictionary.extend({
  source: [
    "Tokens/Global/core.json",
    "Tokens/Global/brand.json",
    "Tokens/Themes/light.json",
    "Tokens/Extends/radius.json",
    "Tokens/Extends/density.json",
    "Tokens/Extends/dimension.json",
    "Tokens/Extends/pictogram.json"
  ],
  platforms: {
    css: {
      transforms: cssTransforms,
      buildPath: 'build/css/',
      basePxFontSize: 10,
      files: [
        {
          destination: 'variables-light.css',
          format: 'css/variables',
          excludeParentKeys: true,
          options: {
              "outputReferences": true,
              "selector": [":host", ":root"],
          },
        },
      ],
    },
    scss: {
      transforms: cssTransforms,
      buildPath: 'build/scss/',
      basePxFontSize: 10,
      files: [
        {
          destination: '_variables-light.scss',
          format: 'scss/variables',
          excludeParentKeys: true,
          options: {
              "outputReferences": true,
          },
        },
      ],
    },
  },
});

const sdDark = StyleDictionary.extend({
  source: [
    "Tokens/Global/core.json",
    "Tokens/Global/brand.json",
    "Tokens/Themes/dark.json",
    "Tokens/Extends/radius.json",
    "Tokens/Extends/density.json",
    "Tokens/Extends/dimension.json",
    "Tokens/Extends/pictogram.json"
  ],
  platforms: {
    css: {
      transforms: cssTransforms,
      buildPath: 'build/css/',
      basePxFontSize: 10,
      files: [
        {
          destination: 'variables-dark.css',
          format: 'css/variables',
          excludeParentKeys: true,
          options: {
              "outputReferences": true,
              "selector": [":host", ":root"],
          },
        },
      ],
    },
    scss: {
      transforms: cssTransforms,
      buildPath: 'build/scss/',
      basePxFontSize: 10,
      files: [
        {
          destination: '_variables-dark.scss',
          format: 'scss/variables',
          excludeParentKeys: true,
          options: {
              "outputReferences": true,
          },
        },
      ],
    },
  },
});

sdLight.cleanAllPlatforms();
sdLight.buildAllPlatforms();

sdDark.cleanAllPlatforms();
sdDark.buildAllPlatforms();
