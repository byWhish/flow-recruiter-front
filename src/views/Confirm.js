import React, { useEffect, useState } from 'react';
import * as queryString from 'query-string';
import AppointmentService from '../Services/AppointmentService';

const Confirm = ({ location }) => {
    const { search } = location;
    const queryParams = queryString.parse(search);
    const [confirm, setConfirm] = useState(null);

    const fetchGuestConfirm = (guestHash) => {
        AppointmentService.fetchGuestConfirmPublic(guestHash)
            .then((response) => {
                setConfirm(response);
            });
    };

    useEffect(() => { fetchGuestConfirm(queryParams.hash); }, [fetchGuestConfirm]);

    return (
        <div>
            {confirm}
        </div>
    );
};

export default Confirm;
