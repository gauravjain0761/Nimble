const SERVICE_URL = '/api/v2/';
export const api = {
  //base uri
  BASE_URL: 'https://nimble-backend-services.onrender.com',

  // Auth
  login: SERVICE_URL + 'user/login-user',
  send_code: SERVICE_URL + 'user/send-code',
  verify_code: SERVICE_URL + 'user/verify-code',
  save_name: SERVICE_URL + 'user/save-name',
  save_password: SERVICE_URL + 'user/save-password',

  // User
  save_card: SERVICE_URL + 'user/save-card-details',
  get_user: SERVICE_URL + 'user/getuser',

  //Payment
  payment: SERVICE_URL + 'payment/postPayment',
  payment_snp: SERVICE_URL + 'payment/snpPostPayment',
};

//method
export const POST = 'POST';
export const GET = 'GET';

export const GOOGLE_API_KEY = '';
