// src/components/ExportPage.js
import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Box, CircularProgress } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const Export = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://restaurantmgmt.onrender.com/api/restaurant')
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching restaurants:', err);
        setLoading(false);
      });
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add title and date
    doc.setFontSize(16);
    doc.text('Restaurants List', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

    // Create table data
    const tableColumn = ['Name', 'Phone Number', 'Location', 'Date', 'Description'];
    const tableRows = restaurants.map((restaurant) => [
      restaurant.name,
      restaurant.phonenumber,
      restaurant.location,
      new Date(restaurant.date).toLocaleDateString(),
      restaurant.description || 'N/A',
    ]);

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });

    doc.save('restaurants-list.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      restaurants.map((restaurant) => ({
        Name: restaurant.name,
        'Phone Number': restaurant.phonenumber,
        Location: restaurant.location,
        Date: new Date(restaurant.date).toLocaleDateString(),
        Description: restaurant.description || 'N/A',
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Restaurants');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(data, 'restaurants-list.xlsx');
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      restaurants.map((restaurant) => ({
        Name: restaurant.name,
        'Phone Number': restaurant.phonenumber,
        Location: restaurant.location,
        Date: new Date(restaurant.date).toLocaleDateString(),
        Description: restaurant.description || 'N/A',
      }))
    );

    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const data = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(data, 'restaurants-list.csv');
  };

  const exportToText = () => {
    let content = 'RESTAURANTS LIST\n\n';
    content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

    restaurants.forEach((restaurant, index) => {
      content += `${index + 1}. RESTAURANT DETAILS\n`;
      content += `Name: ${restaurant.name}\n`;
      content += `Phone Number: ${restaurant.phonenumber}\n`;
      content += `Location: ${restaurant.location}\n`;
      content += `Date: ${new Date(restaurant.date).toLocaleDateString()}\n`;
      content += `Description: ${restaurant.description || 'N/A'}\n`;
      content += '\n----------------------------\n\n';
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'restaurants-list.txt');
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Export Restaurants
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }} align="center" color="text.secondary">
          Export your restaurant data in different formats
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 3,
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<PictureAsPdfIcon />}
            onClick={exportToPDF}
            sx={{ p: 2 }}
          >
            Export as PDF
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<TableViewIcon />}
            onClick={exportToCSV}
            sx={{ p: 2 }}
          >
            Export as CSV
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={exportToExcel}
            sx={{ p: 2 }}
          >
            Export as Excel
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<DescriptionIcon />}
            onClick={exportToText}
            sx={{ p: 2 }}
          >
            Export as Text
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 4 }} align="center" color="text.secondary">
          Total Restaurants: {restaurants.length}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Export;