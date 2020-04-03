import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';
import Select, { ValueType } from 'react-select';
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

const Page: React.SFC = () => {
  const { path } = useRouteMatch();

  const [selectedCountries, setSelectedCountries] = React.useState<SelectOption[]>(defaultCountries);
  const [isLogScale, setIsLogScale] = React.useState(false);

  const seletedCountryStrings = selectedCountries.map(country => country.value);

  const { loading, data } = useData({
    offset: 21,
    selectedCountries: seletedCountryStrings,
    numberOfCountries: seletedCountryStrings.length,
  });

  return (
    <Layout>
      <div className="flex justify-center pt-8">
        <Select
          value={selectedCountries}
          onChange={(value: ValueType<SelectOption>) => setSelectedCountries(value as SelectOption[])}
          options={selectOptions}
          isMulti
          closeMenuOnSelect={false}
        />
      </div>
      <div className="flex justify-center pt-8">
        {!loading && (
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
          <DoublingTimes />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Page;
