import React from 'react';
import _ from 'lodash';
import {RefreshIndicator} from 'material-ui'

const styles = {
  refreshStyle: {
    position: 'relative',
    display: 'block',
    margin: '0 auto'
  }
};

const Loader = ({isLoading, children}) => {
  if (isLoading) {
    console.log("loading is true")
    return (
      <RefreshIndicator
        style={styles.refreshStyle}
        top={0}
        left={0}
        size={80}
        status={'loading'} 
      />
    );
  }
  console.log("loading is false")

  // Render nothing if no children present
  return children ? children : null;
}

export default Loader;