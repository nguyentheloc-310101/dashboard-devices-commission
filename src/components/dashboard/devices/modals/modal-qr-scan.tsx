'use client';

import React, { useState } from 'react';
import { IDetectedBarcode, IScannerStyles, Scanner } from '@yudiel/react-qr-scanner';
import { Modal } from 'antd';

import { ModalAddDeviceByForm } from './modal-add-normal';

interface ModalScanQrProps {
  open: boolean;
  setOpen: (e: boolean) => void;
}
const scannerStyles: IScannerStyles = {
  container: {
    position: 'relative',
    width: '60%',
    height: 'auto',
  },

  finderBorder: 2, // assuming finderBorder is used as a style property inside Scanner
};
export const ModalQrScan = ({ open, setOpen }: ModalScanQrProps) => {
  const [pauseScanner, setPauseScanner] = useState<boolean>(false);
  const [hasResult, setHasResult] = useState<boolean>(false);
  const [resultScan, setResultScan] = useState<any>(null);
  // console.log(openScanner, open);
  const onHandleScanQR = (result: IDetectedBarcode[]) => {
    if (result !== null) {
      setResultScan(JSON.parse(result[0].rawValue));
      setHasResult(true);
      // setPauseScanner(true);
      // setOpen(false);
    }
  };
  return (
    <>
      {hasResult && <ModalAddDeviceByForm open={true} setOpen={setHasResult} initialValueFromScan={resultScan} />}
      <Modal
        centered
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        title="Scan your device QR"
      >
        <div className="w-full flex items-center justify-center">
          <Scanner
            allowMultiple={true}
            paused={pauseScanner}
            styles={scannerStyles}
            onScan={(result: IDetectedBarcode[]) => onHandleScanQR(result)}
          />
        </div>{' '}
      </Modal>
    </>
  );
};
