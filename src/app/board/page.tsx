import { cookies } from 'next/headers';
import BoardClient from './BoardClient';

export const dynamic = 'force-dynamic';

export default async function BoardView() {
  await cookies(); // Force dynamic rendering
  return <BoardClient />;
}
