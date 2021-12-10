import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import LineChart from './LineChart';
import HighMaps from './HighMaps';

const Summary = ({ report, selectedCountryId }) => {
    const [mapData, setMapData] = useState({});

    useEffect(() => {
        if (selectedCountryId) {
            import(
                `@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
            ).then((res) => {
                setMapData(res);
            }).catch((err) => console.log({ err }));
        }
    }, [selectedCountryId]);
    return (
        <div style={{ marginTop: '10px' }}>
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <LineChart data={report} />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <HighMaps mapData={mapData} />
                </Grid>
            </Grid>
        </div>
    )

}

export default Summary;