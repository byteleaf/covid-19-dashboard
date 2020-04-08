import * as React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const Start: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-wrap w-full lg:w-1/2">
          <div className="flex w-1/2 h-64 p-2">
            <Link
              to="/page/cumulated"
              className="flex justify-center items-center bg-turquois text-white text-center hover:bg-light-turquois w-full h-full font-roboto-mono text-base uppercase tracking-widest-2"
            >
              Cumulated Values
            </Link>
          </div>
          <div className="flex w-1/2 h-64 p-2">
            <Link
              to="/page/daily-rates"
              className="flex justify-center items-center bg-turquois text-white text-center hover:bg-light-turquois w-full h-full font-roboto-mono text-base uppercase tracking-widest-2"
            >
              Daily Rates
            </Link>
          </div>
          <div className="flex w-1/2 h-64 p-2">
            <Link
              to="/page/all-in-one"
              className="flex justify-center items-center bg-turquois text-white text-center hover:bg-light-turquois w-full h-full font-roboto-mono text-base uppercase tracking-widest-2"
            >
              All In One
            </Link>
          </div>
          <div className="flex w-1/2 h-64 p-2">
            <Link
              to="/page/doubling-times"
              className="flex justify-center items-center bg-turquois text-white text-center hover:bg-light-turquois w-full h-full font-roboto-mono text-base uppercase tracking-widest-2"
            >
              Doubling Times
            </Link>
          </div>
          <div className="flex w-full h-64 p-2">
            <Link
              to="/page/streamgraph"
              className="flex justify-center items-center bg-turquois text-white text-center hover:bg-light-turquois w-full h-full font-roboto-mono text-base uppercase tracking-widest-2"
            >
              Streamgraph
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Start;
