// src/pages/public-profile/profiles/blogger/ProfileFeedsContent.tsx
import React, { useState, useMemo } from 'react'; // Importe useState e useMemo
import { Collaborate } from '../blogger';
import { IStatisticsItems, Statistics, Summary } from '../creator';
import { Tags } from '../default';
import { Post1 } from './blocks/Post1';
// REMOVIDO: Não vamos mais importar postsFromBackend diretamente aqui
// import { postsFromBackend } from './mockPosts'; 
import type { IPostData } from './types';

// Definindo os tipos de temas para melhor clareza
type FeedTheme = 'mentalHealth' | 'workSafety' | 'sleepWellbeing';

// ESTRUTURA DE DADOS DOS POSTS POR TEMA
const postsByTheme: Record<FeedTheme, IPostData[]> = {
  mentalHealth: [
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
  ],
  workSafety: [
    {
      content: {
        author: 'Eng. Ricardo Silva',
        avatar: '300-2.png',
        date: 'Ontem às 09:00',
        introText: 'Conhecer e seguir as normas de segurança é crucial para um ambiente de trabalho sem acidentes.',
        warningTitle: '🚨 Principais NRs:',
        warningList: [
          'NR 1 - Disposições Gerais',
          'NR 5 - CIPA',
          'NR 6 - Equipamento de Proteção Individual (EPI)',
          'NR 17 - Ergonomia'
        ],
        closingText: 'Sua vida vale mais que qualquer pressa. Priorize a segurança!'
      },
      comments: []
    },
    {
      content: {
        author: 'Eng. Ricardo Silva',
        avatar: '300-2.png',
        date: 'Ontem às 10:30',
        introText: 'A prevenção é o melhor remédio para acidentes. Atenção aos detalhes faz a diferença.',
        warningTitle: '✅ Dicas de Prevenção:',
        warningList: [
          'Mantenha o local de trabalho organizado',
          'Sinalize áreas de risco',
          'Use EPIs corretamente',
          'Reporte condições inseguras'
        ],
        closingText: 'Um ambiente seguro é responsabilidade de todos.'
      },
      comments: []
    },
    {
      content: {
        author: 'Eng. Ricardo Silva',
        avatar: '300-2.png',
        date: 'Ontem às 11:45',
        introText: 'Em caso de emergência, saber agir rapidamente é fundamental. Prepare-se!',
        warningTitle: '🔥 Plano de Evacuação:',
        warningList: [
          'Conheça as rotas de fuga',
          'Saiba a localização dos extintores',
          'Identifique os pontos de encontro',
          'Siga as orientações da brigada de incêndio'
        ],
        closingText: 'Estar preparado é garantir sua segurança e a dos seus colegas.'
      },
      comments: []
    }
  ],
  sleepWellbeing: [
    {
      content: {
        author: 'Dr. Pedro Costa',
        avatar: '300-3.png',
        date: 'Há 2 dias às 08:00',
        introText: 'A qualidade do sono impacta diretamente sua produtividade e humor. Invista no seu descanso!',
        warningTitle: '😴 Sinais de um bom sono:',
        warningList: [
          'Acordar sentindo-se descansado',
          'Ter energia ao longo do dia',
          'Bom humor e concentração',
          'Facilidade em adormecer'
        ],
        closingText: 'Durma bem, viva melhor!'
      },
      comments: []
    },
    {
      content: {
        author: 'Dr. Pedro Costa',
        avatar: '300-3.png',
        date: 'Há 2 dias às 09:30',
        introText: 'Sua alimentação influencia muito seu sono. O que você come antes de dormir?',
        warningTitle: '🍎 Alimentos para um bom sono:',
        warningList: [
          'Chás relaxantes (camomila, cidreira)',
          'Leite morno',
          'Castanhas e nozes',
          'Frutas como banana e cereja'
        ],
        closingText: 'Evite cafeína e refeições pesadas à noite.'
      },
      comments: []
    },
    {
      content: {
        author: 'Dr. Pedro Costa',
        avatar: '300-3.png',
        date: 'Há 2 dias às 11:00',
        introText: 'Crie um ritual noturno para sinalizar ao seu corpo que é hora de relaxar.',
        warningTitle: '✨ Rotina de Relaxamento:',
        warningList: [
          'Tomar um banho morno',
          'Ler um livro (evite telas!)',
          'Ouvir música calma',
          'Praticar alongamento leve ou meditação'
        ],
        closingText: 'Desligue-se para se conectar com o seu sono.'
      },
      comments: []
    }
  ],
};


const ProfileFeedsContent = () => {
  const data: IStatisticsItems = [
    { title: 'Connections', value: '5.3k' },
    { title: 'Uploads', value: '28.9k' }
  ];

  // Estado para controlar o tema dos feeds
  const [selectedFeedTheme, setSelectedFeedTheme] = useState<FeedTheme>('mentalHealth');

  // NOVO: Seleciona os posts com base no tema escolhido
  const currentPosts = useMemo(() => postsByTheme[selectedFeedTheme], [selectedFeedTheme]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          {/* <Statistics data={data} /> */}

          <Summary title="Perfil" selectedTheme={selectedFeedTheme} />

          {/* <Collaborate title="Open to work" /> */}

          <Tags title="Tópicos" selectedTheme={selectedFeedTheme} />
        </div>
      </div>
      <div className="col-span-2">
        {/* Seletor de Tema para os Posts */}
        <div className="card rounded-2xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <label htmlFor="feed-theme-select" className="block text-base font-semibold text-gray-900 dark:text-white mb-3">
            Ver Conteúdo por Tema:
          </label>
          <select
            id="feed-theme-select"
            value={selectedFeedTheme}
            onChange={(e) => setSelectedFeedTheme(e.target.value as FeedTheme)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="mentalHealth">Saúde Mental</option>
            <option value="workSafety">Segurança do Trabalho</option>
            <option value="sleepWellbeing">Qualidade de Sono e Bem-estar</option>
          </select>
        </div>

        <div className="flex flex-col gap-y-1 lg:gap-y-2">
          {/* RENDERIZA OS POSTS BASEADOS NO TEMA SELECIONADO */}
          {currentPosts.map((post: IPostData, index: number) => (
            <Post1 key={index} content={post.content} comments={post.comments} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { ProfileFeedsContent };