import React, { useRef } from 'react';
import { Button, Modal } from 'antd';

import { AddDeviceForm } from '../forms';

interface IModalAddDeviceByFormProps {
  open: boolean;
  setOpen: (e: boolean) => void;
  initialValueFromScan?: any;
}

export const ModalAddDeviceByForm = ({ open, setOpen, initialValueFromScan }: IModalAddDeviceByFormProps) => {
  const formRefCreateDevice = useRef<any>(null);
  const onCloseModal = () => {
    setOpen(false);
  };
  return (
    <Modal title="Fill information of device" centered open={open} onCancel={onCloseModal} footer={null}>
      <AddDeviceForm
        initialValue={initialValueFromScan}
        onCloseModal={onCloseModal}
        formRefCreateDevice={formRefCreateDevice}
      />
    </Modal>
  );
};
