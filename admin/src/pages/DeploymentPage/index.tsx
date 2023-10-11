/*
 *
 * DeploymentPage
 *
 */

import React, { useEffect, useState } from 'react';
import { Button, BaseHeaderLayout, Layout } from '@strapi/design-system'
import { getFetchClient } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import { FormattedMessage } from 'react-intl';
import getTrad from '../../utils/getTrad';

const DeploymentPage = () => {
  const [badge, setBadge] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getProgress = async () => {
    try {
      const { post } = getFetchClient();
      const response = await post(`/${pluginId}/progress`);
      setBadge(response.data?.data)
    } catch (error) {
      console.error(error)
    }
  }

  const triggerDeploy = async () => {
    try {
      const { post } = getFetchClient();
      await post(`/${pluginId}/deploy`);
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeploy = async () => {
    setIsLoading(true)
    triggerDeploy()
    getProgress()
  }

  useEffect(() => {
    getProgress()
  }, [])


  useEffect(() => {
    let interval

    if (badge && isLoading) {
      interval = setInterval(() => {
        getProgress()
      }, 5000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [badge, getProgress, isLoading])

  return <Layout>
    <BaseHeaderLayout
      title={<FormattedMessage id={getTrad('settings.name')} />}
      secondaryAction={<div dangerouslySetInnerHTML={{__html: badge }}></div>}
      primaryAction={<Button {...(isLoading ? { loading: true } : {})}
      variant="default"
      onClick={handleDeploy}
    ><FormattedMessage id={getTrad('settings.button.trigger')} /></Button>} />
  </Layout>
};

export default DeploymentPage;
