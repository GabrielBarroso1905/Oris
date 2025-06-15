import { useState, useMemo } from 'react';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { UsersData } from './UsersData';

type DashboardView = 'overview' | 'performance' | 'wellness' | 'engagement';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com navegação */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Wellness</h1>
              <p className="text-gray-600">Monitoramento de saúde e bem-estar corporativo</p>
            </div>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {[
                { key: 'overview', label: 'Visão Geral' },
                { key: 'performance', label: 'Performance' },
                { key: 'wellness', label: 'Bem-estar' },
                { key: 'engagement', label: 'Engajamento' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCurrentView(key as DashboardView)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === key
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardView currentView={currentView} />
      </div>
    </div>
  );
};

const DashboardView = ({ currentView }: { currentView: DashboardView }) => {
  switch (currentView) {
    case 'overview':
      return <OverviewDashboard />;
    case 'performance':
      return <PerformanceDashboard />;
    case 'wellness':
      return <WellnessDashboard />;
    case 'engagement':
      return <EngagementDashboard />;
    default:
      return <OverviewDashboard />;
  }
};

const OverviewDashboard = () => {
  const data = UsersData;
  
  // Calcular estatísticas gerais
  const totalUsers = data.length;
  const avgAge = Math.round(data.reduce((sum, user) => sum + user.idade, 0) / totalUsers);
  const sintomaticosGripais = data.filter(user => user.teveSintomasGripais).length;
  const percentualSintomaticos = Math.round((sintomaticosGripais / totalUsers) * 100);
  
  // Engajamento médio
  const engagementScores = {
    'excelente': 100,
    'ideal': 80,
    'mínima': 40,
    'inexistente': 0
  };
  const avgEngagement = Math.round(
    data.reduce((sum, user) => sum + engagementScores[user.acessoPlataforma], 0) / totalUsers
  );

  // Distribuição por setor
  const sectorData = Object.entries(
    data.reduce((acc, user) => {
      acc[user.setor] = (acc[user.setor] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([setor, count]) => ({
    name: setor.charAt(0).toUpperCase() + setor.slice(1),
    value: count,
    percentage: Math.round((count / totalUsers) * 100)
  }));

  // Dados para gráfico de linha (simulando tendência dos últimos 30 dias)
  const trendData = [
    { dia: '1', usuarios: 6, engajamento: 65, bemestar: 70 },
    { dia: '5', usuarios: 6, engajamento: 68, bemestar: 72 },
    { dia: '10', usuarios: 7, engajamento: 72, bemestar: 68 },
    { dia: '15', usuarios: 8, engajamento: 70, bemestar: 74 },
    { dia: '20', usuarios: 8, engajamento: 75, bemestar: 71 },
    { dia: '25', usuarios: 8, engajamento: 78, bemestar: 73 },
    { dia: '30', usuarios: 8, engajamento: avgEngagement, bemestar: 75 }
  ];

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas Principais */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
              <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <Badge className="text-green-700 bg-green-100">Ativo</Badge>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Idade Média</p>
              <p className="text-3xl font-bold text-gray-900">{avgAge} anos</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engajamento Médio</p>
              <p className="text-3xl font-bold text-gray-900">{avgEngagement}%</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <Badge className="text-green-700 bg-green-100">+5% vs mês anterior</Badge>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sintomas Gripais</p>
              <p className="text-3xl font-bold text-gray-900">{percentualSintomaticos}%</p>
            </div>
            <div className="rounded-full bg-red-100 p-3">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <Badge className="text-red-700 bg-red-100">{sintomaticosGripais} pessoas</Badge>
          </div>
        </Card>
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Distribuição por Setor */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Distribuição por Setor</h3>
            <p className="text-sm text-gray-600">Colaboradores por área de atuação</p>
          </CardHeader>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Tendência Geral */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tendências dos Últimos 30 Dias</h3>
            <p className="text-sm text-gray-600">Evolução do engajamento e bem-estar</p>
          </CardHeader>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="engajamento" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Engajamento (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="bemestar" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Bem-estar (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Resumo de Atividades Recentes */}
      <Card className="p-6">
        <CardHeader className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Atividades Recentes</h3>
          <p className="text-sm text-gray-600">Últimas interações na plataforma</p>
        </CardHeader>
        <div className="space-y-4">
          {data.slice(0, 4).map((user, index) => (
            <div key={user.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{user.nome}</p>
                <p className="text-sm text-gray-600">
                  Completou avaliação de saúde · TAG-7: {user.pontuacaoTAG7} pontos ({user.nivelTAG7})
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {index === 0 ? '2 horas atrás' : index === 1 ? '4 horas atrás' : index === 2 ? '1 dia atrás' : '2 dias atrás'}
                </p>
              </div>
              <Badge 
                className={`${
                  user.nivelTAG7 === 'mínima' ? 'bg-green-100 text-green-800' :
                  user.nivelTAG7 === 'leve' ? 'bg-blue-100 text-blue-800' :
                  user.nivelTAG7 === 'moderada' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}
              >
                {user.nivelTAG7}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const PerformanceDashboard = () => {
  const data = UsersData;
  
  // Performance por setor baseada na pontuação TAG-7 inversa e outros fatores
const performanceBySection = Object.entries(
  data.reduce((acc, user) => {
    if (!acc[user.setor]) {
      acc[user.setor] = { total: 0, totalTag7: 0 };
    }

    acc[user.setor].total++;
    acc[user.setor].totalTag7 += user.pontuacaoTAG7;

    return acc;
  }, {} as Record<string, { total: number; totalTag7: number }>)
).map(([setor, info]) => {
  const mediaTAG7 = Math.round(info.totalTag7 / info.total);
  return {
    name: setor.charAt(0).toUpperCase() + setor.slice(1),
    performance: mediaTAG7, // Agora o performance representa a média de ansiedade!
    colaboradores: info.total
  };
});
  // Top performers individuais
const topPerformers = data.map(user => {
  let score = 100;

  // Penalização por TAG-7
  if (user.pontuacaoTAG7 <= 7) {
    score -= 0;
  } else if (user.pontuacaoTAG7 <= 14) {
    score -= 20;
  } else {
    score -= 40;
  }

  const sleepBonus = { 'excelente': 10, 'boa': 5, 'regular': 0, 'precária': -10 };
  score += sleepBonus[user.qualidadeSono];

  const moodBonus = { 'excelente': 10, 'bom': 5, 'instável': -5, 'ruim': -10 };
  score += moodBonus[user.humor];

  if (user.teveSintomasGripais) score -= 15;

  return {
    ...user,
    performanceScore: Math.max(0, Math.min(100, Math.round(score)))
  };
}).sort((a, b) => b.performanceScore - a.performanceScore);
  return (
    <div className="space-y-6">
      {/* Cards de Performance */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Performance Média</p>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round(topPerformers.reduce((sum, user) => sum + user.performanceScore, 0) / topPerformers.length)}%
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alto Desempenho</p>
              <p className="text-3xl font-bold text-gray-900">
                {topPerformers.filter(user => user.performanceScore >= 80).length}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Necessitam Suporte</p>
              <p className="text-3xl font-bold text-gray-900">
                {topPerformers.filter(user => user.performanceScore < 60).length}
              </p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3">
              <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Performance por Setor */}
<Card className="p-6">
  <CardHeader className="pb-4">
    <h3 className="text-lg font-semibold text-gray-900">Resultado TAG-7 </h3>
    <p className="text-sm text-gray-600">Média por área</p>
  </CardHeader>
  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={performanceBySection}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
        <Bar dataKey="performance" radius={[4, 4, 0, 0]}>
  {performanceBySection.map((entry, index) => {
    let color = '#3b82f6'; // Azul padrão
    if (entry.performance >= 80) {
      color = '#dc2626'; // Vermelho (ansiedade altíssima)
    } else if (entry.performance >= 60) {
      color = '#facc15'; // Amarelo (ansiedade moderada)
    }
    return <Cell key={`cell-${index}`} fill={color} />;
  })}
</Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
</Card>


        {/* Top Performers */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
            <p className="text-sm text-gray-600">Maiores pontuações de performance</p>
          </CardHeader>
          <div className="space-y-4">
            {topPerformers.slice(0, 5).map((user, index) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.nome}</p>
                    <p className="text-sm text-gray-600">{user.setor.charAt(0).toUpperCase() + user.setor.slice(1)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    className={`font-mono ${
                      user.performanceScore >= 90 ? 'bg-green-100 text-green-800' :
                      user.performanceScore >= 80 ? 'bg-blue-100 text-blue-800' :
                      user.performanceScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.performanceScore}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Análise Detalhada */}
      {/* <Card className="p-6">
        <CardHeader className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Análise Detalhada de Performance</h3>
          <p className="text-sm text-gray-600">Fatores que impactam o desempenho da equipe</p>
        </CardHeader>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topPerformers} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}%`,
                  'Score de Performance'
                ]}
                labelFormatter={(label) => `Colaborador: ${label}`}
              />
              <Bar dataKey="performanceScore" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card> */}
    </div>
  );
};

const WellnessDashboard = () => {
  const data = UsersData;

  // Análise de bem-estar
  const wellnessMetrics = {
    sleep: Object.entries(
      data.reduce((acc, user) => {
        acc[user.qualidadeSono] = (acc[user.qualidadeSono] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([quality, count]) => ({
      name: quality.charAt(0).toUpperCase() + quality.slice(1),
      value: count,
      percentage: Math.round((count / data.length) * 100)
    })),
    mood: Object.entries(
      data.reduce((acc, user) => {
        acc[user.humor] = (acc[user.humor] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([mood, count]) => ({
      name: mood.charAt(0).toUpperCase() + mood.slice(1),
      value: count,
      percentage: Math.round((count / data.length) * 100)
    })),
    anxiety: Object.entries(
      data.reduce((acc, user) => {
        acc[user.nivelTAG7] = (acc[user.nivelTAG7] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([level, count]) => ({
      name: level.charAt(0).toUpperCase() + level.slice(1),
      value: count,
      percentage: Math.round((count / data.length) * 100)
    }))
  };

  const avgAnxietyScore = Math.round(
    data.reduce((sum, user) => sum + user.pontuacaoTAG7, 0) / data.length
  );

  const healthyUsers = data.filter(user => 
    user.qualidadeSono === 'excelente' || user.qualidadeSono === 'boa'
  ).length;

  const WELLNESS_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Cards de Bem-estar */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pontuação TAG-7 Média</p>
              <p className="text-3xl font-bold text-gray-900">{avgAnxietyScore}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <Badge className={`${
              avgAnxietyScore <= 7 ? 'bg-green-100 text-green-800' :
              avgAnxietyScore <= 14 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {avgAnxietyScore <= 7 ? 'Baixa' : avgAnxietyScore <= 14 ? 'Moderada' : 'Alta'}
            </Badge>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sono Saudável</p>
              <p className="text-3xl font-bold text-gray-900">{Math.round((healthyUsers / data.length) * 100)}%</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <Badge className="bg-green-100 text-green-800">{healthyUsers} pessoas</Badge>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Humor Positivo</p>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round((data.filter(u => u.humor === 'excelente' || u.humor === 'bom').length / data.length) * 100)}%
              </p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3">
              <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sem Sintomas</p>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round((data.filter(u => !u.teveSintomasGripais).length / data.length) * 100)}%
              </p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Qualidade do Sono */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Qualidade do Sono</h3>
            <p className="text-sm text-gray-600">Distribuição por categoria</p>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wellnessMetrics.sleep}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${percentage}%`}
                >
                  {wellnessMetrics.sleep.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={WELLNESS_COLORS[index % WELLNESS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Estado de Humor */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Estado de Humor</h3>
            <p className="text-sm text-gray-600">Distribuição emocional</p>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wellnessMetrics.mood}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Níveis de Ansiedade */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Níveis de Ansiedade</h3>
            <p className="text-sm text-gray-600">Baseado na escala TAG-7</p>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wellnessMetrics.anxiety}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Correlação Bem-estar */}
      <Card className="p-6">
        <CardHeader className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Correlação: Sono x Humor x Ansiedade</h3>
          <p className="text-sm text-gray-600">Análise multidimensional do bem-estar</p>
        </CardHeader>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.map(user => ({
              nome: user.nome.split(' ')[0],
              sono: user.qualidadeSono === 'excelente' ? 100 : 
                    user.qualidadeSono === 'boa' ? 80 :
                    user.qualidadeSono === 'regular' ? 50 : 20,
              humor: user.humor === 'excelente' ? 100 :
                     user.humor === 'bom' ? 80 :
                     user.humor === 'instável' ? 40 : 20,
              ansiedade: Math.max(0, 100 - (user.pontuacaoTAG7 * 5))
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sono" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="humor" stackId="2" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              <Area type="monotone" dataKey="ansiedade" stackId="3" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

const EngagementDashboard = () => {
  const data = UsersData;

  // Métricas de engajamento
  const engagementData = Object.entries(
    data.reduce((acc, user) => {
      acc[user.acessoPlataforma] = (acc[user.acessoPlataforma] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([level, count]) => ({
    name: level.charAt(0).toUpperCase() + level.slice(1),
    value: count,
    percentage: Math.round((count / data.length) * 100)
  }));

  // Engajamento por setor
const engagementBySection = Object.entries(
  data.reduce((acc, user) => {
    if (!acc[user.setor]) {
      acc[user.setor] = { total: 0, scores: [] };
    }

    const score = user.acessoPlataforma === 'excelente' ? 100
                : user.acessoPlataforma === 'ideal' ? 80
                : user.acessoPlataforma === 'mínima' ? 40
                : 0;

    acc[user.setor].scores.push(score);
    acc[user.setor].total++;

    return acc;
  }, {} as Record<string, { total: number; scores: number[] }>)
)
.filter(([_, info]) => info.total > 0)  // ✅ Evita divisões por zero
.map(([setor, info]) => ({
  name: setor.charAt(0).toUpperCase() + setor.slice(1),
  engajamento: Math.round(
    info.scores.reduce((sum, score) => sum + score, 0) / info.total
  ),
  usuarios: info.total
}));

  const avgEngagement = Math.round(
    engagementBySection.reduce((sum, setor) => sum + setor.engajamento, 0) / engagementBySection.length
  );

  const activeUsers = data.filter(user => 
    user.acessoPlataforma === 'excelente' || user.acessoPlataforma === 'ideal'
  ).length;

  // Simulação de dados temporais de engajamento
  const weeklyEngagement = [
    { semana: 'Sem 1', acessos: 42, usuarios: 6, tempo: 25 },
    { semana: 'Sem 2', acessos: 48, usuarios: 7, tempo: 28 },
    { semana: 'Sem 3', acessos: 52, usuarios: 8, tempo: 32 },
    { semana: 'Sem 4', acessos: 45, usuarios: 8, tempo: 30 }
  ];

  return (
    <div className="space-y-6">
      {/* Cards de Engajamento */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engajamento Médio</p>
              <p className="text-3xl font-bold text-gray-900">{avgEngagement}%</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          Em breve...
          <div className="flex items-center justify-between opacity-50">
            <div>
              <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
              <p className="text-3xl font-bold text-gray-900">{activeUsers}</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <Badge className="bg-green-100 text-green-800">
              {Math.round((activeUsers / data.length) * 100)}% da base
            </Badge>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Acessos/Semana</p>
              <p className="text-3xl font-bold text-gray-900">47</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          {/* <div className="mt-2">
            <Badge className="bg-blue-100 text-blue-800">+12% vs mês anterior</Badge>
          </div> */}
        </Card>

        <Card className="p-6">
          Em breve...
          <div className="flex items-center justify-between  opacity-50">
            <div>
              <p className="text-sm font-medium text-gray-600">Tempo Médio</p>
              <p className="text-3xl font-bold text-gray-900">29min</p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3">
              <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Distribuição de Engajamento */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Níveis de Engajamento</h3>
            <p className="text-sm text-gray-600">Distribuição dos usuários por nível de acesso</p>
          </CardHeader>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [value, 'Usuários']} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Engajamento por Setor */}
<Card className="p-6">
  <CardHeader className="pb-4">
    <h3 className="text-lg font-semibold text-gray-900">Engajamento por Setor</h3>
    <p className="text-sm text-gray-600">Média de engajamento por área</p>
  </CardHeader>
  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={engagementBySection}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip formatter={(value) => [`${value}%`, 'Engajamento']} />
        <Bar dataKey="engajamento" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
</Card>

      </div>

      {/* Tendências Semanais */}
      <Card className="p-6 ">
        Em breve...
        <div className='opacity-40'>

        <CardHeader className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Tendências de Engajamento</h3>
          <p className="text-sm text-gray-600">Evolução semanal de acessos e tempo de uso</p>
        </CardHeader>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyEngagement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semana" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="acessos" fill="#3b82f6" name="Acessos" />
              <Line yAxisId="right" type="monotone" dataKey="tempo" stroke="#f59e0b" strokeWidth={3} name="Tempo Médio (min)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        </div>
      </Card>

      {/* Lista de Usuários por Engajamento */}
      {/* <Card className="p-6">
        <CardHeader className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Status de Engajamento Individual</h3>
          <p className="text-sm text-gray-600">Nível de atividade de cada colaborador</p>
        </CardHeader>
        <div className="space-y-4">
          {data.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.nome}</p>
                  <p className="text-sm text-gray-600">{user.setor.charAt(0).toUpperCase() + user.setor.slice(1)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.acessoPlataforma === 'excelente' ? '100%' :
                     user.acessoPlataforma === 'ideal' ? '80%' :
                     user.acessoPlataforma === 'mínima' ? '40%' : '0%'}
                  </p>
                  <p className="text-xs text-gray-500">engajamento</p>
                </div>
                <Badge 
                  className={`${
                    user.acessoPlataforma === 'excelente' ? 'bg-green-100 text-green-800' :
                    user.acessoPlataforma === 'ideal' ? 'bg-blue-100 text-blue-800' :
                    user.acessoPlataforma === 'mínima' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {user.acessoPlataforma}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card> */}
    </div>
  );
};

export default Dashboard;