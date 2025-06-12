import { Box, Button, Card, CardContent, Container, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectBillById } from '../../features/billing/billingSlice'; 
import type { RootState } from '../../app/store';

const BillDetails = () => {
  const { id } = useParams();
  const bill = useAppSelector((state: RootState) => 
    selectBillById(state, id || '')
  );

  if (!bill) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Bill not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bill Details
        </Typography>
        
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Bill #: {bill.id}</Typography>
                <Typography>Date: {new Date(bill.date).toLocaleDateString()}</Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
                <Typography variant="h6">
                  Status: <span style={{
                    color: bill.status === 'paid' ? 'green' : 
                           bill.status === 'pending' ? 'orange' : 'red'
                  }}>
                    {bill.status}
                  </span>
                </Typography>
                {bill.paymentMethod && (
                  <Typography>Payment Method: {bill.paymentMethod}</Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Unit Price</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bill.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">${item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell align="right">${item.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} align="right">
                        <Typography variant="h6">Total:</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6">${bill.totalAmount.toFixed(2)}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>

              {bill.status === 'pending' && (
                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                  <Button variant="contained" color="primary">
                    Pay Now
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default BillDetails;