import { supabaseCollections } from '@/lib/constants';
import { supabase } from '@/lib/supabase/supabase-client';

interface IDeviceParams {
  name: string;
  type_trigger: string;
  location: string;
  type_device: string;
  value: boolean;
  feed: string;
}
class DeviceServices {
  static async createDevice(device: IDeviceParams) {
    const { data, error } = await supabase.from('data_device').insert([device]).select('*');
    return { data, error };
  }
  static async getDevices(id: string | null) {
    if (!id || id == '') {
      //get all devices
      const { data, error } = await supabase.from(supabaseCollections.data_device).select('*');
      return { data, error };
    } else {
      const { data, error } = await supabase.from(supabaseCollections.data_device).select('*').eq('id', id);
      return { data, error };
    }
  }
  static async deleteDevices(id: string | string[]) {
    const { error } = await supabase.from(supabaseCollections.data_device).delete().eq('some_column', 'someValue');
    return { error };
  }
}

export default DeviceServices;
