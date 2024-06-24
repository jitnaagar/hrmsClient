'use client';

import React, { useEffect, useState } from 'react';
import Config from '../../../../config/Config';
import axios from 'axios';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { authHeader } from '../../../../helper/helper';
import CustomDialogTitle from '../../common/CustomDialogTitle';

const { API_URL } = Config;

function Department() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('active');

  const form = 'department-form';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const getList = async () => {
    const requestOptions = {
      method: 'GET',
      // url: `${API_URL}/department`,
      url: 'https://hrms-backend-kappa.vercel.app/department',
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

  const handleSubmit = async () => {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: await authHeader(),
      // url: `${API_URL}/department`,
      url: 'https://hrms-backend-kappa.vercel.app/department',
      data: {
        status: status,
        title: title,
      },
    };
    axios(requestOptions)
      .then((data) => {
        setLoading(false);
        getList();
        console.log('data');
      })
      .catch((error) => {
        setLoading(false);
        console.log('error', error);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const initialValues = {
    title,
    status,
  };

  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h1" fontSize={20}>
          Department
        </Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add
        </Button>
      </Box>
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
      <Dialog open={open} maxWidth="sm" fullWidth>
        <CustomDialogTitle onClose={handleClose}>Add Department</CustomDialogTitle>
        <DialogContent sx={{ pt: '20px' }}>
          <Box sx={{ mt: '20px' }}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={Yup.object({
                title: Yup.string().required('Required'),
                status: Yup.string().required('Required'),
              })}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, errors }) => {
                return (
                  <Form onSubmit={handleSubmit} id={form}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <Field
                          name="title"
                          size="small"
                          fullWidth
                          component={TextField}
                          variant="outlined"
                          label="Title"
                          value={title}
                          disabled={loading}
                          onChange={handleTitleChange}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <Field
                          name="status"
                          size="small"
                          fullWidth
                          select
                          component={TextField}
                          variant="outlined"
                          label="Status"
                          value={status}
                          disabled={loading}
                          onChange={handleStatusChange}
                        >
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="inactive">Inactive</MenuItem>
                        </Field>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" type="submit" form={form} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Department;
