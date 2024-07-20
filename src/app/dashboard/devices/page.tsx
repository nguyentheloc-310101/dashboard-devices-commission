import { Metadata } from 'next/types';

import { config } from '@/config';
import { DevicesRender } from '@/components/dashboard/devices/devices-page';

export const metadata = { title: `Devices | Dashboard | ${config.site.name}` } satisfies Metadata;

const DevicesPage = () => {
  return (
    <>
      <DevicesRender />
    </>
  );
};

export default DevicesPage;
