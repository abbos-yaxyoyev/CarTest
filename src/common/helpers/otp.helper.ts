import axios from 'axios';

export function generateOtp() {
  return Math.random().toString().substring(2, 6);
}

export async function sendOtp(phoneNumber, otp) {
  try {
    await axios.get(
      `https://api.telegram.org/bot5236566701:AAFI6YejqM8BeZMgPrt1VEoNUUS8VpuuBrg/sendMessage?chat_id=-1001630182680&parse_mode=html&text=Books Code%20for%20${phoneNumber}%20${otp}`,
    );
  } catch (e) {
    console.log('error send otp :', e);
  }
}
