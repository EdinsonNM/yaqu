export class CreateWaterUserDTO {
  ildJuntaUsuario?: string;
  vNombres: string;
  vApePaterno: string;
  vApeMaterno: string;
  vDni?: string;
  vDireccion?: string;
  vTelefono?: string;
  tObservaciones?: string;
  cEstado?: string;
  cEstadoUsuario?: string;
  vEmail?: string;
  vCelular?: string;
  vFax?: string;
  cSexo?: string;
  vRuc?: string;
  cTipoPersona?: string;
  vRepresentanteLegal?: string;
  ildTipoVia?: string;
  ildDistrito?: string;

  constructor(data: Partial<CreateWaterUserDTO>) {
    Object.assign(this, data);
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.vNombres || this.vNombres.trim() === '') {
      errors.push('El nombre es requerido');
    }

    if (!this.vApePaterno || this.vApePaterno.trim() === '') {
      errors.push('El apellido paterno es requerido');
    }

    if (!this.vApeMaterno || this.vApeMaterno.trim() === '') {
      errors.push('El apellido materno es requerido');
    }

    if (this.vDni && this.vDni.length !== 8) {
      errors.push('El DNI debe tener 8 dígitos');
    }

    if (this.vEmail && !this.validateEmail(this.vEmail)) {
      errors.push('El formato del correo electrónico no es válido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
