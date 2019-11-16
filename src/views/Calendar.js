import React, { useCallback, useEffect, useState } from 'react';
import * as queryString from 'query-string';
import { format } from 'date-fns';
import { SelectMaterial } from '../components/uikit/UIkit';
import styles from './Calendar.module.css';
import LoadingModal from '../components/uikit/LoadingModal';
import { DONE, ERROR, LOADING, UNLOAD } from '../context/config';
import { AppointmentService } from '../Services/AppointmentService';
import { SimpleTable } from '../components/table/Tables';

const columns = [
    {
        id: 'time',
        label: 'Turno',
        minWidth: 130,
        align: 'center',
        format: value => format(value, 'HH:mm'),
    },
];

const Calendar = ({ location }) => {
    const { search } = location;
    const queryParams = queryString.parse(search);
    const [day, setDay] = useState(null);
    const [days, setDays] = useState([]);
    const [dayLabel, setDayLabel] = useState(null);
    const [loading, setLoading] = useState(UNLOAD);

    const fetchSchedules = useCallback(() => {
        setLoading(LOADING);
        AppointmentService.fetchGuestConfirmPublic(queryParams.id, true)
            .then((response) => {
                setDays(response);
                setLoading(DONE);
            })
            .catch(() => { setLoading(ERROR); });
    }, [queryParams.id]);

    const onChangeDay = useCallback(() => (event) => {
        const { value } = event.target;
        setDay(days[value - 1]);
        setDayLabel(value);
    }, [days]);

    const handleBlockSelect = useCallback(item => () => {
        setLoading(LOADING);
        AppointmentService.postSelectedBlock(queryParams.id, day.id, item.id)
            .then(() => { setLoading(DONE); })
            .catch(() => { setLoading(ERROR); });
    }, [day, queryParams]);

    useEffect(() => {
        fetchSchedules(queryParams.id);
    }, [fetchSchedules, queryParams.id]);

    return (
        <div className={styles.calendar}>
            <SelectMaterial label="Elige una fecha" value={dayLabel} items={days} onChange={onChangeDay} />
            <div className={styles.schedules}>
                {day ? <SimpleTable columns={columns} rows={day.blocks} select selectAction={handleBlockSelect} /> : null}
            </div>
            <LoadingModal state={loading} />
        </div>
    );
};

export default Calendar;
