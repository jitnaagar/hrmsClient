'use client';

import React from 'react';
import { Grid, List, ListItem, MenuItem, Paper, Typography } from '@mui/material';
import { list } from './data';
import { useParams, useRouter } from 'next/navigation';
import Master from './Master';

function page() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  return (
    <div>
      <Typography variant="h1" sx={{ fontSize: '20px' }}>
        Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Paper
            elevation={0}
            sx={{
              boxShadow: '0px 0px 10px #ccc',
              p: '20px 0px',
            }}
          >
            <List>
              {list.map((i) => (
                <MenuItem
                  key={i.id}
                  sx={{ p: '10px' }}
                  selected={slug === i.id}
                  onClick={() => router.push(`/settings/${i.id}`)}
                >
                  {i.title}
                </MenuItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item md={9}>
          <Paper
            elevation={0}
            sx={{
              boxShadow: '0px 0px 10px #ccc',
              p: '20px',
            }}
          >
            <Master />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default page;
