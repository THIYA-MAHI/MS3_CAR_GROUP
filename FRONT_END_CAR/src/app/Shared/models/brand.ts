export class Brand {
    brandId: string;
    brandName: string;
    creationDate: string;
    updateDate: string | null;
  
    constructor(data: any) {
      this.brandId = data.brandId || '';
      this.brandName = data.brandName || '';
      this.creationDate = data.creationDate || '';
      this.updateDate = data.updateDate || null;
    }
  }
  