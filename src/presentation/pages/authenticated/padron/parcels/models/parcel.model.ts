export interface Parcel {
  id?: string;
  name: string;
  code: string;
  userId: string;
  userName?: string;
  status: 'active' | 'inactive';
  participationStatus: string; // "No Parcionado" or other status
  area: number;
  cadastralUnit?: string;
  irrigationOrder?: string;
  licenseType?: string;
  hasLicense?: boolean;
  coordinates?: {
    utm?: string;
    zone?: string;
  };
  location?: {
    department: string;
    province: string;
    district: string;
    sector?: string;
    subSector?: string;
    irrigationBlock?: string;
    irrigationCommittee?: string;
  };
  irrigationTypes?: ParcelIrrigationType[];
  waterSources?: ParcelWaterSource[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ParcelIrrigationType {
  id?: string;
  parcelId: string;
  irrigationType: string;
  subType?: string;
  reservoir?: boolean;
  reservoirCapacity?: number;
  area?: number;
}

export interface ParcelWaterSource {
  id?: string;
  parcelId: string;
  name: string;
  sourceType: string;
  isMain?: boolean;
}

export class ParcelModel implements Parcel {
  id?: string;
  name: string;
  code: string;
  userId: string;
  userName?: string;
  status: 'active' | 'inactive';
  participationStatus: string;
  area: number;
  cadastralUnit?: string;
  irrigationOrder?: string;
  licenseType?: string;
  hasLicense?: boolean;
  coordinates?: {
    utm?: string;
    zone?: string;
  };
  location?: {
    department: string;
    province: string;
    district: string;
    sector?: string;
    subSector?: string;
    irrigationBlock?: string;
    irrigationCommittee?: string;
  };
  irrigationTypes?: ParcelIrrigationType[];
  waterSources?: ParcelWaterSource[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<Parcel> = {}) {
    this.id = data.id;
    this.name = data.name || '';
    this.code = data.code || '';
    this.userId = data.userId || '';
    this.userName = data.userName;
    this.status = data.status || 'active';
    this.participationStatus = data.participationStatus || 'No Parcionado';
    this.area = data.area || 0;
    this.cadastralUnit = data.cadastralUnit;
    this.irrigationOrder = data.irrigationOrder;
    this.licenseType = data.licenseType;
    this.hasLicense = data.hasLicense;
    this.coordinates = data.coordinates;
    this.location = data.location;
    this.irrigationTypes = data.irrigationTypes || [];
    this.waterSources = data.waterSources || [];
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
