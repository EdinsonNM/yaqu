import { jsonName, jsonProperty, Serializable } from "ts-serializable";

export class WaterUser extends Serializable {
  @jsonProperty(String, null)
  @jsonName("ild_junta_usuario")
  ildJuntaUsuario?: string;

  @jsonProperty(String, null)
  @jsonName("ild_usuario")
  ildUsuario?: string;

  @jsonProperty(String)
  @jsonName("v_nombres")
  vNombres: string = "";

  @jsonProperty(String)
  @jsonName("v_ape_paterno")
  vApePaterno: string = "";

  @jsonProperty(String)
  @jsonName("v_ape_materno")
  vApeMaterno: string = "";

  @jsonProperty(String, null)
  @jsonName("v_dni")
  vDni?: string;

  @jsonProperty(String, null)
  @jsonName("v_direccion")
  vDireccion?: string;

  @jsonProperty(String, null)
  @jsonName("v_telefono")
  vTelefono?: string;

  @jsonProperty(String, null)
  @jsonName("t_observaciones")
  tObservaciones?: string;

  @jsonProperty(String, null)
  @jsonName("c_estado")
  cEstado?: string;

  @jsonProperty(String, null)
  @jsonName("c_estado_usuario")
  cEstadoUsuario?: string;

  @jsonProperty(String, null)
  @jsonName("v_email")
  vEmail?: string;

  @jsonProperty(String, null)
  @jsonName("v_celular")
  vCelular?: string;

  @jsonProperty(String, null)
  @jsonName("v_fax")
  vFax?: string;

  @jsonProperty(String, null)
  @jsonName("c_sexo")
  cSexo?: string;

  @jsonProperty(String, null)
  @jsonName("v_ruc")
  vRuc?: string;

  @jsonProperty(String, null)
  @jsonName("c_tipo_persona")
  cTipoPersona?: string;

  @jsonProperty(Date, null)
  @jsonName("d_fecha_registro")
  dFechaRegistro?: Date;

  @jsonProperty(String, null)
  @jsonName("v_id_antiguo")
  vIdAntiguo?: string;

  @jsonProperty(String, null)
  @jsonName("v_representante_legal")
  vRepresentanteLegal?: string;

  @jsonProperty(String, null)
  @jsonName("ild_tipo_via")
  ildTipoVia?: string;

  @jsonProperty(String, null)
  @jsonName("ild_distrito")
  ildDistrito?: string;

  constructor(data?: Partial<WaterUser>) {
    super();
    if (!data) return;
    Object.assign(this, data);
  }
}
