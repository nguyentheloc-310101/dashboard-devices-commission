import { Card } from 'antd';

import { HeaderDevices } from './header';
import { TableDevices } from './table-devices';

export const DevicesRender = () => {
  return (
    <div>
      <Card bordered title={<HeaderDevices />}>
        <TableDevices />
      </Card>
    </div>
  );
};
