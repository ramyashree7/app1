import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../style.css';
function Sidebar() {
  return (
    <div className='bg-white sidebar p-2'>
        <div className='m-2'>
            <i className='bi bi-bootstrap-fill me-2 fs-5'></i>
            <span className='brand-name fs-4 me-5'>Yousaf</span>
        </div>
        <hr className='text-dark'/>
        <div className='list-group list-group-flush'>
            <a className='list-group-item py-2'>
                <i className="bi bi-speedometer me-3"></i>
                <span className='fs-5 me-2'> Dashboard</span>
            </a>
            <a className='list-group-item py-2'>
                <i className='bi bi-house fs-5 me-3'></i>
                <span className='fs-5 me-5'>  Home</span>
            </a>
            <a className='list-group-item py-2'>
                <i className='bi bi-table fs-5 me-4'></i>
                <span className='fs-5 me-4'>  Product</span>
            </a>
            <a className='list-group-item py-2'>
                <i className='bi bi-clipboard-data fs-5 me-2'></i>
                <span className='fs-5 me-5'> Report</span>
            </a>
            <a className='list-group-item py-2'>
                <i className='bi bi-people fs-5 me-2'></i>
                <span className='fs-5 me-3'> Customer</span>
            </a>
            <a className='list-group-item py-2'>
                <i className='bi bi-power fs-5 me-2'></i>
                <span className='fs-5 me-5'> Logout</span>
            </a>
  
        </div>
        
    </div>
  )
}

export default Sidebar