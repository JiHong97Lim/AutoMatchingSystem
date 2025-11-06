import { useQuery } from '@tanstack/react-query';
import { api, endpoints } from '../lib/api';
import type { Player } from '../lib/types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function PlayersListPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const res = await api.get<Player[]>(endpoints.players);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div style={{ display:'grid', placeItems:'center', height: 200 }}>
        <CircularProgress />
      </div>
    );
  }
  if (isError) {
    return (
      <Alert severity="error" action={<button onClick={()=>refetch()}>다시 시도</button>}>
        {(error as any)?.message ?? '에러가 발생했습니다'}
      </Alert>
    );
  }

  const rows = data ?? [];

  return (
    <Paper sx={{ flex: 1, p: 0, overflow: 'hidden' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>평점</TableCell>
            <TableCell>나이</TableCell>
            <TableCell>포지션</TableCell>
            <TableCell>키(cm)</TableCell>
            <TableCell>최초 등록일</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(p => (
            <TableRow key={p.id} hover>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.rating ?? '-'}</TableCell>
              <TableCell>{p.age ?? '-'}</TableCell>
              <TableCell>{p.position ?? '-'}</TableCell>
              <TableCell>{p.height ?? '-'}</TableCell>
              <TableCell>{p.createdAt ? new Date(p.createdAt).toLocaleString() : '-'}</TableCell>
              <TableCell>{p.active ? 'TRUE' : 'FALSE'}</TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                데이터가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
