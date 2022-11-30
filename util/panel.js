// a = qr b = io c = qrcode
function painelQRCODE(a, b, c) {
    c.toDataURL(a, (err, url) => {
        b.emit('qr', './panel/icons/qrcode.gif');
        setTimeout(() => b.emit('qr', url), 2000);
        b.emit('message', `🔎 [QRCODE] Recebido`);
    });
};

//a = statusSession b = io
function painelStatus(a, b) {
    switch (a) {
        case 'inChat':
            b.emit('qr', './panel/icons/carregado.gif')
            setTimeout(() => b.emit('qr', './panel/icons/jacarregado.png'), 2000);
            b.emit('message', `✅ [STATUS] Logado`);
            break;
        case 'isLogged':
            //console.log('isLogged');
            b.emit('qr', './panel/icons/carregado.gif')
            setTimeout(() => b.emit('qr', './panel/icons/jacarregado.png'), 2000);
            b.emit('message', `✅ [STATUS] Logado`);
            break;
        case 'notLogged':
            //console.log('notLogged');
            b.emit('message', `❎ [STATUS] Deslogado`);
            b.emit('qr', './panel/icons/carregando.gif');
            b.emit('message', `🌐 [WWEB] Aguardando QR Code`);
            break;
        case 'browserClose':
            //console.log('browserClose');
            b.emit('qr', './panel/icons/atencao.gif')
            b.emit('message', `❎ [STATUS] Navegador Fechado`);
            break;
        case 'qrReadSuccess':
            //console.log('qrReadSuccess');
            b.emit('qr', './panel/icons/qrcode.gif');
            setTimeout(() => b.emit('qr', './panel/icons/lendo_qrcode.gif'), 2000);
            setTimeout(() => b.emit('qr', './panel/icons/carregado.gif'), 4000);
            setTimeout(() => b.emit('qr', './panel/icons/jacarregado.png'), 6000);
            b.emit('message', `✅ [STATUS] QR Code Lido`);
            b.emit('message', `✅ [STATUS] Logado`);
            break;
        case 'qrReadFail':
            //console.log('qrReadFail');
            b.emit('message', `❎ [STATUS] QR Code Falhou`);
            break;
        case 'autocloseCalled':
            //console.log('autocloseCalled');
            b.emit('message', `❎ [STATUS] Auto Close (config)`);
            break;
        case 'desconnectedMobile':
            //console.log('desconnectedMobile');
            b.emit('message', `❎ [STATUS] Aparelho Desconectado`);
            break;
        case 'deleteToken':
            //console.log('deleteToken');
            b.emit('message', `❎ [STATUS] Token Deletado`);
            break;
    }
}

// a = state b = io
function painelState(a, b) {
    switch (a) {
        case 'CONFLICT':
            //console.log('CONFLICT');
            b.emit('qr', './panel/icons/atencao.gif');
            b.emit('message', `🌐 [WWEB] Conflito (Duplicado)`);
            break;
        case 'CONNECTED':
            //console.log('CONNECTED');
            b.emit('qr', './panel/icons/carregado.gif')
            setTimeout(() => b.emit('qr', './panel/icons/jacarregado.png'), 2000);
            b.emit('message', `🌐 [WWEB] Conectado`);
            break;
        case 'DEPRECATED_VERSION':
            //console.log('DEPRECATED_VERSION');
            b.emit('qr', './panel/icons/atencao.gif')
            b.emit('message', `🌐 [WWEB] Desatualizado`);
            break;
        case 'OPENING':
            //console.log('OPENING');
            b.emit('qr', './panel/icons/carregando.gif')
            b.emit('message', `🌐 [WWEB] Carregando`);
            break;
        case 'PAIRING':
            //console.log('PAIRING');
            b.emit('qr', './panel/icons/logando.gif')
            b.emit('message', `🌐 [WWEB] Conectando`);
            break;
        case 'PROXYBLOCK':
            //console.log('PROXYBLOCK');
            b.emit('qr', './panel/icons/problema_conexao.gif')
            b.emit('message', `🌐 [WWEB] Bloqueado pelo Proxy`);
            break;
        case 'SMB_TOS_BLOCK':
            //console.log('SMB_TOS_BLOCK');
            b.emit('qr', './panel/icons/atencao.gif')
            b.emit('message', `🌐 [WWEB] Página Bloqueada`);
            break;
        case 'TIMEOUT':
            //console.log('TIMEOUT');
            b.emit('qr', './panel/icons/atencao.gif')
            b.emit('message', `🌐 [WWEB] Tempo Esgotado`);
            break;
        case 'TOS_BLOCK':
            //console.log('TOS_BLOCK');
            b.emit('qr', './panel/icons/atencao.gif')
            b.emit('message', `🌐 [WWEB] Página Bloqueada`);
            break;
        case 'UNLAUNCHED':
            //console.log('UNLAUNCHED');
            b.emit('message', `🌐 [WWEB] Não-Inicializado`);
            break;
        case 'UNPAIRED':
            //console.log('UNPAIRED');
            b.emit('message', `🌐 [WWEB] Aguardando QR Code`);
            break;
        case 'UNPAIRED_IDLE':
            //console.log('UNPAIRED_IDLE');
            b.emit('qr', './panel/icons/atencao.gif')
            b.emit('message', `🌐 [WWEB] QR Code Esgotado`);
            break;
    }
}

// a = state b = io
function painelStream(a, b) {
    switch (a) {
        case 'CONNECTED':
            //console.log('CONNECTED');
            b.emit('qr', './panel/icons/jacarregado.png')
            b.emit('message', `📶 [CONEXÃO] Conectado`);
            break;
        case 'DISCONNECTED':
            //console.log('DISCONNECTED');
            b.emit('message', `📶 [CONEXÃO] Desconectado`);
            break;
        case 'RESUMING':
            b.emit('qr', './panel/icons/logando.gif')
            b.emit('message', `📶 [CONEXÃO] Resumindo`);
            break;
        case 'SYNCING':
            //console.log('SYNCING');
            b.emit('qr', './panel/icons/sincronizando.gif')
            b.emit('message', `📶 [CONEXÃO] Sincronizando`);
            break;
    }
}


module.exports = {
    painelQRCODE,
    painelStatus,
    painelState,
    painelStream
}