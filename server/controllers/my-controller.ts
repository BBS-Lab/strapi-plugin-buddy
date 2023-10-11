import { Strapi } from '@strapi/strapi';
// import pluginPkg from '../../package.json';
import axios from 'axios';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('buddy-deploy')
      .service('myService')
      .getWelcomeMessage();
  },
  async deploy(ctx) {
    const deployUrl = strapi.plugin('buddy-deploy').config('deployUrl')

    try {
      await axios.post(deployUrl)

      return ctx.body = {
        data: true,
        errors: null
      }
    } catch (error) {
      return ctx.badRequest('An error occurred whilst getting info about the deployment progress')
    }
  },
  async progress(ctx) {
    const badgeUrl = strapi.plugin('buddy-deploy').config('badgeUrl')

    try {
      const response = await axios.post(badgeUrl)

      return ctx.body = {
        data: response.data,
        errors: null
      }

    } catch (error) {
      return ctx.badRequest('An error occurred whilst getting info about the deployment progress')
    }
  }
});
