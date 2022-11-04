import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import { employeesData } from '../../data';

function Dashboard({ itemsPerPage }) {
    const [employees, setEmployees] = useState(employeesData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setEmployees(employeesData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(employeesData.length / itemsPerPage));
        
    }, [itemOffset, itemsPerPage]);

    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % employeesData.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const handleEdit = (id) => {
        const [employee] = employees.filter(employee => employee.id === id);
        setSelectedEmployee(employee);
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                const [employee] = employees.filter(employee => employee.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setEmployees(employees.filter(employee => employee.id !== id));
            }
        });
    }


    return (
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header
                        setIsAdding={setIsAdding}
                    />
                    <List
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
            )}

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Dashboard;