export interface IDeviceCreate {
  name: string;
  value?: string | number | null;
  type_device: string;
  feeds: string;
  trigger_type: string;
  location: string;
  active?: boolean;
}
