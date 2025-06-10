export class UpdateWaterUserDTO {
  ildJuntaUsuario?: string;
  vNombres?: string;
  vApePaterno?: string;
  vApeMaterno?: string;
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

  constructor(data: Partial<UpdateWaterUserDTO>) {
    Object.assign(this, data);
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (this.vNombres !== undefined && this.vNombres.trim() === '') {
      errors.push('El nombre no puede estar vacío');
    }

    if (this.vApePaterno !== undefined && this.vApePaterno.trim() === '') {
      errors.push('El apellido paterno no puede estar vacío');
    }

    if (this.vApeMaterno !== undefined && this.vApeMaterno.trim() === '') {
      errors.push('El apellido materno no puede estar vacío');
    }

    if (this.vDni !== undefined && this.vDni.length !== 8) {
      errors.push('El DNI debe tener 8 dígitos');
    }

    if (this.vEmail !== undefined && this.vEmail !== '' && !this.validateEmail(this.vEmail)) {
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
