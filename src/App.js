import { sortBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { getCountries, getReportByCountry } from './apis';
import CountrySelector from './components/CountrySelector';
import Highlight from './components/Highlight';
import Summary from './components/Summary';
import { Typography, Container } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/vi';
import '@fontsource/roboto';

moment.locale('vi')

function App() {
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const [report, setReport] = useState([]);
    useEffect(() => {
        getCountries().then(res => {
            console.log({ res });
            const countries = sortBy(res.data, 'Country')
            setCountries(countries);
            setSelectedCountryId('vn');
        });
    }, []);

    const handleOnChange = (e) => {
        setSelectedCountryId(e.target.value);
    };

    useEffect(() => {
        if (selectedCountryId) {
            const { Slug } = countries.find((country) => country.ISO2.toLowerCase() === selectedCountryId);
            //callAPI
            getReportByCountry(Slug).then((res) => {
                // xoa di item cuoi trong array res
                res.data.pop()
                setReport(res.data)
            }
            );
        }
    }, [countries, selectedCountryId]);

    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h2" component="h2">
                So lieu Covid-19
            </Typography>
            <Typography>
                {moment().format('LLL')}
            </Typography>

            <CountrySelector
                countries={countries}
                handleOnChange={handleOnChange}
                value={selectedCountryId}
            />
            <Highlight report={report} />
            <Summary report={report} selectedCountryId={selectedCountryId} />
        </Container>
    );
}

export default App;
