import * as React from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router';
import Select, { ValueType } from 'react-select';
import { CSSProperties } from 'react';
import Cumulated from './views/Cumulated';
import AllInOne from './views/AllInOne';
import DoublingTimes from './views/DoublingTimes';
import useData from '../helpers/hooks/useData';
import Layout from '../components/layout/Layout';
import LogScaleSwitch from '../components/inputs/LogScaleSwitch';
import Countries from '../helpers/const/Countries';
import DefaultCountries from '../helpers/const/DefaultCountries';
import DailyRates from './views/DailyRates';

type SelectOption = {
  value: string | number;
  label: string;
};

const lastDaysSelectOptions: SelectOption[] = [...Array(60)].map((_, i) => ({
  value: i,
  label: i !== 0 ? `last ${i} days` : `all data`,
}));

const countrySelectOptions: SelectOption[] = Countries.map(country => ({
  value: country,
  label: country,
}));

const defaultCountries: SelectOption[] = DefaultCountries.map(country => ({
  value: country,
  label: country,
}));

const countrySelectionStyles = {
  control: (styles: CSSProperties) => ({
    ...styles,
    minWidth: '300px',
    borderRadius: 0,
    borderColor: '#000000',
    minHeight: '42px',
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: (styles: any, { isFocused, isSelected }: any) => ({
    ...styles,
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: isSelected ? '#0AB4B4' : isFocused ? '#0AB4B4' : null,
    // eslint-disable-next-line no-nested-ternary
    color: isSelected ? '#FFFFFF' : isFocused ? '#FFFFFF' : null,
    ':active': {
      ...styles[':active'],
      backgroundColor: '#0AB4B4',
    },
  }),
  multiValueRemove: (styles: CSSProperties) => ({
    ...styles,
    ':hover': {
      backgroundColor: '#0AB4B4',
    },
  }),
  multiValue: (styles: CSSProperties) => ({
    ...styles,
    borderRadius: 0,
    backgroundColor: '#DCD9D6',
  }),
};

const Page: React.SFC = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  const [selectedCountries, setSelectedCountries] = React.useState<SelectOption[]>(defaultCountries);
  const [lastDays, setLastDays] = React.useState<SelectOption>(lastDaysSelectOptions[0]);
  const [isLogScale, setIsLogScale] = React.useState(false);

  const seletedCountryStrings = selectedCountries.map(country => country.value);

  const { loading, data } = useData({
    offset: lastDays.value as number,
    selectedCountries: seletedCountryStrings as string[],
  });

  const onCountriesChanged = (value: ValueType<SelectOption>) =>
    setSelectedCountries(value !== null ? (value as SelectOption[]) : []);

  const onDaysChanged = (value: ValueType<SelectOption>) =>
    setLastDays((value as SelectOption) || lastDaysSelectOptions[0]);

  return (
    <Layout>
      <div className="flex flex-wrap justify-center pt-8 px-4">
        <div className="m-2">
          <Select
            value={selectedCountries}
            onChange={onCountriesChanged}
            options={countrySelectOptions}
            isMulti
            closeMenuOnSelect={false}
            styles={countrySelectionStyles}
          />
        </div>
        <div className="m-2">
          <Select
            value={lastDays}
            onChange={onDaysChanged}
            options={lastDaysSelectOptions}
            styles={countrySelectionStyles}
          />
        </div>
        {!loading && pathname !== '/page/doubling-times' && (
          <div className="m-2">
            <LogScaleSwitch isLogScale={isLogScale} setIsLogScale={(setTo: boolean) => setIsLogScale(setTo)} />
          </div>
        )}
      </div>
      <Switch>
        <Route exact path={`${path}/cumulated`}>
          <Cumulated isLogScale={isLogScale} loading={loading} countryData={data} />
        </Route>
        <Route path={`${path}/daily-rates`}>
          <DailyRates isLogScale={isLogScale} loading={loading} countryData={data} />
        </Route>
        <Route path={`${path}/all-in-one`}>
          <AllInOne isLogScale={isLogScale} loading={loading} countryData={data} />
        </Route>
        <Route path={`${path}/doubling-times`}>
          <DoublingTimes loading={loading} countryData={data} />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Page;
