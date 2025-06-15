import { IPostData } from './types';
import { postData, postComments } from './blocks';

export const postsFromBackend: IPostData[] = [
  {
    content: postData,
    comments: postComments
  },
  {
    content: {
      author: 'Dra. Helena Martins',
      avatar: '300-1.png',
      date: 'Hoje às 10:00',
      introText: 'O autocuidado é essencial para manter o equilíbrio emocional no dia a dia.',
      warningTitle: '✅ Dicas de autocuidado:',
      warningList: [
        'Durma bem e respeite seu horário de descanso',
        'Faça pequenas pausas durante o trabalho',
        'Alimente-se de forma saudável',
        'Inclua momentos de lazer na sua rotina'
      ],
      closingText: 'Lembre-se: cuidar de você é o primeiro passo para cuidar dos outros.'
    },
    comments: []
  },
  {
    content: {
      author: 'Dra. Helena Martins',
      avatar: '300-1.png',
      date: 'Hoje às 11:00',
      introText: 'Respirar fundo pode ser a melhor resposta em momentos de tensão.',
      warningTitle: '✅ Técnica simples de respiração:',
      warningList: [
        'Inspire pelo nariz contando até 4',
        'Segure o ar por 4 segundos',
        'Expire lentamente pela boca contando até 6',
        'Repita o ciclo 5 vezes'
      ],
      closingText: 'Use essa técnica sempre que sentir ansiedade ou estresse.'
    },
    comments: []
  },
  {
    content: {
      author: 'Dra. Helena Martins',
      avatar: '300-1.png',
      date: 'Hoje às 12:30',
      introText: 'Ter uma rede de apoio emocional faz toda a diferença nos momentos difíceis.',
      warningTitle: '✅ Como fortalecer sua rede de apoio:',
      warningList: [
        'Mantenha contato com amigos e familiares',
        'Compartilhe o que está sentindo com pessoas de confiança',
        'Participe de grupos de apoio ou iniciativas da empresa',
        'Não tenha vergonha de pedir ajuda quando precisar'
      ],
      closingText: 'Conexão e acolhimento ajudam a superar desafios.'
    },
    comments: []
  },
  {
    content: {
      author: 'Dra. Helena Martins',
      avatar: '300-1.png',
      date: 'Hoje às 13:00',
      introText: 'Se precisar, procure orientação de um especialista em saúde mental.',
      externalLinks: [
        { label: 'Agendar atendimento com psicólogo', url: 'https://example.com/agendamento-consulta' }
      ],
      closingText: 'Profissionais podem te ajudar a encontrar o melhor caminho para o equilíbrio emocional.'
    },
    comments: []
  },
  {
    content: {
      author: 'Dra. Helena Martins',
      avatar: '300-1.png',
      date: 'Hoje às 14:00',
      introText: 'Existem diversos recursos online gratuitos para cuidar da sua saúde mental.',
      externalLinks: [
        { label: 'Guia de Saúde Mental no Trabalho', url: 'https://example.com/guia-saude-mental' },
        { label: 'E-book de Autocuidado', url: 'https://example.com/ebook-autocuidado' },
        { label: 'Portal do Ministério da Saúde', url: 'https://www.gov.br/saude' }
      ],
      closingText: 'Use a tecnologia a seu favor. Informação salva vidas!'
    },
    comments: []
  },
  {
    content: {
      author: 'Dra. Helena Martins',
      avatar: '300-1.png',
      date: 'Hoje às 15:00',
      introText: 'Fazer parte de uma comunidade de apoio pode ajudar muito na saúde emocional.',
      warningTitle: '✅ Benefícios de participar de grupos de apoio:',
      warningList: [
        'Trocar experiências com pessoas que passam por situações semelhantes',
        'Receber orientações e acolhimento',
        'Reduzir a sensação de isolamento',
        'Ampliar seu círculo de suporte emocional'
      ],
      closingText: 'Você não precisa passar por isso sozinho.'
    },
    comments: []
  },
  {
    content: {
      author: 'Dra. Helena Martins',
      avatar: '300-1.png',
      date: 'Hoje às 16:00',
      introText: 'A meditação guiada é uma forma simples de aliviar o estresse e promover o bem-estar.',
      videoUrl: 'https://www.youtube.com/embed/sJjyX9W-E-Y',
      closingText: 'Reserve alguns minutos do seu dia e experimente.'
    },
    comments: []
  }
  
];
