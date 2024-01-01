
export default function(id) {
  return [
    ['script', {
      async: true,
      defer: true,
      id: 'hs-script-loader',
      src: `//js.hs-scripts.com/${id}.js`,
    }],
    ['script', {}, [
        'window.dataLayer = window.dataLayer || [];',
        'window.hubspot = function(){dataLayer.push(arguments);}',
        `hubspot('js', new Date());`,
        `hubspot('config', '${id}');`,
      ].join('\n'),
    ],
  ];
};
