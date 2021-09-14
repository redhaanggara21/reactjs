import { Spinner } from 'react-bootstrap';
import React, {useState} from 'react'
import './component.css';

const Loading = React.memo(({isLoading}) => {
    return(
        <div>
            { isLoading &&
                <div className="content-loading">
                    <Spinner animation="border" />
                </div>
            }
        </div>
    )
    
});

export default Loading;