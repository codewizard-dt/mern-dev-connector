import React, { Fragment, useEffect } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const hasProfile = () => (
    <Fragment>
      <DashboardActions />
      <hr />
      <div className="section">
        <Experience experience={profile.experience} />
        <Education education={profile.education} />

      </div>
      <div className="my-1">
        <button className="btn btn-danger" onClick={() => deleteAccount()}>
          <i className="fas fa-user-minus" /> Delete My Account
        </button>
      </div>
    </Fragment>
  )
  const noProfile = () => (
    <Fragment>
      <div>You haven't added any information to your profile yet.</div>
      <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
    </Fragment>
  )

  return loading
    ? (
      <div>loading...</div>
    ) : (
      <div className='container'>
        <h1 className="large text-primary">
          Dashboard
        </h1>
        <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
        {profile === null ? noProfile() : hasProfile()}
      </div>
    );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
