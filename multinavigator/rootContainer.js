import React from 'react';
import BottomTabs from './bottomTabs';
import {ThemeProvider} from 'react-native-elements';

/**
 *
 * 根容器
 */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const theme = {
      Button: {
        titleStyle: {
          color: '#ffffff',
          fontSize: 15,
        },
        buttonStyle: {
          backgroundColor: '#7fb80e',
          borderRadius: 5,
          margin: 6,
        },
      },
      Slider: {
        style: {
          marginLeft: 20,
          marginRight: 20,
          alignItems: 'stretch',
          justifyContent: 'center',
        },
        thumbTintColor: '#7fb80e',
      },
      CheckBox: {
        checkedColor: '#7fb80e',
      },
      ButtonGroup: {
        selectedButtonStyle: {
          backgroundColor: '#7fb80e',
        },
      },
    };

    return (
      <>
        <ThemeProvider theme={theme}>
          <BottomTabs />
        </ThemeProvider>
      </>
    );
  }
}

export default App;
