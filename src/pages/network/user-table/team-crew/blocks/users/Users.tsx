import { useMemo, useState } from 'react';
import { DataGrid, DataGridColumnHeader, KeenIcon, useDataGrid, DataGridRowSelectAll, DataGridRowSelect } from '@/components';
import { ColumnDef, Column, RowSelectionState } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { UsersData, IUsersData } from './';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import Dashboard from './DashboardView';



interface IColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
}
type DashboardView = 'overview' | 'performance' | 'wellness' | 'engagement';
const Users = () => {
  const [currentDashboard, setCurrentDashboard] = useState<DashboardView>('overview');
const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  const ColumnInputFilter = <TData, TValue>({ column }: IColumnFilterProps<TData, TValue>) => {
    return (
      <Input
        placeholder="Filter..."
        value={(column.getFilterValue() as string) ?? ''}
        onChange={(event) => column.setFilterValue(event.target.value)}
        className="h-9 w-full max-w-40"
      />
    );
  };

  const columns = useMemo<ColumnDef<IUsersData>[]>(() => [
    {
      accessorKey: 'id',
      header: () => <DataGridRowSelectAll />,
      cell: ({ row }) => <DataGridRowSelect row={row} />,
      enableSorting: false,
      enableHiding: false,
      meta: {
        headerClassName: 'w-0'
      }
    },
    {
      accessorKey: 'nome',
      header: ({ column }) => (
        <DataGridColumnHeader title="Nome" filter={<ColumnInputFilter column={column} />} column={column} />
      ),
      cell: (info) => <span className="text-gray-800">{info.getValue() as string}</span>,
      meta: {
        className: 'min-w-[180px]',
        cellClassName: 'text-gray-800 font-normal'
      }
    },
    {
      accessorKey: 'idade',
      header: ({ column }) => (
        <DataGridColumnHeader title="Idade" column={column} />
      ),
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: {
        headerClassName: 'min-w-[100px]'
      }
    },
    {
      accessorKey: 'genero',
      header: ({ column }) => (
        <DataGridColumnHeader title="Gênero" column={column} />
      ),
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: {
        headerClassName: 'min-w-[120px]'
      }
    },
    {
      accessorKey: 'qualidadeSono',
      header: ({ column }) => (
        <DataGridColumnHeader title="Qualidade do Sono" column={column} />
      ),
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: {
        headerClassName: 'min-w-[160px]'
      }
    },
    {
      accessorKey: 'humor',
      header: ({ column }) => (
        <DataGridColumnHeader title="Humor" column={column} />
      ),
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: {
        headerClassName: 'min-w-[120px]'
      }
    },
    {
  accessorKey: 'nivelTAG7',
  header: ({ column }) => (
    <DataGridColumnHeader title="Ansiedade (TAG-7)" column={column} />
  ),
  cell: (info) => {
    const nivel = info.getValue() as string;
    const colors: Record<string, string> = {
      mínima: 'badge-success',
      leve: 'badge-info',
      moderada: 'badge-warning',
      grave: 'badge-warning'
    };
    return (
      <span className={`badge ${colors[nivel] ?? 'badge-ghost'} badge-outline rounded-[30px]`}>
        {nivel}
      </span>
    );
  },
  meta: {
    headerClassName: 'min-w-[180px]'
  }
},
    {
      accessorKey: 'pontuacaoTAG7',
      header: ({ column }) => (
        <DataGridColumnHeader title="pontuacaoTAG7" column={column} />
      ),
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: {
        headerClassName: 'min-w-[100px]'
      }
    },
    {
      accessorKey: 'teveSintomasGripais',
      header: ({ column }) => (
        <DataGridColumnHeader title="Sintomas Gripais?" column={column} />
      ),
      cell: (info) => (
        <span className={`badge ${info.getValue() ? 'badge-error' : 'badge-success'} badge-outline rounded-[30px]`}>
          {info.getValue() ? 'Sim' : 'Não'}
        </span>
      ),
      meta: {
        headerClassName: 'min-w-[160px]'
      }
    },
    {
      accessorKey: 'setor',
      header: ({ column }) => (
        <DataGridColumnHeader title="Setor" column={column} />
      ),
      cell: (info) => <span>{info.getValue()as string}</span>,
      meta: {
        headerClassName: 'min-w-[150px]'
      }
    },
{
  accessorKey: 'acessoPlataforma',
  header: ({ column }) => (
    <DataGridColumnHeader title="Uso quinzenal" column={column} />
  ),
  cell: (info) => {
    const acesso = info.getValue() as string;
    const colors: Record<string, string> = {
      'excelente': 'badge-success',      // Verde
      'ideal': 'badge-info',             // Azul
      'mínima': 'badge-warning',         // Amarelo/Laranja
      'inexistente': 'badge-error'       // Vermelho
    };
    
    const labels: Record<string, string> = {
      'excelente': 'Excelente (5+ acessos)',
      'ideal': 'Ideal (Z acessos)',
      'mínima': 'Mínima (1 acesso)',
      'inexistente': 'Inativo (0 acessos)'
    };

    return (
      <span className={`badge ${colors[acesso] ?? 'badge-ghost'} badge-sm rounded-md`}>
        {labels[acesso] ?? acesso}
      </span>
    );
  },
  meta: {
    headerClassName: 'min-w-[200px]'
  }
},
    {
      id: 'edit',
      header: () => '',
      enableSorting: false,
      cell: () => (
        <button className="btn btn-sm btn-icon btn-clear btn-light">
          <KeenIcon icon="dots-vertical" />
        </button>
      ),
      meta: {
        headerClassName: 'w-[60px]'
      }
    }
  ], []);

  const data: IUsersData[] = useMemo(() => UsersData, []);

  const handleRowSelection = (state: RowSelectionState) => {
    const selectedRowIds = Object.keys(state);

    if (selectedRowIds.length > 0) {
      toast(`Total ${selectedRowIds.length} selecionado(s).`, {
        description: `IDs: ${selectedRowIds.join(', ')}`,
        action: {
          label: 'Desfazer',
          onClick: () => console.log('Undo')
        }
      });
    }
  };

const Toolbar = () => {
    const { table } = useDataGrid();
    const [searchInput, setSearchInput] = useState('');

    return (
      <div className="card-header flex-wrap gap-2 border-b-0 px-5">
        <h3 className="card-title font-medium text-sm">Showing 20 of 68 users</h3>

        <div className="flex flex-wrap gap-2 lg:gap-5">
        <div className="flex">
            <label className="input input-sm">
              <KeenIcon icon="magnifier" />
              <input
                type="text"
                placeholder="Search users"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Select defaultValue="active">
              <SelectTrigger className="w-28" size="sm">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="w-32">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="latest">
              <SelectTrigger className="w-28" size="sm">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="w-32">
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="older">Older</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>

            <button className="btn btn-sm btn-outline btn-primary">
              <KeenIcon icon="setting-4" /> Filters
            </button>
          </div> 
        </div>
      </div>
    );
  };

  return (
    <>
    <Dashboard />
    <DataGrid
      columns={columns}
      data={data}
      rowSelection={true}
      onRowSelectionChange={handleRowSelection}
      pagination={{ size: 5 }}
      sorting={[{ id: 'nome', desc: false }]}
      toolbar={<Toolbar />}
      layout={{ card: true }}
      
      />
    </>
  );
};

export { Users };
