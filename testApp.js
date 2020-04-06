import Picker from 'react-native-picker';
let data = [
  ["每天","工作日","周一","周二","周三","周四","周五","周六","周日"],
  ["6点","7点","8点","9点","10点"],
  ["10分钟","20分钟","30分钟"],
];





import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';


const App: () => ReactNode = () => {
    return (
      <>
        <SafeAreaView>
          <Button title="sss"
            onPress={
              ()=>{

                Picker.init({
                  pickerData: data,
                  selectedValue : ['a', 2],
                  onPickerConfirm: data => {
                      console.log(data);
                  },
                  onPickerCancel: data => {
                      console.log(data);
                  },
                  onPickerSelect: data => {
                      console.log(data);
                  }
              });

                console.log("isPickerShow",Picker.show())
              }
            }
          ></Button>
       

         
        </SafeAreaView>
      </>
    );
  };
  
  
  export default App;