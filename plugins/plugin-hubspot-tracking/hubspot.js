import {defineClientAppEnhance} from '@vuepress/client';

const {id = undefined} = __HUBSPOT_OPTIONS__;

export default defineClientAppEnhance(({app, router, siteData}) => {
  // Bail if we arent ready to rock
  if (__VUEPRESS_SSR__) return;
  if (window.dataLayer && window.hubspot) return;
  if (!id) return;

  // insert hubspot `<script>` before closing body tag
  const hubspotScript = document.createElement('script');
  hubspotScript.src = `//js.hs-scripts.com/${id}.js`;
  hubspotScript.async = true;
  hubspotScript.defer = true;
  hubspotScript.id = 'hs-script-loader';
  hubspotScript.type = 'text/javascript';
  document.body.appendChild(hubspotScript);

  // insert hubspot snippet
  window.dataLayer = window.dataLayer || [];
  // the hubspot function must use `arguments` object to forward parameters
  window.hubspot = function() {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };

  hubspot('js', new Date());
  hubspot('config', id);
});
