'use client';

import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  value?: string | number | null;
  type_device: string;
  feeds: string;
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
    dataIndex: 'feeds',
    key: 'feeds',
  },
  {
    title: 'Trigger Type',
    dataIndex: 'trigger_type',
    key: 'trigger_type',
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
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Device1',
    value: 42,
    type_device: 'sensor',
    feeds: 'feed1',
    trigger_type: 'automatic',
    location: 'Warehouse A',
    active: true,
  },
  {
    key: '2',
    name: 'Device2',
    value: null,
    type_device: 'actuator',
    feeds: 'feed2',
    trigger_type: 'manual',
    location: 'Warehouse B',
    active: false,
  },
  {
    key: '3',
    name: 'Device3',
    value: 100,
    type_device: 'sensor',
    feeds: 'feed3',
    trigger_type: 'automatic',
    location: 'Warehouse C',
    active: true,
  },
];

export const TableDevices = () => {
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};
