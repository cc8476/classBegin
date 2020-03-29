/*
* Created by joechen  2020-03-29 09:30
*/
import React from 'react';
import {
    View,
    Text,ScrollView
  } from 'react-native';

  import Icon from 'react-native-vector-icons/FontAwesome5';
  import Icon2 from 'react-native-vector-icons/MaterialIcons';


class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("props",props)

        this.state= {
            showmilesArr:props.showmilesArr
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState(
            {
                showmilesArr:nextProps.showmilesArr
            }
        )
    }
    render() {


        return (
            <ScrollView style={{flexDirection:"column",backgroundColor:"#cde6c7"}}>

             { 
                 this.state.showmilesArr.map((v, i) => {
                  let Output
                    if(v.coinGot && v.coinGot>0) {
                      Output = ()=>(
                            
                            <View style={ {flex:1,backgroundColor:"#ffce7b",margin:5,padding:5,justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:12}}>获得</Text>
                            <Text style={{fontSize:12}}>金币</Text>
                          <Text style={{fontSize:18,color:"white"}}>{v.coinGot}</Text>
                          </View>
                          
                        )
                        
                    }
                    else {
                      let leftDay =Math.ceil( (v.uptime - new Date().getTime())/3600/24/1000)
                      Output = ()=>(

                           (
                            <View style={ {flex:1,backgroundColor:"#7fb80e",margin:5,padding:5,justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:12}}>还剩</Text>
                          <Text style={{fontSize:18,color:"white"}}>{leftDay}</Text>
                          <Text style={{fontSize:12}}>天</Text>
                          </View>
                          )
                      )
                    }
                    


                    return (
                      <View key={v.id} style={ {flexDirection:"row",height:80,backgroundColor:"#ffffff",margin:8,justifyContent:"space-between"}}>

                        <View style={ {flex:8,height:60,backgroundColor:"#ffffff",margin:5,padding:5}}>

                          <Text
                            onPress={() => {
                              this.props.navigation.navigate('MileDetail', {id: v.id});
                            }}>
                            {v.name}
                          </Text>
                          <View style={{margin:5,flexDirection:"row",alignItems:"center"}}>
                                <Icon2  name="update" size={14} color="#7fb80e" />
                                <Text style={{fontSize:12  ,color:"#224b8f"}}> {new Date(v.uptime).toLocaleDateString()}</Text>
                          </View>


                          <View style={{flexDirection:"row",alignItems:"center"}}>
                          <Icon name="coins" size={14} color="#7fb80e" />
                          <Text style={{fontSize:12  ,color:"#224b8f"}}>   {v.coin}</Text>
                            </View>
                        </View>
          
                          
          
                          {Output()}
                          

                        </View>
          
          
                      )

                  }
                )
             } 

             



            
        </ScrollView>
         
        );
    }
}

export default App;
