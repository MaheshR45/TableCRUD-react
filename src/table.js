import React from 'react';

function StudentTable({ headings, data,handleView,handleEdit,handleDelete }) {
  return (
    <table className="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          {headings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.address}</td>
            <td>{student.city}</td>
            <td>{student.country}</td>
            <td>
              <a href="#" onClick={() => handleView(student)} title="View" data-toggle="tooltip" style={{ color: '#10ab80' }}>
                <i className="material-icons">&#xE417;</i>
              </a>
              <a href="#" onClick={() => handleEdit(student)} title="Edit" data-toggle="tooltip">
                <i className="material-icons">&#xE254;</i>
              </a>
              <a href="#" onClick={() => handleDelete(student)} title="Delete" data-toggle="tooltip" style={{ color: 'red' }}>
                <i className="material-icons">&#xE872;</i>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
