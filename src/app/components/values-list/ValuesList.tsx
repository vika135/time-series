import "./ValuesList.scss"
import {useCallback, useContext, useState} from "react";
import {ChartValueModel} from "../../models/chart-value.model";
import Value from "../value/Value";
import {ValuesContext} from "../../app";

export default function ValuesList() {
    const [newValue, setNewValue] = useState('')
    const {values, setValues} = useContext(ValuesContext)

    const handleEnterClick = () => {
        const value: ChartValueModel = {
            value: +newValue,
            time: Date.now(),
        }
        if (value.value || value.value === 0) {
            setNewValue('')
            setValues(prev => [...prev, value])
        }
    }

    const handleValueDelete = useCallback((valueTimestamp: number) => {
        setValues(prev => prev.filter((val: ChartValueModel) => val.time !== valueTimestamp))
    }, [])

    return (
        <div className='values-list'>
            <p className='values-list__title'>Data</p>
            <input
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={(e) => {e.key === 'Enter' && handleEnterClick()}}
                value={newValue}
            />
            {values.length ? <p>List of values</p> : ''}
            <ul>
                {values.map(value => <Value key={value.time} value={value} deleteValue={handleValueDelete}/>)}
            </ul>
        </div>
    )
}