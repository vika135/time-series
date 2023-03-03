import {ChartValueModel} from "../../models/chart-value.model";
import "./Value.scss"
import {formatTimestampToDate} from "../../utils/date.util";
import {memo} from "react";

export default memo(function Value({value, deleteValue}: {
    value: ChartValueModel
    deleteValue: (valueTimestamp: number) => void
}) {

    return (
        <div className='value'>
            <span>{formatTimestampToDate(value.time)}</span>
            <span className='value-bold'>{value.value}</span>
            <button onClick={() => deleteValue(value.time)}>Remove</button>
        </div>
    )
});