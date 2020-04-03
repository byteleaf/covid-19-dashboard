import * as React from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router';
import Select, { ValueType } from 'react-select';
import { CSSProperties } from 'react';
import Dashboard from './views/Dashboard';
import AllInOne from './views/AllInOne';
import DoublingTimes from './views/DoublingTimes';
import useData from '../helpers/hooks/useData';
import Layout from '../components/layout/Layout';
import LogScaleSwitch from '../components/switches/LogScaleSwitch';
import Countries from '../helpers/const/Countries';
import DefaultCountries from '../helpers/const/DefaultCountries';

type SelectOption = {
  value: string;
  label: string;
};

const selectOptions: SelectOption[] = Countries.map(country => ({
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
  const [isLogScale, setIsLogScale] = React.useState(false);

  const seletedCountryStrings = selectedCountries.map(country => country.value);

  const { loading, data } = useData({
    offset: 0,
    selectedCountries: seletedCountryStrings,
  });

  const onCountriesChanged = (value: ValueType<SelectOption>) =>
    setSelectedCountries(value !== null ? (value as SelectOption[]) : []);

  return (
    <Layout>
      <div className="flex justify-center pt-8 px-4">
        <Select
          value={selectedCountries}
          onChange={onCountriesChanged}
          options={selectOptions}
          isMulti
          closeMenuOnSelect={false}
          styles={countrySelectionStyles}
        />
      </div>
      <div className="flex justify-center pt-8 px-4">
        {!loading && pathname !== '/page/doubling-times' && (
          <LogScaleSwitch isLogScale={isLogScale} setIsLogScale={(setTo: boolean) => setIsLogScale(setTo)} />
        )}
      </div>
      <Switch>
        <Route exact path={path}>
          <Dashboard isLogScale={isLogScale} loading={loading} countryData={data} />
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
