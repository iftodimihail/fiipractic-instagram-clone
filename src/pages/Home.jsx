import React from "react";
import Card from '../components/Card';
import Posts from 'components/Posts';

function Home() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-8 col-sm-12 col-xs-12">
            <Card>
              Stories here
            </Card>
            <Posts/>
          </div>
          <div className="col-lg-5 col-md-4 col-sm-12 col-xs-12">
            <Card>
              Your profile
            </Card>
            <Card>
              Suggestions For You
            </Card>
            <Card>
              Useful links and credits
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
