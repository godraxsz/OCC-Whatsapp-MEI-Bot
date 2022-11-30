const mysql = require('mysql2/promise');

const createConnection = async () => {
	return await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '1599',
		database: 'occ_mei'
	});
}

const getStatus = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT status FROM status WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const getConsultoria = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT consultoria FROM status WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].consultoria;
	return false;
}

const setConsultoria = async (consultoria, msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET consultoria = ? WHERE usuario = ?', [consultoria, msgFrom]);
	if (rows.length > 0) return rows[0].consultoria;
	return false;
}

const getPlano = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT plano FROM status WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].plano;
	return false;
}

const getCnpj = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT cnpj FROM status WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].cnpj;
	return false;
}

const getEmpresa = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT empresa FROM status WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].empresa;
	return false;
}

const getSituacao = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT situacao FROM status WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].situacao;
	return false;
}

const getMunicipio = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT municipio FROM status WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].municipio;
	return false;
}

const getNome = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT nome FROM status WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].nome;
	return false;
}

const getStatusBot = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT status FROM bot WHERE id = 1');
	if (rows.length > 0) return rows[0].status;
	return false;
}

const getFilaBot = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT fila FROM bot WHERE id = 1');
	if (rows.length > 0) return rows[0].fila;
	return false;
}

const setPlanoBronze = async (msgFrom) => {
	const connection = await createConnection();
	await connection.execute('UPDATE status SET plano = "Bronze" WHERE usuario = ?', [msgFrom]);
	await connection.execute('UPDATE status SET consultoria = "1" WHERE usuario = ?', [msgFrom]);
}

const setPlanoPrata = async (msgFrom) => {
	const connection = await createConnection();
	await connection.execute('UPDATE status SET plano = "Prata" WHERE usuario = ?', [msgFrom]);
	await connection.execute('UPDATE status SET consultoria = "3" WHERE usuario = ?', [msgFrom]);
}

const setPlanoOuro = async (msgFrom) => {
	const connection = await createConnection();
	await connection.execute('UPDATE status SET plano = "Ouro" WHERE usuario = ?', [msgFrom]);
	await connection.execute('UPDATE status SET consultoria = "5" WHERE usuario = ?', [msgFrom]);
}

const setPlanoRemover = async (msgFrom) => {
	const connection = await createConnection();
	await connection.execute('UPDATE status SET plano = "não-cadastrado" WHERE usuario = ?', [msgFrom]);
	await connection.execute('UPDATE status SET consultoria = "não-cadastrado" WHERE usuario = ?', [msgFrom]);
}

const setStatusDuty = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "duty" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusSendoAtendido = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "sendoatendido" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusAtendimento = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "atendimento" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusConfirmarConsultoria = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "consultoria" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusEtapa00 = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "etapa00" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusEtapa01 = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "etapa01" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusEtapa02 = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "etapa02" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusEtapa03 = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "etapa03" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusFaturamento2 = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "faturamento2" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusFaturamento3 = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "faturamento3" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusFaturamento4 = async (mes, msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = ? WHERE usuario = ?', [mes, msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusOn = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "on" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusOff = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "off" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setStatusFilaAtendimento = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET status = "filaatendimento" WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const setCnpj = async (valorCnpj, msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET cnpj = ? WHERE usuario = ?', [valorCnpj, msgFrom]);
	if (rows.length > 0) return rows[0].cnpj;
	return false;
}

const setRazaoSocial = async (valorRazaoSocial, msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET empresa = ? WHERE usuario = ?', [valorRazaoSocial, msgFrom]);
	if (rows.length > 0) return rows[0].empresa;
	return false;
}

const setNome = async (valorNome, msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET nome = ? WHERE usuario = ?', [valorNome, msgFrom]);
	if (rows.length > 0) return rows[0].nome;
	return false;
}

const setSituacao = async (valorSituacao, msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET situacao = ? WHERE usuario = ?', [valorSituacao, msgFrom]);
	if (rows.length > 0) return rows[0].situacao;
	return false;
}

const setMunicipio = async (valorMunicipio, msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE status SET municipio = ? WHERE usuario = ?', [valorMunicipio, msgFrom]);
	if (rows.length > 0) return rows[0].municipio;
	return false;
}

const setStatusBot = async (valorStatusBot) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE bot SET status = ? WHERE id = 1', [valorStatusBot]);
	if (rows.length > 0) return rows[0].status;
	return false;
}

const getUser = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT usuario FROM status WHERE usuario = ?', [msgFrom]);
	if (rows.length > 0) return true;
	return false;
}

const setUser = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('INSERT INTO `status` (`id`, `status`, `usuario`, `nome`, `plano`, `consultoria`, `cnpj`, `empresa`, `situacao`, `municipio`) VALUES (NULL, "etapa00", ?, "não-cadastrado", "não-cadastrado", "não-cadastrado", "não-cadastrado", "não-cadastrado", "não-cadastrado", "não-cadastrado")', [msgFrom]);
	if (rows.length > 0) return rows[0].usuario;
	return false;
}

const setUserComando = async (msgFrom, nome) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('INSERT INTO `status` (`id`, `status`, `usuario`, `nome`, `plano`, `consultoria`, `cnpj`, `empresa`, `situacao`, `municipio`) VALUES (NULL, "on", ?, ?, "não-cadastrado", "não-cadastrado", "não-cadastrado", "não-cadastrado", "não-cadastrado", "não-cadastrado")', [msgFrom, nome]);
	if (rows.length > 0) return rows[0].usuario;
	return false;
}

const getReply = async (keyword) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT resposta FROM chatbot WHERE pergunta = ?', [keyword]);
	if (rows.length > 0) return rows[0].resposta;
	return false;
}

const resetStatus = async () => {
	const connection = await createConnection();
	await connection.execute('UPDATE status SET status = "on" WHERE status = "off"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "faturamento2"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "faturamento3"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "janeiro"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "fevereiro"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "marco"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "abril"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "maio"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "junho"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "julho"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "agosto"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "setembro"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "outubro"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "novembro"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "dezembro"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "atendimento"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "consultoria"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "filaatendimento"');
	await connection.execute('UPDATE status SET status = "on" WHERE status = "sendoatendido"');
}

const resetStatusCadastro = async () => {
	const connection = await createConnection();
	await connection.execute('UPDATE status SET status = "recuperacao01" WHERE status = "etapa00"');
	await connection.execute('UPDATE status SET status = "recuperacao01" WHERE status = "etapa01"');
}

const resetStatusMei = async () => {
	const connection = await createConnection();
	await connection.execute('UPDATE status SET status = "recuperacao02" WHERE status = "etapa02"');
	await connection.execute('UPDATE status SET status = "recuperacao02" WHERE status = "etapa03"');
}

module.exports = {
	createConnection,
	setUser,
	getUser,
	getReply,
	getStatus,
	setStatusOn,
	setStatusOff,
	resetStatus,
	setCnpj,
	setStatusFaturamento2,
	setStatusFaturamento3,
	setStatusFaturamento4,
	setRazaoSocial,
	setSituacao,
	setMunicipio,
	setStatusBot,
	getStatusBot,
	setNome,
	getNome,
	setStatusEtapa00,
	setStatusEtapa01,
	setStatusEtapa02,
	setStatusEtapa03,
	setStatusDuty,
	getFilaBot,
	resetStatusCadastro,
	resetStatusMei,
	getConsultoria,
	setStatusAtendimento,
	getPlano,
	setStatusConfirmarConsultoria,
	setStatusSendoAtendido,
	setPlanoBronze,
	setPlanoPrata,
	setPlanoOuro,
	setConsultoria,
	setStatusFilaAtendimento,
	setUserComando,
	getCnpj,
	getEmpresa,
	getSituacao,
	getMunicipio,
	setPlanoRemover
}