/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {
    View,Text,Image,StyleSheet
} from 'react-native';



class App extends React.Component {
    constructor(props) {
        super(props);

    }


    static navigationOptions = ({navigation}) =>{
      return {

        title:"添加课程",
        headerStyle:{
          backgroundColor:"skyblue"
        },
        headerTintColor:"#ff00ff",
        headerTitleStyle:{
          fontSize:20,
          fontWeight:"bold"
        },
         headerLeft:()=>{
          return <Button title="返回" 
          onPress={() => {
            navigation.navigate('Table');
          }}
          ></Button>
        } 
      }
    } 


 

    render() {
        return (
          <View>
          <Text>ABC</Text>
          {/* <Button>Start</Button> */}
        </View>
        );
    }
}

export default App;