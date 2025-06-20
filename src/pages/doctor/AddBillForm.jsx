import React from 'react';
import AddBillForm from '../../components/doctor/AddBillForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { createBill } from '../../features/doctor/doctorSlice';
import { toast } from 'react-toastify';

const ShareBillPage = () => {
  const navigate = useNavigate();
   const { id } = useParams();
   const dispatch = useAppDispatch()
   

 
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmitBill = (billData) => {
    console.log('Shared Bill:', billData);
    dispatch(createBill(billData));
    toast.success('Bill shared successfully!');
    // You can send billData to your API here
    // navigate('/doctor/patients');
  };

  return<AddBillForm
  patientId={id}
  onGoBack={handleGoBack}
  onSubmitBill={handleSubmitBill}
/>
;
};

export default ShareBillPage;
