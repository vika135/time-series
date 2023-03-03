import './app.scss';
import Chart from "./components/chart/Chart";
import ValuesList from "./components/values-list/ValuesList";
import {createContext, Dispatch, SetStateAction, useState} from "react";
import {ChartValueModel} from "./models/chart-value.model";

type SetValuesType = Dispatch<SetStateAction<ChartValueModel[]>>
type ValuesContext = {values: ChartValueModel[], setValues: SetValuesType}

export const ValuesContext = createContext<ValuesContext>({} as unknown as ValuesContext);

export function App() {
    const [values, setValues] = useState<ChartValueModel[]>([])

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
