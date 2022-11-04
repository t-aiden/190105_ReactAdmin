import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2';

function Add({ employees, setEmployees, setIsAdding }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [telephone, setTelephone] = useState('');
    const [date, setDate] = useState('');

    const textInput = useRef(null);
    const regexp = /^0\d{9,10}$/;

    useEffect(() => {
        textInput.current.focus();
    }, [])

    const handleAdd = e => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !salary || !telephone || !date) {
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

        const employeesData = JSON.parse(localStorage.getItem('employees')) || [];
        const id = employeesData.length + 1;
        const newEmployee = {
            id,
            firstName,
            lastName,
            email,
            salary,
            telephone,
            date
        }
        // add to memory array
        employees.push(newEmployee);
        // update temp employees array 
        setEmployees(employees);

        // 
        
        employeesData.push(newEmployee)
        localStorage.setItem('employees', JSON.stringify(employeesData));

        setIsAdding(false);

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${firstName} ${lastName}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
    }


    return (
        <div className="small-container">
            <form onSubmit={handleAdd}>
                <h1>Add Employee</h1>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    ref={textInput}
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
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdding(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Add