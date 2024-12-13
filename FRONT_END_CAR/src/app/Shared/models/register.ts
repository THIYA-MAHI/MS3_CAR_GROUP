export interface LoginRequest {
  email: string;
  password: string;
  // rememberMe: boolean; 
}

export interface RegisterRequest {
  customerName: string;
  phoneNumber: string;
  email: string;
  nic: string;
  password: string;
}
