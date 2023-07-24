// AuthenticatedContent.js
import React from 'react';

const AuthenticatedContent = ({ accessToken }) => {
  return (
    <div>
      <h2>Welcome to the Authenticated Section!</h2>
      <p>Your access token: {accessToken}</p>
    </div>
  );
};
export default AuthenticatedContent;
