import { setBranch } from '../api/Client'; // import ฟังก์ชันเปลี่ยน branch
import { login as loginApi } from '../api/users';
import { useState } from 'react';
import { Alert } from 'react-native';
import useAppNavigation from '../navigation/useAppNavigation';

export default function useLogin() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('VT'); // default branch/site
  const [loading, setLoading] = useState(false);

  const [errorID, setErrorID] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [comboboxError, setComboboxError] = useState('');

  const { resetToHome } = useAppNavigation();

  const handleLogin = async () => {
    // reset error state
    setErrorID('');
    setErrorPass('');
    setComboboxError('');

    let hasError = false;
    if (!value) { setComboboxError('ກະລຸນາເລືອກສາຂາ!'); hasError = true; }
    if (!employeeId) { setErrorID('ກະລຸນາປ້ອນລະຫັດພະນັກງານ!'); hasError = true; }
    if (!password) { setErrorPass('ກະລຸນາປ້ອນລະຫັດຜ່ານ!'); hasError = true; }
    if (hasError) return;

    try {
      setLoading(true);

      // ตั้งค่า branch ไปที่ client (axios instance หรือ fetch)
      setBranch(value);

      // call API login
      const { data } = await loginApi(employeeId, password, value);

      // ตรวจว่า response กลับมาไม่ใช่ html
      if (typeof data === 'string' && data.includes('<!DOCTYPE html>')) {
        throw new Error('Server returned HTML instead of JSON.');
      }

      console.log('Login success:', data);

      // ถ้า success → navigate ไป Home
      resetToHome({
        employeeId: data?.userCODE || employeeId,
        branch: value,
        user: data,
      });
    } catch (e) {
      // ❌ ไม่ต้องโชว์ error ของ server แล้ว
      Alert.alert(
        'ການເຂົ້າລະບົບລົ້ມເຫຼວ',
        'ກະລຸນາກວດສອບລະຫັດພະນັກງານ ຫຼື ລະຫັດຜ່ານໃໝ່'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    employeeId, setEmployeeId,
    password, setPassword,
    value, setValue,
    loading,
    errorID, errorPass, comboboxError,
    handleLogin,
  };
}
