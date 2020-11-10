module.exports = {
  "env": {
    "production": {
      "plugins": ["transform-es2015-modules-commonjs"]
    }
  },  
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};