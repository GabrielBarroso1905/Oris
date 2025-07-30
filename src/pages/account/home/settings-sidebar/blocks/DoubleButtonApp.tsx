import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { KeenIcon } from '@/components'; // Assumindo que KeenIcon está disponível
import { toAbsoluteUrl } from '@/utils/Assets'; // Assumindo que toAbsoluteUrl está disponível
import { Input } from '@/components/ui/input'; // Assumindo que Input está disponível
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assumindo que Select está disponível
import { Button } from '@/components/ui/button'; // Assumindo que Button está disponível

export interface IDoubleButtonAppProps {}

interface FormData {
  sono: string;
  humor: string;
  ergonomia: string;
  altura: string;
  peso: string;
}

interface Tag7Question {
  id: string;
  text: string;
}

interface Tag7Answer {
  questionId: string;
  score: number;
}

/**
 * Componente para o modal do teste TAG-7.
 */
const Tag7Modal: React.FC<{ onClose: (score: number, resultText: string) => void }> = ({ onClose }) => {
  const questions: Tag7Question[] = [
    { id: 'q1', text: 'Sentir-se nervoso(a), ansioso(a) ou no limite?' },
    { id: 'q2', text: 'Não conseguir parar ou controlar a preocupação?' },
    { id: 'q3', text: 'Preocupar-se demais com diferentes coisas?' },
    { id: 'q4', text: 'Ter dificuldade para relaxar?' },
    { id: 'q5', text: 'Ficar tão inquieto(a) que é difícil ficar parado(a)?' },
    { id: 'q6', text: 'Ficar facilmente irritado(a) ou impaciente?' },
    { id: 'q7', text: 'Ter medo de que algo terrível possa acontecer?' },
  ];

  const [answers, setAnswers] = useState<Tag7Answer[]>(
    questions.map(q => ({ questionId: q.id, score: 0 }))
  );
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [resultMessage, setResultMessage] = useState('');

  const handleAnswerChange = (questionId: string, score: string) => {
    setAnswers(prev =>
      prev.map(ans =>
        ans.questionId === questionId ? { ...ans, score: parseInt(score, 10) } : ans
      )
    );
  };

  const calculateResult = () => {
    const totalScore = answers.reduce((sum, ans) => sum + ans.score, 0);
    setFinalScore(totalScore);

    let message = '';
    if (totalScore >= 0 && totalScore <= 4) {
      message = 'Sua pontuação indica ansiedade mínima. Continue cuidando do seu bem-estar!';
    } else if (totalScore >= 5 && totalScore <= 9) {
      message = 'Sua pontuação indica ansiedade leve. É um bom momento para observar e talvez buscar apoio.';
    } else if (totalScore >= 10 && totalScore <= 14) {
      message = 'Sua pontuação indica ansiedade moderada. Sugerimos buscar apoio profissional para gerenciar esses sentimentos.';
    } else if (totalScore >= 15 && totalScore <= 21) {
      message = 'Sua pontuação indica ansiedade grave. É importante procurar ajuda profissional o mais rápido possível.';
    }
    setResultMessage(message);
    setShowResult(true);
  };

  const handleClose = () => {
    onClose(finalScore, resultMessage);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar"> {/* Adicionado hide-scrollbar */}
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b rounded-t-lg bg-blue-600 text-white">
          <h2 className="text-xl font-semibold ">Teste de Avaliação Psicológica - TAG-7</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6 space-y-6">
          {!showResult ? (
            <>
              <p className="text-gray-700 leading-relaxed rounded-md p-3 bg-blue-50 border border-blue-200">
                Olá, Pedro! A empresa se importa muito com o seu bem-estar psicológico e, por isso, estamos adotando medidas para avaliar e ajudar no que for preciso. Este é o teste TAG-7, uma ferramenta para entender melhor como você tem se sentido. Suas respostas são confidenciais e nos ajudarão a oferecer o suporte adequado.
              </p>

              <p className="text-gray-800 font-medium">
                Nas últimas 2 semanas, com que frequência você foi incomodado(a) pelos seguintes problemas?
              </p>

              <form onSubmit={(e) => { e.preventDefault(); calculateResult(); }} className="space-y-4">
                {questions.map(q => (
                  <div key={q.id} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{q.text}</label>
                    <Select
                      value={answers.find(a => a.questionId === q.id)?.score.toString()}
                      onValueChange={(value) => handleAnswerChange(q.id, value)}
                    >
                      <SelectTrigger className="w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 - Nunca</SelectItem>
                        <SelectItem value="1">1 - Vários dias</SelectItem>
                        <SelectItem value="2">2 - Mais da metade dos dias</SelectItem>
                        <SelectItem value="3">3 - Quase todos os dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition-colors">
                  Ver Resultado
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-blue-700">Seu Resultado do TAG-7</h3>
              <p className="text-lg text-gray-800">Sua pontuação total é: <span className="font-extrabold text-blue-600">{finalScore}</span></p>
              <p className="text-gray-700 leading-relaxed">{resultMessage}</p>
              <Button onClick={handleClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition-colors">
                Entendi
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Estilos para esconder a barra de rolagem */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
};

/**
 * Dois cards quadrados lado a lado, usando SVGs de hexágono no topo,
 * com status de disponibilidade e navegação programática via useNavigate.
 */
export const DoubleButtonApp: React.FC<IDoubleButtonAppProps> = () => {
  const navigate = useNavigate();
  const pillAvailable = true; // simula disponibilidade da pílula do dia
  const [showTag7Modal, setShowTag7Modal] = useState(true); // Inicia mostrando o modal TAG-7
  const [showHealthModal, setShowHealthModal] = useState(false); // Modal de saúde original
  const [formData, setFormData] = useState<FormData>({
    sono: '',
    humor: '',
    ergonomia: '',
    altura: '',
    peso: '',
  });

  // Abre o modal TAG-7 automaticamente quando o componente é montado
  useEffect(() => {
    setShowTag7Modal(true);
  }, []);

  const goToPill = () => {
    if (pillAvailable) {
      navigate('public-profile/profiles/creator');
    }
  };

  const goToComplaint = () => {
    navigate('/public-profile/profiles/company');
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calcular IMC baseado em altura e peso
  const calculateIMC = (): string => {
    const peso = parseFloat(formData.peso);
    const altura = parseFloat(formData.altura);

    if (peso && altura && altura > 0) {
      const alturaMetros = altura / 100; // Converter cm para metros
      const imc = peso / (alturaMetros * alturaMetros);
      return imc.toFixed(1);
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calcular IMC antes de salvar
    const imcCalculado = calculateIMC();

    // Criar objeto com IMC calculado
    const dataToSave = {
      sono: formData.sono,
      humor: formData.humor,
      ergonomia: formData.ergonomia,
      imc: imcCalculado,
    };

    // Aqui você pode salvar os dados no cache/localStorage
    localStorage.setItem('userHealthData', JSON.stringify(dataToSave));
    console.log('Dados salvos:', dataToSave);
    setShowHealthModal(false); // Fecha o modal de saúde
    
    // Disparar evento customizado para atualizar os componentes
    window.dispatchEvent(new CustomEvent('healthDataUpdated', { detail: dataToSave }));
  };

  const handleCloseHealthModal = () => {
    setShowHealthModal(false);
  };

  // Callback para quando o modal TAG-7 é fechado
  const handleTag7ModalClose = (score: number, resultText: string) => {
    console.log('TAG-7 Score:', score);
    console.log('TAG-7 Result:', resultText);
    setShowTag7Modal(false); // Fecha o modal TAG-7
    setShowHealthModal(true); // Abre o modal de saúde
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
        {/* Pílula do Dia */}
        <div
          onClick={goToPill}
          className={`
            aspect-square bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden
            transform transition hover:scale-105
            ${pillAvailable ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}
          `}
        >
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            {/* Hexágono + contador em degradê azul→verde */}
            <div className="relative w-16 h-16 mb-2">
              <img
                src={toAbsoluteUrl('/media/icons/polygon1.svg')}
                alt="Hexágono Pílulas Oris"
                className="w-full h-full"
              />
              <span
                className="absolute inset-0 flex items-center justify-center font-semibold"
                style={{
                  background: pillAvailable
                    ? 'linear-gradient(to bottom, #3b82f6, #06b6d4)'
                    : 'transparent',
                  WebkitBackgroundClip: pillAvailable ? 'text' : undefined,
                  color: pillAvailable ? 'transparent' : '#999',
                }}
              >
                183
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">Pílulas Oris</span>
          </div>
          <div
            className={`
              flex items-center justify-center gap-2 py-2
              ${pillAvailable
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-600'}
            `}
          >
            <span className="font-medium">
              {pillAvailable ? 'Pílula do Dia' : 'Indisponível'}
            </span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* Modal do Teste TAG-7 */}
      {showTag7Modal && <Tag7Modal onClose={handleTag7ModalClose} />}

      {/* Modal de Formulário (original) */}
      {showHealthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto hide-scrollbar"> {/* Adicionado hide-scrollbar */}
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b rounded-t-lg">
              <h2 className="text-xl font-semibold text-gray-900">Avaliação Diária</h2>
              <button
                onClick={handleCloseHealthModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Sono */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Qualidade do Sono
                </label>
                <Select value={formData.sono} onValueChange={(value) => handleInputChange('sono', value)}>
                  <SelectTrigger className="w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Selecione a qualidade do seu sono" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excelente">Excelente (8+ horas)</SelectItem>
                    <SelectItem value="bom">Bom (6-8 horas)</SelectItem>
                    <SelectItem value="regular">Regular (4-6 horas)</SelectItem>
                    <SelectItem value="ruim">Ruim (menos de 4 horas)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Humor */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Humor Hoje
                </label>
                <Select value={formData.humor} onValueChange={(value) => handleInputChange('humor', value)}>
                  <SelectTrigger className="w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Como está seu humor hoje?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="muito-feliz">Muito Feliz 😊</SelectItem>
                    <SelectItem value="feliz">Feliz 🙂</SelectItem>
                    <SelectItem value="neutro">Neutro 😐</SelectItem>
                    <SelectItem value="triste">Triste 😔</SelectItem>
                    <SelectItem value="muito-triste">Muito Triste 😢</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ergonomia */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Ergonomia no Trabalho
                </label>
                <Select value={formData.ergonomia} onValueChange={(value) => handleInputChange('ergonomia', value)}>
                  <SelectTrigger className="w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Como está sua postura?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excelente">Excelente - Postura correta</SelectItem>
                    <SelectItem value="boa">Boa - Pequenos ajustes</SelectItem>
                    <SelectItem value="regular">Regular - Algumas dores</SelectItem>
                    <SelectItem value="ruim">Ruim - Muitas dores</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Altura */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Altura (cm)
                </label>
                <Input
                  type="number"
                  placeholder="Digite sua altura em cm (ex: 170)"
                  value={formData.altura}
                  onChange={(e) => handleInputChange('altura', e.target.value)}
                  min="100"
                  max="250"
                  className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Peso */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Peso (kg)
                </label>
                <Input
                  type="number"
                  placeholder="Digite seu peso em kg (ex: 70.5)"
                  value={formData.peso}
                  onChange={(e) => handleInputChange('peso', e.target.value)}
                  step="0.1"
                  min="30"
                  max="300"
                  className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* IMC Calculado (apenas exibição) */}
              {formData.altura && formData.peso && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    IMC Calculado
                  </label>
                  <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                    <span className="text-lg font-semibold text-blue-600">
                      {calculateIMC() || '---'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      IMC = peso (kg) / altura² (m)
                    </p>
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseHealthModal}
                  className="flex-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition-colors"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Estilos para esconder a barra de rolagem */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </>
  );
};
