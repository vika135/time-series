import './app.scss';
import Chart from "./components/chart/Chart";
import ValuesList from "./components/values-list/ValuesList";
import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {ChartValueModel} from "./models/chart-value.model";

type SetValuesType = Dispatch<SetStateAction<ChartValueModel[]>>
type ValuesContext = {values: ChartValueModel[], setValues: SetValuesType}

export const ValuesContext = createContext<ValuesContext>({} as unknown as ValuesContext);

export function App() {
    const [values, setValues] = useState<ChartValueModel[]>([])

    useEffect(() => {
        const storedValues = localStorage.getItem('values');
        if (storedValues) {
            setValues(JSON.parse(storedValues));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('values', JSON.stringify(values));
    }, [values])

    return (
        <ValuesContext.Provider value={{values, setValues}}>
            <div className='app'>
                <Chart></Chart>
                <ValuesList></ValuesList>
            </div>
        </ValuesContext.Provider>
    );
}

export default App;
