import React, { useEffect, useState } from 'react';
import * as queryString from 'query-string';
import AppointmentService from '../Services/AppointmentService';
import { ButtonMaterial } from '../components/uikit/UIkit';

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

    // useEffect(() => { fetchGuestConfirm(queryParams.hash); }, [fetchGuestConfirm]);

    const handleConfirmClick = () => {
        fetchGuestConfirm(queryParams.id).then(response => alert(response));
    };

    return (
        <div>
            {queryParams.id}
            <ButtonMaterial onClick={handleConfirmClick} caption="Confirmar" />
        </div>
    );
};

export default Confirm;
