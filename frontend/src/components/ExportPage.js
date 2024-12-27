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

const ExportPage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://restaurantmgmt-qrcz.onrender.com/api/restaurants')
          .then(res => {
            console.log(res)
            setRestaurants(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.error('Error in fetching patients at Exportpage:', err);
            setLoading(false);
          });
      }, []);

      const exportToPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Restaurants List', 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

        const tableColumn = ["Name", "Location", "Phonenumber", "Date"];
        const tableRows = restaurants.map(restaurant => [
          restaurant.name,
          restaurant.location,
          restaurant.phonenumber,
        //   patients.publisher,
          new Date(restaurant.Date).toLocaleDateString()
        ]);

        doc.autoTable({
            startY: 30,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255 }
          });

          doc.save('restaurants-list.pdf');
        };

        const exportToExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(restaurants.map(restaurant => ({
              Name: restaurant.name,
              Location: restaurant.location,
              Phonenumber: restaurant.phonenumber,
              'Date': new Date(restaurant.Date).toLocaleDateString()
            })));

            const workrestaurant = XLSX.utils.restaurant_new();
            XLSX.utils.restaurant_append_sheet(workrestaurant, worksheet, "Restaurants");
            const excelBuffer = XLSX.write(workrestaurant, { restaurantType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(data, 'restaurants-list.xlsx');
          };

          const exportToCSV = () => {
            const worksheet = XLSX.utils.json_to_sheet(restaurants.map(restaurant => ({
                Name: restaurant.name,
                Location: restaurant.location,
                Phonenumber: restaurant.phonenumber,
                'Date': new Date(restaurant.Date).toLocaleDateString()
            })));
            
            const csv = XLSX.utils.sheet_to_csv(worksheet);
            const data = new Blob([csv], { type: 'text/csv;charset=utf-8' });
            saveAs(data, 'restaurants-list.csv');
          };

          const exportToText = () => {
            let content = 'restaurants List\n\n';
            content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
            
            restaurants.forEach((restaurant, index) => {
              content += `${index + 1}. RESTAURANTS DETAILS\n`;
              content += `Name: ${restaurant.name}\n`;
              content += `Location: ${restaurant.location}\n`;
              content += `Phonenumber: ${restaurant.phonenumber}\n`;
            //   content += `Publisher: ${book.publisher}\n`;
              content += `Date: ${new Date(restaurant.Date).toLocaleDateString()}\n`;
              content += `Description: ${restaurant.description || 'N/A'}\n`;
              content += '\n----------------------------\n\n';
            });
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            saveAs(blob, 'patients-list.txt');
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
                  Export your restaurant collection in different formats
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
                  gap: 3,
                  mt: 4 
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={exportToPDF}
                    sx={{ p: 2 }}
                  >
                    Export as PDF
                  </Button>
                  { <Button
                    variant="contained"
                    size="large"
                    startIcon={<TableViewIcon />}
                    onClick={exportToCSV}
                    sx={{ p: 2 }}
                  >
                    Export as CSV
                  </Button> }
                  { <Button
                    variant="contained"
                    size="large"
                    startIcon={<DownloadIcon />}
                    onClick={exportToExcel}
                    sx={{ p: 2 }}
                  >
                    Export as Excel
                  </Button> }
                  { <Button
                    variant="contained"
                    size="large"
                    startIcon={<DescriptionIcon />}
                    onClick={exportToText}
                    sx={{ p: 2 }}
                  >
                    Export as Text
                  </Button> }
                </Box>
                <Typography variant="body2" sx={{ mt: 4 }} align="center" color="text.secondary">
                  Total Restaurants: {restaurants.length}
                </Typography>
              </Paper>
            </Container>
          );
        };

export default ExportPage;