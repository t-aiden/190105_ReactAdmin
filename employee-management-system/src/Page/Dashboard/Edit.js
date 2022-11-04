import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { employeesData } from '../../data';

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {

    const id = selectedEmployee.id;

    const [firstName, setFirstName] = useState(selectedEmployee.firstName);
    const [lastName, setLastName] = useState(selectedEmployee.lastName);
    const [email, setEmail] = useState(selectedEmployee.email);
    const [salary, setSalary] = useState(selectedEmployee.salary);
    const [telephone, setTelephone] = useState(selectedEmployee.telephone);
    const [date, setDate] = useState(selectedEmployee.date);
    const regexp = /^0\d{9,10}$/;


    const handleUpdate = e => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !salary || !telephone|| !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        if(!regexp.test(telephone)){
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'The telephone must be a japan mobile hpone number.',
                showConfirmButton: true
            })
        } 

        const employee = {
            id,
            firstName,
            lastName,
            email,
            salary,
            telephone,
            date
        };

        //修改当前分页数据中的数据
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === id) {
                employees.splice(i, 1, employee);//替换到队列当中的对象
                break;
            }
        }

        //修改内存中的总备份数据
        for (let i = 0; i < employeesData.length; i++) {
            if (employeesData[i].id === id) {
                employeesData.splice(i, 1, employee);//替换到队列当中的对象
                break;
            }
        }

        
        setEmployees(employees);
        setIsEditing(false);

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit Employee</h1>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="salary">Salary ($)</label>
                <input
                    id="salary"
                    type="number"
                    name="salary"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                />
                <label htmlFor="telephone">Telephone </label>
                <input
                    id="telephone"
                    type="number"
                    name="telephone"
                    value={telephone}
                    onChange={e => setTelephone(e.target.value)}
                />
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsEditing(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit