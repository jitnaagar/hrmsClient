'use client';
import React, { useEffect, useState } from 'react';
import Config from '../../../config/Config';
import axios from 'axios';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import moment from 'moment/moment';

const { API_URL } = Config;

function page() {
  const [employeeList, setEmployeeList] = useState([]);

  const getEmployeeList = () => {
    const requestOptions = {
      method: 'GET',
      url: `${API_URL}/employee`,
    };
    axios(requestOptions)
      .then((data) => {
        setEmployeeList(data.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    getEmployeeList();
  }, []);
  return (
    <div>
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
            {employeeList.map((row) => (
              <TableRow key={row.userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {`${row.firstName} ${row.lastName}`}
                </TableCell>
                <TableCell align="right">{`${row.email}`}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{moment(row.dob).format('DD MMM YYYY')}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default page;
