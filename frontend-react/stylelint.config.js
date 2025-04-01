module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
	rules: {
		'declaration-empty-line-before': null,
		'no-empty-source': null,
		'no-invalid-double-slash-comments': null,
		'declaration-no-important': null,
		'property-no-unknown': [true, { ignoreProperties: [/.*\/\/.*/] }],
		'declaration-block-no-redundant-longhand-properties': null,
		'custom-property-pattern': null,
		'shorthand-property-no-redundant-values': null,
		'media-query-no-invalid': null,
	},
	customSyntax: 'postcss-styled-syntax',
};
