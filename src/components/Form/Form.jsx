import React, {useEffect, useState} from "react"

const Form = () => {

    const [customerId, setCustomerId] = useState('')

    const sendCustomerId = () => {
        console.log("Mostrador ingresado: ", customerId)
        setCustomerId('')
    }
          
    return( 
        <div>
            <label>Ingresa mostrador</label>
            <input 
                type="text" 
                placeholder="Mostrador" 
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
            />
            <button onClick={()=>sendCustomerId()}>Procesar</button>
        </div>
    )
}

export default Form