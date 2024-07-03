import React from 'react'
import Index2 from '../components/Index2'

function Index1() {
    return (

        <div className='home' style={{ paddingBottom: '50px' }}>
            <div className='row'>
                <div style={{ textAlign: 'center' }} className='col-md-12'>
                    <h2 className="logo">Movie<span className="stream">Stream</span></h2>
                </div>
            </div>
            <Index2 />
        </div>
    )
}

export default Index1
