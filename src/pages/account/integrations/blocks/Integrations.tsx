// src/pages/ComplaintsPage.tsx
import React, { useState, useRef, useEffect } from 'react'
import {
  X,
  Plus,
  Droplet,
  CloudOff,
  VolumeX,
  ShieldOff,
  AlertTriangle,
  MapPin,
  Camera,
  User,
  Calendar,
  BarChart2
} from 'lucide-react'

/** Resumo de cada denúncia */
interface IComplaint {
  id: string
  type: string
  icon: React.ReactNode
  zone: string
  reporter: string
  date: string
  confirmed: boolean
}

/** Detalhes completos */
interface IComplaintDetail extends IComplaint {
  description: string
  imagePreview: string
  confirmedBy?: string
  confirmedAt?: string
}

// Cores da paleta
const PALETTE = {
  primary: '#2979FF',
  success: '#00C853',
  error: '#E64A19',
  warning: '#FDD835',
  danger: '#F44336',
  neutral: '#9E9E9E'
}

// Mock de detalhes
const mockDetails: Record<string, IComplaintDetail> = {
  mock1: {
    id: 'mock1',
    type: 'Rachaduras no Teto',
    icon: <AlertTriangle size={24} style={{ color: PALETTE.error }} />,
    zone: 'Armazéns Portuários',
    reporter: 'Eng. Carlos Oliveira',
    date: '15/06/2025',
    confirmed: true,
    description:
      'Foram observadas rachaduras longitudinais no teto do armazém 5. Risco de desabamento.',
    imagePreview:
      'https://via.placeholder.com/400x200/ffcccc/800000?text=Rachaduras',
    confirmedBy: 'Admin José',
    confirmedAt: '16/06/2025 09:30'
  },
  mock2: {
    id: 'mock2',
    type: 'Falta de Banheiros',
    icon: <AlertTriangle size={24} style={{ color: PALETTE.warning }} />,
    zone: 'Terminal de Passageiros',
    reporter: 'Assistente Ana Costa',
    date: '14/06/2025',
    confirmed: false,
    description:
      'Não existem banheiros acessíveis nas plataformas de embarque, gerando filas.',
    imagePreview:
      'https://via.placeholder.com/400x200/ffffcc/808000?text=Banheiros'
  },
  mock3: {
    id: 'mock3',
    type: 'Iluminação Precária',
    icon: <ShieldOff size={24} style={{ color: PALETTE.neutral }} />,
    zone: 'Cais de Atracação',
    reporter: 'Marítimo Pedro Alves',
    date: '13/06/2025',
    confirmed: false,
    description:
      'Grande parte dos refletores está apagada, áreas de descarga no escuro.',
    imagePreview:
      'https://via.placeholder.com/400x200/cccccc/333333?text=Iluminação'
  }
}

// Paleta de tipos para o modal de criação
const iconPalette = [
  { type: 'Vazamento de Óleo', icon: <Droplet size={24} style={{ color: PALETTE.primary }} /> },
  { type: 'Poluição Ambiental', icon: <CloudOff size={24} style={{ color: PALETTE.success }} /> },
  { type: 'Ruído Excessivo', icon: <VolumeX size={24} style={{ color: PALETTE.error }} /> },
  { type: 'Segurança Inadequada', icon: <ShieldOff size={24} style={{ color: PALETTE.warning }} /> },
  { type: 'Descarte Irregular', icon: <AlertTriangle size={24} style={{ color: PALETTE.danger }} /> }
]

const ComplaintsPage: React.FC = () => {
  // Admin flag (vém do contexto real)
  const isAdmin = true

  // Estado resumido inicial
  const [complaints, setComplaints] = useState<IComplaint[]>(
    Object.values(mockDetails).map(({ id, type, icon, zone, reporter, date, confirmed }) => ({
      id, type, icon, zone, reporter, date, confirmed
    }))
  )

  // Modais e detalhes
  const [showFormModal, setShowFormModal] = useState(false)
  const [viewId, setViewId] = useState<string | null>(null)
  const [detail, setDetail] = useState<IComplaintDetail | null>(null)

  // Formulário
  const [form, setForm] = useState<Partial<IComplaintDetail>>({})
  const fileRef = useRef<HTMLInputElement>(null)

  // Cálculo de estatísticas
  const totalCount = complaints.length
  const confirmedCount = complaints.filter(c => c.confirmed).length
  const pendingCount = totalCount - confirmedCount

  // Carrega detail do mock
  useEffect(() => {
    setDetail(viewId ? mockDetails[viewId] : null)
  }, [viewId])

  // Handlers de UI
  const openForm = () => {
    setForm({})
    setShowFormModal(true)
  }

  const pickType = (type: string, icon: React.ReactNode) => {
    setForm(f => ({ ...f, type, icon }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => setForm(fm => ({ ...fm, imagePreview: reader.result as string }))
    reader.readAsDataURL(f)
  }

  const submitNew = () => {
    if (!form.type || !form.zone || !form.reporter) {
      alert('Preencha tipo, zona e denunciante.')
      return
    }
    const id = Date.now().toString()
    const newC: IComplaintDetail = {
      id,
      type: form.type!,
      icon: form.icon!,
      zone: form.zone!,
      reporter: form.reporter!,
      date: new Date().toLocaleDateString('pt-BR'),
      confirmed: false,
      description: form.description ?? '',
      imagePreview: form.imagePreview ?? '',
    }
    mockDetails[id] = newC
    setComplaints(prev => [newC, ...prev])
    setShowFormModal(false)
  }

  const remove = (id: string) =>
    setComplaints(prev => prev.filter(c => c.id !== id))

  return (
    <div className="p-4 lg:p-6 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Resumo + Botão */}
        <div className="bg-white rounded-2xl p-5 shadow flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Calendar size={24} style={{ color: PALETTE.primary }} />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Denúncias</h2>
              <p className="text-sm text-gray-500 flex items-center gap-3">
                <BarChart2 size={16} style={{ color: PALETTE.neutral }} />
                Total: {totalCount} •
                <span style={{ color: PALETTE.success }}> Confirmadas: {confirmedCount}</span> •
                <span style={{ color: PALETTE.error }}> Pendentes: {pendingCount}</span>
              </p>
            </div>
          </div>
          <button
            onClick={openForm}
            style={{ backgroundColor: PALETTE.primary }}
            className="inline-flex items-center gap-2 text-white px-4 py-2 rounded-lg shadow-sm"
          >
            <Plus size={16} /> Nova denúncia
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complaints.map(c => (
            <div
              key={c.id}
              onClick={() => setViewId(c.id)}
              className="bg-white rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#F5F5F5] p-2 rounded-full">{c.icon}</div>
                  <h3 className="text-md font-semibold text-gray-800">{c.type}</h3>
                </div>
                <span className="text-xs text-gray-500">{c.date}</span>
              </div>
              <p className="flex items-center text-sm text-gray-500 mb-3">
                <MapPin size={14} style={{ color: PALETTE.neutral }} className="mr-1" />
                {c.zone}
              </p>
              <div className="mt-auto flex justify-between items-center text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <User size={12} style={{ color: PALETTE.neutral }} /> {c.reporter}
                </span>
                <span
                  style={{
                    backgroundColor: c.confirmed ? PALETTE.success : PALETTE.error,
                    color: 'white'
                  }}
                  className="px-2 py-1 rounded text-sm"
                >
                  {c.confirmed ? 'Confirmada' : 'Pendente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de criação */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Nova Denúncia</h2>
              <button onClick={() => setShowFormModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {iconPalette.map(item => (
                <button
                  key={item.type}
                  onClick={() => pickType(item.type, item.icon)}
                  className={`flex flex-col items-center p-3 border rounded-lg hover:shadow
                    ${
                      form.type === item.type
                        ? 'border-[#00C853] bg-[#E8F5E9]'
                        : 'border-[#ECEFF1]'
                    }
                  `}
                >
                  {item.icon}
                  <span className="mt-1 text-xs text-gray-600 text-center">{item.type}</span>
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Zona Portuária*"
                value={form.zone || ''}
                onChange={e => setForm(f => ({ ...f, zone: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Descrição"
                value={form.description || ''}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm h-24"
              />
              <input
                type="text"
                placeholder="Denunciante*"
                value={form.reporter || ''}
                onChange={e => setForm(f => ({ ...f, reporter: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-[#ECEFF1] rounded-lg py-6 text-center text-gray-500 cursor-pointer"
              >
                <Camera size={24} className="mx-auto mb-2" />
                {form.imagePreview ? 'Alterar Foto' : 'Adicionar Foto'}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  className="hidden"
                  onChange={handleFile}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowFormModal(false)} className="px-4 py-2 text-gray-600">
                Cancelar
              </button>
              <button
                onClick={submitNew}
                style={{ backgroundColor: PALETTE.success }}
                className="px-4 py-2 text-white rounded-lg"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de visualização */}
      {viewId && detail && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{detail.type}</h2>
              <button onClick={() => setViewId(null)}>
                <X size={20} />
              </button>
            </div>
            <img
              src={detail.imagePreview}
              alt="Evidência"
              className="w-full rounded-lg mb-4 object-cover"
            />
            <p className="text-gray-700 mb-4">
              <strong>Descrição:</strong> {detail.description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Zona:</strong> {detail.zone}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Denunciante:</strong> {detail.reporter}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Data:</strong> {detail.date}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Status:</strong>{' '}
              <span
                style={{
                  color: detail.confirmed ? PALETTE.success : PALETTE.error
                }}
              >
                {detail.confirmed ? 'Confirmada' : 'Pendente'}
              </span>
              {detail.confirmed && detail.confirmedBy && (
                <> por {detail.confirmedBy} em {detail.confirmedAt}</>
              )}
            </p>
            <button onClick={() => setViewId(null)} className="w-full bg-[#ECEFF1] rounded-lg py-2">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComplaintsPage
