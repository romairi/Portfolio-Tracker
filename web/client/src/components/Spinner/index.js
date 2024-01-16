

import React from 'react';
import './index.scss';
import CircularProgress from '@mui/material/CircularProgress';

import { buildClassName } from '../../services/buildClassName';


export function SpinnerContainer({children, isLoading}) {
    return (
        <div className={buildClassName(["spinner_container", isLoading && "loading"])}>
            {isLoading ? <CircularProgress className="spinner" disableShrink/> : children}
        </div>
    );
}