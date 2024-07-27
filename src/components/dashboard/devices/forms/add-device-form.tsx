'use client';

import React, { useRef, useState } from 'react';
import { selectLocations, selectTypeTrigger } from '@/constants';
import { DeviceServices } from '@/services';
import { Button, Form, Input, message, Select, Switch } from 'antd';

interface IAddDeviceFormProps {
  formRefCreateDevice: React.MutableRefObject<null>;
  onCloseModal: () => void;
  initialValue?: any;
}

export const AddDeviceForm = ({ formRefCreateDevice, onCloseModal, initialValue }: IAddDeviceFormProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const onClickCancel = () => {
    form.resetFields();
    onCloseModal();
  };
  console.log(initialValue);
  const onSubmit = async (value: any) => {
    try {
      setLoading(true);
      const newDevice = {
        name: value.name,
        type_trigger: value.type_trigger,
        location: value.location,
        type_device: value.type_device,
        value: value ? value.active : false,
        feed: value?.feeds,
      };
      console.log(newDevice);
      const { data: dataNew, error } = await DeviceServices.createDevice(newDevice);
      if (error) {
        message.error(error.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      onClickCancel();
    } finally {
    }
  };
  return (
    <Form
      layout="vertical"
      form={form}
      ref={formRefCreateDevice}
      onFinish={onSubmit}
      initialValues={
        initialValue ?? {
          name: initialValue?.name,
          triggerAsyncId: initialValue?.type_trigger,
          location: initialValue?.location,
          type_device: initialValue?.type_device,
          active: initialValue?.active,
          feeds: initialValue?.feed,
        }
      }
    >
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[16px] gap-[0px]">
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Device name"
          name="name"
        >
          <Input placeholder="Eg: LED, Light" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Type device"
          name="type_device"
        >
          <Input placeholder="Sensor, Electrical" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Trigger type"
          name="type_trigger"
        >
          <Select allowClear placeholder="Choose type" options={selectTypeTrigger} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Location"
          name="location"
        >
          <Select allowClear placeholder="Choose location" options={selectLocations} />
        </Form.Item>
      </div>
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        label="Feeds (topic)"
        name="feeds"
      >
        <Input placeholder="eg: theloc3101/feeds/ai-camera" />
      </Form.Item>
      <Form.Item label="Active" name="active">
        <Switch
          onChange={(state) => {
            message.success('Set initial state ' + `${state ? 'ON' : 'OFF'}`);
          }}
        />
      </Form.Item>
      <div className="flex items-center justify-end gap-[12px]">
        <Form.Item name="cancel">
          <Button onClick={onClickCancel}>Cancel</Button>
        </Form.Item>
        <Form.Item name="submit">
          <Button loading={loading} type="primary" htmlType="submit" disabled={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
