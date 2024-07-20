'use client';

import React, { useState } from 'react';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { IconButton, Tooltip } from '@mui/material';
import { Button } from 'antd';

import { ModalAddDeviceByForm, ModalQrScan } from '../modals';
import { HeaderButtonAction } from './button-action';

export const HeaderDevices = () => {
  const [openQr, setOpenQr] = useState<boolean>(false);
  const [openAddByForm, setOpenAddByForm] = useState<boolean>(false);
  const onHandleClick = (typeClick: 'QR' | 'FORM') => {
    if (typeClick == 'QR') {
      setOpenQr(true);
    } else if (typeClick == 'FORM') {
      setOpenAddByForm(true);
    }
  };
  return (
    <>
      <ModalQrScan open={openQr} setOpen={setOpenQr} />
      <ModalAddDeviceByForm open={openAddByForm} setOpen={setOpenAddByForm} />

      <HeaderButtonAction onHandleClick={onHandleClick} />
    </>
  );
};
