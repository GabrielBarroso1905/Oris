interface IUsersData {
  id: string | number;
  nome: string;
  idade: number;
  genero: string;
  dataNascimento: string; // formato ISO: 'yyyy-MM-dd'
  pilulasOris: number;
  peso: number;
  altura: number;
  qualidadeSono: 'excelente' | 'boa' | 'regular' | 'precária';
  humor: 'excelente' | 'bom' | 'instável' | 'ruim';
  teveSintomasGripais: boolean;
  setor: 'educacional' | 'saúde' | 'financeiro' | 'tecnologia' | 'comercial';
  pontuacaoTAG7: number; 
  nivelTAG7: 'mínima' | 'leve' | 'moderada' | 'grave';
  acessoPlataforma: 'mínima' | 'ideal' | 'excelente' | 'inexistente';
}

// Função para calcular o nível TAG-7 com base na pontuação
function calcularNivelTAG7(pontuacao: number): 'mínima' | 'leve' | 'moderada' | 'grave' {
  if (pontuacao <= 7) return 'mínima';
  if (pontuacao <= 14) return 'leve';
  if (pontuacao <= 21) return 'moderada';
  return 'grave';
}

const UsersData: IUsersData[] = [
  {
    id: 1,
    nome: 'Esther Howard',
    idade: 29,
    genero: 'feminino',
    dataNascimento: '1995-08-15',
    pilulasOris: 10,
    peso: 62.5,
    altura: 1.68,
    qualidadeSono: 'boa',
    humor: 'bom',
    teveSintomasGripais: false,
    setor: 'educacional',
    pontuacaoTAG7: 100,
    nivelTAG7: calcularNivelTAG7(100),
    acessoPlataforma: 'ideal'
  },
  {
    id: 2,
    nome: 'Cody Fisher',
    idade: 35,
    genero: 'masculino',
    dataNascimento: '1989-03-22',
    pilulasOris: 15,
    peso: 78.2,
    altura: 1.82,
    qualidadeSono: 'regular',
    humor: 'instável',
    teveSintomasGripais: true,
    setor: 'tecnologia',
    pontuacaoTAG7: 100,
    nivelTAG7: calcularNivelTAG7(100),
    acessoPlataforma: 'mínima'
  },
  {
    id: 3,
    nome: 'Savannah Nguyen',
    idade: 24,
    genero: 'feminino',
    dataNascimento: '2000-05-30',
    pilulasOris: 5,
    peso: 55.1,
    altura: 1.63,
    qualidadeSono: 'excelente',
    humor: 'bom',
    teveSintomasGripais: false,
    setor: 'saúde',
    pontuacaoTAG7: 80,
    nivelTAG7: calcularNivelTAG7(80),
    acessoPlataforma: 'excelente'
  },
  {
    id: 4,
    nome: 'Darlene Robertson',
    idade: 42,
    genero: 'feminino',
    dataNascimento: '1982-11-18',
    pilulasOris: 22,
    peso: 68.7,
    altura: 1.70,
    qualidadeSono: 'precária',
    humor: 'ruim',
    teveSintomasGripais: true,
    setor: 'financeiro',
    pontuacaoTAG7: 30,
    nivelTAG7: calcularNivelTAG7(30),
    acessoPlataforma: 'inexistente'
  },
  {
    id: 5,
    nome: 'Ronald Richards',
    idade: 31,
    genero: 'masculino',
    dataNascimento: '1993-07-09',
    pilulasOris: 12,
    peso: 85.0,
    altura: 1.88,
    qualidadeSono: 'regular',
    humor: 'instável',
    teveSintomasGripais: false,
    setor: 'educacional',
    pontuacaoTAG7: 10,
    nivelTAG7: calcularNivelTAG7(10),
    acessoPlataforma: 'ideal'
  },
  {
    id: 6,
    nome: 'Devon Lane',
    idade: 27,
    genero: 'masculino',
    dataNascimento: '1997-02-14',
    pilulasOris: 8,
    peso: 72.3,
    altura: 1.75,
    qualidadeSono: 'boa',
    humor: 'bom',
    teveSintomasGripais: true,
    setor: 'tecnologia',
    pontuacaoTAG7: 100,
    nivelTAG7: calcularNivelTAG7(100),
    acessoPlataforma: 'excelente'
  },
  {
    id: 7,
    nome: 'Jane Cooper',
    idade: 38,
    genero: 'feminino',
    dataNascimento: '1986-09-25',
    pilulasOris: 18,
    peso: 60.9,
    altura: 1.65,
    qualidadeSono: 'precária',
    humor: 'instável',
    teveSintomasGripais: false,
    setor: 'financeiro',
    pontuacaoTAG7: 100,
    nivelTAG7: calcularNivelTAG7(100),
    acessoPlataforma: 'mínima'
  },
  {
    id: 8,
    nome: 'Albert Flores',
    idade: 45,
    genero: 'masculino',
    dataNascimento: '1979-06-11',
    pilulasOris: 25,
    peso: 90.5,
    altura: 1.85,
    qualidadeSono: 'precária',
    humor: 'instável',
    teveSintomasGripais: true,
    setor: 'tecnologia',
    pontuacaoTAG7: 100,
    nivelTAG7: calcularNivelTAG7(100),
    acessoPlataforma: 'inexistente'
  },
  {
    id: 9,
    nome: 'Albert Flores',
    idade: 45,
    genero: 'masculino',
    dataNascimento: '1979-06-11',
    pilulasOris: 25,
    peso: 90.5,
    altura: 1.85,
    qualidadeSono: 'precária',
    humor: 'instável',
    teveSintomasGripais: true,
    setor: 'tecnologia',
    pontuacaoTAG7: 100,
    nivelTAG7: calcularNivelTAG7(100),
    acessoPlataforma: 'inexistente'
  },

    {
    id: 10,
    nome: 'Josenildo',
    idade: 24,
    genero: 'Masculino',
    dataNascimento: '2000-05-30',
    pilulasOris: 5,
    peso: 55.1,
    altura: 1.63,
    qualidadeSono: 'excelente',
    humor: 'bom',
    teveSintomasGripais: false,
    setor: 'saúde',
    pontuacaoTAG7: 30,
    nivelTAG7: calcularNivelTAG7(30),
    acessoPlataforma: 'excelente'
  },
];

export { UsersData, type IUsersData };
