export interface Customer {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  nic: string;
  address: string;
  postalCode: string;
  drivingLicenceNumber: string;
  licenceExpiryDate:string;
  licenceFrontImage: string;
  licenceBackImage: string;
  proof: string;
  proofNumber: string;
  isVerified: boolean;
  status?: number;  
  password:string;
}
