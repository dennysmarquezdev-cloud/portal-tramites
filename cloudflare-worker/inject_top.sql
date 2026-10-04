BEGIN TRANSACTION;

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (10, 'sunat_recibo', 'Emitir Recibo por Honorarios', 'https://ww1.sunat.gob.pe/ol-ti-itrheopciones/RHESunat.htm', 'SUNAT', 1, 'emprender', '# Entidad: SUNAT
## Trámite: Emitir Recibo por Honorarios Electrónico

Si eres trabajador independiente (Renta de Cuarta Categoría) y prestas servicios profesionales, debes emitir un Recibo por Honorarios Electrónico (RHE) por cada servicio realizado.

### Requisitos
- Contar con número de RUC (estado Activo).
- Tener tu Clave SOL (Usuario y Contraseña).
- Haber registrado tu cuenta de detracciones (si aplica).

### Modalidad: Online
1. Ingresa a SUNAT Operaciones en Línea (SOL) con tu RUC, Usuario y Contraseña.
2. Selecciona la opción "Comprobantes de Pago" > "SEE SOL" > "Recibos por Honorarios Electrónicos".
3. Haz clic en "Emitir Recibo por Honorarios Electrónico".
4. Ingresa el RUC o DNI de la empresa o persona a la que le prestaste el servicio.
5. Detalla el servicio prestado, el monto a cobrar y el tipo de moneda.
6. Indica si el recibo está sujeto a retención de 8% de Impuesto a la Renta (si el monto supera los S/ 1,500 y no tienes suspensión).
7. Revisa la vista preliminar y haz clic en "Emitir".
8. Puedes descargar el RHE en PDF o enviarlo directamente por correo electrónico.

### Costo
Gratuito.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (10, 'Emitir Recibo por Honorarios', '# Entidad: SUNAT
## Trámite: Emitir Recibo por Honorarios Electrónico

Si eres trabajador independiente (Renta de Cuarta Categoría) y prestas servicios profesionales, debes emitir un Recibo por Honorarios Electrónico (RHE) por cada servicio realizado.

### Requisitos
- Contar con número de RUC (estado Activo).
- Tener tu Clave SOL (Usuario y Contraseña).
- Haber registrado tu cuenta de detracciones (si aplica).

### Modalidad: Online
1. Ingresa a SUNAT Operaciones en Línea (SOL) con tu RUC, Usuario y Contraseña.
2. Selecciona la opción "Comprobantes de Pago" > "SEE SOL" > "Recibos por Honorarios Electrónicos".
3. Haz clic en "Emitir Recibo por Honorarios Electrónico".
4. Ingresa el RUC o DNI de la empresa o persona a la que le prestaste el servicio.
5. Detalla el servicio prestado, el monto a cobrar y el tipo de moneda.
6. Indica si el recibo está sujeto a retención de 8% de Impuesto a la Renta (si el monto supera los S/ 1,500 y no tienes suspensión).
7. Revisa la vista preliminar y haz clic en "Emitir".
8. Puedes descargar el RHE en PDF o enviarlo directamente por correo electrónico.

### Costo
Gratuito.
');

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (11, 'sunat_clave_sol', 'Obtener Clave SOL', 'https://citas.sunat.gob.pe/', 'SUNAT', 1, 'emprender', '# Entidad: SUNAT
## Trámite: Obtener Clave SOL

La Clave SOL te permite acceder a SUNAT Operaciones en Línea para realizar trámites como emitir facturas, recibos por honorarios, declarar impuestos, entre otros.

### Requisitos
- DNI vigente (si eres ciudadano peruano).
- Teléfono celular y correo electrónico activos.
- Para extranjeros: Carné de Extranjería y acudir presencialmente.

### Modalidad: Online (App Personas)
1. Descarga la aplicación "App Personas SUNAT" en tu celular.
2. Selecciona "Genera tu Clave SOL".
3. Ingresa tu número de DNI y fecha de nacimiento.
4. Escanea tu huella digital con la cámara de tu celular (identificación biométrica).
5. Ingresa tu correo electrónico y un número de celular.
6. Crea una contraseña segura.
7. ¡Listo! Recibirás la confirmación en tu correo.

### Modalidad: Presencial
1. Acércate a cualquier Centro de Servicios al Contribuyente (CSC) de SUNAT.
2. Presenta tu DNI original.
3. Te entregarán un sobre cerrado con tu Usuario y Clave SOL.

### Costo
Gratuito.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (11, 'Obtener Clave SOL', '# Entidad: SUNAT
## Trámite: Obtener Clave SOL

La Clave SOL te permite acceder a SUNAT Operaciones en Línea para realizar trámites como emitir facturas, recibos por honorarios, declarar impuestos, entre otros.

### Requisitos
- DNI vigente (si eres ciudadano peruano).
- Teléfono celular y correo electrónico activos.
- Para extranjeros: Carné de Extranjería y acudir presencialmente.

### Modalidad: Online (App Personas)
1. Descarga la aplicación "App Personas SUNAT" en tu celular.
2. Selecciona "Genera tu Clave SOL".
3. Ingresa tu número de DNI y fecha de nacimiento.
4. Escanea tu huella digital con la cámara de tu celular (identificación biométrica).
5. Ingresa tu correo electrónico y un número de celular.
6. Crea una contraseña segura.
7. ¡Listo! Recibirás la confirmación en tu correo.

### Modalidad: Presencial
1. Acércate a cualquier Centro de Servicios al Contribuyente (CSC) de SUNAT.
2. Presenta tu DNI original.
3. Te entregarán un sobre cerrado con tu Usuario y Clave SOL.

### Costo
Gratuito.
');

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (12, 'sunat_inscribir_ruc', 'Inscribirse en el RUC', 'https://www.gob.pe/284-inscribirse-en-el-ruc', 'SUNAT', 1, 'emprender', '# Entidad: SUNAT
## Trámite: Inscribirse en el Registro Único de Contribuyentes (RUC)

El RUC es el registro informático a cargo de la SUNAT donde te inscribes si vas a iniciar actividades económicas (negocio propio, trabajo independiente, alquiler de bienes, etc). Consta de 11 dígitos y es único.

### Requisitos
- DNI vigente.
- Un número de celular y un correo electrónico válido.
- Especificar la fecha de inicio de tus actividades económicas.
- Declarar tu actividad económica principal.
- Seleccionar un Régimen Tributario (NRUS, MYPE, Especial o General) si eres empresa o negocio.

### Modalidad: Online (Personas Naturales)
1. Ingresa a la App Personas SUNAT o al portal web Sunat Virtual.
2. Digita tu número de DNI e indica para qué necesitas el RUC.
3. El sistema te pedirá validar tu identidad biométricamente (escaneo de huellas desde el celular).
4. Completa el formulario con tu dirección, correo y número de teléfono.
5. Elige tu régimen tributario.
6. Al finalizar, generarás tu Clave SOL y recibirás tu ficha RUC al correo.

### Costo
Gratuito.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (12, 'Inscribirse en el RUC', '# Entidad: SUNAT
## Trámite: Inscribirse en el Registro Único de Contribuyentes (RUC)

El RUC es el registro informático a cargo de la SUNAT donde te inscribes si vas a iniciar actividades económicas (negocio propio, trabajo independiente, alquiler de bienes, etc). Consta de 11 dígitos y es único.

### Requisitos
- DNI vigente.
- Un número de celular y un correo electrónico válido.
- Especificar la fecha de inicio de tus actividades económicas.
- Declarar tu actividad económica principal.
- Seleccionar un Régimen Tributario (NRUS, MYPE, Especial o General) si eres empresa o negocio.

### Modalidad: Online (Personas Naturales)
1. Ingresa a la App Personas SUNAT o al portal web Sunat Virtual.
2. Digita tu número de DNI e indica para qué necesitas el RUC.
3. El sistema te pedirá validar tu identidad biométricamente (escaneo de huellas desde el celular).
4. Completa el formulario con tu dirección, correo y número de teléfono.
5. Elige tu régimen tributario.
6. Al finalizar, generarás tu Clave SOL y recibirás tu ficha RUC al correo.

### Costo
Gratuito.
');

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (13, 'reniec_duplicado_dni', 'Sacar Duplicado de DNI', 'https://portaladminusuarios.reniec.gob.pe/duplicado/#!/index', 'RENIEC', 1, 'identificacion', '# Entidad: RENIEC
## Trámite: Sacar Duplicado de DNI

Si perdiste, te robaron o se deterioró tu Documento Nacional de Identidad (DNI) azul o DNIe, puedes solicitar un duplicado. Obtendrás un DNI con los mismos datos y la misma fecha de caducidad que el anterior.

### Requisitos
- Ser mayor de 17 años.
- Haber pagado el derecho de trámite previamente.
- Si fue por robo, se recomienda hacer la denuncia policial (opcional para el trámite en RENIEC, pero sugerido por seguridad).

### Costo
- Duplicado DNI azul: S/ 21.00 (Págalo en Págalo.pe, BCP o Banco de la Nación, código 05237).
- Duplicado DNI electrónico (DNIe): S/ 33.00 (Código 05223).
- DNI para menores de 17 años: S/ 16.00 (Código 06823, trámite solo presencial).

### Modalidad: Online (Recomendado)
1. Paga el derecho de trámite a través de la web Pagalo.pe.
2. Ingresa a la plataforma "Duplicado de DNI" en la web de RENIEC.
3. Acepta los términos y condiciones, e ingresa tus datos personales para validar tu identidad.
4. Selecciona la oficina de RENIEC donde deseas recoger el documento.
5. Selecciona tu comprobante de pago.
6. Al finalizar, imprime tu constancia de trámite.
7. Puedes verificar el estado en la opción "Consultar Estado de Trámite". Cuando esté al 100%, acércate a recogerlo.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (13, 'Sacar Duplicado de DNI', '# Entidad: RENIEC
## Trámite: Sacar Duplicado de DNI

Si perdiste, te robaron o se deterioró tu Documento Nacional de Identidad (DNI) azul o DNIe, puedes solicitar un duplicado. Obtendrás un DNI con los mismos datos y la misma fecha de caducidad que el anterior.

### Requisitos
- Ser mayor de 17 años.
- Haber pagado el derecho de trámite previamente.
- Si fue por robo, se recomienda hacer la denuncia policial (opcional para el trámite en RENIEC, pero sugerido por seguridad).

### Costo
- Duplicado DNI azul: S/ 21.00 (Págalo en Págalo.pe, BCP o Banco de la Nación, código 05237).
- Duplicado DNI electrónico (DNIe): S/ 33.00 (Código 05223).
- DNI para menores de 17 años: S/ 16.00 (Código 06823, trámite solo presencial).

### Modalidad: Online (Recomendado)
1. Paga el derecho de trámite a través de la web Pagalo.pe.
2. Ingresa a la plataforma "Duplicado de DNI" en la web de RENIEC.
3. Acepta los términos y condiciones, e ingresa tus datos personales para validar tu identidad.
4. Selecciona la oficina de RENIEC donde deseas recoger el documento.
5. Selecciona tu comprobante de pago.
6. Al finalizar, imprime tu constancia de trámite.
7. Puedes verificar el estado en la opción "Consultar Estado de Trámite". Cuando esté al 100%, acércate a recogerlo.
');

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (14, 'reniec_dni_menores', 'DNI para menores de edad', 'https://www.gob.pe/235-obtener-dni-para-menores-de-edad', 'RENIEC', 1, 'identificacion', '# Entidad: RENIEC
## Trámite: DNI para menores de edad

Todo menor de edad peruano debe contar con un Documento Nacional de Identidad (DNI amarillo). Este documento es necesario para acceder a servicios de salud, educación y viajar.

### Requisitos
- Presencia del menor de edad acompañado de su padre, madre o tutor legal.
- DNI original del padre, madre o tutor.
- Copia certificada del Acta de Nacimiento del menor (no es necesario si el acta está en la base de datos del RENIEC).
- Un recibo de servicio público (agua, luz, teléfono) original con antigüedad no mayor a 6 meses.
- 1 foto tamaño pasaporte actual, fondo blanco, sin lentes ni sonreír.
- Recibo de pago por derecho de trámite.

### Costo
- S/ 16.00 (Págalo en Pagalo.pe o Banco de la Nación con el código 00647).

### Modalidad: Presencial (Obligatorio)
1. Paga el derecho de trámite.
2. Dirígete con el menor a un Centro de Atención de RENIEC o a un Centro MAC.
3. Entrega los documentos solicitados al registrador. Él tomará las huellas dactilares de ambos y registrará el trámite.
4. Te entregarán un ticket de recojo.
5. Revisa el estado del trámite online, y cuando llegue al 100%, el padre/madre deberá acercarse (sin el menor) a recoger el DNI amarillo.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (14, 'DNI para menores de edad', '# Entidad: RENIEC
## Trámite: DNI para menores de edad

Todo menor de edad peruano debe contar con un Documento Nacional de Identidad (DNI amarillo). Este documento es necesario para acceder a servicios de salud, educación y viajar.

### Requisitos
- Presencia del menor de edad acompañado de su padre, madre o tutor legal.
- DNI original del padre, madre o tutor.
- Copia certificada del Acta de Nacimiento del menor (no es necesario si el acta está en la base de datos del RENIEC).
- Un recibo de servicio público (agua, luz, teléfono) original con antigüedad no mayor a 6 meses.
- 1 foto tamaño pasaporte actual, fondo blanco, sin lentes ni sonreír.
- Recibo de pago por derecho de trámite.

### Costo
- S/ 16.00 (Págalo en Pagalo.pe o Banco de la Nación con el código 00647).

### Modalidad: Presencial (Obligatorio)
1. Paga el derecho de trámite.
2. Dirígete con el menor a un Centro de Atención de RENIEC o a un Centro MAC.
3. Entrega los documentos solicitados al registrador. Él tomará las huellas dactilares de ambos y registrará el trámite.
4. Te entregarán un ticket de recojo.
5. Revisa el estado del trámite online, y cuando llegue al 100%, el padre/madre deberá acercarse (sin el menor) a recoger el DNI amarillo.
');

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (15, 'reniec_cambio_domicilio', 'Cambio de Domicilio', 'https://apps.reniec.gob.pe/domicilio/#!/index', 'RENIEC', 1, 'identificacion', '# Entidad: RENIEC
## Trámite: Cambio de Domicilio en el DNI

Si te mudaste y tu dirección actual es diferente a la que aparece en tu DNI, debes actualizarla para evitar problemas legales y asegurar que tu centro de votación corresponda a tu ubicación.

### Requisitos
- Imagen digitalizada (foto o escaneo) de un recibo de servicios (agua, luz o teléfono) emitido en los últimos 6 meses donde figure la nueva dirección.
- Haber realizado el pago por derecho de trámite.

### Costo
- DNI Azul: S/ 22.00 (Código 00728 en Pagalo.pe o Banco de la Nación).
- DNI Electrónico (DNIe): S/ 34.00 (Código 00730).

### Modalidad: Online
1. Paga la tasa correspondiente según tu tipo de DNI.
2. Ingresa al portal de "Rectificación de Domicilio" del RENIEC.
3. Valida tu identidad a través de la aplicación "DNI BioFacial" instalada en tu celular.
4. Ingresa los datos de tu nueva dirección tal como aparecen en tu recibo de servicios.
5. Adjunta la imagen digital del recibo de servicios públicos.
6. Selecciona el comprobante de pago.
7. Elige la oficina donde quieres recoger el nuevo DNI. (Se emitirá un DNI físico nuevo con la nueva dirección).
8. Revisa el avance en "Estado del Trámite" y recoge el DNI.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (15, 'Cambio de Domicilio', '# Entidad: RENIEC
## Trámite: Cambio de Domicilio en el DNI

Si te mudaste y tu dirección actual es diferente a la que aparece en tu DNI, debes actualizarla para evitar problemas legales y asegurar que tu centro de votación corresponda a tu ubicación.

### Requisitos
- Imagen digitalizada (foto o escaneo) de un recibo de servicios (agua, luz o teléfono) emitido en los últimos 6 meses donde figure la nueva dirección.
- Haber realizado el pago por derecho de trámite.

### Costo
- DNI Azul: S/ 22.00 (Código 00728 en Pagalo.pe o Banco de la Nación).
- DNI Electrónico (DNIe): S/ 34.00 (Código 00730).

### Modalidad: Online
1. Paga la tasa correspondiente según tu tipo de DNI.
2. Ingresa al portal de "Rectificación de Domicilio" del RENIEC.
3. Valida tu identidad a través de la aplicación "DNI BioFacial" instalada en tu celular.
4. Ingresa los datos de tu nueva dirección tal como aparecen en tu recibo de servicios.
5. Adjunta la imagen digital del recibo de servicios públicos.
6. Selecciona el comprobante de pago.
7. Elige la oficina donde quieres recoger el nuevo DNI. (Se emitirá un DNI físico nuevo con la nueva dirección).
8. Revisa el avance en "Estado del Trámite" y recoge el DNI.
');

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (16, 'mtc_papeletas', 'Consultar Papeletas', 'https://recordconductor.mtc.gob.pe/', 'MTC', 1, 'transporte', '# Entidad: MTC
## Trámite: Consultar Papeletas de Tránsito

Puedes consultar si tienes papeletas de tránsito o infracciones pendientes de pago registradas en el Sistema de Licencias de Conducir por Puntos del Ministerio de Transportes y Comunicaciones (MTC).

### Requisitos
- Número de DNI o Carné de Extranjería.
- Número de Licencia de Conducir.

### Modalidad: Online
1. Ingresa a la plataforma "Récord de Conductor" del MTC (recordconductor.mtc.gob.pe).
2. Selecciona el tipo de documento de identidad (DNI, CE, etc).
3. Ingresa el número de tu documento o el número de tu licencia.
4. Ingresa el código Captcha de seguridad.
5. Haz clic en "Buscar".
6. El sistema te mostrará tu récord de puntos y si tienes papeletas impagas a nivel nacional.

*Nota: Para papeletas específicas de la ciudad de Lima que quizás no han subido al MTC, debes buscar adicionalmente en el portal del SAT (Servicio de Administración Tributaria de Lima).*

### Costo
El servicio de consulta es completamente gratuito. El pago de las papeletas variará según la gravedad de la infracción.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (16, 'Consultar Papeletas', '# Entidad: MTC
## Trámite: Consultar Papeletas de Tránsito

Puedes consultar si tienes papeletas de tránsito o infracciones pendientes de pago registradas en el Sistema de Licencias de Conducir por Puntos del Ministerio de Transportes y Comunicaciones (MTC).

### Requisitos
- Número de DNI o Carné de Extranjería.
- Número de Licencia de Conducir.

### Modalidad: Online
1. Ingresa a la plataforma "Récord de Conductor" del MTC (recordconductor.mtc.gob.pe).
2. Selecciona el tipo de documento de identidad (DNI, CE, etc).
3. Ingresa el número de tu documento o el número de tu licencia.
4. Ingresa el código Captcha de seguridad.
5. Haz clic en "Buscar".
6. El sistema te mostrará tu récord de puntos y si tienes papeletas impagas a nivel nacional.

*Nota: Para papeletas específicas de la ciudad de Lima que quizás no han subido al MTC, debes buscar adicionalmente en el portal del SAT (Servicio de Administración Tributaria de Lima).*

### Costo
El servicio de consulta es completamente gratuito. El pago de las papeletas variará según la gravedad de la infracción.
');

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (17, 'mtc_revalidar_brevete', 'Revalidar Brevete', 'https://licencias.mtc.gob.pe/', 'MTC', 1, 'transporte', '# Entidad: MTC
## Trámite: Revalidar Brevete (Licencia de Conducir)

Si tu licencia de conducir (brevete) venció o está por vencer, debes revalidarla. Se puede realizar de manera presencial o de forma 100% virtual si optas por la Licencia Electrónica.

### Requisitos
- DNI original y vigente.
- Examen Médico aprobado en un centro médico autorizado por el MTC. El resultado subirá automáticamente al sistema del MTC.
- Aprobar el Examen de Conocimientos en el Touring (Solo aplica para revalidar categorías Profesionales AII y AIII. *La categoría particular A-I NO requiere examen de conocimientos*).
- No tener multas o papeletas pendientes de pago.
- Pago por derecho de emisión.

### Costo
- Brevete Electrónico (Virtual): S/ 6.70 (Código 1601 en Pagalo.pe).
- Brevete Físico (Plástico): S/ 14.80 (Código 1602).

### Modalidad: Online (Brevete Electrónico en Lima)
1. Pasa y aprueba tu Examen Médico en una clínica autorizada.
2. Paga los S/ 6.70 en Pagalo.pe (Banco de la Nación).
3. Ingresa a la plataforma de Licencias MTC (licencias.mtc.gob.pe).
4. Elige la opción "Revalidación", ingresa tu DNI y acepta términos.
5. Ingresa los datos del voucher de pago.
6. Confirma tu correo electrónico. En minutos recibirás tu nueva licencia electrónica en formato PDF en tu bandeja de correo.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (17, 'Revalidar Brevete', '# Entidad: MTC
## Trámite: Revalidar Brevete (Licencia de Conducir)

Si tu licencia de conducir (brevete) venció o está por vencer, debes revalidarla. Se puede realizar de manera presencial o de forma 100% virtual si optas por la Licencia Electrónica.

### Requisitos
- DNI original y vigente.
- Examen Médico aprobado en un centro médico autorizado por el MTC. El resultado subirá automáticamente al sistema del MTC.
- Aprobar el Examen de Conocimientos en el Touring (Solo aplica para revalidar categorías Profesionales AII y AIII. *La categoría particular A-I NO requiere examen de conocimientos*).
- No tener multas o papeletas pendientes de pago.
- Pago por derecho de emisión.

### Costo
- Brevete Electrónico (Virtual): S/ 6.70 (Código 1601 en Pagalo.pe).
- Brevete Físico (Plástico): S/ 14.80 (Código 1602).

### Modalidad: Online (Brevete Electrónico en Lima)
1. Pasa y aprueba tu Examen Médico en una clínica autorizada.
2. Paga los S/ 6.70 en Pagalo.pe (Banco de la Nación).
3. Ingresa a la plataforma de Licencias MTC (licencias.mtc.gob.pe).
4. Elige la opción "Revalidación", ingresa tu DNI y acepta términos.
5. Ingresa los datos del voucher de pago.
6. Confirma tu correo electrónico. En minutos recibirás tu nueva licencia electrónica en formato PDF en tu bandeja de correo.
');

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (18, 'essalud_seguro_activo', 'Verificar seguro activo', 'https://dondemeatiendo.essalud.gob.pe/', 'EsSalud', 1, 'salud', '# Entidad: EsSalud
## Trámite: Verificar seguro activo ("Dónde me atiendo")

Puedes verificar por internet si tu seguro de salud o el de tus familiares está activo y saber exactamente en qué policlínico, centro médico u hospital te corresponde atenderte según tu domicilio.

### Requisitos
- Solo necesitas tu número de DNI o tu nombre completo.

### Modalidad: Online
1. Ingresa a la web oficial "Dónde me atiendo" (dondemeatiendo.essalud.gob.pe).
2. En la sección "Búsqueda por", selecciona "Tipo de Documento".
3. Elige DNI e ingresa tu número de documento.
4. Ingresa el Código de la Imagen (Captcha).
5. Haz clic en "Consultar".
6. El sistema te mostrará tu "Estado" (Activo / Inactivo).
7. También te indicará el Centro Asistencial que te corresponde y su dirección física.

### Importante
Si el estado de tu seguro figura como "Inactivo", significa que tu empleador tiene una deuda de aportes, o ha habido un error en la declaración. Deberás comunicarte con el área de RRHH de tu empresa.

### Costo
Gratuito.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (18, 'Verificar seguro activo', '# Entidad: EsSalud
## Trámite: Verificar seguro activo ("Dónde me atiendo")

Puedes verificar por internet si tu seguro de salud o el de tus familiares está activo y saber exactamente en qué policlínico, centro médico u hospital te corresponde atenderte según tu domicilio.

### Requisitos
- Solo necesitas tu número de DNI o tu nombre completo.

### Modalidad: Online
1. Ingresa a la web oficial "Dónde me atiendo" (dondemeatiendo.essalud.gob.pe).
2. En la sección "Búsqueda por", selecciona "Tipo de Documento".
3. Elige DNI e ingresa tu número de documento.
4. Ingresa el Código de la Imagen (Captcha).
5. Haz clic en "Consultar".
6. El sistema te mostrará tu "Estado" (Activo / Inactivo).
7. También te indicará el Centro Asistencial que te corresponde y su dirección física.

### Importante
Si el estado de tu seguro figura como "Inactivo", significa que tu empleador tiene una deuda de aportes, o ha habido un error en la declaración. Deberás comunicarte con el área de RRHH de tu empresa.

### Costo
Gratuito.
');

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (19, 'essalud_cita_medica', 'Sacar Cita Médica', 'http://portal.essalud.gob.pe/', 'EsSalud', 1, 'salud', '# Entidad: EsSalud
## Trámite: Sacar Cita Médica

Si tu seguro está activo, puedes reservar citas para medicina general, odontología, psicología, nutrición y otras especialidades de atención primaria sin necesidad de hacer filas en el hospital.

### Requisitos
- Seguro EsSalud activo.
- Número de DNI.
- Estar adscrito a un Centro Asistencial habilitado para citas web/telefónicas.

### Modalidad: Teléfono (EsSalud en Línea)
1. Llama al número de EsSalud en Línea: (01) 411-8000 en Lima o a las centrales de tu región.
2. Marca la opción para "Citas Médicas".
3. Proporciona tu DNI a la teleoperadora.
4. Indica la especialidad que necesitas. Se te programará según disponibilidad.

### Modalidad: Online (App EsSalud Mi Consulta)
1. Descarga la aplicación "EsSalud Mi Consulta" (Android / iOS).
2. Regístrate o inicia sesión con tu DNI y contraseña.
3. Ve a la opción "Citas".
4. Selecciona tu centro asistencial, la especialidad (ej: Medicina General) y el horario disponible en el calendario.
5. Confirma la cita. Te llegará un recordatorio a la aplicación.

### Costo
Totalmente gratuito para asegurados activos.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (19, 'Sacar Cita Médica', '# Entidad: EsSalud
## Trámite: Sacar Cita Médica

Si tu seguro está activo, puedes reservar citas para medicina general, odontología, psicología, nutrición y otras especialidades de atención primaria sin necesidad de hacer filas en el hospital.

### Requisitos
- Seguro EsSalud activo.
- Número de DNI.
- Estar adscrito a un Centro Asistencial habilitado para citas web/telefónicas.

### Modalidad: Teléfono (EsSalud en Línea)
1. Llama al número de EsSalud en Línea: (01) 411-8000 en Lima o a las centrales de tu región.
2. Marca la opción para "Citas Médicas".
3. Proporciona tu DNI a la teleoperadora.
4. Indica la especialidad que necesitas. Se te programará según disponibilidad.

### Modalidad: Online (App EsSalud Mi Consulta)
1. Descarga la aplicación "EsSalud Mi Consulta" (Android / iOS).
2. Regístrate o inicia sesión con tu DNI y contraseña.
3. Ve a la opción "Citas".
4. Selecciona tu centro asistencial, la especialidad (ej: Medicina General) y el horario disponible en el calendario.
5. Confirma la cita. Te llegará un recordatorio a la aplicación.

### Costo
Totalmente gratuito para asegurados activos.
');

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (20, 'migraciones_pasaporte', 'Sacar Pasaporte', 'https://sel.migraciones.gob.pe/servmig-valreg/VerificarPagoCP', 'Migraciones', 1, 'viajes', '# Entidad: Migraciones
## Trámite: Sacar Pasaporte Electrónico ordinario

El Pasaporte Electrónico o Biométrico es el documento oficial de viaje que necesitas para transitar fuera del Perú. Tiene una vigencia de 10 años para mayores de edad (los emitidos desde 2024).

### Requisitos
- DNI en buen estado y sin multas electorales (JNE).
- Comprobante de pago de derecho de trámite.
- Cita electrónica programada (excepto casos de vuelos de emergencia dentro de 48 horas).
- No tener multas pendientes de pago con Migraciones.

### Costo
- El costo es de S/ 120.90 (Págalo en Pagalo.pe con el código de tasa 01810).

### Modalidad: Presencial (Con Cita Previa)
1. **Paga el trámite:** En Pagalo.pe o agencias del Banco de la Nación (Código 01810).
2. **Saca tu cita:** Ingresa al "Sistema de Citas en Línea de Migraciones". Ingresa tus datos personales, los datos de tu comprobante de pago y elige la sede y fecha disponible.
3. **Acude a la cita:** Preséntate en la sede de Migraciones seleccionada 15 minutos antes con tu DNI y tu constancia de cita impresa o en el celular.
4. **Toma de fotos y huellas:** Allí te tomarán la fotografía biométrica (no uses prendas en la cabeza ni lentes de contacto de color).
5. **Recojo:** Generalmente el pasaporte te lo entregan el mismo día, un par de horas después de registrar tus datos biométricos.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (20, 'Sacar Pasaporte', '# Entidad: Migraciones
## Trámite: Sacar Pasaporte Electrónico ordinario

El Pasaporte Electrónico o Biométrico es el documento oficial de viaje que necesitas para transitar fuera del Perú. Tiene una vigencia de 10 años para mayores de edad (los emitidos desde 2024).

### Requisitos
- DNI en buen estado y sin multas electorales (JNE).
- Comprobante de pago de derecho de trámite.
- Cita electrónica programada (excepto casos de vuelos de emergencia dentro de 48 horas).
- No tener multas pendientes de pago con Migraciones.

### Costo
- El costo es de S/ 120.90 (Págalo en Pagalo.pe con el código de tasa 01810).

### Modalidad: Presencial (Con Cita Previa)
1. **Paga el trámite:** En Pagalo.pe o agencias del Banco de la Nación (Código 01810).
2. **Saca tu cita:** Ingresa al "Sistema de Citas en Línea de Migraciones". Ingresa tus datos personales, los datos de tu comprobante de pago y elige la sede y fecha disponible.
3. **Acude a la cita:** Preséntate en la sede de Migraciones seleccionada 15 minutos antes con tu DNI y tu constancia de cita impresa o en el celular.
4. **Toma de fotos y huellas:** Allí te tomarán la fotografía biométrica (no uses prendas en la cabeza ni lentes de contacto de color).
5. **Recojo:** Generalmente el pasaporte te lo entregan el mismo día, un par de horas después de registrar tus datos biométricos.
');

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (21, 'pnp_antecedentes', 'Antecedentes Policiales', 'https://www.policia.gob.pe/home/Cerapen', 'PNP', 1, 'seguridad', '# Entidad: PNP
## Trámite: Certificado de Antecedentes Policiales (CERAP)

El CERAP es un documento oficial emitido por la Policía Nacional del Perú que certifica si una persona registra o no antecedentes policiales (denuncias o detenciones). Es comúnmente solicitado para conseguir empleo, solicitar visas o estudios.

### Requisitos
- DNI vigente (o Carné de Extranjería).
- Comprobante de pago.
- En caso de trámite digital, requiere una cuenta en la web de la PNP o verificación.

### Costo
- Tasa: S/ 17.00.
- Código de pago Banco de la Nación / Pagalo.pe: **08116**.

### Modalidad: Online (Digital)
1. Realiza el pago de S/ 17.00 en la web Pagalo.pe.
2. Ingresa al portal de "Certificado de Antecedentes Policiales Digital" (cerap.policia.gob.pe).
3. Acepta los términos legales e ingresa los datos de tu comprobante de pago (Secuencia, fecha y código de caja).
4. El sistema validará tu identidad mediante preguntas sobre tu DNI.
5. Una vez verificada la información, el sistema generará el certificado de forma inmediata.
6. Descárgalo en formato PDF (cuenta con firma digital y código QR de validación).

### Modalidad: Presencial (Comisarías o MAC)
1. Paga los S/ 17.00 en el Banco de la Nación.
2. Ve a las comisarías autorizadas a nivel nacional o centros MAC.
3. Te tomarán las huellas digitales en un sistema biométrico y te entregarán el documento impreso en pocos minutos.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (21, 'Antecedentes Policiales', '# Entidad: PNP
## Trámite: Certificado de Antecedentes Policiales (CERAP)

El CERAP es un documento oficial emitido por la Policía Nacional del Perú que certifica si una persona registra o no antecedentes policiales (denuncias o detenciones). Es comúnmente solicitado para conseguir empleo, solicitar visas o estudios.

### Requisitos
- DNI vigente (o Carné de Extranjería).
- Comprobante de pago.
- En caso de trámite digital, requiere una cuenta en la web de la PNP o verificación.

### Costo
- Tasa: S/ 17.00.
- Código de pago Banco de la Nación / Pagalo.pe: **08116**.

### Modalidad: Online (Digital)
1. Realiza el pago de S/ 17.00 en la web Pagalo.pe.
2. Ingresa al portal de "Certificado de Antecedentes Policiales Digital" (cerap.policia.gob.pe).
3. Acepta los términos legales e ingresa los datos de tu comprobante de pago (Secuencia, fecha y código de caja).
4. El sistema validará tu identidad mediante preguntas sobre tu DNI.
5. Una vez verificada la información, el sistema generará el certificado de forma inmediata.
6. Descárgalo en formato PDF (cuenta con firma digital y código QR de validación).

### Modalidad: Presencial (Comisarías o MAC)
1. Paga los S/ 17.00 en el Banco de la Nación.
2. Ve a las comisarías autorizadas a nivel nacional o centros MAC.
3. Te tomarán las huellas digitales en un sistema biométrico y te entregarán el documento impreso en pocos minutos.
');

INSERT OR REPLACE INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (22, 'pnp_denuncia_perdida', 'Denuncia por pérdida', 'https://sistemas.policia.gob.pe/denuncias_digitales/', 'PNP', 1, 'seguridad', '# Entidad: PNP
## Trámite: Denuncia policial por pérdida de documentos

Si extraviaste tu DNI, brevete, pasaporte, SOAT, tarjetas de crédito, fotocheck, carné universitario u otros documentos, ahora puedes hacer la denuncia policial de forma 100% virtual, sin ir a una comisaría.

### Requisitos
- Tu número de DNI peruano.
- Ser mayor de edad.
- Conocer exactamente qué documentos perdiste y bajo qué circunstancias.

### Modalidad: Online
1. Ingresa a la plataforma "Denuncia Policial Digital" de la PNP (sistemas.policia.gob.pe/denuncias_digitales/).
2. Acepta los términos de uso.
3. Ingresa tus datos personales: DNI, nombres, apellidos, y nombre de tus padres (para validar tu identidad contra RENIEC).
4. Ingresa un correo electrónico y un celular.
5. Completa el formulario de la denuncia: Fecha de la pérdida, hora aproximada, lugar (departamento, provincia, distrito).
6. Selecciona en la lista los documentos específicos que perdiste.
7. Revisa la vista previa de tu denuncia.
8. Confirma y envía. El sistema generará el **Certificado de Denuncia Policial Digital** en PDF, que tiene pleno valor legal porque cuenta con firma digital y código QR.

### Costo
Este trámite es **completamente gratuito**. A diferencia del parte policial tradicional, la denuncia digital por pérdida de documentos no tiene costo.
');
INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content)
VALUES (22, 'Denuncia por pérdida', '# Entidad: PNP
## Trámite: Denuncia policial por pérdida de documentos

Si extraviaste tu DNI, brevete, pasaporte, SOAT, tarjetas de crédito, fotocheck, carné universitario u otros documentos, ahora puedes hacer la denuncia policial de forma 100% virtual, sin ir a una comisaría.

### Requisitos
- Tu número de DNI peruano.
- Ser mayor de edad.
- Conocer exactamente qué documentos perdiste y bajo qué circunstancias.

### Modalidad: Online
1. Ingresa a la plataforma "Denuncia Policial Digital" de la PNP (sistemas.policia.gob.pe/denuncias_digitales/).
2. Acepta los términos de uso.
3. Ingresa tus datos personales: DNI, nombres, apellidos, y nombre de tus padres (para validar tu identidad contra RENIEC).
4. Ingresa un correo electrónico y un celular.
5. Completa el formulario de la denuncia: Fecha de la pérdida, hora aproximada, lugar (departamento, provincia, distrito).
6. Selecciona en la lista los documentos específicos que perdiste.
7. Revisa la vista previa de tu denuncia.
8. Confirma y envía. El sistema generará el **Certificado de Denuncia Policial Digital** en PDF, que tiene pleno valor legal porque cuenta con firma digital y código QR.

### Costo
Este trámite es **completamente gratuito**. A diferencia del parte policial tradicional, la denuncia digital por pérdida de documentos no tiene costo.
');

COMMIT;
