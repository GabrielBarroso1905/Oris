import { useState } from 'react';
import { Comments, Heading, Likes, Saves, Tabs } from '../post/';

const postData: IPostContent = {
  author: 'Dra. Helena Martins',
  avatar: '300-1.png',
  date: 'Ontem às 17:06',
  introText: 'Você se sente esgotado, sem energia e com dificuldade de concentração? Esses podem ser sinais de Burnout.',
  warningTitle: '⚠️ Principais sinais de alerta:',
  warningList: [
    'Cansaço físico e emocional constante',
    'Falta de motivação no trabalho',
    'Irritabilidade e alterações de humor',
    'Dificuldade de concentração',
    'Distúrbios no sono'
  ],
  tipsTitle: '✅ Pequenos passos para se prevenir:',
  tipsList: [
    'Faça pausas durante o trabalho',
    'Pratique atividades relaxantes (meditação, caminhadas)',
    'Estabeleça limites claros entre vida pessoal e profissional',
    'Converse com alguém de confiança sobre o que está sentindo',
    'Procure ajuda profissional se necessário'
  ],
  closingText: 'Sua saúde mental importa. Cuide-se! ❤️',
  videoUrl: 'https://www.youtube.com/embed/1lIeDRbWeKc',
  externalLinks: [
    { label: 'Artigo sobre Burnout', url: 'https://example.com/burnout' },
    { label: 'Guia de Autocuidado', url: 'https://example.com/autocuidado' }
  ]
};

const postComments: IComment[] = [
  {
    avatar: '300-3.png',
    author: 'Dr. Amanda Souza',
    date: '1 dia atrás',
    text: 'Reconhecer os primeiros sinais é essencial! Cuide da sua saúde mental e não ignore o cansaço emocional.'
  }
];

interface IPostContent {
  author: string;
  avatar: string;
  date: string;
  introText: string;
  /** Texto de alerta opcional */
  warningTitle?: string;
  /** Lista de alertas opcionais */
  warningList?: string[];
  /** Título de dicas opcional */
  tipsTitle?: string;
  /** Lista de dicas opcionais */
  tipsList?: string[];
  closingText: string;
  /** URL de vídeo opcional (YouTube embed, Vimeo, etc.) */
  videoUrl?: string;
  /** Lista de links externos úteis relacionados ao post */
  externalLinks?: { label: string; url: string }[];
}

interface IComment {
  avatar: string;
  author: string;
  date: string;
  text: string;
}

interface IPostProps {
  content: IPostContent;
  comments: IComment[];
}

const Post1 = ({ content, comments }: IPostProps) => {
  const [activeTab, setActiveTab] = useState('comments');

  return (
    <div className="card p-4 md:p-5">
      <Heading
        author={content.author}
        avatar={{ image: content.avatar, imageClass: 'rounded-full size-[50px]' }}
        date={content.date}
      />

      <div className="grid gap-3 mb-3 px-5">
        {/* Texto introdutório - sempre presente */}
        <p className="text-sm text-gray-800 leading-5.5">{content.introText}</p>

        {/* Seção de alertas - só renderiza se tiver conteúdo */}
        {content.warningTitle && (
          <>
            <p className="text-sm text-gray-800 font-semibold">{content.warningTitle}</p>
            {content.warningList && content.warningList.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-800">
                {content.warningList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Seção de dicas - só renderiza se tiver conteúdo */}
        {content.tipsTitle && (
          <>
            <p className="text-sm text-gray-800 font-semibold mt-3">{content.tipsTitle}</p>
            {content.tipsList && content.tipsList.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-800">
                {content.tipsList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Vídeo - só renderiza se tiver URL */}
        {content.videoUrl && (
          <div className="my-4">
            <iframe
              width="100%"
              height="315"
              src={content.videoUrl}
              title="Video relacionado"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Links externos - só renderiza se tiver links */}
        {content.externalLinks && content.externalLinks.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold text-sm text-gray-800 mb-2">Links Úteis:</p>
            <ul className="list-disc list-inside text-sm text-blue-700">
              {content.externalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Texto de fechamento - sempre presente */}
        <p className="text-sm text-gray-800 mt-3">{content.closingText}</p>
      </div>

      {/* Tabs comentadas para uso futuro */}
      {/* <Tabs
        postId={1}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        comments={comments.length}
        likes="3.2k"
        saves={200}
        className="mx-7.5"
      /> */}

      {/* {activeTab === 'comments' && <Comments items={comments} />} */}
    </div>
  );
};

export { Post1, postData, postComments, type IPostContent, type IComment };