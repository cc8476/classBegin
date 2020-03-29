import React from 'react';
import {
    View,Text
} from 'react-native';

import Page from './pages'

import { ThemeProvider, Button } from 'react-native-elements';



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
          fontSize:15
        },
        buttonStyle:{
          backgroundColor:"#7fb80e",
          borderRadius:5,
          margin:6
        }
      },
      Slider:{
        style:{
          marginLeft: 20,
          marginRight: 20,
          alignItems: "stretch",
          justifyContent: "center"
        },
        thumbTintColor:"#7fb80e"
      },
      CheckBox:{
        checkedColor:"#7fb80e",
      },
      ButtonGroup:{
        selectedButtonStyle:{
          backgroundColor:"#7fb80e"
        }
      }

    };
    

    return (
      <>
      <ThemeProvider theme={theme}>
    <Page>
    </Page>
    </ThemeProvider>
      </>
    );
  }
}

export default App;
