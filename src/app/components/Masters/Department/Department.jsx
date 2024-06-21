'use client';

import React, { useEffect, useState } from 'react';
import Config from '../../../../config/Config';
import axios from 'axios';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { authHeader } from '../../../../helper/helper';

const { API_URL } = Config;

function Department() {
  const [list, setList] = useState([]);

  const getList = async () => {
    const requestOptions = {
      method: 'GET',
      url: `${API_URL}/department`,
      headers: await authHeader(),
    };
    axios(requestOptions)
      .then((data) => {
        setList(data.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <Typography variant="h1" fontSize={20}>
        Department
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Employee Name</b>
              </TableCell>
              <TableCell align="right">
                <b>Email</b>
              </TableCell>
              <TableCell align="right">
                <b>Phone</b>
              </TableCell>
              <TableCell align="right">
                <b>Date of Birth</b>
              </TableCell>
              <TableCell align="right">
                <b>Gender</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow key={row.userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {`${row.firstName} ${row.lastName}`}
                </TableCell>
                <TableCell align="right">{`${row.email}`}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.dob}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Department;
