import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginId from './pluginId';
import Initializer from './components/Initializer';
import pluginName from './pluginName';


export default {
  register(app: any) {
    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: 'Buddy deploy',
        }
      },
      [
        {
          intlLabel: {
            id: `${pluginId}.settings.deploy`,
            defaultMessage: 'Deployment',
          },
          id: pluginId,
          to: `/settings/${pluginName}`,
          Component: async () => {
            const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

            return component;
          },
          permissions: [],
        },
      ]
    );

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name: pluginName,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
