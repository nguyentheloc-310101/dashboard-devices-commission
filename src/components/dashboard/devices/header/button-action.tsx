import React from 'react';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { IconButton, Tooltip } from '@mui/material';
import { Button } from 'antd';

interface IHeaderButtonActionProps {
  onHandleClick: (click: 'FORM' | 'QR') => void;
}

export const HeaderButtonAction = ({ onHandleClick }: IHeaderButtonActionProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>Devices</div>
      <div>
        <Button
          type="text"
          onClick={() => {
            onHandleClick('FORM');
          }}
        >
          Add device
        </Button>
        <Tooltip title={'Add device by scanning QR'} placement="top-end">
          <IconButton
            size="small"
            onClick={() => {
              onHandleClick('QR');
            }}
          >
            <QrCodeIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
