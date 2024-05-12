import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import MUITable from './components/MUITable';
import FormDialog from './components/FormDialog';
import NewPlanFormDialog from './components/NewPlanFormDialog'
import { Button } from '@mui/material';

function App() {

  const [ data, setData] = useState([]);
  const [ newPlanDisplay, setNewPlanData] = useState({show:false, id:0, planData: {                
    planName: "Platinum365",
    planCost: 499,
    validity: 365,
    planStatus: "Active",
  }});

  const columns = [
    { id: 'id', Header: 'ID', accessor: (row) => row.id },
    { id: 'name', Header: 'Name', accessor: (row) => row.name },
    { id: 'email', Header: 'Email', accessor: (row) => row.email },
    { id: 'Plan', Header: 'Plan', accessor: (row) => row.plan?.name },
    { id: 'Status', Header: 'Status', accessor: (row) => row.plan?.status },
  ];
  
  const actionColumnConfig = [
    {
      label: 'Edit',
      icon: <Button variant="contained" size="small">Assign / Update Plan</Button>,
      handler: (rowData) => {
        let formLabel = "Update Plan";
        if(data[rowData].plan == null) {
          formLabel = "Add New Plan";
        }
        const planData = {                
          planName: data[rowData].plan?.name || "Platinum365",
          planCost: data[rowData].plan?.cost || 499,
          validity: data[rowData].plan?.validity || 365,
          planStatus: data[rowData].plan?.status || "Active",
        }
        setNewPlanData({formLabel, show: true, id: rowData, planData: data[rowData].plan !== null ? {                
          planName: data[rowData].plan?.name,
          planCost: data[rowData].plan?.cost,
          validity: data[rowData].plan?.validity,
          planStatus: data[rowData].plan?.status,
        } : {                
          planName: "Platinum365",
          planCost: 499,
          validity: 365,
          planStatus: "Active",
        } })
      },
    },
    // {
    //   label: 'Delete',
    //   icon: <Button variant="contained" color="error" size="small">Delete</Button>,
    //   handler: (rowData) => {
    //     // Handle delete functionality for the row with rowData
    //   },
    // },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/customers'); // Replace with your actual endpoint
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <FormDialog />
      {newPlanDisplay.planData && (<NewPlanFormDialog key={newPlanDisplay.planData?.planName} formLabel={newPlanDisplay.formLabel} isFormOpen={newPlanDisplay.show} customerID={newPlanDisplay.id} planData={newPlanDisplay.planData} onClose={()=> {setNewPlanData({show:false, id:0})}} />)}
      <div className="App-body">
        <MUITable data={data} columns={columns} actionColumnConfig={actionColumnConfig} />
      </div>
    </div>
  );
}

export default App;
