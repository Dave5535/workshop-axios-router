import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const CrudDemo = () => {

  // initializ js variables 
  const persons = [
    { id: 1, firstName: 'Test', lastName: 'Testing', email: "TestEmail.com", title: "test" },
    { id: 2, firstName: 'David', lastName: 'Svantesson', email: "email.com", title: "programer" },
    { id: 3, firstName: 'Bengt', lastName: 'Bengtsson', email: "bengt@email.com", title: "?" },
    { id: 4, firstName: 'Mario', lastName: 'Mariolastname', email: "Nintendo", titel: "Game character" }];

  // define state variables 

  const [personList, setPersonList] = useState(persons);
  const [showDetails, setShowDetails] = useState(false);
  const [person, setPerson] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    title: "",
  });


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
              <button type='button' className='btn btn-danger' onClick={() => {
                setPerson({});
                setShowDetails(false);
              }}>Hide</button>
            </div>

          </div>
        )}
      </>
    );
  }

  // Table 
  const Table = () => {
    return (
      <div className="test">
        <table className="table table-striped">
          <TableHeader />
          <tbody>

            {personList.map((person) => (
              <TableRow
                key={person.id}
                person={person}
               
              />
            ))}
          </tbody>
        </table>
      </div>
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

    if (!props.list && props.list.length == 0) {
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

  const TableAction = (props) => {

    const handleDetailsClick = () => {
      console.log("PERSON:", person);
      setPerson(props.person);
      setShowDetails(true);
      }
      const handleDeleteClick = () => {
        console.log("PERSON: Deleted");
      };
    
      const handleEditClick = () => {
        console.log("PERSON: Edited ");
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
      <div>
        <PersonDetails />
      </div>

      <div>
        <table className='table table-striped'>
          <TableHeader />
          <TableRow list={personList} />
        </table>
      </div>
    </>
  );
}
export default CrudDemo;