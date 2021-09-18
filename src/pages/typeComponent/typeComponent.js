import React, {useState} from "react";
import { ClassComponent, ReactFunctionComponent } from '../../components/FormBarangClassComponent';

const typeComponent = () => {
    // const [number, setNumber] = useState(0);

    return (
        <>
            <ClassComponent
                name="Red Cobalt"
                />
            <ReactFunctionComponent
                 name="Red Cobalt"
                />
        </>
    )
}

export default typeComponent