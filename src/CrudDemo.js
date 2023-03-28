import React, { useEffect, useState } from 'react'

const CrudDemo = () =>  {
  
const persons = [{ id: '1', Name: 'Test', Email: "TestEmail.com" }, { id: '2', Name: 'David Svantesson', Email: "email.com" }, { id: '3', Name: 'Bengt', Email: "Bengtsson" }, { id: '4', Name: 'Mario', Email: "Nintendo" }];
const [person, setPerson] = useState(persons);

const Table = () => {
    return (
        <div className="test">
            <table className="table table-striped">
                <TableHeader />
                <tbody>
                {person.map((p) => (
            <TableRow key={p.id} id={p.id} name={p.Name} email={p.Email} />
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
  };

const TableRow = (props) => {
    return (
      <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>
          <TableAction />
        </td>
      </tr>
    );
  };

 const TableAction = () => {
    return (
        <div>
            <button className='btn btn-primary'>Details</button>
            <button className='btn btn-danger'>Delete</button>
            <button className='btn btn-warning'>Edit</button>
        </div>)
}

    return (
        <div>
           
<br/>
<Table />
        </div>
        );
}
export default CrudDemo;