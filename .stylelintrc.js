module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended',
    'stylelint-config-recommended-scss',
    'stylelint-config-property-sort-order-smacss',
  ],
  customSyntax: 'postcss-scss',
  rules: {
    'selector-pseudo-element-no-unknown': true,
  },
};
