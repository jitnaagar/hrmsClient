'use client';

import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/settings/department');
  }, []);

  return (
    <div>
      <CircularProgress />
    </div>
  );
}

export default page;
