'use client';

import React, { useEffect, useState } from 'react';
import { DeviceServices } from '@/services';
import { message, Space, Switch, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

import { publishData } from '@/lib/mqtt/mqtt-client';

interface DataType {
  key: string;
  name: string;
  value?: string | number | null;
  type_device: string;
  feed: string;
  trigger_type: string;
  location: string;
  active?: boolean;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: (value) => <span>{value !== null && value !== undefined ? value.toString() : 'N/A'}</span>,
  },
  {
    title: 'Type',
    dataIndex: 'type_device',
    key: 'type_device',
  },
  {
    title: 'Feeds',
    dataIndex: 'feed',
    key: 'feed',
  },
  {
    title: 'Trigger Type',
    dataIndex: 'type_trigger',
    key: 'type_trigger',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Active',
    dataIndex: 'active',
    key: 'active',
    render: (active) => <span>{active ? 'Yes' : 'No'}</span>,
  },
  {
    title: 'Active',
    key: 'action',
    render: (_, record) => (
      <>
        {record.type_device == 'ELECTRICAL' ? (
          <Switch
            onClick={(e) => {
              publishData(
                `${record.feed}`,
                JSON.stringify({
                  trigger: `${record.name} is turn ${e == true ? 'ON' : 'OFF'}`,
                  value: e == true ? 1 : 0,
                })
              );
            }}
          />
        ) : (
          'SENSOR'
        )}
      </>
    ),
  },
];

export const TableDevices = () => {
  const [dataDevices, setDataDevices] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await DeviceServices.getDevices(null);
      if (error) {
        message.error(error.message);
        return;
      }
      const formatKey = data?.map((item, index) => {
        return {
          key: index + 1,
          ...item,
        };
      });
      setDataDevices(formatKey as any);
    };
    fetchData();
  }, []);
  return (
    <>
      <Table columns={columns} dataSource={dataDevices} />
    </>
  );
};
