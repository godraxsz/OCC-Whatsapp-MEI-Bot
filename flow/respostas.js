const { chmod } = require('fs');
const { percentage, delay, fila } = require('../util/util');
const { perguntasMei, botaoAtendimento, chatAtendente } = require('./perguntas');

function repetirAtendimento(a, b) {
    perguntasMei('*» ᴀᴛᴇɴᴅɪᴍᴇɴᴛᴏ ᴄᴏᴍ ᴀꜱꜱɪꜱᴛᴇɴᴛᴇ ᴠɪʀᴛᴜᴀʟ*', b, a.from).then(() => setTimeout(() => chatAtendente(a.from, b), 1500));
}

function mensagemForaExpediente(a, b, c) {
    b.sendText(a.from, `Olá *${c}*, Infelizmente não temos atendentes no momento 🥲`)
        .then(() => setTimeout(() => b.sendText(a.from, '*🕗 𝐀𝐓𝐄𝐍𝐃𝐈𝐌𝐄𝐍𝐓𝐎*\n\n```Domingo   ꜰᴇᴄʜᴀᴅᴀ\nSegunda   08:00h - 18:00h\nTerça     08:00h - 18:00h\nQuarta    08:00h - 18:00h\nQuinta    08:00h - 18:00h\nSexta     08:00h - 18:00h\nSábado    ꜰᴇᴄʜᴀᴅᴀ\n\nAlmoço    12:00h - 13:20h```')
            .then(() => setTimeout(() => perguntasMei('*Mas não se preocupe!*\n\nVocê ainda pode utilizar nosso *𝐀𝐔𝐓𝐎𝐀𝐓𝐄𝐍𝐃𝐈𝐌𝐄𝐍𝐓𝐎 𝐌𝐄𝐈* pressionando o *botão* abaixo 🤩', b, a.from)
                .then(() => setTimeout(() => b.sendText(a.from, 'Sempre que desejar ser atendido(a), escreva *"Atendimento"* 🤗'), 1500)), 1500)), 1500))
}

function mensagemExpediente(a, b, c) {
    const saudacaoes = [`*🌠  𝐀𝐔𝐓𝐎𝐀𝐓𝐄𝐍𝐃𝐈𝐌𝐄𝐍𝐓𝐎 𝐌𝐄𝐈*\n\nOlá *${c}*, tudo bem? Seja bem-vindo! 😊`, `*🌠  𝐀𝐔𝐓𝐎𝐀𝐓𝐄𝐍𝐃𝐈𝐌𝐄𝐍𝐓𝐎 𝐌𝐄𝐈*\n\nQue bom te ver novamente, *${c}*! 😆`, `*🌠  𝐀𝐔𝐓𝐎𝐀𝐓𝐄𝐍𝐃𝐈𝐌𝐄𝐍𝐓𝐎 𝐌𝐄𝐈*\n\nFico feliz em te ver por aqui *${c}* 🥳\n\n_Se a dúvida for recorrente, entre em contato com um *Atendente*._`];
    const saudacao = saudacaoes[Math.floor(Math.random() * saudacaoes.length)];
    b.sendText(a.from, saudacao)
        .then(() => setTimeout(() => perguntasMei('Pressione o *botão* abaixo para *retirar dúvidas* com nosso *Assistente Virtual*', b, a.from)
            .then(() => setTimeout(() => botaoAtendimento(b, a.from)
                .then(() => setTimeout(() => b.sendText(a.from, 'Sempre que desejar ser atendido(a), escreva *"Atendimento"* 🤗'), 1500)), 1500)), 1500))
}

function perguntarNome(a, b, c) {
    b.sendText(a.from, `Olá, tudo bem?\nVejo que essa é a *primeira vez* que nos falamos, então deixa eu me apresentar... 😊`)
        .then(() => b.sendText(a.from, 'Sou o *Assistente Virtual* da *OCC*, responsável pelo *atendimento automatizado* de *consultoria* do *Micro Empreendedor Individual (MEI)*.\nPosso *tirar* algumas das suas *dúvidas* sobre o *MEI* caso você queira se tornar um empreendedor ou caso já seja e queira saber mais sobre!\n\nAlém disso, disponibilizamos *atendimento com nossos colaboradores* para que não haja nenhuma dúvida!\n\nInteressante, não é mesmo? 👀')
            .then(() => b.sendText(a.from, '*Antes de tudo, gostaria de saber: Qual o seu nome? 😁*')
                .then(async () => await c)
            )
        )
}

function perguntarNomeRecuperacao(a, b, c) {
    b.sendText(a.from, `Olá novamente!\n\nPor algum motivo *não finalizamos* nosso cadastro da última vez 🙃\n`)
        .then(() => b.sendText(a.from, 'Dessa vez vamos conseguir!')
            .then(() => b.sendText(a.from, '*Qual o seu nome? 😁*')
                .then(async () => await c)
            )
        )
}

function corrigirNome(a, b, c) {
    b.sendText(a.from, `Certo, vamos corrigir então...`)
        .then(() => b.sendText(a.from, '*Qual o seu nome? 😁*'))
}

function nomeNaoConfirmado(a, b) {
    b.sendText(a.from, `Por gentileza, confirme se esse é ou não o seu nome utilizando os *botões*.`)
}

function mesNaoInformado(a, b) {
    b.sendText(a.from, `Por gentileza, informe o mês que você formalizou o MEI utilizando o *botão*.\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*`)
}

function formalizacaoNaoConfirmado(a, b) {
    b.sendText(a.from, `Por gentileza, informe se você formalizou o MEI este ano ou se formalizou em outro ano utilizando os *botões*.\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*`);
}

function meiNaoConfirmado(a, b) {
    b.sendText(a.from, `Por gentileza, informe se você possui ou não um MEI utilizando os *botões*.`)
}

function nomeInvalido(a, b) {
    b.sendText(a.from, `Ops...\nEste nome parece ser inválido 🥲`)
        .then(() => b.sendText(a.from, 'Verifique e tente novamente.'))
}

function primeiraVez(a, b, c) {
    b.sendText(a.from, `Tudo certo então *${c}*!\n\nAlém disso, eu preciso te perguntar: *Você já possui um MEI? 🤔*`, {
        useTemplateButtons: false,
        buttons: [{ id: 'primeira_vez_mei_sim', text: 'Sim, eu já tenho MEI' }, { id: 'primeira_vez_mei_nao', text: 'Não, eu ainda não tenho MEI' }]
    })
}

function perguntarMeiRecuperacao(a, b, c) {
    b.sendText(a.from, `Olá novamente!\n\nPor algum motivo *não finalizamos* nosso cadastro da última vez 🙃\n`).then(() => b.sendText(a.from, 'Dessa vez vamos conseguir!')
        .then(() => b.sendText(a.from, '*Você já possui um MEI? 🤔*', {
            useTemplateButtons: false,
            buttons: [{ id: 'primeira_vez_mei_sim', text: 'Sim, eu já tenho MEI' }, { id: 'primeira_vez_mei_nao', text: 'Não, eu ainda não tenho MEI' }]
        })
            .then(async () => await c)
        )
    )
}

function confirmarNome(a, b, c) {
    b.sendText(a.from, `Apenas para confirmar:\nSeu nome é *${c}*?`, {
        useTemplateButtons: false,
        buttons: [{ id: 'confirmar_nome_sim', text: 'Sim, esse é meu nome' }, { id: 'confirmar_nome_nao', text: 'Não, esse não é meu nome' }]
    })

}

function corrigirCadastro(a, b) {
    b.sendText(a.from, `Ok! Comando cancelado 😉`)
        .then(() => b.sendText(a.from, 'Me informe novamente: *Você já possui um MEI? 🤔*', {
            useTemplateButtons: false,
            buttons: [{ id: 'primeira_vez_mei_sim', text: 'Sim, eu já tenho MEI' }, { id: 'primeira_vez_mei_nao', text: 'Não, eu ainda não tenho MEI' }]
        }))
}

function cnpjSim(a, b) {
    b.sendText(a.from, `Então você já é um empreendedor? 😎`)
        .then(() => b.sendText(a.from, 'Me informe por gentileza o *número do CNPJ*\n\n*Modelo:*\n_XX.XXX.XXX/XXXX-XX_\n\n𝐶𝑎𝑠𝑜 𝑛𝑎𝑜 𝑡𝑒𝑛ℎ𝑎 𝐶𝑁𝑃𝐽 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑐𝑎𝑛𝑐𝑒𝑙𝑎𝑟"*')
        )
}

function cnpjIncorreto(a, b) {
    b.sendText(a.from, `Ops...\nEste CNPJ parece estar incorreto 🥲`)
        .then(() => b.sendText(a.from, 'Verifique e tente novamente.')
        )
}

function resposta01(a, b) {
    b.sendText(a.from, '*📋 𝐑𝐄𝐐𝐔𝐈𝐒𝐈𝐓𝐎𝐒 𝐏𝐀𝐑𝐀 𝐒𝐄𝐑 𝐌𝐄𝐈*\n\n1️⃣ *»* Ter 18 (dezoito) anos completos ou 16 (dezesseis) anos com *emancipação*;\n\n2️⃣ *»* Exercer uma das *atividades econômicas (CNAE)* aceitas no MEI;\n\n3️⃣ *»* Faturar, vender ou receber no máximo, *R$ 81.000,00 bruto* por ano (média R$ 6.750,00 mensal);\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_emancipacao', text: '1️⃣ O que é Emancipação?' }, { id: 'info_atividades_permitidas', text: '2️⃣ Atividades Permitidas' }, { id: 'info_bruto', text: '3️⃣ Faturamento e Valor Bruto' }]
    })
        .then(() => b.sendText(a.from, '*📋 𝐑𝐄𝐐𝐔𝐈𝐒𝐈𝐓𝐎𝐒 𝐏𝐀𝐑𝐀 𝐒𝐄𝐑 𝐌𝐄𝐈*\n\n4️⃣ *»* Limite de *01 (um) funcionário*.\n\n5️⃣ *»* Possuir um único estabelecimento;\n\n6️⃣ *»* *Não* participar como *sócio, administrador ou títular* de outra empresa. Para isso, é necessário outro tipo de *Natureza Jurídica*\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)', {
            useTemplateButtons: false,
            buttons: [{ id: 'info_funcionario', text: '4️⃣ Condições Funcionários' }, { id: 'info_filial', text: '5️⃣ Posso ter Filial no MEI?' }, { id: 'info_natureza_juridica', text: '6️⃣ Natureza Jurídica' }]
        })
            .then(() => repetirAtendimento(a, b))
        )
}

function resposta02(a, b) {
    b.sendText(a.from, '*🛠 𝐀𝐓𝐈𝐕𝐈𝐃𝐀𝐃𝐄𝐒 (𝐂𝐍𝐀𝐄) 𝐏𝐄𝐑𝐌𝐈𝐓𝐈𝐃𝐀𝐒 𝐍𝐎 𝐌𝐄𝐈*\n\nO MEI pode ter *até 16 (dezesseis) atividades* diferentes cadastradas em seu CNPJ MEI, sendo *uma* como *atividade principal* e outras *15* atividades *secundárias*, ou seja, atividades que poderão ser realizadas completando a atividade fim.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)')
        .then(() => b.sendText(a.from, '*🛠 𝐀𝐓𝐈𝐕𝐈𝐃𝐀𝐃𝐄𝐒 (𝐂𝐍𝐀𝐄) 𝐏𝐄𝐑𝐌𝐈𝐓𝐈𝐃𝐀𝐒 𝐍𝐎 𝐌𝐄𝐈*\n\n*ATENÇÃO*:\nCaso sua atividade *não esteja na lista* permitida, você *não pode ser MEI*.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)')
            .then(() => b.sendText(a.from, '*🌐 𝔸𝕔𝕖𝕤𝕤𝕒𝕣 𝕝𝕚𝕤𝕥𝕒 𝕕𝕖 𝕒𝕥𝕚𝕧𝕚𝕕𝕒𝕕𝕖𝕤 𝕡𝕖𝕣𝕞𝕚𝕥𝕚𝕕𝕒𝕤* (𝔾𝕆𝕍.𝔹ℝ)\n\nhttps://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei/atividades-permitidas/')
                .then(() => repetirAtendimento(a, b))
            )
        )
}

function resposta03(a, b) {
    b.sendText(a.from, '*⭐️ 𝐕𝐀𝐍𝐓𝐀𝐆𝐄𝐍𝐒 𝐃𝐄 𝐒𝐄𝐑 𝐌𝐄𝐈*\n\n1️⃣ *»* Abertura *rápida* e *online*;\n\n2️⃣ *»* *Isenção* de taxas, dispensas de alvará, licenças sanitária, ambiental e bombeiros;\n\n3️⃣ *»* Direito ao *CNPJ*;\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟛)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_abertura_mei', text: '1️⃣ Como abrir o MEI?' }, { id: 'info_isencoes_dispensas', text: '2️⃣ Isenções e Dispensas' }, { id: 'info_cnpj_ccmei', text: '3️⃣ CNPJ e CCMEI' }]
    })
        .then(() => b.sendText(a.from, '*⭐️ 𝐕𝐀𝐍𝐓𝐀𝐆𝐄𝐍𝐒 𝐃𝐄 𝐒𝐄𝐑 𝐌𝐄𝐈*\n\n4️⃣ *»* *Vendas* e *prestação de serviços* utilizando cartões, boletos e conta corrente *PJ* _(Pessoa Jurídica)_;\n\n5️⃣ *»* Emissão de *nota fiscal*;\n\n6️⃣ *»* Possibilidade de *vendas* e *prestação de serviço* para *órgãos públicos* _(licitações)_;\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟛)', {
            useTemplateButtons: false,
            buttons: [{ id: 'info_juridica_fisica', text: '4️⃣ Diferenças PJ e PF' }, { id: 'info_nota_fiscal', text: '5️⃣ Notas Fiscais' }, { id: 'info_licitacoes', text: '6️⃣ Licitações' }]
        })
            .then(() => b.sendText(a.from, '*⭐️ 𝐕𝐀𝐍𝐓𝐀𝐆𝐄𝐍𝐒 𝐃𝐄 𝐒𝐄𝐑 𝐌𝐄𝐈*\n\n7️⃣ *»* Pagamento unificado e simplificado de impostos _(DAS)_;\n\n8️⃣ *»* Cobertura previdenciária - *INSS* _(Conforme tempo mínimo de contribuições)_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟛)', {
                useTemplateButtons: false,
                buttons: [{ id: 'info_emitir_das', text: '7️⃣ Como emitir o DAS?' }, { id: 'info_beneficios_inss', text: '8️⃣ Benefícios INSS' }]
            })
                .then(() => repetirAtendimento(a, b))
            )
        )
}

function resposta04(a, b) {
    b.sendText(a.from, '*⌛ 𝐁𝐄𝐍𝐄𝐅Í𝐂𝐈𝐎𝐒 𝐈𝐍𝐒𝐒 & 𝐓𝐄𝐌𝐏𝐎 𝐃𝐄 𝐂𝐎𝐍𝐓𝐑𝐈𝐁𝐔𝐈ÇÃ𝐎*\n\n*Perda de Benefícios:*\nCaso esteja recebendo algum benefício previdenciário (INSS), como o auxílio-doença, seguro desemprego, entre outros, *cuidado!* A formalização do MEI poderá *cancelar o benefício*.\n\n*Obtenção dos Benefícios:*\nSendo um MEI você pode obter os benefícios do INSS caso venha a precisar, desde que possua contribuição necessária para cada tipo.\n\nA contribuição se baseia em número mínimo de guias mensais pagas.\n\n(1 guia = 1 mês de contribuição)\n\n*IMPORTANTE:*\nEntre os pagamentos, não pode haver atrasos ou débitos, pois isso impede a obtenção do benefício.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟛)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_emitir_das', text: '1️⃣ Como emitir o DAS?' }]
    })
        .then(() => b.sendText(a.from, '*⌛ 𝐁𝐄𝐍𝐄𝐅Í𝐂𝐈𝐎𝐒 𝐈𝐍𝐒𝐒 & 𝐓𝐄𝐌𝐏𝐎 𝐃𝐄 𝐂𝐎𝐍𝐓𝐑𝐈𝐁𝐔𝐈ÇÃ𝐎*\n\n*Contribuição necessária por tipo de benefício:*\n\n*ᴘᴀʀᴀ ᴏ ᴇᴍᴘʀᴇᴇɴᴅᴇᴅᴏʀ:*\n*» Auxílio Maternidade*\n_10 meses de contribuição_\n*» Auxílio Doença*\n_12 meses de contribuição_\n*» Aposentadoria por Invalidez*\n_12 meses de contribuição_\n*» Aposentadoria por Idade*\n_180 meses de contribuição para *mulheres*_\n*ou*\n_240 meses de contribuição para *homens*_\n\n*ᴘᴀʀᴀ ᴏ ᴅᴇᴘᴇɴᴅᴇɴᴛᴇ:*\n*» Auxílio Reclusão*\n_24 meses de contribuição_\n*» Pensão por Morte*\n_Têm duração variável, conforme a idade e o tipo do beneficiário *(consultar diretamente no INSS)*_\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟛)')
            .then(() => b.sendText(a.from, '*⌛ 𝐁𝐄𝐍𝐄𝐅Í𝐂𝐈𝐎𝐒 𝐈𝐍𝐒𝐒 & 𝐓𝐄𝐌𝐏𝐎 𝐃𝐄 𝐂𝐎𝐍𝐓𝐑𝐈𝐁𝐔𝐈ÇÃ𝐎*\n\n*ATENÇÃO:*\nO valor do benefício é *01 (um) salário mínimo* mensal.\n\nAo optar pela aposentadoria por tempo de contribuição, verificar junto à Previdência Social como *complementar* e/ou aproveitar as *contribuições anteriores* _(como exemplo as contribuições registradas na carteira de trabalho)_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟛)')
                .then(() => repetirAtendimento(a, b))
            )
        )
}

function resposta05(a, b) {
    b.sendText(a.from, '*🛂 𝐃𝐈𝐒𝐏𝐄𝐍𝐒𝐀 𝐃𝐄 𝐀𝐋𝐕𝐀𝐑Á𝐒 𝐄 𝐋𝐈𝐂𝐄𝐍Ç𝐀𝐒*\n\nDe acordo com a *Legislação Federal*, o MEI que *não* for *estabelecido*, ou seja: Aqueles que *não possuem* uma sala, loja, depósito, entre outros, é *dispensado* da necessidade de ter *alvarás/licenças*.\n\n*IMPORTANTE:*\nSe o MEI for um *prestador de serviços* ou irá *vender* seu produto *"porta em porta"* ou pela *internet*, por exemplo, é *dispensado* de cumprimento de *normas e leis* para a sede da empresa, pois o *endereço* será *somente* para *correspondência*.\n\nMesmo assim, *alguns municípios* ainda não adequaram sua legislação e *ainda exigem*.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟛)')
        .then(() => b.sendText(a.from, '*🛂 𝐃𝐈𝐒𝐏𝐄𝐍𝐒𝐀 𝐃𝐄 𝐀𝐋𝐕𝐀𝐑Á𝐒 𝐄 𝐋𝐈𝐂𝐄𝐍Ç𝐀𝐒*\n\nPara aqueles que forem *estabelecidos*, é importante *verificar na prefeitura* de seu município os seguintes itens:\n\n*1️⃣ » Viabilidade de Instalação (Zoneamento)*\n- Importante saber se naquele local é permitida determinada atividade.\n\n*2️⃣ » Alvará dos bombeiros e vigilância sanitária*\n- Dependendo da atividade, não será de competência sanitária, ambiental ou bombeiros, mas é *importante* a *consulta* das *normas e legislações vigentes*.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟛)')
            .then(() => b.sendText(a.from, '*🛂 𝐃𝐈𝐒𝐏𝐄𝐍𝐒𝐀 𝐃𝐄 𝐀𝐋𝐕𝐀𝐑Á𝐒 𝐄 𝐋𝐈𝐂𝐄𝐍Ç𝐀𝐒*\n\n*ATENÇÃO:*\nEstar *dispensado* de ter os alvarás *não significa* que *não* se deve cumprir as regras da vigilância sanitária, dos bombeiros, entre outros.\n\nÉ recomendado que mesmo tendo os alvarás, ter um *termo de ciência e responsabilidade* com efeito de dispensa de alvará e licença de funcionamento. Você pode *obter um modelo* deste termo pressionando o *botão* abaixo.\n\nRecomenda-se também que o MEI imprima o *CCMEI*, que constará a dispensa de alvará, e manter em local visível em sua empresa.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟛)', {
                useTemplateButtons: false,
                buttons: [{ id: 'info_modelo_termo_ciencia_responsabilidade', text: '📝 Modelo de Termo' }, { id: 'info_cnpj_ccmei', text: '📜 CNPJ e CCMEI' }]
            })
                .then(() => repetirAtendimento(a, b))
            )
        )
}

function resposta06(a, b) {
    b.sendText(a.from, '*✨ 𝐂𝐎𝐌𝐎 𝐅𝐎𝐑𝐌𝐀𝐋𝐈𝐙𝐀𝐑 𝐎 𝐌𝐄𝐈?*\n\nSe você pretende se tornar um Micro Empreendedor Individual _(MEI)_ é importante conhecer as *normas e exigências legais*:\n\n1️⃣ *»* Consultar a prefeitura do seu município para saber se sua atividade pode ser exercida no local escolhido - *Consulta Prévia*;\n\n2️⃣ *»* Consulta da exigência do *Habite-se*, também na prefeitura;\n\n3️⃣ *»* Consulte as exigências dos bombeiros e da vigilância sanitária (Em alguns casos, são *dispensados*).\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟜)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_consulta_previa', text: '1️⃣ Consulta Prévia' }, { id: 'info_habite_se', text: '2️⃣ Habite-se' }, { id: 'info_dispensa_alvara', text: '3️⃣ Dispensa de Alvarás' }]
    })
        .then(() => b.sendText(a.from, '*✨ 𝐂𝐎𝐌𝐎 𝐅𝐎𝐑𝐌𝐀𝐋𝐈𝐙𝐀𝐑 𝐎 𝐌𝐄𝐈?*\n\n*Documentos Necessários*:\n*»* RG;\n*»* CPF;\n*»* Título de eleitor\n*ou*\n*»* Recibo da última declaração do imposto de renda;\n*»* Endereço residencial e comercial onde exercerá sua atividade _(se houver)_;\n*»* Número de celular *ativo* e e-mail;\n*»* Carnê do IPTU _(Imposto Predial e Territorial Urbano)_ _[opcional]_.\n\n*Estrangeiros* precisam informar o seu país de origem e o número de um dos seguintes documentos:\n\n*»* Carteira nacional de registro migratório\n*ou*\n*»* Documento provisório de registro nacional migratório\n*ou*\n*»* Protocolo de solicitação de refúgio.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟜)')
            .then(() => b.sendText(a.from, '*✨ 𝐂𝐎𝐌𝐎 𝐅𝐎𝐑𝐌𝐀𝐋𝐈𝐙𝐀𝐑 𝐎 𝐌𝐄𝐈?*\n\nPara ter ainda mais conhecimento sobre a formalização, recomendamos que leia sobre:\n\n- Requisitos para ser MEI;\n- Atividades (CNAE) permitidas no MEI;\n- Benefícios INSS e Tempo de Contribuição;\n- Servidor Público pode ser MEI?;\n- Quanto o MEI paga por mês?;\n- Notas Fiscais;\n- Desenquadramento do MEI;\n- Dúvidas Frequentes.\n\nTodos esses tópicos podem ser encontrados em nosso *𝐀𝐔𝐓𝐎𝐀𝐓𝐄𝐍𝐃𝐈𝐌𝐄𝐍𝐓𝐎* _(que pode ser acessado pressionando o *botão* com o mesmo nome)_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟜)')
                .then(() => b.sendText(a.from, '*✨ 𝐂𝐎𝐌𝐎 𝐅𝐎𝐑𝐌𝐀𝐋𝐈𝐙𝐀𝐑 𝐎 𝐌𝐄𝐈?*\n\n*IMPORTANTE:*\nA abertura do MEI é feita de forma *gratuita* se *feita pelo* próprio *empreendedor* através do portal oficial da *Receita Federal*. Atentar-se a sites que terceirizam a abertura mediante pagamento.\n\nNós da OCC, como contabilidade, realizamos esse tipo de serviço de *Abertura* _(e demais serviços)_.\n\nTendo interesse, entre em contato com um atendente utilizando o *botão* _*💬 Chat com Atendente*_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟜/𝟜)')
                    .then(() => repetirAtendimento(a, b))
                )
            )
        )
}

function resposta07(a, b) {
    b.sendText(a.from, '*💼 𝐒𝐄𝐑𝐕𝐈𝐃𝐎𝐑 𝐏Ú𝐁𝐋𝐈𝐂𝐎 𝐏𝐎𝐃𝐄 𝐒𝐄𝐑 𝐌𝐄𝐈?*\n\nCaso seja um servidor público, é importante que você *consulte a legislação*, pois alguns servidores *não podem* fazer a abertura do MEI. *Servidores federais* ou *militares* são exemplos que *não podem* constituir o MEI.\n\nPara *servidores estaduais* ou *municipais*: Verificar em seu contrato, no departamento pessoal e em leis vigentes para garantir que não tenha eventuais problemas.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)').then(() => repetirAtendimento(a, b))
}

function resposta08(a, b) {
    b.sendText(a.from, '*💸 𝐐𝐔𝐀𝐍𝐓𝐎 𝐎 𝐌𝐄𝐈 𝐏𝐀𝐆𝐀 𝐏𝐎𝐑 𝐌Ê𝐒?*\n\nO MEI recolhe um valor mínimo mensal, em uma única guia chamada *DAS* _(Documento de arrecadação simplificado)_. Todo ano, os valores são *reajustados*, baseados no *salário mínimo* nacional _(5%)_.\n\nDessa forma, todo mês o MEI deve pagar através do *DAS*:\n\n*R$ 60,60* para a Previdência Social _(INSS)_;\n*+*\n*R$ 5,00* para o imposto municipal _(ISS)_ *CASO* realize *prestação de serviço*;\n*+*\n*R$ 1,00* para o imposto estadual _(ICMS)_ *CASO* realize *atividade de comércio ou transporte*.\n\n*IMPORTANTE:*\nNa situação de realizar ambos _(comércio/transporte + prestação de serviços)_ será cobrado tanto o ISS quanto o ICMS e o INSS juntos.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_emitir_das', text: '📃 Como emitir o DAS?' }]
    })
        .then(() => b.sendImage(a.from, './imgs/info_das_mei.png', 'Valor DAS do MEI 2022', 'Valor DAS do MEI 2022')
            .then(() => repetirAtendimento(a, b))
        )
}

function resposta09(a, b) {
    b.sendText(a.from, '*📃 𝐂𝐎𝐌𝐎 𝐄𝐌𝐈𝐓𝐈𝐑 𝐀 𝐆𝐔𝐈𝐀 𝐃𝐀𝐒?*\n\n1️⃣ *»* Acessar o site do *PGMEI*;\n2️⃣ *»* Informar o CNPJ;\n3️⃣ *»* Emitir Guia de Pagamento _(DAS)_;\n4️⃣ *»* Informar o Ano-Calendário;\n5️⃣ *»* Selecionar a guia desejada;\n6️⃣ *»* Apurar/Gerar DAS;\n7️⃣ *»* Imprimir/Visualizar PDF.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)')
        .then(() => b.sendText(a.from, '*🌐 𝔸𝕔𝕖𝕤𝕤𝕒𝕣 𝕤𝕚𝕥𝕖 𝕕𝕖 𝕖𝕞𝕚𝕤𝕤𝕒𝕠 (ℙ𝔾𝕄𝔼𝕀)*\n\nhttp://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/pgmei.app/Identificacao')
            .then(() => repetirAtendimento(a, b))
        )
}

function resposta10(a, b) {
    b.sendText(a.from, '*📄 𝐃𝐄𝐂𝐋𝐀𝐑𝐀ÇÃ𝐎 𝐀𝐍𝐔𝐀𝐋 𝐃𝐎 𝐌𝐄𝐈*\n\nA declaração contém *tudo* que o Microempreendedor *faturou no ano*.\n\nÉ feita no *início* de cada ano _(se aberto agora, é feita no início do próximo ano)_.\n\n*Não há custo* caso seja feita pelo próprio empreendedor *até o prazo limite* _(Final de maio)_ e desde que não passe o *limite de faturamento*.\n\n*ATENÇÃO:*\nIndependente de ter faturamento ou não, é obrigatório enviar a declaração, mesmo que zerada, para não haver multa.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_limite_faturamento', text: '💹 Limite de Faturamento' }]
    })
        .then(() => b.sendText(a.from, '*📄 𝐃𝐄𝐂𝐋𝐀𝐑𝐀ÇÃ𝐎 𝐀𝐍𝐔𝐀𝐋 𝐃𝐎 𝐌𝐄𝐈*\n\n*IMPORTANTE:*\nRecomenda-se preencher mensalmente o *Relatório de Receitas Brutas* _(disponibilizado pela *Receita Federal*)_ e anexar todas as *notas fiscais* nele.\n\nEsse relatório é de *controle interno* do empreendedor e só será solicitado caso haja fiscalização por parte da Receita Federal.\n\nPara melhor organização, leia também nossas *Dicas de Controle Mensal* pressionando o *botão* com o mesmo nome.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)', {
            useTemplateButtons: false,
            buttons: [{ id: 'modelo_relatorio_receitas_brutas', text: '📝 Modelo do Relatório' }, { id: 'info_nota_fiscal', text: '🧾 Notas Fiscais' }, { id: 'info_dicas_controle_mensal', text: '📌 Dicas Controle Mensal' }]
        })
            .then(() => b.sendText(a.from, '*🌐 𝕄𝕒𝕚𝕤 𝕚𝕟𝕗𝕠𝕣𝕞𝕒𝕔𝕠𝕖𝕤 𝕤𝕠𝕓𝕣𝕖 𝕠 ℝ𝕖𝕝𝕒𝕥𝕠𝕣𝕚𝕠 𝕕𝕖 ℝ𝕖𝕔𝕖𝕚𝕥𝕒𝕤 𝔹𝕣𝕦𝕥𝕒𝕤*\n\nhttps://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/relatorio-mensal')
                .then(() => repetirAtendimento(a, b))
            )
        )
}

function resposta11(a, b) {
    b.sendText(a.from, '*📜 𝐀𝐋𝐓𝐄𝐑𝐀𝐑 𝐎 𝐂𝐀𝐃𝐀𝐒𝐓𝐑𝐎 𝐃𝐎 𝐌𝐄𝐈*\n\nÉ possível fazer *atualizações/alterações* no cadastro do MEI, como: Endereço Comercial, Endereço Residencial, Razão Social, *Atividades (CNAE)*, entre outros.\n\nAlguns processos são mais complexos, como exemplo o de alterar o endereço de um município para outro, já que para isso é necessário a baixa da inscrição municipal do município atual e a criação de uma nova inscrição no novo município.\n\nNós da OCC, como contabilidade, realizamos esse tipo de serviço de *Alteração Cadastral* _(e demais serviços)_.\n\nTendo interesse, entre em contato com um atendente utilizando o *botão* _*💬 Chat com Atendente*_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_atividades_permitidas', text: '🛠 Atividades Permitidas' }]
    })
        .then(() => b.sendText(a.from, '*📜 𝐀𝐋𝐓𝐄𝐑𝐀𝐑 𝐎 𝐂𝐀𝐃𝐀𝐒𝐓𝐑𝐎 𝐃𝐎 𝐌𝐄𝐈*\n\n*IMPORTANTE:*\nÉ interessante imprimir uma nova via do *CCMEI*, do *Cartão CNPJ* e do *Termo de Dispensa de Alvarás* assim que fizer alguma atualização, para manter sempre atualizado com as novas informações.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)', {
            useTemplateButtons: false,
            buttons: [{ id: 'info_cnpj_ccmei', text: '📜 CNPJ e CCMEI' }, { id: 'info_isencoes_dispensas', text: '🛂 Isenções e Dispensas' }]
        })
            .then(() => b.sendText(a.from, '*🌐 𝕄𝕒𝕚𝕤 𝕚𝕟𝕗𝕠𝕣𝕞𝕒𝕔𝕠𝕖𝕤 𝕤𝕠𝕓𝕣𝕖 𝔸𝕝𝕥𝕖𝕣𝕒𝕔𝕠𝕖𝕤 𝕕𝕠 𝕄𝔼𝕀*\n\nhttps://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/atualizacao-cadastral-de-mei')
                .then(() => repetirAtendimento(a, b))
            )
        )
}

function resposta12(a, b) {
    b.sendText(a.from, '*❎ 𝐄𝐍𝐂𝐄𝐑𝐑𝐀𝐌𝐄𝐍𝐓𝐎 (𝐁𝐀𝐈𝐗𝐀) 𝐃𝐎 𝐌𝐄𝐈*\n\nAo encerrar as atividades do MEI, você precisa ficar atento a algumas coisas:\n\n1️⃣ *»* É irreversível, *não* podendo recuperar o CNPJ;\n2️⃣ *»* *Não* cancela os débitos que o MEI possui;\n3️⃣ *»* É *obrigatório* fazer uma *declaração de extinção* com o período desde a abertura até o encerramento;\n4️⃣ *»* Em todo local que foi feito o registro em nome do CNPJ, é recomendado informar que foi feita a baixa do MEI.\n\nNós da OCC, como contabilidade, realizamos esse tipo de serviço de *Encerramento do MEI* _(e demais serviços)_.\n\nTendo interesse, entre em contato com um atendente utilizando o *botão* _*💬 Chat com Atendente*_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)')
        .then(() => repetirAtendimento(a, b))
}

function resposta13(a, b) {
    b.sendText(a.from, '*🧾 𝐍𝐎𝐓𝐀𝐒 𝐅𝐈𝐒𝐂𝐀𝐈𝐒*\n\nSendo MEI, você tem a *opção* de Emissão de Nota Fiscal, porém, somente é obrigatório *caso* o consumidor/cliente for *PJ* _(Pessoa Jurídica/Empresa)_. Caso seja *PF* _(Pessoa Física)_, mesmo *não sendo obrigatório*, pode ser emitida.\n\n*IMPORTANTE:*\nNão há imposto sobre a nota fiscal.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟛)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_juridica_fisica', text: '👥 Diferenças PJ e PF' }]
    })
        .then(() => b.sendText(a.from, '*🧾 𝐍𝐎𝐓𝐀𝐒 𝐅𝐈𝐒𝐂𝐀𝐈𝐒*\n\n*ᴘʀᴇꜱᴛᴀᴄᴀᴏ ᴅᴇ ꜱᴇʀᴠɪᴄᴏꜱ:*\nEmitida de forma eletrônica: Pode ser emitida em qualquer lugar pelo site da *prefeitura do seu município*, é necessário fazer o cadastro de login e senha da *Prefeitura* e seguir as orientações.\n\n*ᴄᴏᴍᴇʀᴄɪᴏ, ᴛʀᴀɴꜱᴘᴏʀᴛᴇ ᴇ ꜰᴀʙʀɪᴄᴀᴄᴀᴏ:*\nEmitida de forma eletrônica: Pode ser emitida em qualquer lugar pelo site da *Secretaria da Fazenda Estadual*, é necessário um *certificado digital* para fazer o login no *estado*. Depois, basta seguir as orientações.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟛)')
            .then(() => b.sendText(a.from, '*🧾 𝐍𝐎𝐓𝐀𝐒 𝐅𝐈𝐒𝐂𝐀𝐈𝐒*\n\nNós da OCC, como contabilidade, realizamos esse tipo de serviço de *Cadastro para Emissão de Nota Fiscal* _(e demais serviços)_. No caso do serviço de *Formalização de MEI*, já é *incluso* esse tipo de cadastro.\n\nTendo interesse, entre em contato com um atendente utilizando o *botão* _*💬 Chat com Atendente*_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟛)')
                .then(() => repetirAtendimento(a, b))
            )
        )
}

function resposta14(a, b) {
    b.sendText(a.from, '*🔁 𝐃𝐄𝐒𝐄𝐍𝐐𝐔𝐀𝐃𝐑𝐀𝐌𝐄𝐍𝐓𝐎 𝐃𝐎 𝐌𝐄𝐈*\n\nEm algumas situações o MEI é *desenquadrado*, ou seja: Ele *deixa de ser* um Micro Empreendedor Individual, mudando sua *Natureza Jurídica*. Não é alterado apenas a nomeclatura, mas a partir do desenquadramento, começa a ter todas as *obrigações* e *direitos* de uma empresa comúm, assim como a alteração na forma de tributação de impostos e taxas.\n\nNa situação em que o próprio empreendedor deveria informar a receita sobre o desenquadramento mas não o fez, o MEI fica sujeito ao *desenquadramento de ofício* e a uma *multa por falta de comunicação*, devendo a comunicação ser efetuada até o ultimo dia do mês subsequente àquele em que ocorrida a situação de vedação.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟜)')
        .then(() => b.sendText(a.from, '*🔁 𝐃𝐄𝐒𝐄𝐍𝐐𝐔𝐀𝐃𝐑𝐀𝐌𝐄𝐍𝐓𝐎 𝐃𝐎 𝐌𝐄𝐈*\n\n*Transições Obrigatórias:*\n\n*1️⃣ » Alteração de Natureza Jurídica*\n- Quando o MEI altera o seu tipo de empresa, como exemplo, se tornar uma sociedade;\n*2️⃣ » Atividade _(CNAE)_ não permitida*\n- Surgindo a necessidade de adicionar ao CNPJ novas atividades, atividades estas que não faz parte da lista de *atividades permitidas*;\n*3️⃣ » Abertura de Filial*\n- Para a criação de uma filial, necessariamente terá que ser feito o desenquadramento;\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟜)', {
            useTemplateButtons: false,
            buttons: [{ id: 'info_natureza_juridica', text: '1️⃣ Natureza Jurídica' }, { id: 'info_atividades_permitidas', text: '2️⃣ Atividades Permitidas' }, { id: 'info_filial', text: '3️⃣ Posso ter Filial no MEI?' }]
        })
            .then(() => b.sendText(a.from, '*🔁 𝐃𝐄𝐒𝐄𝐍𝐐𝐔𝐀𝐃𝐑𝐀𝐌𝐄𝐍𝐓𝐎 𝐃𝐎 𝐌𝐄𝐈*\n\n*Transições Obrigatórias:*\n\n*4️⃣ » Contratação de 2 _(dois)_ ou mais funcionários*\n- O Micro Empreendedor Individual é limitado a quantia de 01 _(um)_ funcionário, por isso, ao contratar 2 _(dois)_ ou mais, terá que ser feita a transição;\n*5️⃣ » Limite de faturamento*\n- O faturamento *máximo* do MEI é *equivalente ao mês de abertura* e caso esse limite seja ultrapassado, será desenquadrado. Pressione o *botão* de *Limite de Faturamento* para mais informações.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟜)', {
                useTemplateButtons: false,
                buttons: [{ id: 'info_funcionario', text: '4️⃣ Condições Funcionários' }, { id: 'info_limite_faturamento', text: '5️⃣ Limite de Faturamento' }]
            })
                .then(() => b.sendText(a.from, '*🔁 𝐃𝐄𝐒𝐄𝐍𝐐𝐔𝐀𝐃𝐑𝐀𝐌𝐄𝐍𝐓𝐎 𝐃𝐎 𝐌𝐄𝐈*\n\nCaso seu MEI se enquadre em alguma dessas situações, onde é necessário fazer o desenquadramento, nós da OCC, como contabilidade, realizamos esse tipo de serviço de *Desenquadramento* _(e demais serviços)_.\n\nTendo interesse, entre em contato com um atendente utilizando o *botão* _*💬 Chat com Atendente*_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟜/𝟜)')
                    .then(() => repetirAtendimento(a, b))
                )
            )
        )
}

function resposta15(a, b) {
    b.sendText(a.from, '*📌 𝐃𝐈𝐂𝐀𝐒 𝐃𝐄 𝐂𝐎𝐍𝐓𝐑𝐎𝐋𝐄 𝐌𝐄𝐍𝐒𝐀𝐋*\n\nPara uma melhor *organização* de sua empresa, como: *Controle de Contas a Pagar, Controle de Contas a Receber, Fornecedores, Relatório de Receita Bruta,* entre outros, é interessante utilizar alguns documentos que facilitam a visualização e armazenamento dessas informações.\n\nSeparamos para você algumas planilhas feitas pelo *Sebrae* _(Serviço Brasileiro de Apoio às Micro e Pequenas Empresas)_ para ajudar o seu negócio a fluir cada vez melhor.\n\nA forma de utilização da planilha é explicada na mesma, ou então acessando o site do *Sebrae* _(também disponível no próprio documento)_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)', {
        useTemplateButtons: false,
        buttons: [{ id: 'sebrae_receita_bruta', text: '📊 Relatório Receitas Brutas' }, { id: 'sebrae_contas_receber', text: '📊 Contas a Receber' }, { id: 'sebrae_contas_pagar', text: '📊 Contas a Pagar' }]
    })
        .then(() => b.sendText(a.from, '*📌 𝐃𝐈𝐂𝐀𝐒 𝐃𝐄 𝐂𝐎𝐍𝐓𝐑𝐎𝐋𝐄 𝐌𝐄𝐍𝐒𝐀𝐋*\n\n*IMPORTANTE:*\nRecomendamos que veja nosso tópico sobre *Declaração Anual do MEI* para entender a importância de ter esse controle interno. Neste tópico também indicamos um outro modelo de *Relatório de Receitas Brutas* que é disponibilizado pela *Receita Federal*. Fica da sua escolha qual utilizar, pois ambos tem o mesmo objetivo.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)', {
            useTemplateButtons: false,
            buttons: [{ id: 'info_declaracao_anual_mei', text: '📄 Declaração Anual do MEI' }]
        })
            .then(() => repetirAtendimento(a, b))
        )
}

function resposta16(a, b) {
    b.sendText(a.from, '*⁉️ 𝐃𝐄𝐕𝐎 𝐃𝐄𝐂𝐋𝐀𝐑𝐀𝐑 𝐈𝐌𝐏𝐎𝐒𝐓𝐎 𝐃𝐄 𝐑𝐄𝐍𝐃𝐀?*\n\nA entrega da declaração de PF _(Pessoa Física)_ é obrigatória *entre outros motivos*, para aqueles que possuem renda tributável superior à faixa de isenção de R$ 28.559,70 _(média R$ 2.379,97 mensal)_.\n\nA forma de calcular se o MEI terá renda tributável é simples, mas precisa fazer cálculos e na dúvida nos procure.\n\nPara prestadores de serviço o _rendimento isento_ é de *32%* do faturado, para Comércio *8%* e para serviços de transporte *16%*. A diferença precisa saber se houveram despesas com a atividade para serem excluídas, sobrando a parte tributável que será declarada na Declaração do IRPF do titular do MEI.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟛)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_juridica_fisica', text: '👥 Diferenças PJ e PF' }, { id: 'info_limite_faturamento', text: '💹 Limite de Faturamento' }]
    })
        .then(() => b.sendText(a.from, '*⁉️ 𝐃𝐄𝐕𝐎 𝐃𝐄𝐂𝐋𝐀𝐑𝐀𝐑 𝐈𝐌𝐏𝐎𝐒𝐓𝐎 𝐃𝐄 𝐑𝐄𝐍𝐃𝐀?*\n\nPara uma *melhor organização*, tenha controles que demonstrem seus gastos e seus ganhos com a atividade do MEI.\n\nUtilize o *botão* abaixo para obter os *materiais de apoio* que o Sebrae oferece gratuitamente ou nos procure para auxiliá-lo nesta tarefa.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟛)', {
            useTemplateButtons: false,
            buttons: [{ id: 'info_dicas_controle_mensal', text: '📌 Dicas Controle Mensal' }]
        })
            .then(() => b.sendText(a.from, '*⁉️ 𝐃𝐄𝐕𝐎 𝐃𝐄𝐂𝐋𝐀𝐑𝐀𝐑 𝐈𝐌𝐏𝐎𝐒𝐓𝐎 𝐃𝐄 𝐑𝐄𝐍𝐃𝐀?*\n\n*ATENÇÃO:*\nNão confuda a Declaração de Imposto de Renda PF ou o Relatório de Receitas Brutas com a *Declaração Anual do MEI*, pois essa sim é *obrigatória* em todos os casos e pode acarretar problemas caso não seja feita. Pressione o *botão* com o mesmo nome para saber mais.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟛)', {
                useTemplateButtons: false,
                buttons: [{ id: 'info_declaracao_anual_mei', text: '📄 Declaração Anual do MEI' }]
            })
                .then(() => repetirAtendimento(a, b))
            )
        )
}

function resposta18(a, b) {

    b.sendText(a.from, '*🗣 𝐃Ú𝐕𝐈𝐃𝐀𝐒 𝐅𝐑𝐄𝐐𝐔𝐄𝐍𝐓𝐄𝐒*\n\n_Separamos para você alguns assuntos que geram bastante dúvidas para aqueles que estão iniciando agora como MEI, de forma resumida, para que seja de rápido entendimento._\n\n_Para mais detalhes recomendamos que utilize nosso *𝐀𝐔𝐓𝐎𝐀𝐓𝐄𝐍𝐃𝐈𝐌𝐄𝐍𝐓𝐎 𝐌𝐄𝐈* onde é explicado de uma forma ainda mais detalhada._\n\n_Caso mesmo assim a dúvida permaneça, é interessante entrar em contato com um *Colaborador* através do botão *💬 Chat com Atendente*_\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟝)')
        .then(() => b.sendText(a.from, '*🗣 𝐃Ú𝐕𝐈𝐃𝐀𝐒 𝐅𝐑𝐄𝐐𝐔𝐄𝐍𝐓𝐄𝐒*\n\n*» Preciso/Posso abrir uma conta bancária no CNPJ?*\n*•* Sendo MEI você *não é obrigado* a abrir uma conta no *CNPJ*, porém, você tem essa possibilidade e é extremamente *recomendado* para um melhor controle entre *PF* e *PJ*.\n\n- Você pode por exemplo obter máquina de cartão de crédito e *vincular* na conta *PJ*, assim todo o faturamento fica em uma *conta separada* da sua conta pessoal.\n\n*» Posso parcelar a dívida do DAS?*\n*•* *Sim*, caso venha a atrasar as guias do DAS você pode solicitar um *parcelamento* sendo MEI, dessa forma, *regularizando* os *débitos* que havia em aberto.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟝)')
            .then(() => b.sendText(a.from, '*🗣 𝐃Ú𝐕𝐈𝐃𝐀𝐒 𝐅𝐑𝐄𝐐𝐔𝐄𝐍𝐓𝐄𝐒*\n\n*» Paguei duas vezes meu DAS, posso pedir restituição?*\n*•* Havendo pagamento do DAS em duplicidade existe a possibilidade de realizar um pedido de *restituição*, porém, é importante observar que é feito de forma burocrática por conta que você terá que fazer um processo para restituir o *INSS* na *Receita Federal*, o *ISS* na *Prefeitura* _(Comércio/Transporte)_ e o *ICMS* no *Estado* _(Serviço)_.\n\n- É interessante analisar cada caso para ver se é vantajoso solicitar a restituição ou não.\n\n*» Qual o limite de compra do MEI?*\n*•* É de 80% do valor bruto de suas receitas.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟝)')
                .then(() => b.sendText(a.from, '*🗣 𝐃Ú𝐕𝐈𝐃𝐀𝐒 𝐅𝐑𝐄𝐐𝐔𝐄𝐍𝐓𝐄𝐒*\n\n*» Posso participar de licitações?*\n*•* Você sendo MEI, tem o *direito de participar* de *Licitações*. Elas são a principal forma que o *governo* utiliza para realizar a escolha quais empresas serão os seus *fornecedores* de bens e serviços.\n\n- É extremamente importante acessar *Editais de Licitação* e/ou *Pregões Eletrônicos* para verificar as *exigências* documentais.\n\n*» Quais são as principais Certidões?*\n*•* Certidão de Débitos Estaduais (Serviço);\n*•* Certidão de Débitos Municipais (Comércio/Transporte);\n*•* Certidão Conjunta de Débitos Relativos a Tributos Federais, à Dívida Ativa da União e INSS;\n*•* Certidão de Regularidade do FGTS.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟜/𝟝)')
                    .then(() => b.sendText(a.from, '*🗣 𝐃Ú𝐕𝐈𝐃𝐀𝐒 𝐅𝐑𝐄𝐐𝐔𝐄𝐍𝐓𝐄𝐒*\n\n*» Contratação de empregado: O que preciso saber?*\n*•* Máximo 01 _(um)_ empregado contratado;\n*•* O salário não pode ser nem maior nem menor que o piso da categoria ou ao salário mínimo nacional. Considerar sempre o maior salário;\n*•* Recolhimento do INSS Patronal de 3% sobre a remuneração do empregado;\n*•* O Recolhimento do valor referente ao FGTS do funcionário é de responsabilidade do empregador, tendo como base de cálculo 8% de um salário do empregado;\n*•* Todos demais direitos trabalhistas devem ser cumpridos, como: Vale Transporte, férias, décimo terceiro salário, entre outros;\n*•* O MEI poderá contratar o próprio cônjuge como empregado, conforme Decreto Nº 10.410/20.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟝/𝟝)')
                        .then(() => repetirAtendimento(a, b))
                    )
                )
            )
        )
}

function dicasControleMensal(a, b) {
    b.sendText(a.from, '*📌 𝐃𝐈𝐂𝐀𝐒 𝐃𝐄 𝐂𝐎𝐍𝐓𝐑𝐎𝐋𝐄 𝐌𝐄𝐍𝐒𝐀𝐋*\n\nPara uma melhor *organização* de sua empresa, como: *Controle de Contas a Pagar, Controle de Contas a Receber, Fornecedores, Relatório de Receita Bruta,* entre outros, é interessante utilizar alguns documentos que facilitam a visualização e armazenamento dessas informações.\n\nSeparamos para você algumas planilhas feitas pelo *Sebrae* _(Serviço Brasileiro de Apoio às Micro e Pequenas Empresas)_ para ajudar o seu negócio a fluir cada vez melhor.\n\nA forma de utilização da planilha é explicada na mesma, ou então acessando o site do *Sebrae* _(também disponível no próprio documento)_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)', {
        useTemplateButtons: false,
        buttons: [{ id: 'sebrae_receita_bruta', text: '📊 Relatório Receitas Brutas' }, { id: 'sebrae_contas_receber', text: '📊 Contas a Receber' }, { id: 'sebrae_contas_pagar', text: '📊 Contas a Pagar' }]
    })
        .then(() => repetirAtendimento(a, b))
}

function declaracaoAnual(a, b) {
    b.sendText(a.from, '*📄 𝐃𝐄𝐂𝐋𝐀𝐑𝐀ÇÃ𝐎 𝐀𝐍𝐔𝐀𝐋 𝐃𝐎 𝐌𝐄𝐈*\n\nA declaração contém *tudo* que o Microempreendedor *faturou no ano*.\n\nÉ feita no *início* de cada ano _(se aberto agora, é feita no início do próximo ano)_.\n\n*Não há custo* caso seja feita pelo próprio empreendedor *até o prazo limite* _(Final de maio)_ e desde que não passe o *limite de faturamento*.\n\n*ATENÇÃO:*\nIndependente de ter faturamento ou não, é obrigatório enviar a declaração, mesmo que zerada, para não haver multa.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_limite_faturamento', text: '💹 Limite de Faturamento' }]
    })
        .then(() => b.sendText(a.from, '*📄 𝐃𝐄𝐂𝐋𝐀𝐑𝐀ÇÃ𝐎 𝐀𝐍𝐔𝐀𝐋 𝐃𝐎 𝐌𝐄𝐈*\n\n*IMPORTANTE:*\nRecomenda-se preencher mensalmente o *Relatório de Receitas Brutas* _(disponibilizado pela *Receita Federal*)_ e anexar todas as *notas fiscais* nele.\n\nEsse relatório é de *controle interno* do empreendedor e só será solicitado caso haja fiscalização por parte da Receita Federal.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)', {
            useTemplateButtons: false,
            buttons: [{ id: 'modelo_relatorio_receitas_brutas', text: '📝 Modelo do Relatório' }, { id: 'info_nota_fiscal', text: '🧾 Notas Fiscais' }]
        })
            .then(() => b.sendText(a.from, '*🌐 𝕄𝕒𝕚𝕤 𝕚𝕟𝕗𝕠𝕣𝕞𝕒𝕔𝕠𝕖𝕤 𝕤𝕠𝕓𝕣𝕖 𝕠 ℝ𝕖𝕝𝕒𝕥𝕠𝕣𝕚𝕠 𝕕𝕖 ℝ𝕖𝕔𝕖𝕚𝕥𝕒𝕤 𝔹𝕣𝕦𝕥𝕒𝕤*\n\nhttps://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/relatorio-mensal')
                .then(() => repetirAtendimento(a, b))
            )
        )
}

function limiteFaturamento(a, b) {
    b.sendText(a.from, '*💹 𝐋𝐈𝐌𝐈𝐓𝐄 𝐃𝐄 𝐅𝐀𝐓𝐔𝐑𝐀𝐌𝐄𝐍𝐓𝐎*\n\nO MEI pode faturar, vender ou receber no *máximo*, *R$ 81.000,00* *bruto* por ano _(média R$ 6.750,00 mensais)_\n\n*ATENÇÃO:*\nEssa *média mensal* é *equivalente*, ou seja: Se você abriu seu MEI em novembro de 2022, por *exemplo*, você *não pode* faturar *R$ 81.000,00* até o fim do ano. O correto é faturar *equivalente* aos meses restantes. Neste caso, novembro e dezembro _(último mês)_ são apenas 2 meses, e se a média mensal é de *R$ 6.750,00*, até o final do ano pode ser faturado *R$ 13.500,00*.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟛)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_valor_bruto', text: '⁉ O que é Valor Bruto?' }]
    })
        .then(() => b.sendText(a.from, '*💹 𝐋𝐈𝐌𝐈𝐓𝐄 𝐃𝐄 𝐅𝐀𝐓𝐔𝐑𝐀𝐌𝐄𝐍𝐓𝐎*\n\nEste cálculo serve para aqueles que fizeram a *abertura* do MEI *neste ano*, a partir de *fevereiro*.\nAqueles que *iniciaram* suas atividades em *janeiro*, ou formalizou o MEI *ano passado* _(ou anos anteriores)_, o faturamento *máximo* é de *R$ 81.000,00* no ano.\n\nCaso queira *calcular o seu faturamento máximo*, pressione o *botão* abaixo\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟛)', {
            useTemplateButtons: false,
            buttons: [{ id: 'calcular_faturamento', text: '🧮 Calcular Faturamento' }]
        })
            .then(() => b.sendText(a.from, '*💹 𝐋𝐈𝐌𝐈𝐓𝐄 𝐃𝐄 𝐅𝐀𝐓𝐔𝐑𝐀𝐌𝐄𝐍𝐓𝐎*\n\nPara aqueles que *ultrapassaram o limite* de faturamento: Existem algumas *condições especiais* dependendo do quanto o valor foi ultrapassado.\nUtilize o *botão* abaixo para saber mais.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟛)', {
                useTemplateButtons: false,
                buttons: [{ id: 'info_limite_ultrapassado', text: '📈 Limite Ultrapassado' }]
            })
                .then(() => repetirAtendimento(a, b))
            )
        )
}

function limiteFaturamentoValorBruto(a, b) {
    b.sendText(a.from, '*💹 𝐅𝐀𝐓𝐔𝐑𝐀𝐌𝐄𝐍𝐓𝐎 𝐄 𝐕𝐀𝐋𝐎𝐑 𝐁𝐑𝐔𝐓𝐎*\n\n*Valor Bruto* é o valor recebido *"limpo"*, sem nenhum tipo de desconto.\n\nSupondo que você possui uma loja de revenda e neste mês você faturou *R$ 5.100,00*. Após as vendas, você teve que comprar novos produtos para revender, teve que pagar seu funcionário, as contas do estabelecimento, entre outras coisas. No fechamento, você saiu com lucro de *R$ 1.900,00*.\n\nO valor bruto é o *valor inteiro faturado* de *R$ 5.100,00*, *sem descontar* os gastos.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟜)')
        .then(() => b.sendText(a.from, '*💹 𝐅𝐀𝐓𝐔𝐑𝐀𝐌𝐄𝐍𝐓𝐎 𝐄 𝐕𝐀𝐋𝐎𝐑 𝐁𝐑𝐔𝐓𝐎*\n\nNo caso do MEI, ele pode faturar, vender ou receber no *máximo*, *R$ 81.000,00* *bruto* por ano _(média R$ 6.750,00 mensais)_\n\n*ATENÇÃO:*\nEssa *média mensal* é *equivalente*, ou seja: Se você abriu seu MEI em novembro de 2022, por *exemplo*, você *não pode* faturar *R$ 81.000,00* até o fim do ano. O correto é faturar *equivalente* aos meses restantes. Neste caso, novembro e dezembro _(último mês)_ são apenas 2 meses, e se a média mensal é de *R$ 6.750,00*, até o final do ano pode ser faturado *R$ 13.500,00*\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟜)')
            .then(() => b.sendText(a.from, '*💹 𝐅𝐀𝐓𝐔𝐑𝐀𝐌𝐄𝐍𝐓𝐎 𝐄 𝐕𝐀𝐋𝐎𝐑 𝐁𝐑𝐔𝐓𝐎*\n\nEste cálculo serve para aqueles que fizeram a *abertura* do MEI *neste ano*, a partir de *fevereiro*.\nAqueles que *iniciaram* suas atividades em *janeiro*, ou formalizou o MEI *ano passado* _(ou anos anteriores)_, o faturamento *máximo* é de *R$ 81.000,00* no ano.\n\nCaso queira *calcular o seu faturamento máximo*, pressione o *botão* abaixo\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟜)', {
                useTemplateButtons: false,
                buttons: [{ id: 'calcular_faturamento', text: '🧮 Calcular Faturamento' }]
            })
                .then(() => b.sendText(a.from, '*💹 𝐅𝐀𝐓𝐔𝐑𝐀𝐌𝐄𝐍𝐓𝐎 𝐄 𝐕𝐀𝐋𝐎𝐑 𝐁𝐑𝐔𝐓𝐎*\n\nPara aqueles que *ultrapassaram o limite* de faturamento: Existem algumas *condições especiais* dependendo do quanto o valor foi ultrapassado.\nUtilize o *botão* abaixo para saber mais.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟜/𝟜)', {
                    useTemplateButtons: false,
                    buttons: [{ id: 'info_limite_ultrapassado', text: '📈 Limite Ultrapassado' }]
                })
                    .then(() => repetirAtendimento(a, b))
                )
            )
        )
}

function limiteUltrapassado(a, b) {
    b.sendText(a.from, '*📈 𝐋𝐈𝐌𝐈𝐓𝐄 𝐃𝐄 𝐅𝐀𝐓𝐔𝐑𝐀𝐌𝐄𝐍𝐓𝐎 𝐔𝐋𝐓𝐑𝐀𝐏𝐀𝐒𝐒𝐀𝐃𝐎*\n\nCaso o valor de faturamento ultrapassado seja de *até 20%*:\n\nO MEI paga o imposto como ME - Micro-Empresa *sobre a diferença (20%);*\n\nNo ano seguinte, o MEI já começa como *Micro Empresa*, entra para o *Simples Nacional* e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟛)')
        .then(() => b.sendText(a.from, '*📈 𝐋𝐈𝐌𝐈𝐓𝐄 𝐃𝐄 𝐅𝐀𝐓𝐔𝐑𝐀𝐌𝐄𝐍𝐓𝐎 𝐔𝐋𝐓𝐑𝐀𝐏𝐀𝐒𝐒𝐀𝐃𝐎*\n\nCaso o valor de faturamento ultrapassado seja *maior que 20%*:\n\nO MEI paga o imposto como ME - Micro-Empresa *desde o início do ano* _(janeiro)_ *ou* do *início da empresa*;\n\nNo mesmo ano já se torna uma *Micro Empresa*, entra para o *Simples Nacional* e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟛)', {
            useTemplateButtons: false,
            buttons: [{ id: 'calcular_faturamento', text: '🧮 Calcular Faturamento' }]
        })
            .then(() => b.sendText(a.from, '*📈 𝐋𝐈𝐌𝐈𝐓𝐄 𝐃𝐄 𝐅𝐀𝐓𝐔𝐑𝐀𝐌𝐄𝐍𝐓𝐎 𝐔𝐋𝐓𝐑𝐀𝐏𝐀𝐒𝐒𝐀𝐃𝐎*\n\n*IMPORTANTE:*\nPara realizar o desenquadramento, é necessário gerar um *Código de Acesso do Simples Nacional*.\n\nNo caso do desenquadramento automático, você pode confirmar acessando o serviço *Consulta de Optantes* disponível no portal do Simples Nacional.\n\nNós da OCC, como contabilidade, realizamos esse tipo de *Desenquadramento do MEI* _(e demais serviços)_.\n\nTendo interesse, entre em contato com um atendente utilizando o *botão* _*💬 Chat com Atendente*_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟛)')
                .then(() => b.sendText(a.from, '*🌐 𝔸𝕔𝕖𝕤𝕤𝕒𝕣 𝕤𝕚𝕥𝕖 𝕕𝕒 ℂ𝕠𝕟𝕤𝕦𝕝𝕥𝕒 𝕕𝕖 𝕆𝕡𝕥𝕒𝕟𝕥𝕖𝕤*\n\nhttps://consopt.www8.receita.fazenda.gov.br/consultaoptantes')
                    .then(() => repetirAtendimento(a, b))
                )
            )
        )

}

function emancipacao(a, b) {
    b.sendText(a.from, '*⁉ 𝐎 𝐐𝐔𝐄 É 𝐄𝐌𝐀𝐍𝐂𝐈𝐏𝐀ÇÃ𝐎?*\n\nNo direito brasileiro, a *emancipação* é o ato que faz com que pessoas se tornem *capazes* na *esfera civil* antes da idade correta. É uma das formas de fazer com que adolescentes possam exercer seus *direitos civis* antes de atingir os 18 anos.\n\n*Ou seja:* É uma forma de fazer com que o adolescente *deixe de ser incapaz civilmente* para poder *exercer direitos civis da vida adulta*, como viajar por conta própria, comprar e vender bens, assinar documentos, entre outros.\n\nLogo, a pessoa emancipada é capacitada para se tornar um Micro Empreendedor Individual _(MEI)_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)')
        .then(() => b.sendText(a.from, '*🌐 𝕄𝕒𝕚𝕤 𝕚𝕟𝕗𝕠𝕣𝕞𝕒𝕔𝕠𝕖𝕤 𝕤𝕠𝕓𝕣𝕖 𝔼𝕞𝕒𝕟𝕔𝕚𝕡𝕒𝕔𝕒𝕠*\n\nhttps://www.projuris.com.br/emancipacao/')
            .then(() => repetirAtendimento(a, b))
        )
}

function valorBruto(a, b) {
    b.sendText(a.from, '*⁉ 𝐎 𝐐𝐔𝐄 É 𝐕𝐀𝐋𝐎𝐑 𝐁𝐑𝐔𝐓𝐎?*\n\n*Valor Bruto* é o valor recebido *"limpo"*, sem nenhum tipo de desconto.\n\nSupondo que você possui uma loja de revenda e neste mês você faturou *R$ 5.100,00*. Após as vendas, você teve que comprar novos produtos para revender, teve que pagar seu funcionário, as contas do estabelecimento, entre outras coisas. No fechamento, você saiu com lucro de *R$ 1.900,00*.\n\nO valor bruto é o *valor inteiro faturado* de *R$ 5.100,00*, *sem descontar* os gastos.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)')
        .then(() => repetirAtendimento(a, b))
}

function faturamentoJaneiro(a, b) {
    b.sendText(a.from, "Se você fez ou fará a formalização do MEI em *Janeiro*, então seu Faturamento Máximo é/será de *R$ 81.000,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo também será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}

function faturamentoFevereiro(a, b) {
    b.sendText(a.from, "Se você fez ou fará a formalização do MEI em *Fevereiro*, então seu Faturamento Máximo é/será de *R$ 74.250,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}

function faturamentoMarco(a, b) {
    b.sendText(a.from, "Se você fez ou fará a formalização do MEI em *Março*, então seu Faturamento Máximo é/será de *R$ 67.500,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}

function faturamentoAbril(a, b) {
    b.sendText(a.from, "Se você fez ou fará a formalização do MEI em *Abril*, então seu Faturamento Máximo é/será de *R$ 60.750,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}

function faturamentoMaio(a, b) {
    b.sendText(a.from, "Se você fez ou fará a formalização do MEI em *Maio*, então seu Faturamento Máximo é/será de *R$ 54.000,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}


function faturamentoJunho(a, b) {
    b.sendText(a.from, "Se você fez ou fará a formalização do MEI em *Junho*, então seu Faturamento Máximo é/será de *R$ 47.250,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}


function faturamentoJulho(a, b) {
    b.sendText(a.from, "Se você fez ou fará a formalização do MEI em *Julho*, então seu Faturamento Máximo é/será de *R$ 40.500,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}


function faturamentoAgosto(a, b) {
    b.sendText(a.from, "Se você fez ou fará a formalização do MEI em *Agosto*, então seu Faturamento Máximo é/será de *R$ 33.750,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}


function faturamentoSetembro(a, b) {
    b.sendText(a.from, "Se você fez ou fará a formalização do MEI em *Setembro*, então seu Faturamento Máximo é/será de *R$ 27.000,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}


function faturamentoOutubro(a, b) {
    b.sendText(a.from, "Se você fez ou fará a formalização do MEI em *Outubro*, então seu Faturamento Máximo é/será de *R$ 20.250,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}


function faturamentoNovembro(a, b) {
    b.sendText(a.from, "Se você fez ou fará a formalização do MEI em *Novembro*, então seu Faturamento Máximo é/será de *R$ 13.500,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}


function faturamentoDezembro(a, b) {
    b.sendText(a.from, "Se você fez ou fará a formalização do MEI em *Dezembro*, então seu Faturamento Máximo é/será de *R$ 6.750,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}

function faturamentoPadrao(a, b) {
    b.sendText(a.from, "Se você fez a formalização do MEI em *outro ano*, então seu Faturamento Máximo é de *R$ 81.000,00 bruto* até o final do ano _(média: R$ 6.750,00 mensal)_.\n\nNo ano seguinte, seu Faturamento Máximo também será de *R$ 81.000,00*.")
        .then(() => b.sendText(a.from, 'Informe o valor total faturado neste ano para calcular o quanto do limite já foi usado.\n\n_OBS: Informar também os centavos._\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*'))
}

function modeloTermo(a, b) {
    b.sendText(a.from, '*𝐄𝐍𝐕𝐈𝐀𝐍𝐃𝐎:*\n*📝 Modelo de Termo de Ciência e Responsabilidade MEI*\n\n_Preencher com local, data e assinatura._\n\n𝐴𝑔𝑢𝑎𝑟𝑑𝑒 𝑜 𝑑𝑜𝑐𝑢𝑚𝑒𝑛𝑡𝑜 𝑠𝑒𝑟 𝑐𝑎𝑟𝑟𝑒𝑔𝑎𝑑𝑜')
        .then(() => b.sendFile(a.from, './docs/termo_ciencia.pdf', 'Modelo de Termo de Ciência e Responsabilidade MEI', ' ')
            .then(() => repetirAtendimento(a, b))
        )
}

function modeloRelatorioReceitasBrutas(a, b) {
    b.sendText(a.from, '*𝐄𝐍𝐕𝐈𝐀𝐍𝐃𝐎:*\n*📝 Modelo de Relatorio Mensal de Receitas Brutas MEI _(Receita Federal)_*\n\n𝐴𝑔𝑢𝑎𝑟𝑑𝑒 𝑜 𝑑𝑜𝑐𝑢𝑚𝑒𝑛𝑡𝑜 𝑠𝑒𝑟 𝑐𝑎𝑟𝑟𝑒𝑔𝑎𝑑𝑜')
        .then(() => b.sendFile(a.from, './docs/relatorio_receitas_brutas.pdf', 'Relatorio de Receitas Brutas MEI (Receita Federal)', ' ')
            .then(() => repetirAtendimento(a, b))
        )
}

function modeloRelatorioReceitasBrutasSebrae(a, b) {
    b.sendText(a.from, '*𝐄𝐍𝐕𝐈𝐀𝐍𝐃𝐎:*\n*📊 Planilha de Relatório Mensal de Receitas Brutas MEI _(Sebrae)_*\n\n𝐴𝑔𝑢𝑎𝑟𝑑𝑒 𝑜 𝑑𝑜𝑐𝑢𝑚𝑒𝑛𝑡𝑜 𝑠𝑒𝑟 𝑐𝑎𝑟𝑟𝑒𝑔𝑎𝑑𝑜')
        .then(() => b.sendFile(a.from, './docs/relatorio_mensal_das_receitas_brutas.xlsx', 'Planilha de Relatorio Mensal de Receitas Brutas MEI (Sebrae)', ' ')
            .then(() => repetirAtendimento(a, b))
        )
}

function modeloContasPagar(a, b) {
    b.sendText(a.from, '*𝐄𝐍𝐕𝐈𝐀𝐍𝐃𝐎:*\n*📊 Planilha de Controle de Contas a Pagar _(Sebrae)_*\n\n𝐴𝑔𝑢𝑎𝑟𝑑𝑒 𝑜 𝑑𝑜𝑐𝑢𝑚𝑒𝑛𝑡𝑜 𝑠𝑒𝑟 𝑐𝑎𝑟𝑟𝑒𝑔𝑎𝑑𝑜')
        .then(() => b.sendFile(a.from, './docs/controle_de_contas_a_pagar.xlsm', 'Planilha de Controle de Contas a Pagar (Sebrae)', ' ')
            .then(() => repetirAtendimento(a, b))
        )
}

function modeloContasReceber(a, b) {
    b.sendText(a.from, '*𝐄𝐍𝐕𝐈𝐀𝐍𝐃𝐎:*\n*📊 Planilha de Controle de Contas a Receber _(Sebrae)_*\n\n𝐴𝑔𝑢𝑎𝑟𝑑𝑒 𝑜 𝑑𝑜𝑐𝑢𝑚𝑒𝑛𝑡𝑜 𝑠𝑒𝑟 𝑐𝑎𝑟𝑟𝑒𝑔𝑎𝑑𝑜')
        .then(() => b.sendFile(a.from, './docs/controle_de_contas_a_receber.xlsm', 'Planilha de Controle de Contas a Receber (Sebrae)', ' ')
            .then(() => repetirAtendimento(a, b))
        )
}

function cadastroErro(a, b) {
    b.sendText(a.from, 'Ops...\nParece que algo deu errado durante seu cadastro.\nPor gentileza, *tente novamente dentro de 1 minuto*.');
}

function cnpjCCMEI(a, b) {
    b.sendText(a.from, '*📜 𝐂𝐍𝐏𝐉 & 𝐂𝐂𝐌𝐄𝐈*\n\nSendo um MEI, você terá direito ao CNPJ _(Cadastro Nacional de *Pessoa Jurídica*)_ que, assim como o CPF serve para identificar a *Pessoa Física*, o CNPJ serve para identificar a pessoa jurídica.\n\nPossuindo um CNPJ, é interessante a emissão do *Cartão CNPJ*, que é um documento onde consta algumas informações sobre a empresa, como: Razão social, endereço, atividades _(CNAE)_, entre outros.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_juridica_fisica', text: '👥 Diferenças PJ e PF' }]
    })
        .then(() => b.sendText(a.from, '*📜 𝐂𝐍𝐏𝐉 & 𝐂𝐂𝐌𝐄𝐈*\n\nNão apenas isso, mas por ser MEI, também é de grande utilidade emitir um *CCMEI*, que é bem parecido como o Cartão CNPJ, porém exclusivo para MEI. Ele também tem como efeito *Alvará de Licença e Funcionamento Provisório*.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)', {
            useTemplateButtons: false,
            buttons: [{ id: 'info_isencoes_dispensas', text: '🛂 Isenções e Dispensas' }],
        })
            .then(() => b.sendText(a.from, '*🌐 𝔸𝕔𝕖𝕤𝕤𝕒𝕣 𝕤𝕚𝕥𝕖 𝕕𝕖 𝕖𝕞𝕚𝕤𝕤𝕒𝕠 ℂ𝕒𝕣𝕥𝕒𝕠 ℂℕℙ𝕁*\n\nhttps://servicos.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp')
                .then(() => b.sendText(a.from, '*🌐 𝔸𝕔𝕖𝕤𝕤𝕒𝕣 𝕤𝕚𝕥𝕖 𝕕𝕖 𝕖𝕞𝕚𝕤𝕤𝕒𝕠 ℂℂ𝕄𝔼𝕀*\n\nhttps://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/emissao-de-comprovante-ccmei')
                    .then(() => repetirAtendimento(a, b))
                )
            )
        )
}

function condicoesFuncionarios(a, b) {
    b.sendText(a.from, '*👔 𝐂𝐎𝐍𝐃𝐈ÇÕ𝐄𝐒 𝐅𝐔𝐍𝐂𝐈𝐎𝐍Á𝐑𝐈𝐎𝐒*\n\n1️⃣ *»* Máximo 01 _(um)_ empregado contratado.\n\n2️⃣ *»* O salário não pode ser nem maior nem menor que o piso da categoria ou ao salário mínimo nacional. Considerar sempre o maior salário.\n\n3️⃣ *»* Recolhimento do INSS Patronal de 3% sobre a remuneração do empregado.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)')
        .then(() => b.sendText(a.from, '*👔 𝐂𝐎𝐍𝐃𝐈ÇÕ𝐄𝐒 𝐅𝐔𝐍𝐂𝐈𝐎𝐍Á𝐑𝐈𝐎𝐒*\n\n4️⃣ *»* O Recolhimento do valor referente ao FGTS do funcionário é de responsabilidade do empregador, tendo como base de cálculo 8% de um salário do empregado.\n\n5️⃣ *»* Todos demais direitos trabalhistas devem ser cumpridos, como: Vale Transporte, férias, décimo terceiro salário, entre outros.\n\n6️⃣ *»* O MEI poderá contratar o próprio cônjuge como empregado, conforme Decreto Nº 10.410/20.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)')
            .then(() => repetirAtendimento(a, b))
        )
}

function diferencaPJPF(a, b) {
    b.sendText(a.from, '*👥 𝐃𝐈𝐅𝐄𝐑𝐄𝐍Ç𝐀𝐒 𝐏𝐉 & 𝐏𝐅*\n\n*Pessoa Física* _(PF)_ é todo ser humano enquanto indivíduo, do seu nascimento até o seu falecimento. Nesse sentido, a certidão de nascimento é o seu primeiro registro legal, não sendo necessário, inclusive, possuir um CPF para ser considerado uma PF.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟛)')
        .then(() => b.sendText(a.from, '*👥 𝐃𝐈𝐅𝐄𝐑𝐄𝐍Ç𝐀𝐒 𝐏𝐉 & 𝐏𝐅*\n\nJá o termo *Pessoa Jurídica* _(PJ)_ indica uma entidade formada por uma ou mais Pessoas Físicas e/ou outras Pessoas Jurídicas. Sendo assim, possuem um propósito ou finalidade registrados sob um CNPJ, reconhecido pelo Estado em que é registrada. Além disso, também apresentam direitos e obrigações específicos e possuem uma _"personalidade jurídica"_ independente em relação aos seus membros.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟛)')
            .then(() => b.sendText(a.from, '*👥 𝐃𝐈𝐅𝐄𝐑𝐄𝐍Ç𝐀𝐒 𝐏𝐉 & 𝐏𝐅*\n\nDessa maneira, podem ser citados como exemplos de PJs:\n\n• Empresas;\n• ONGs;\n• Partidos políticos;\n• Sociedades;\n• Fundações;\n• Igrejas.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟛)')
                .then(() => repetirAtendimento(a, b))
            )
        )
}

function filialNoMEI(a, b) {
    b.sendText(a.from, '*🏢 𝐏𝐎𝐒𝐒𝐎 𝐓𝐄𝐑 𝐅𝐈𝐋𝐈𝐀𝐋 𝐍𝐎 𝐌𝐄𝐈?*\n\n*Não*.\n\nO MEI só tem direito a *01* _(um)_ CNPJ, ou seja: Não é possível abrir uma filial.\n\nPara isso, terá que ser feito o *Desenquadramento do MEI*, alterando sua *Natureza Jurídica*.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)', {
        useTemplateButtons: false,
        buttons: [{ id: 'info_desenquadramento_mei', text: '🔁 Desenquadramento do MEI' }, { id: 'info_natureza_juridica', text: '⚖ Natureza Jurídica' }]
    })
        .then(() => repetirAtendimento(a, b))
}

function licitacoes(a, b) {
    b.sendText(a.from, '*👨‍⚖ 𝐋𝐈𝐂𝐈𝐓𝐀ÇÕ𝐄𝐒*\n\nVocê sendo MEI, tem o *direito de participar* de *Licitações*. Elas são a principal forma que o *governo* utiliza para realizar a escolha quais empresas serão os seus *fornecedores* de bens e serviços.\n\nÉ extremamente importante acessar *Editais de Licitação* e/ou *Pregões Eletrônicos* para verificar as *exigências* documentais.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)')
        .then(() => repetirAtendimento(a, b))
}

function consultaPrevia(a, b) {
    b.sendText(a.from, '*🔎 𝐂𝐎𝐍𝐒𝐔𝐋𝐓𝐀 𝐏𝐑É𝐕𝐈𝐀*\n\nA Consulta Prévia de Funcionamento é um serviço que geralmente é feito *on-line*, de forma *gratuita*, pelo qual o interessado pode verificar de forma *fácil*, apenas com o endereço do imóvel, se uma determinada atividade é *permitida* no local, se o imóvel é irregular ou não, se há restrições de horários de funcionamento, vagas de estacionamento necessárias, possibilidades de uso do imóvel, entre outras informações.\n\nEsta consulta é feita através da *Prefeitura* de seu município e normalmente não gera nenhum processo, apenas fornece uma informação prévia, muito útil para os profissionais do ramo imobiliário e aos empreendedores que pretendem abrir um negócio.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)')
        .then(() => repetirAtendimento(a, b))
}

function habiteSe(a, b) {
    b.sendText(a.from, '*🏠 𝐇𝐀𝐁𝐈𝐓𝐄-𝐒𝐄*\n\nTrata-se de um documento que atesta que a residência foi construída de acordo com as normas estabelecidas pela *Prefeitura* de seu município. O habite-se é necessário tanto para novas construções quanto para obras e reformas.\n\nAlém de ser extremamente relevante para provar as condições de segurança de uma casa ou de um apartamento, essa espécie de certidão do imóvel é *obrigatória por lei*. Logo, a ausência dela pode acarretar penalidades.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)')
        .then(() => repetirAtendimento(a, b))
}

function naturezaJuridica(a, b) {
    b.sendText(a.from, '*⚖ 𝐍𝐀𝐓𝐔𝐑𝐄𝐙𝐀 𝐉𝐔𝐑Í𝐃𝐈𝐂𝐀*\n\nA *Natureza Jurídica* de uma empresa nada mais é que o seu *Regime Jurídico*.\n\n*Ou seja*: É ela quem define as regras, deveres que os sócios devem seguir, assim como os direitos que eles têm.\n\nPela Natureza Jurídica escolhida a empresa se adequará a alguns requisitos como: Nome empresarial, tipo de sócios, capital social, entre outros. Estar por dentro disso ajuda a pessoa que vai empreender a entender a opção mais vantajosa e evitar problemas com a legislação brasileira.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟛)')
        .then(() => b.sendText(a.from, '*⚖ 𝐍𝐀𝐓𝐔𝐑𝐄𝐙𝐀 𝐉𝐔𝐑Í𝐃𝐈𝐂𝐀*\n\nEntre os tipos de *Natureza Jurídica*, estão:\n\n• MEI – Microempreendedor Individual;\n• EI – Empresário Individual;\n• Sociedade Empresária Limitada Unipessoal.\n• Sociedade Empresária Limitada _(mais de um sócio)_\n• Sociedade Simples Limitada;\n• Sociedade Anônima.\n\nComo o MEI possui algumas limitações, como: *Limite de Faturamento*, *Quantidade de Funcionários*, entre outras coisas, caso venha a precisar sair dessa limitação é interessante que entre em contato com uma contabilidade para verificar o tipo de *Natureza Jurídica* ideal para sua empresa.\n\n*ATENÇÃO:* Existem casos onde a alteração de Natureza Jurídica é *obrigatória*, isso é, quando o MEI é *Desenquadrado*.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟛)', {
            useTemplateButtons: false,
            buttons: [{ id: 'info_desenquadramento_mei', text: '🔁 Desenquadramento do MEI' }, { id: 'info_limite_faturamento', text: '💹 Limite de Faturamento' }, { id: 'info_funcionario', text: '👔 Condições Funcionários' }]
        })
            .then(() => b.sendText(a.from, '*⚖ 𝐍𝐀𝐓𝐔𝐑𝐄𝐙𝐀 𝐉𝐔𝐑Í𝐃𝐈𝐂𝐀*\n\nNós da OCC, como contabilidade, realizamos esse tipo de serviço de *Desenquadramento* _(e demais serviços)_.\n\nTendo interesse, entre em contato com um atendente utilizando o *botão* _*💬 Chat com Atendente*_.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟛/𝟛)')
                .then(() => repetirAtendimento(a, b))
            )
        )
}

// CALCULAR FATURAMENTO (1/2)
// a = valorBruto b = client c = message d = valor e = user f = db
function passouDoLimite(a, b, c, d, e, f) {

    async function alterarStatusOff() {
        await f.setStatusOff(e);
    }

    let conta = (a / 100);

    if (conta >= d) {

        let total = (conta - d);
        //console.log('total: ' + total);

        let calculo = percentage(conta, d);
        //console.log('calculo: ' + calculo);

        let porcentagem = calculo - 100;
        //console.log('porcentagem: ' + porcentagem);

        let resultado = (`${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
        //console.log('resultado: ' + resultado);

        if (porcentagem < 100 && porcentagem >= 10) {
            alterarStatusOff()
                .then(() => b.sendText(c.from, `*⚠️ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\nVocê já ultrapassou *${String(porcentagem).substring(0, 4)}% (${resultado})* do seu limite anual.\n\nÉ importante ficar atento pois existem duas situações:\n\n*[1] • Quando você ultrapassa o limite porém inferior a 20%*\n- O MEI paga o imposto como ME - Micro-Empresa sobre a diferença *(20%)*;\nNo ano seguinte, o MEI já começa como Micro Empresa, entra para o Simples Nacional e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)`)
                    .then(() => b.sendText(c.from, '*⚠️ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\n*[2] • Quando você ultrapassa o limite com mais de 20%*\n- O MEI paga o imposto como ME - Micro-Empresa desde o início do ano _(janeiro)_ ou do início da empresa;\nNo mesmo ano já se torna uma Micro Empresa, entra para o Simples Nacional e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)\n𝑈𝑡𝑖𝑙𝑖𝑧𝑒 𝑜 𝑏𝑜𝑡𝑎𝑜 𝑝𝑎𝑟𝑎 𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑟 𝑛𝑜𝑣𝑎𝑚𝑒𝑛𝑡𝑒', {
                        useTemplateButtons: false,
                        buttons: [{ id: 'calcular_faturamento', text: '🧮 Calcular Faturamento' }]
                    })
                        .then(() => repetirAtendimento(c, b))
                    )
                )
        } else if (porcentagem < 10 && porcentagem > 0) {
            alterarStatusOff()
                .then(() => b.sendText(c.from, `*⚠️ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\nVocê já ultrapassou *${String(porcentagem).substring(0, 3)}% (${resultado})* do seu limite anual.\n\nÉ importante ficar atento pois existem duas situações:\n\n*[1] • Quando você ultrapassa o limite porém inferior a 20%*\n- O MEI paga o imposto como ME - Micro-Empresa sobre a diferença *(20%)*;\nNo ano seguinte, o MEI já começa como Micro Empresa, entra para o Simples Nacional e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)`)
                    .then(() => b.sendText(c.from, '*⚠️ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\n*[2] • Quando você ultrapassa o limite com mais de 20%*\n- O MEI paga o imposto como ME - Micro-Empresa desde o início do ano _(janeiro)_ ou do início da empresa;\nNo mesmo ano já se torna uma Micro Empresa, entra para o Simples Nacional e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)\n𝑈𝑡𝑖𝑙𝑖𝑧𝑒 𝑜 𝑏𝑜𝑡𝑎𝑜 𝑝𝑎𝑟𝑎 𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑟 𝑛𝑜𝑣𝑎𝑚𝑒𝑛𝑡𝑒', {
                        useTemplateButtons: false,
                        buttons: [{ id: 'calcular_faturamento', text: '🧮 Calcular Faturamento' }]
                    })
                        .then(() => repetirAtendimento(c, b))
                    )
                )

        } else if (porcentagem == 0) {
            alterarStatusOff()
                .then(() => b.sendText(c.from, `*⚠️ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\n*Você está no LIMITE do seu faturamento *(100%)*.\n\nÉ importante ficar atento pois existem duas situações:\n\n*[1] • Quando você ultrapassa o limite porém inferior a 20%*\n- O MEI paga o imposto como ME - Micro-Empresa sobre a diferença *(20%)*;\nNo ano seguinte, o MEI já começa como Micro Empresa, entra para o Simples Nacional e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)`)
                    .then(() => b.sendText(c.from, '*⚠️ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\n*[2] • Quando você ultrapassa o limite com mais de 20%*\n- O MEI paga o imposto como ME - Micro-Empresa desde o início do ano _(janeiro)_ ou do início da empresa;\nNo mesmo ano já se torna uma Micro Empresa, entra para o Simples Nacional e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)\n𝑈𝑡𝑖𝑙𝑖𝑧𝑒 𝑜 𝑏𝑜𝑡𝑎𝑜 𝑝𝑎𝑟𝑎 𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑟 𝑛𝑜𝑣𝑎𝑚𝑒𝑛𝑡𝑒', {
                        useTemplateButtons: false,
                        buttons: [{ id: 'calcular_faturamento', text: '🧮 Calcular Faturamento' }]
                    })
                        .then(() => repetirAtendimento(c, b))
                    )
                )
        } else if (porcentagem > 100 && porcentagem < 1000) {
            alterarStatusOff()
                .then(() => b.sendText(c.from, `*⚠️ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\nVocê já ultrapassou *${String(porcentagem).substring(0, 5)}% (${resultado})* do seu limite anual.\n\nÉ importante ficar atento pois existem duas situações:\n\n*[1] • Quando você ultrapassa o limite porém inferior a 20%*\n- O MEI paga o imposto como ME - Micro-Empresa sobre a diferença *(20%)*;\nNo ano seguinte, o MEI já começa como Micro Empresa, entra para o Simples Nacional e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)`)
                    .then(() => b.sendText(c.from, '*⚠️ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\n*[2] • Quando você ultrapassa o limite com mais de 20%*\n- O MEI paga o imposto como ME - Micro-Empresa desde o início do ano _(janeiro)_ ou do início da empresa;\nNo mesmo ano já se torna uma Micro Empresa, entra para o Simples Nacional e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)\n𝑈𝑡𝑖𝑙𝑖𝑧𝑒 𝑜 𝑏𝑜𝑡𝑎𝑜 𝑝𝑎𝑟𝑎 𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑟 𝑛𝑜𝑣𝑎𝑚𝑒𝑛𝑡𝑒', {
                        useTemplateButtons: false,
                        buttons: [{ id: 'calcular_faturamento', text: '🧮 Calcular Faturamento' }]
                    })
                        .then(() => repetirAtendimento(c, b))
                    )
                )
        } else if (porcentagem >= 1000 && porcentagem < 10000) {
            alterarStatusOff()
                .then(() => b.sendText(c.from, `*⚠️ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\nVocê já ultrapassou *${String(porcentagem).substring(0, 6)}% (${resultado})* do seu limite anual.\n\nÉ importante ficar atento pois existem duas situações:\n\n*[1] • Quando você ultrapassa o limite porém inferior a 20%*\n- O MEI paga o imposto como ME - Micro-Empresa sobre a diferença *(20%)*;\nNo ano seguinte, o MEI já começa como Micro Empresa, entra para o Simples Nacional e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)`)
                    .then(() => b.sendText(c.from, '*⚠️ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\n*[2] • Quando você ultrapassa o limite com mais de 20%*\n- O MEI paga o imposto como ME - Micro-Empresa desde o início do ano _(janeiro)_ ou do início da empresa;\nNo mesmo ano já se torna uma Micro Empresa, entra para o Simples Nacional e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)\n𝑈𝑡𝑖𝑙𝑖𝑧𝑒 𝑜 𝑏𝑜𝑡𝑎𝑜 𝑝𝑎𝑟𝑎 𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑟 𝑛𝑜𝑣𝑎𝑚𝑒𝑛𝑡𝑒', {
                        useTemplateButtons: false,
                        buttons: [{ id: 'calcular_faturamento', text: '🧮 Calcular Faturamento' }]
                    })
                        .then(() => repetirAtendimento(c, b))
                    )
                )
        } else if (porcentagem >= 10000 && porcentagem < 100000) {
            alterarStatusOff()
                .then(() => b.sendText(c.from, `*⚠️ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\nVocê já ultrapassou *${String(porcentagem).substring(0, 7)}% (${resultado})* do seu limite anual.\n\nÉ importante ficar atento pois existem duas situações:\n\n*[1] • Quando você ultrapassa o limite porém inferior a 20%*\n- O MEI paga o imposto como ME - Micro-Empresa sobre a diferença *(20%)*;\nNo ano seguinte, o MEI já começa como Micro Empresa, entra para o Simples Nacional e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟚)`)
                    .then(() => b.sendText(c.from, '*⚠️ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\n*[2] • Quando você ultrapassa o limite com mais de 20%*\n- O MEI paga o imposto como ME - Micro-Empresa desde o início do ano _(janeiro)_ ou do início da empresa;\nNo mesmo ano já se torna uma Micro Empresa, entra para o Simples Nacional e precisa cumprir todas as obrigações de uma empresa comúm.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟚/𝟚)\n𝑈𝑡𝑖𝑙𝑖𝑧𝑒 𝑜 𝑏𝑜𝑡𝑎𝑜 𝑝𝑎𝑟𝑎 𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑟 𝑛𝑜𝑣𝑎𝑚𝑒𝑛𝑡𝑒', {
                        useTemplateButtons: false,
                        buttons: [{ id: 'calcular_faturamento', text: '🧮 Calcular Faturamento' }]
                    })
                        .then(() => repetirAtendimento(c, b))
                    )
                )
        } else if (porcentagem >= 100000) {
            b.sendText(c.from, '*❌ 𝐄𝐑𝐑𝐎*\n\nValor inserido incorretamente.\nÉ um valor absurdo.\nPeço que tente novamente.\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*')
        }

    } else if (conta < d) {

        let total = (d - conta);

        let porcentagem = percentage(conta, d);

        let resultado = (`${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);

        if (porcentagem < 100 && porcentagem >= 10) {
            alterarStatusOff()
                .then(() => b.sendText(c.from, `*✅ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\nVocê já faturou *${String(porcentagem).substring(0, 4)}%* do seu limite.\n\nVocê ainda pode faturar: *${resultado}* até o final do ano.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)\n𝑈𝑡𝑖𝑙𝑖𝑧𝑒 𝑜 𝑏𝑜𝑡𝑎𝑜 𝑝𝑎𝑟𝑎 𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑟 𝑛𝑜𝑣𝑎𝑚𝑒𝑛𝑡𝑒`, {
                    useTemplateButtons: false,
                    buttons: [{ id: 'calcular_faturamento', text: '🧮 Calcular Faturamento' }]
                })
                    .then(() => repetirAtendimento(c, b))
                )

        } else if (porcentagem < 10) {
            alterarStatusOff()
                .then(() => b.sendText(c.from, `*✅ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎*\n\nVocê já faturou *${String(porcentagem).substring(0, 4)}%* do seu limite.\n\nVocê ainda pode faturar: *${resultado}* até o final do ano.\n\n(𝑃𝑎𝑟𝑡𝑒 𝟙/𝟙)\n𝑈𝑡𝑖𝑙𝑖𝑧𝑒 𝑜 𝑏𝑜𝑡𝑎𝑜 𝑝𝑎𝑟𝑎 𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑟 𝑛𝑜𝑣𝑎𝑚𝑒𝑛𝑡𝑒`, {
                    useTemplateButtons: false,
                    buttons: [{ id: 'calcular_faturamento', text: '🧮 Calcular Faturamento' }]
                })
                    .then(() => repetirAtendimento(c, b))
                )
        }
    }
}

// CALCULAR FATURAMENTO (2/2)
// valor = number valorBruto = rawPrice c = client d = message e = user f = db
async function respostaFaturamento(valor, valorBruto, c, d, e, f) {
    if (valorBruto !== valorBruto) {
        c.sendText(d.from, '*❌ 𝐄𝐑𝐑𝐎*\n\nValor inserido incorretamente.\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*')
    }
    if (typeof valorBruto === 'number' && String(valorBruto).length >= 5) {
        passouDoLimite(valorBruto, c, d, valor, e, f);
    }
    if (String(valorBruto).length < 5) {
        c.sendText(d.from, '*❌ 𝐄𝐑𝐑𝐎*\n\nValor inserido incorretamente.\n\n*Modelo:* _00.000,00_\n*Mínimo:* _100,00_\n\n𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*')
    }
}

// a = message, b = client, c = user, d = fila, e = tipo de atendimento
function filaDeAtendimento(a, b, c, d, e) {

    if (d.length() === 4) {
        b.sendText(a.from, 'Nossos colaboradores estão ocupados no momento, *tente novamente* em breve.')
            .then(() => setTimeout(() => perguntasMei('Enquanto isso, que tal utilizar nosso *Assistente Virtual*?', b, a.from)
                .then(() => setTimeout(() => b.sendText(a.from, 'Sempre que desejar ser atendido(a), escreva *"Atendimento"* 🤗'), 1500)), 1500))
    } else if (d.length() <= 3) {
        d.enqueue(c);

        let ultimo = d.length()
        ultimo = ultimo - 1;

        function posicaoAtualFila() {
            if (d.elements[0] !== c) {
                b.sendText(d.elements[ultimo] + '@c.us', `*Posição atual: ${d.length()}*`)
                    .then(() => setTimeout(() => perguntasMei('Enquanto isso, que tal utilizar nosso *Assistente Virtual*?', b, a.from)))
            }

            if (d.elements[0] === c) {
                b.sendText(d.elements[0] + '@c.us', `*Posição atual: ${d.length()}*\n*Você será o próximo!*`)
                    .then(() => setTimeout(() => perguntasMei('Enquanto isso, que tal utilizar nosso *Assistente Virtual*?', b, a.from)))
            }
        }

        b.sendText(a.from, `*Você entrou na fila de atendimento para ${e}*.\n_Em breve será atendido(a)_.`)
            .then(() => b.sendText(a.from, `𝑃𝑎𝑟𝑎 𝑐𝑎𝑛𝑐𝑒𝑙𝑎𝑟 𝑜 𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜, 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑐𝑎𝑛𝑐𝑒𝑙𝑎𝑟 𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*`)
                .then(() => posicaoAtualFila())
            )

        if (e === 'Consultoria') {
            b.sendText('120363026676372633@g.us', `🤖💬\nExiste *${d.length()}* *atendimento(s)* em *espera*.\n\nTipo de atendimento: *${e}* \n\nUse */atender ${e}* para falar com o *1º desta fila*.`)
        }

        if (e === 'Contratar Plano') {
            b.sendText('120363043600410941@g.us', `🤖💬\nExiste *${d.length()}* *atendimento(s)* em *espera*.\n\nTipo de atendimento: *${e}* \n\nUse */atender ${e}* para falar com o *1º desta fila*.`)
        }

        if (e === 'Contratar Serviço') {
            b.sendText('120363025860174520@g.us', `🤖💬\nExiste *${d.length()}* *atendimento(s)* em *espera*.\n\nTipo de atendimento: *${e}* \n\nUse */atender ${e}* para falar com o *1º desta fila*.`)
        }
    }

}
// a = message, b = client
async function cancelarAtendimento(a, b, c, d, e) {
    b.sendText(a.from, `Ok! Atendimento cancelado 😉`)
        .then(() => mensagemInicial(a, b, c, d, e))
}

// a = message, b = client, c = fila, d = tipo de atendimento
async function mandarFilaBot(a, b, c, d) {

    if (d === 'Consultoria') {
        if (c.length() > 0) {
            b.sendText('120363026676372633@g.us', `🤖💬\nExiste *${c.length()}* *atendimento(s)* em *espera*.\n\nAlguém da fila cancelou o atendimento.\n\nTipo de atendimento: *${d}* \n\nUse */atender ${d}* para falar com o *1º desta fila*.`)
        } else if (c.length() <= 0) {
            b.sendText('120363026676372633@g.us', `🤖💬\nNão existe atendimentos de *${d}* em espera.\n\nQuem estava na fila cancelou o atendimento.`)
        }
    }

    if (d === 'Contratar Serviço') {
        if (c.length() > 0) {
            b.sendText('120363025860174520@g.us', `🤖💬\nExiste *${c.length()}* *atendimento(s)* em *espera*.\n\nAlguém da fila cancelou o atendimento.\n\nTipo de atendimento: *${d}* \n\nUse */atender ${d}* para falar com o *1º desta fila*.`)
        } else if (c.length() <= 0) {
            b.sendText('120363025860174520@g.us', `🤖💬\nNão existe atendimentos de *${d}* em espera.\n\nQuem estava na fila cancelou o atendimento.`)
        }
    }

    if (d === 'Contratar Plano') {
        if (c.length() > 0) {
            b.sendText('120363043600410941@g.us', `🤖💬\nExiste *${c.length()}* *atendimento(s)* em *espera*.\n\nAlguém da fila cancelou o atendimento.\n\nTipo de atendimento: *${d}* \n\nUse */atender ${d}* para falar com o *1º desta fila*.`)
        } else if (c.length() <= 0) {
            b.sendText('120363043600410941@g.us', `🤖💬\nNão existe atendimentos de *${d}* em espera.\n\nQuem estava na fila cancelou o atendimento.`)
        }
    }

}


// a = message, b = client, c = quantidadeConsultoria d = planoContratado e = db.setStatusConfirmarConsultoria
function verificarPlano(a, b, c, d, e) {
    if (d !== 'não-cadastrado' && c !== 'não-cadastrado') {

        if (c > 0 || c === 'ilimitado') {
            b.sendText(a.from, `Plano Contratado: *${d}*\nNº Consultorias Disponíveis: *${c}*.\n\n_Deseja *confirmar* a solicitação de atendimento?_`, {
                useTemplateButtons: false,
                buttons: [{ id: 'confirmar_consultoria', text: 'Sim, solicitar consultoria' }, { id: 'negar_consultoria', text: 'Não, cancelar atendimento' }]
            }).then(async () => await e)
        }

        if (c === 0) {
            b.sendText(a.from, `Plano Contratado: *${d}*\nNº Consultorias Disponíveis: *${c}*.\n\n_Suas consultorias mensais *acabaram*. Aguarde até o próximo mês para receber mais consultorias de acordo com seu plano ou então contrate nosso serviço de *Consultoria* de forma *Avulsa*._\n\nPossuindo interesse em *atualizar seu plano*, utilize o *botão* *Contratar Plano*.\n\n𝑃𝑎𝑟𝑎 𝑐𝑎𝑛𝑐𝑒𝑙𝑎𝑟 𝑜 𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜, 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑐𝑎𝑛𝑐𝑒𝑙𝑎𝑟 𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*`, {
                useTemplateButtons: false,
                buttons: [{ id: 'assunto_servico', text: 'Contratar Serviço' }, { id: 'assunto_plano', text: 'Contratar Plano' }]
            })
        }

    } else if (d === 'não-cadastrado') {

        b.sendText(a.from, `Parece que você *não possui* nenhum *plano* contratado atualmente.\n\nA OCC oferece *atendimento automatizado* através do nosso *Assistente Virtual* de forma *gratuita*, porém, serviços de *consultoria* com nossos colaboradores são feitos somente mediante contratação de *plano* *mensal* ou *contratação* de *serviço avulso* *(Consultoria)*.\n\n*Escolha uma opção para continuar*.\n\n𝑃𝑎𝑟𝑎 𝑐𝑎𝑛𝑐𝑒𝑙𝑎𝑟 𝑜 𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜, 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑐𝑎𝑛𝑐𝑒𝑙𝑎𝑟 𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*`, {
            useTemplateButtons: false,
            buttons: [{ id: 'assunto_servico', text: 'Contratar Serviço' }, { id: 'assunto_plano', text: 'Contratar Plano' }]
        })

    }
}

// a = message b = client c = atualizarTempo() d = regexForaExpediente e = nomeUsuario f = user g = db.setStatusAtendimento
function respostaChatAtendente(a, b, c, d, e, f) {
    let date = new Date();
    let day = date.getDay();
    if (day === 0 || day === 6) {
        mensagemForaExpediente(a, b, e);
    } else if (day === 1 || day === 2 || day === 3 || day === 4 || day === 5) {
        if (d.test(c) === true) {
            mensagemForaExpediente(a, b, e);
        } else if (d.test(c) === false) {
            b.sendText(a.from, `*Qual o assunto do atendimento?*\n\n𝑃𝑎𝑟𝑎 𝑐𝑎𝑛𝑐𝑒𝑙𝑎𝑟 𝑜 𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜, 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 *"𝑐𝑎𝑛𝑐𝑒𝑙𝑎𝑟 𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"*`, {
                useTemplateButtons: false,
                buttons: [{ id: 'assunto_consultoria', text: 'Solicitar Consultoria' }, { id: 'assunto_servico', text: 'Contratar Serviço' }, { id: 'assunto_plano', text: 'Contratar Plano' }]
            }).then(async () => await f)
        }
    }
}

function respostaLigarRamal(a, b, c, d, e) {
    let date = new Date();
    let day = date.getDay();
    if (day === 0 || day === 6) {
        mensagemForaExpediente(a, b, e);
    } else if (day === 1 || day === 2 || day === 3 || day === 4 || day === 5) {
        if (d.test(c) === true) {
            mensagemForaExpediente(a, b, e);
        } else if (d.test(c) === false) {
            b.sendText(a.from, `*☎️ 𝐓𝐄𝐋𝐄𝐅𝐎𝐍𝐄 𝐅𝐈𝐗𝐎*\n\nEntre em contato conosco via telefone:\n*(11) 2984-3950 | Ramal 7279 - Matheus*`);
        }
    }
}

// a = message b = client c = atualizarTempo() d = regexForaExpediente e = nomeUsuario
function mensagemInicial(a, b, c, d, e) {
    let date = new Date();
    let day = date.getDay();
    if (day === 0 || day === 6) {
        mensagemForaExpediente(a, b, e)
    } else if (day === 1 || day === 2 || day === 3 || day === 4 || day === 5) {
        if (d.test(c) === true) {
            mensagemForaExpediente(a, b, e)
        } else if (d.test(c) === false) {
            mensagemExpediente(a, b, e)
        }
    }
}

function mensagemInicialCadastro(a, b, c, d, e) {
    let date = new Date();
    let day = date.getDay();
    if (day === 0 || day === 6) {
        b.sendText(a.from, `Certo *${e}*! Agora você está cadastrado(a)! 😄`)
            .then(() => setTimeout(() => b.sendText(a.from, `Porém, infelizmente não temos atendentes no momento 🥲`)
                .then(() => setTimeout(() => b.sendText(a.from, '*🕗 𝐀𝐓𝐄𝐍𝐃𝐈𝐌𝐄𝐍𝐓𝐎*\n\n```Domingo   ꜰᴇᴄʜᴀᴅᴀ\nSegunda   08:00h - 18:00h\nTerça     08:00h - 18:00h\nQuarta    08:00h - 18:00h\nQuinta    08:00h - 18:00h\nSexta     08:00h - 18:00h\nSábado    ꜰᴇᴄʜᴀᴅᴀ\n\nAlmoço    12:00h - 13:20h```')
                    .then(() => setTimeout(() => perguntasMei('*Mas não se preocupe!*\n\nVocê ainda pode utilizar nosso *𝐀𝐔𝐓𝐎𝐀𝐓𝐄𝐍𝐃𝐈𝐌𝐄𝐍𝐓𝐎 𝐌𝐄𝐈* pressionando o *botão* abaixo 🤩', b, a.from)
                        .then(() => setTimeout(() => b.sendText(a.from, 'Sempre que desejar ser atendido(a), escreva *"Atendimento"* 🤗'), 1500)), 1500)), 1500)), 1500))
    } else if (day === 1 || day === 2 || day === 3 || day === 4 || day === 5) {
        if (d.test(c) === true) {
            b.sendText(a.from, `Certo *${e}*! Agora você está cadastrado(a)! 😄`)
                .then(() => setTimeout(() => b.sendText(a.from, `Porém, infelizmente não temos atendentes no momento 🥲`)
                    .then(() => setTimeout(() => b.sendText(a.from, '*🕗 𝐀𝐓𝐄𝐍𝐃𝐈𝐌𝐄𝐍𝐓𝐎*\n\n```Domingo   ꜰᴇᴄʜᴀᴅᴀ\nSegunda   08:00h - 18:00h\nTerça     08:00h - 18:00h\nQuarta    08:00h - 18:00h\nQuinta    08:00h - 18:00h\nSexta     08:00h - 18:00h\nSábado    ꜰᴇᴄʜᴀᴅᴀ\n\nAlmoço    12:00h - 13:20h```')
                        .then(() => setTimeout(() => perguntasMei('*Mas não se preocupe!*\n\nVocê ainda pode utilizar nosso *𝐀𝐔𝐓𝐎𝐀𝐓𝐄𝐍𝐃𝐈𝐌𝐄𝐍𝐓𝐎 𝐌𝐄𝐈* pressionando o *botão* abaixo 🤩', b, a.from)
                            .then(() => setTimeout(() => b.sendText(a.from, 'Sempre que desejar ser atendido(a), escreva *"Atendimento"* 🤗'), 1500)), 1500)), 1500)), 1500))
        } else if (d.test(c) === false) {
            b.sendText(a.from, `Certo *${e}*! Agora você está cadastrado(a)! 😄`)
                .then(() => setTimeout(() => perguntasMei('Pressione o *botão* abaixo para *retirar dúvidas* com nosso *Assistente Virtual*', b, a.from)
                    .then(() => setTimeout(() => botaoAtendimento(b, a.from)
                        .then(() => setTimeout(() => b.sendText(a.from, 'Sempre que desejar ser atendido(a), escreva *"Atendimento"* 🤗'), 1500)), 1500)), 1500))
        }
    }
}

function contratarPlano(a, b) {
    b.sendText(a.from, '*📆 𝐏𝐋𝐀𝐍𝐎𝐒 𝐌𝐄𝐍𝐒𝐀𝐈𝐒*\n\nA *OCC* disponibiliza *Planos Mensais* _(mediante assinatura)_ voltados para *facilitar* e *melhorar* a *administração* do Micro Empreendedor Individual, sendo eles separados em *3 categorias*:')
        .then(() => b.sendImage(a.from, './imgs/plano_bronze.png', 'Plano Bronze', '*» 𝗣𝗟𝗔𝗡𝗢 𝗕𝗥𝗢𝗡𝗭𝗘 🥉*\nCom o nosso plano *inicial*, o *Bronze*, você irá receber:\n\n*• 01 _(uma)_ Consultoria/mês*\n- Assim você pode tirar suas dúvidas com nossos colaboradores.\n*• Emissão e Envio Guia DAS*\n- Mensalmente iremos encaminhar sua guia DAS por mensagem ou email.\n*• Notícias MEI/CNPJ*\n- Te mantemos informado com tudo que há de novo diretamente pelo seu Whatsapp.\n*• Declaração Anual do MEI*\n- Após o período de 06 _(seis)_ meses com o plano contratado, esse serviço estará incluso entre seus benefícios.')
            .then(() => b.sendImage(a.from, './imgs/plano_prata.png', 'Plano Prata', '*» 𝐏𝐋𝐀𝐍𝐎 𝐏𝐑𝐀𝐓𝐀 🥈*\nPara aqueles que desejam *ainda mais vantagens*, oferecemos o *Plano Prata*. Dessa vez, com:\n\n• *03 _(três)_ Consultorias/mês*\n- Para atendimento de dúvidas sobre o MEI.\n*• Emissão e Envio Guia DAS*\n- Através do Whatsapp ou por email, você receberá a sua guia mensal.\n*• Notícias MEI/CNPJ*\n- Recebendo as nossas notícias através de mensagens, você irá ficar por dentro de todas as novidades para o Micro Empreendedor.\n*• Declaração Anual do MEI*\n- Após o período de 06 _(seis)_ meses incluiremos em seu plano a entrega da sua declaração.\n\n_Além de tudo isso, ainda está incluso:_\n\n*• Gerenciamento de Funcionário*\n- Nosso departamento pessoal administrará todas as obrigações que devem ser seguidas quando você, MEI, possuir um funcionário.')
                .then(() => b.sendImage(a.from, './imgs/plano_ouro.png', 'Plano Ouro', '*» 𝐏𝐋𝐀𝐍𝐎 𝐎𝐔𝐑𝐎 🥇*\nAgora com o *Plano Ouro*, você empreendedor, terá acesso a *muito mais benefícios*! São eles:\n\n*• 05 _(cinco)_ Consultorias/mês*\n- Dessa forma, você poderá tirar todas as dúvidas sobre o MEI com a nossa equipe.\n*• Emissão e _PAGAMENTO_ Guia DAS*\n- Sim! A guia DAS já está inclusa na mensalidade.\n*• Declaração Anual do MEI*\n- Possuindo o plano por pelo menos 06 _(seis)_ meses, além de todas as vantagens que já possui, faremos sua Declaração Anual.\n*• Gerenciamento de Funcionário*\n- Nossos colaboradores irão administrar as obrigações do funcionário do MEI.\n\n_Não acabou ainda... 🤭_\n\n*• Emissão de 01 _(uma)_ Nota Fiscal/mês*\nOBS: Apenas para Prestação de Serviços.\n*• Abertura*\n- Faremos até mesmo a abertura do seu MEI caso não tenha ele aberto ainda!')
                )
            )
        )
}

// a = message b = client c = atualizarTempo() d = regexForaExpediente
function planosMensais(a, b, c, d) {

    function oferecerPlanosExpediente(a, b) {
        b.sendText(a.from, '*📆 𝐏𝐋𝐀𝐍𝐎𝐒 𝐌𝐄𝐍𝐒𝐀𝐈𝐒*\n\nA *OCC* disponibiliza *Planos Mensais* _(mediante assinatura)_ voltados para *facilitar* e *melhorar* a *administração* do Micro Empreendedor Individual, sendo eles separados em *3 categorias*:')
            .then(() => b.sendImage(a.from, './imgs/plano_bronze.png', 'Plano Bronze', '*» 𝗣𝗟𝗔𝗡𝗢 𝗕𝗥𝗢𝗡𝗭𝗘 🥉*\nCom o nosso plano *inicial*, o *Bronze*, você irá receber:\n\n*• 01 _(uma)_ Consultoria/mês*\n- Assim você pode tirar suas dúvidas com nossos colaboradores.\n*• Emissão e Envio Guia DAS*\n- Mensalmente iremos encaminhar sua guia DAS por mensagem ou email.\n*• Notícias MEI/CNPJ*\n- Te mantemos informado com tudo que há de novo diretamente pelo seu Whatsapp.\n*• Declaração Anual do MEI*\n- Após o período de 06 _(seis)_ meses com o plano contratado, esse serviço estará incluso entre seus benefícios.')
                .then(() => b.sendImage(a.from, './imgs/plano_prata.png', 'Plano Prata', '*» 𝐏𝐋𝐀𝐍𝐎 𝐏𝐑𝐀𝐓𝐀 🥈*\nPara aqueles que desejam *ainda mais vantagens*, oferecemos o *Plano Prata*. Dessa vez, com:\n\n• *03 _(três)_ Consultorias/mês*\n- Para atendimento de dúvidas sobre o MEI.\n*• Emissão e Envio Guia DAS*\n- Através do Whatsapp ou por email, você receberá a sua guia mensal.\n*• Notícias MEI/CNPJ*\n- Recebendo as nossas notícias através de mensagens, você irá ficar por dentro de todas as novidades para o Micro Empreendedor.\n*• Declaração Anual do MEI*\n- Após o período de 06 _(seis)_ meses incluiremos em seu plano a entrega da sua declaração.\n\n_Além de tudo isso, ainda está incluso:_\n\n*• Gerenciamento de Funcionário*\n- Nosso departamento pessoal administrará todas as obrigações que devem ser seguidas quando você, MEI, possuir um funcionário.')
                    .then(() => b.sendImage(a.from, './imgs/plano_ouro.png', 'Plano Ouro', '*» 𝐏𝐋𝐀𝐍𝐎 𝐎𝐔𝐑𝐎 🥇*\nAgora com o *Plano Ouro*, você empreendedor, terá acesso a *muito mais benefícios*! São eles:\n\n*• 05 _(cinco)_ Consultorias/mês*\n- Dessa forma, você poderá tirar todas as dúvidas sobre o MEI com a nossa equipe.\n*• Emissão e _PAGAMENTO_ Guia DAS*\n- Sim! A guia DAS já está inclusa na mensalidade.\n*• Declaração Anual do MEI*\n- Possuindo o plano por pelo menos 06 _(seis)_ meses, além de todas as vantagens que já possui, faremos sua Declaração Anual.\n*• Gerenciamento de Funcionário*\n- Nossos colaboradores irão administrar as obrigações do funcionário do MEI.\n\n_Não acabou ainda... 🤭_\n\n*• Emissão de 01 _(uma)_ Nota Fiscal/mês*\nOBS: Apenas para Prestação de Serviços.\n*• Abertura*\n- Faremos até mesmo a abertura do seu MEI caso não tenha ele aberto ainda!')
                        .then(() => b.sendText(a.from, '*Ficou interessado(a)? 👀*\n\nEntre em contato agora mesmo com um de nossos colaboradors pressionando o *botão* _"⭐ Contratar Plano"_', {
                            useTemplateButtons: false,
                            buttons: [{ id: 'assunto_plano', text: '⭐ Contratar Plano' }]
                        })
                            .then(() => perguntasMei('*» ᴀᴛᴇɴᴅɪᴍᴇɴᴛᴏ ᴄᴏᴍ ᴀꜱꜱɪꜱᴛᴇɴᴛᴇ ᴠɪʀᴛᴜᴀʟ*', b, a.from))
                        )
                    )
                )
            )
    }

    function oferecerPlanosForaExpediente(a, b) {
        b.sendText(a.from, '*📆 𝐏𝐋𝐀𝐍𝐎𝐒 𝐌𝐄𝐍𝐒𝐀𝐈𝐒*\n\nA *OCC* disponibiliza *Planos Mensais* _(mediante assinatura)_ voltados para *facilitar* e *melhorar* a *administração* do Micro Empreendedor Individual, sendo eles separados em *3 categorias*:')
            .then(() => b.sendImage(a.from, './imgs/plano_bronze.png', 'Plano Bronze', '*» 𝗣𝗟𝗔𝗡𝗢 𝗕𝗥𝗢𝗡𝗭𝗘 🥉*\nCom o nosso plano *inicial*, o *Bronze*, você irá receber:\n\n*• 01 _(uma)_ Consultoria/mês*\n- Assim você pode tirar suas dúvidas com nossos colaboradores.\n*• Emissão e Envio Guia DAS*\n- Mensalmente iremos encaminhar sua guia DAS por mensagem ou email.\n*• Notícias MEI/CNPJ*\n- Te mantemos informado com tudo que há de novo diretamente pelo seu Whatsapp.\n*• Declaração Anual do MEI*\n- Após o período de 06 _(seis)_ meses com o plano contratado, esse serviço estará incluso entre seus benefícios.')
                .then(() => b.sendImage(a.from, './imgs/plano_prata.png', 'Plano Prata', '*» 𝐏𝐋𝐀𝐍𝐎 𝐏𝐑𝐀𝐓𝐀 🥈*\nPara aqueles que desejam *ainda mais vantagens*, oferecemos o *Plano Prata*. Dessa vez, com:\n\n• *03 _(três)_ Consultorias/mês*\n- Para atendimento de dúvidas sobre o MEI.\n*• Emissão e Envio Guia DAS*\n- Através do Whatsapp ou por email, você receberá a sua guia mensal.\n*• Notícias MEI/CNPJ*\n- Recebendo as nossas notícias através de mensagens, você irá ficar por dentro de todas as novidades para o Micro Empreendedor.\n*• Declaração Anual do MEI*\n- Após o período de 06 _(seis)_ meses incluiremos em seu plano a entrega da sua declaração.\n\n_Além de tudo isso, ainda está incluso:_\n\n*• Gerenciamento de Funcionário*\n- Nosso departamento pessoal administrará todas as obrigações que devem ser seguidas quando você, MEI, possuir um funcionário.')
                    .then(() => b.sendImage(a.from, './imgs/plano_ouro.png', 'Plano Ouro', '*» 𝐏𝐋𝐀𝐍𝐎 𝐎𝐔𝐑𝐎 🥇*\nAgora com o *Plano Ouro*, você empreendedor, terá acesso a *muito mais benefícios*! São eles:\n\n*• 05 _(cinco)_ Consultorias/mês*\n- Dessa forma, você poderá tirar todas as dúvidas sobre o MEI com a nossa equipe.\n*• Emissão e _PAGAMENTO_ Guia DAS*\n- Sim! A guia DAS já está inclusa na mensalidade.\n*• Declaração Anual do MEI*\n- Possuindo o plano por pelo menos 06 _(seis)_ meses, além de todas as vantagens que já possui, faremos sua Declaração Anual.\n*• Gerenciamento de Funcionário*\n- Nossos colaboradores irão administrar as obrigações do funcionário do MEI.\n\n_Não acabou ainda... 🤭_\n\n*• Emissão de 01 _(uma)_ Nota Fiscal/mês*\nOBS: Apenas para Prestação de Serviços.\n*• Abertura*\n- Faremos até mesmo a abertura do seu MEI caso não tenha ele aberto ainda!')
                        .then(() => b.sendText(a.from, '*Ficou interessado(a)? 👀*\n\nEntre em contato durante nosso expediente para contratar o plano que desejar!')
                            .then(() => perguntasMei('*» ᴀᴛᴇɴᴅɪᴍᴇɴᴛᴏ ᴄᴏᴍ ᴀꜱꜱɪꜱᴛᴇɴᴛᴇ ᴠɪʀᴛᴜᴀʟ*', b, a.from))
                        )
                    )
                )
            )
    }

    let date = new Date();
    let day = date.getDay();

    if (day === 0 || day === 6) {
        oferecerPlanosForaExpediente(a, b)
    } else if (day === 1 || day === 2 || day === 3 || day === 4 || day === 5) {
        if (d.test(c) === true) {
            oferecerPlanosForaExpediente(a, b)
        } else if (d.test(c) === false) {
            oferecerPlanosExpediente(a, b)
        }
    }

}

// a = message b = client c = atualizarTempo() d = regexForaExpediente
function servicosAvulsos(a, b, c, d) {
    function oferecerServicosExpediente(a, b) {
        b.sendText(a.from, '*🧩 𝐒𝐄𝐑𝐕𝐈Ç𝐎𝐒 𝐀𝐕𝐔𝐋𝐒𝐎𝐒*\n\nAlém dos planos mensais que a *OCC* disponibiliza, também oferecemos *Serviços Avulsos*, ou seja: Um serviço que é feito uma *única vez*, mediante *pagamento individual*.\n\nÉ ideal para aqueles que querem *conhecer a qualidade* de nossos serviços antes de *contratar um plano* ou então para aqueles que necessitam de um *serviço específico*.')
            .then(() => b.sendImage(a.from, './imgs/servicos_avulsos.png', 'Serviços Avulsos', 'Alguns desses serviços também estão inclusos em nossos *Planos Mensais*, por isso, recomendamos que de uma olhada nos mesmos para obter ainda mais vantagens.')
                .then(() => b.sendText(a.from, '*Ficou interessado(a)? 👀*\n\nEntre em contato agora mesmo com um de nossos colaboradors pressionando o *botão* _"⭐ Contratar Serviço"_.\n\nOu então, para saber mais sobre nossas mensalidades, pressione o *botão* _"💎 Conhecer Planos"_.', {
                    useTemplateButtons: false,
                    buttons: [{ id: 'assunto_servicos', text: '⭐ Contratar Serviço' }, { id: 'assunto_plano', text: '💎 Conhecer Planos' }]
                })
                    .then(() => perguntasMei('*» ᴀᴛᴇɴᴅɪᴍᴇɴᴛᴏ ᴄᴏᴍ ᴀꜱꜱɪꜱᴛᴇɴᴛᴇ ᴠɪʀᴛᴜᴀʟ*', b, a.from))
                )
            )
    }

    function oferecerServicosForaExpediente(a, b) {
        b.sendText(a.from, '*🧩 𝐒𝐄𝐑𝐕𝐈Ç𝐎𝐒 𝐀𝐕𝐔𝐋𝐒𝐎𝐒*\n\nAlém dos planos mensais que a *OCC* disponibiliza, também oferecemos *Serviços Avulsos*, ou seja: Um serviço que é feito uma *única vez*, mediante *pagamento individual*.\n\nÉ ideal para aqueles que querem *conhecer a qualidade* de nossos serviços antes de *contratar um plano* ou então para aqueles que necessitam de um *serviço específico*.')
            .then(() => b.sendImage(a.from, './imgs/servicos_avulsos.png', 'Serviços Avulsos', 'Alguns desses serviços também estão inclusos em nossos *Planos Mensais*, por isso, recomendamos que de uma olhada nos mesmos para obter ainda mais vantagens.')
                .then(() => b.sendText(a.from, '*Ficou interessado(a)? 👀*\n\nEntre em contato durante nosso expediente para contratar o serviço que desejar!\n\nOu então, para saber mais sobre nossas mensalidades, pressione o *botão* _"💎 Conhecer Planos"_.', {
                    useTemplateButtons: false,
                    buttons: [{ id: 'assunto_plano', text: '💎 Conhecer Planos' }]
                })
                    .then(() => perguntasMei('*» ᴀᴛᴇɴᴅɪᴍᴇɴᴛᴏ ᴄᴏᴍ ᴀꜱꜱɪꜱᴛᴇɴᴛᴇ ᴠɪʀᴛᴜᴀʟ*', b, a.from))
                )
            )
    }

    let date = new Date();
    let day = date.getDay();

    if (day === 0 || day === 6) {
        oferecerServicosForaExpediente(a, b)
    } else if (day === 1 || day === 2 || day === 3 || day === 4 || day === 5) {
        if (d.test(c) === true) {
            oferecerServicosForaExpediente(a, b)
        } else if (d.test(c) === false) {
            oferecerServicosExpediente(a, b)
        }
    }
}

function contratarServico(a, b) {
    b.sendText(a.from, '*🧩 𝐒𝐄𝐑𝐕𝐈Ç𝐎𝐒 𝐀𝐕𝐔𝐋𝐒𝐎𝐒*\n\nAlém dos planos mensais que a *OCC* disponibiliza, também oferecemos *Serviços Avulsos*, ou seja: Um serviço que é feito uma *única vez*, mediante *pagamento individual*.\n\nÉ ideal para aqueles que querem *conhecer a qualidade* de nossos serviços antes de *contratar um plano* ou então para aqueles que necessitam de um *serviço específico*.')
        .then(() => b.sendImage(a.from, './imgs/servicos_avulsos.png', 'Serviços Avulsos', 'Alguns desses serviços também estão inclusos em nossos *Planos Mensais*, por isso, recomendamos que de uma olhada nos mesmos para obter ainda mais vantagens.')
        )
}

module.exports = {
    mensagemExpediente,
    mensagemForaExpediente,
    resposta01,
    resposta02,
    resposta03,
    resposta04,
    resposta05,
    resposta06,
    resposta07,
    resposta08,
    resposta09,
    resposta10,
    resposta11,
    resposta12,
    resposta13,
    resposta14,
    resposta15,
    resposta16,
    resposta18,
    primeiraVez,
    cnpjSim,
    cnpjIncorreto,
    modeloTermo,
    limiteFaturamentoValorBruto,
    limiteFaturamento,
    emancipacao,
    valorBruto,
    faturamentoJaneiro,
    faturamentoFevereiro,
    faturamentoMarco,
    faturamentoAbril,
    faturamentoMaio,
    faturamentoJunho,
    faturamentoJulho,
    faturamentoAgosto,
    faturamentoSetembro,
    faturamentoOutubro,
    faturamentoNovembro,
    faturamentoDezembro,
    faturamentoPadrao,
    modeloRelatorioReceitasBrutas,
    limiteUltrapassado,
    cadastroErro,
    corrigirCadastro,
    cnpjCCMEI,
    diferencaPJPF,
    condicoesFuncionarios,
    filialNoMEI,
    licitacoes,
    consultaPrevia,
    habiteSe,
    naturezaJuridica,
    respostaFaturamento,
    passouDoLimite,
    respostaChatAtendente,
    mensagemInicial,
    respostaLigarRamal,
    perguntarNome,
    confirmarNome,
    corrigirNome,
    nomeNaoConfirmado,
    nomeInvalido,
    meiNaoConfirmado,
    modeloRelatorioReceitasBrutasSebrae,
    modeloContasPagar,
    modeloContasReceber,
    declaracaoAnual,
    dicasControleMensal,
    mesNaoInformado,
    formalizacaoNaoConfirmado,
    mensagemInicialCadastro,
    perguntarNomeRecuperacao,
    perguntarMeiRecuperacao,
    verificarPlano,
    filaDeAtendimento,
    cancelarAtendimento,
    contratarPlano,
    mandarFilaBot,
    planosMensais,
    servicosAvulsos,
    contratarServico
}