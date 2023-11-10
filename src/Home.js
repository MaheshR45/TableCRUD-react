import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ExcelDownloadButton from './Excel';
import { useDispatch, useSelector } from 'react-redux';
import { Create, Delete, Update, Search } from './redux/crudSlice';
import StudentTable from './table';


function Home() {
  const dispatch = useDispatch();
  const crudItems = useSelector((state) => state.crud);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  //onclick of each function button in table row we will store 
  //that row data as student data and store in selected tudent
  const [selectedStudent, setselectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const headings = ['#', 'Name', 'Address', 'City', 'Country'];
  const [newStudent, setNewStudent] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
  });


  // Function to handle the search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    dispatch(Search(searchQuery));
  };

  // Function to open the view modal
  const handleView = (student) => {
    setselectedStudent(student);
    setShowViewModal(true);
  };

  // Function to open the edit modal
  const handleEdit = (student) => {
    setselectedStudent(student);
    setShowEditModal(true);
  };

  // Function to open the delete modal
  const handleDelete = (student) => {
    setselectedStudent(student);
    setShowDeleteModal(true);
  };

  // Function to open the create modal
  const handleCreate = () => {
    setShowCreateModal(true);
  };

  // Function to save changes when editing a student
  const handleSaveChanges = (editedStudent) => {
    dispatch(Update(editedStudent));
    // Close the edit modal
    setShowEditModal(false);
  };

  // Function to delete a student
  const handleConfirmDelete = (deletedstudent) => {
    dispatch(Delete(deletedstudent.id));
    setShowDeleteModal(false);
  };


  // Function to create a new student record
  const handleCreateRecord = () => {
    const newId = crudItems.length + 1;
    const newStudentRecord = { id: newId, ...newStudent };
    dispatch(Create(newStudentRecord));
    setNewStudent({
      name: '',
      address: '',
      city: '',
      country: '',
    });
    setShowCreateModal(false);
  };

  //pdf converter
  const handleDownloadPDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(12);
    doc.text('Student Data', 40, 40);

    const headers = ['ID', 'Name', 'Address', 'City', 'Country'];
    const columnWidths = [50, 200, 200, 100, 100];
    const rowHeight = 20;
    const startY = 70;
    const tableX = 40;

    doc.autoTable({
      head: [headers],
      body: crudItems.map((student) => Object.values(student)),
      startY: startY,
      theme: 'striped',
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 100 },
        2: { cellWidth: 100 },
        3: { cellWidth: 100 },
        4: { cellWidth: 100 },
      },
      tableWidth: 'auto',
    });

    doc.save('student-data.pdf');
  };






  return (
    <div className="container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <Form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search Student" aria-label="Search" value={searchQuery}
                  onChange={handleSearch} />
              </Form>
            </div>
          </div>
          <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: 'green' }}>
            <h2><b>Student Details</b></h2>
          </div>
          <div className="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleCreate}>
              Add New Student
            </Button>
          </div>
        </div>

        <div className="row">
        <div className="table-responsive">
            {crudItems.length > 0 ? (
              <StudentTable headings={headings} data={crudItems} handleView={handleView}  handleEdit={handleEdit} handleDelete={handleDelete}/> // Pass headings and data as props
            ) : (
              <p>no data</p>
            )}
          </div>
        </div>
        {crudItems.length>0&&(<>
        <Button style={{ marginRight: "10px" }} variant="primary" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
        <ExcelDownloadButton data={crudItems} /> {/* Add the Excel download button here */}
        </>)}
      </div>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <div>
              <p><b>Name:</b> {selectedStudent.name}</p>
              <p><b>Address:</b> {selectedStudent.address}</p>
              <p><b>City:</b> {selectedStudent.city}</p>
              <p><b>Country:</b> {selectedStudent.country}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={selectedStudent.name}
                  onChange={(e) => {
                    const updatedStudent = { ...selectedStudent, name: e.target.value };
                    setselectedStudent(updatedStudent);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">address:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={selectedStudent.address}
                  onChange={(e) => {
                    const updatedStudent = { ...selectedStudent, address: e.target.value };
                    setselectedStudent(updatedStudent);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">city:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={selectedStudent.city}
                  onChange={(e) => {
                    const updatedStudent = { ...selectedStudent, city: e.target.value };
                    setselectedStudent(updatedStudent);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">country:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  value={selectedStudent.country}
                  onChange={(e) => {
                    const updatedStudent = { ...selectedStudent, country: e.target.value };
                    setselectedStudent(updatedStudent);
                  }}
                />
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {crudItems.length > 0 && (
            <>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleSaveChanges(selectedStudent)}>
                Save Changes
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <div>
              <p>Are you sure you want to delete the student: {selectedStudent.name}?</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleConfirmDelete(selectedStudent)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                className="form-control"
                placeholder="Enter address"
                value={newStudent.address}
                onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                className="form-control"
                placeholder="Enter city"
                value={newStudent.city}
                onChange={(e) => setNewStudent({ ...newStudent, city: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                className="form-control"
                placeholder="Enter country"
                value={newStudent.country}
                onChange={(e) => setNewStudent({ ...newStudent, country: e.target.value })}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCreateRecord()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Home;
