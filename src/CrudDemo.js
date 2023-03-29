import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AlertMessage from './AlertMessage';
import {useForm} from 'react-hook-form';

const CrudDemo = () => {

  // initializ js variables 
  const persons = [];

  // define state variables 

  const API_URL = 'http://localhost:8080/api/v1/person';
  const [selectedId, setSelectedId] = useState(null);
// Alert
  const [alert, setAlert] = useState({ type: '', message: '' });

// person
  const [personList, setPersonList] = useState(persons);
  const [showDetails, setShowDetails] = useState(false);
  const [person, setPerson] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    title: "",
  });
// useForm
  const {register, handleSubmit, formState: {errors}} = useForm();
// useEfect
  const [reload, setReload] = useState(false);

// useForm

  //useEfect 
  useEffect(() => {
    console.log("useEffect executed!");
    getRequestAction();

  }, [reload]);

  const updateDate = () => {
    setReload(!reload);
  }
  // Details for person
  const PersonDetails = () => {
    return (
      <>
        {showDetails && (
          <div className='card'>
            <div className='card-header bg-dark text-white'>
              Info
              <div className='card-body'>
                <div className='bm-3'>
                  <span>ID : {person.id}</span>
                </div>
                <div className='bm-3'>
                  <span>Name : {person.firstName + " " + person.lastName}</span>
                </div>
                <div className='bm-3'>
                  <span>Email : {person.email}</span>
                </div>
                <div className='bm-3'>
                  <span>Title : {person.title}</span>
                </div>
              </div>
              <button type='button' className='btn btn-danger' onClick={updateDate}>Hide</button>
            </div>

          </div>
        )}
      </>
    );
  }

  // Table 
  const Table = () => {
    return (

      <table className="table table-striped">


        <TableHeader />
        <TableRow list={personList} />


      </table>

    );
  }

  const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th colSpan="4" className="table-dark">
            <div className="d-flex justify-content-between align-items-center">
              <div>Person List</div>
            </div>
          </th>
        </tr>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  }

  const TableRow = (props) => {

    if (!props.list && props.list.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan="5">Data not Found</td>
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        {props.list.map((person) => {
          const row = (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.firstName + " "} {person.lastName} </td>
              <td>{person.email}</td>
              <td>
                <TableAction person={person} />
              </td>
            </tr>
          );
          return row;
        })}
      </tbody>
    );

  }
 
  const getRequestAction = async () => {
    await axios.get(API_URL).then(response => {
      console.log("RESPONSE:", response);
      if (response.status === 200) {
        setPersonList(response.data);
        setAlert({ type: 'success', message: 'GET operation is done!' })
      } else {
        setAlert({ type: 'warning', message: 'Display API Error Message...' });
      }
    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message })
    });
  }

  const TableAction = (props) => {

    const handleDetailsClick = async () => {
      console.log("PERSON:", props.person.id);
      
      await axios.get(API_URL + '/' +  props.person.id).then(response =>{
        if (response.status === 200) {
          setPerson(response.data);
          setShowDetails(true);
          setAlert({ type: 'success', message: 'GET operation is done!' })
        } else {
          setAlert({ type: 'warning', message: 'Display API Error Message...' });
        }
      }).catch(error => {
        console.log("ERROR: ", error);
        setAlert({ type: 'danger', message: error.message })
      });
     
    }
    const handleDeleteClick =  async () => {
      console.log("PERSON: Deleted ", props.person.id);
      // Call the API ( for all buttons )
      await axios.delete(API_URL+'/'+props.person.id).then(response => {
        updateDate();
        if(response.status === 204){
          setAlert({type: 'success', message: 'Put operation is done!'});
      } else {
          setAlert({type: 'warning', message: 'Display API Error Message...'});
      }
      }).catch( error => {
        console.log("ERROR: ", error);
        setAlert({type: 'danger', message: error.message});
    });
      

    };

    const handleEditClick = async ()  => {
      console.log("PERSON: Edited ", props.person);
      const data = {id: 1, firstName: 'Test', lastName:'testsson', email: 'test@test.se', title: 'TEST'}
      // Call the API ( for all buttons 
      await axios.put(API_URL, data).then(response =>{
        console.log("RESPONSE:", response);
        updateDate();
        if(response.status === 204){
          setAlert({type: 'success', message: 'Put operation is done!'});
      } else {
          setAlert({type: 'warning', message: 'Display API Error Message...'});
      }
      }).catch( error => {
        console.log("ERROR: ", error);
        setAlert({type: 'danger', message: error.message});
    });
    };

    return (
      <div>
        <button className='btn btn-primary' onClick={handleDetailsClick}>Details</button>
        <button className='btn btn-danger' onClick={handleDeleteClick}>Delete</button>
        <button className='btn btn-warning' onClick={handleEditClick}>Edit</button>
      </div>
    )
  }

  // what is seen on the page
  return (
    <>
    <div className='person-form'>

    </div>
      <div className='person-details-container'>
        <PersonDetails />
      </div>

      <div>
        <Table />
      </div>
      <div className='col'>
        <button type='button' className='btn btn-info' onClick={getRequestAction}>Get List of persons from API </button>
      </div>
    </>
  );
}
export default CrudDemo;