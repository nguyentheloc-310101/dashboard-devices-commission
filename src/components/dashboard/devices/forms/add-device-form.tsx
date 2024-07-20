import React, { useRef } from 'react';
import { selectLocations, selectTypeTrigger } from '@/constants';
import { Button, Form, Input, message, Select, Switch } from 'antd';

import { IDeviceCreate } from '@/types';

interface IAddDeviceFormProps {
  formRefCreateDevice: React.MutableRefObject<null>;
  onCloseModal: () => void;
  initialValue?: any;
}

export const AddDeviceForm = ({ formRefCreateDevice, onCloseModal, initialValue }: IAddDeviceFormProps) => {
  const [form] = Form.useForm();
  const onClickCancel = () => {
    form.resetFields();
    onCloseModal();
  };
  //   console.log(initialValue);
  const onSubmit = (value: any) => {
    const newDevice = {
      name: value.name,
      triggerAsyncId: value.trigger_type,
      location: value.location,
      type_device: value.type_device,
      active: value.active,
    };
  };
  return (
    <Form
      layout="vertical"
      form={form}
      ref={formRefCreateDevice}
      initialValues={
        initialValue ?? {
          name: initialValue.name,
          triggerAsyncId: initialValue.trigger_type,
          location: initialValue.location,
          type_device: initialValue.type_device,
          active: initialValue.active,
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
          name="trigger_type"
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
