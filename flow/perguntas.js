const perguntasMei = async (a, b, c) => {
    b.sendListMessage(c, {
        buttonText: 'Autoatendimento',
        description: `${a}`,
        sections: [
            {
                title: 'Em caso de demais dúvidas, fale com um atendente.',
                rows: [
                    {
                        rowId: 'pergunta_planos',
                        title: '📆 PLANOS MENSAIS',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_servicos',
                        title: '🧩 SERVIÇOS AVULSOS',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_1',
                        title: '[1] • Requisitos para ser MEI',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_2',
                        title: '[2] • Atividades (CNAE) permitidas no MEI',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_3',
                        title: '[3] • Vantagens de ser MEI',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_4',
                        title: '[4] • Benefícios INSS e Tempo de Contribuição',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_5',
                        title: '[5] • Dispensa de Alvarás e Licenças',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_6',
                        title: '[6] • Como formalizar o MEI?',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_7',
                        title: '[7] • Servidor Público pode ser MEI?',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_8',
                        title: '[8] • Quanto o MEI paga por mês?',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_9',
                        title: '[9] • Como emitir a guia DAS?',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_10',
                        title: '[10] • Declaração anual do MEI',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_11',
                        title: '[11] • Alterar o Cadastro do MEI',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_12',
                        title: '[12] • Encerramento (Baixa) do MEI',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_13',
                        title: '[13] • Notas Fiscais',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_14',
                        title: '[14] • Desenquadramento do MEI',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_15',
                        title: '[15] • Dicas de Controle Mensal',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_16',
                        title: '[16] • Devo Declarar Imposto de Renda?',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_17',
                        title: '[17] • Limite de Faturamento',
                        description: '',
                    },
                    {
                        rowId: 'pergunta_18',
                        title: '[18] • Dúvidas Frequentes',
                        description: '',
                    },
                ],
            },
        ],
    });
}

const botaoAtendimento = async (a, b) => {
    a.sendText(b, 'Ou então, *fale com nossos colaboradores*', {
        useTemplateButtons: false,
        buttons: [
            // {
            //     url: 'https://occ.com.br/contabilidade-para-mei/',
            //     text: 'Site'
            // },
            {
                id: 'ligar_ramal',
                text: '☎️ Ligar Telefone Fixo'
            },
            {
                id: 'chamar_atendente',
                text: '💬 Chat com Atendente'
            }
        ],
        footer: 'ᴠᴇʀɪꜰɪᴄᴀʀ ʜᴏʀᴀʀɪᴏꜱ ᴅᴇ ᴅɪꜱᴘᴏɴɪʙɪʟɪᴅᴀᴅᴇ'
    })
}

const chatAtendente = async (a, b) => {
    b.sendText(a, '*» ᴀᴛᴇɴᴅɪᴍᴇɴᴛᴏ ᴄᴏᴍ ᴄᴏʟᴀʙᴏʀᴀᴅᴏʀ*', {
        useTemplateButtons: false,
        buttons: [
            {
                id: 'chamar_atendente',
                text: '💬 Chat com Atendente'
            }
        ],
        footer: 'ᴠᴇʀɪꜰɪᴄᴀʀ ʜᴏʀᴀʀɪᴏꜱ ᴅᴇ ᴅɪꜱᴘᴏɴɪʙɪʟɪᴅᴀᴅᴇ'
    })
}

function faturamento1(a, b) {

    b.sendText(a.from, '*🧮 𝐂𝐀𝐋𝐂𝐔𝐋𝐀𝐑 𝐅𝐀𝐓𝐔𝐑𝐀𝐌𝐄𝐍𝐓𝐎*\n\nOlá! Para poder calcular o seu *Limite de Faturamento*, peço que por gentileza me informe:\n\n*Você formalizou o MEI este ano?*', {
        useTemplateButtons: false,
        buttons: [
            {
                id: 'faturamento_sim',
                text: 'Sim, formalizei este ano'
            },
            {
                id: 'faturamento_nao',
                text: 'Não, formalizei em outro ano'
            }
        ],
        footer: '𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 "𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"'
    })

}

function faturamento2(a, b) {

    b.sendListMessage(a.from, {
        buttonText: 'Escolher mês',
        description: `*🧮 𝐂𝐀𝐋𝐂𝐔𝐋𝐀𝐑 𝐅𝐀𝐓𝐔𝐑𝐀𝐌𝐄𝐍𝐓𝐎*\n\nCerto! Em que mês você formalizou?`,
        sections: [
            {
                title: 'Escolher mês',
                rows: [
                    {
                        rowId: 'mes_1',
                        title: '[1] • Janeiro',
                        description: '',
                    },
                    {
                        rowId: 'mes_2',
                        title: '[2] • Fevereiro',
                        description: '',
                    },
                    {
                        rowId: 'mes_3',
                        title: '[3] • Março',
                        description: '',
                    },
                    {
                        rowId: 'mes_4',
                        title: '[4] • Abril',
                        description: '',
                    },
                    {
                        rowId: 'mes_5',
                        title: '[5] • Maio',
                        description: '',
                    },
                    {
                        rowId: 'mes_6',
                        title: '[6] • Junho',
                        description: '',
                    },
                    {
                        rowId: 'mes_7',
                        title: '[7] • Julho',
                        description: '',
                    },
                    {
                        rowId: 'mes_8',
                        title: '[8] • Agosto',
                        description: '',
                    },
                    {
                        rowId: 'mes_9',
                        title: '[9] • Setembro',
                        description: '',
                    },
                    {
                        rowId: 'mes_10',
                        title: '[10] • Outubro',
                        description: '',
                    },
                    {
                        rowId: 'mes_11',
                        title: '[11] • Novembro',
                        description: '',
                    },
                    {
                        rowId: 'mes_12',
                        title: '[12] • Dezembro',
                        description: '',
                    },
                ],
            },
        ],
        footer: '𝑃𝑎𝑟𝑎 𝑒𝑛𝑐𝑒𝑟𝑟𝑎𝑟 𝑒𝑠𝑐𝑟𝑒𝑣𝑎 "𝑎𝑡𝑒𝑛𝑑𝑖𝑚𝑒𝑛𝑡𝑜"'
    })

}

module.exports = {
    perguntasMei,
    botaoAtendimento,
    chatAtendente,
    faturamento1,
    faturamento2
}