/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {
    View,Text,Image,StyleSheet,TouchableOpacity, Alert
} from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';
import data from '../data/data'
import {Input, CheckBox, Slider, Button} from 'react-native-elements';


class App extends React.Component {
    constructor(props) {
        super(props);

        console.warn("props",props)

       

        this.state = {
          tableData: [
          ],
          miles:[]
        }

    }

    componentDidMount() {


      let week=[
        ["周一"],["周二"],["周三"],["周四"],["周五"],["周⑥"],["周⑦"]
      ];

      data.Instance().getClasses().then(
        (classes)=>{
          classes.map(
            (v,i)=>{
              v.dayArray.map(
                (i)=>{

                  const elementButton = () => (
                  
                  <Text
                  onPress={() => {
                    this.props.navigation.navigate('ClassDetail', {id:v.id })
                  }}>{v.name}</Text>
                  );
                  week[i-1].push(elementButton())
                }
              )
            }
          )
          this.setState({
            tableData:week
          });
        }
      )


      data.Instance().getMiles().then(
        (ret)=>{
          this.setState({
            miles:ret
          });
        }
      )
    }


     static navigationOptions = ({navigation}) =>{
      return {

        title:"课程表",
        headerStyle:{
          backgroundColor:"skyblue"
        },
        headerTintColor:"#ff00ff",
        headerTitleStyle:{
          fontSize:20,
          fontWeight:"bold"
        },
         headerLeft:()=>{
          return <Button title="添加课程" 
          onPress={() => {
            navigation.navigate('Add');
          }}
          ></Button>
        },headerRight:()=>{
          return <Button title="里程碑" 
          onPress={() => {
            navigation.navigate('AddMile');
          }}
          ></Button>
        } 
      }
    } 


    render() {

      const state = this.state;

      console.log("mile")
      console.log( state.miles)

      let milesArr=state.miles;

        return (
        <View style={styles.container}>
        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
          {/* 左边�模块 */}
          <TableWrapper style={{width: 40}}>
            <Cell data="" style={styles.singleHead}/>
            <TableWrapper style={{flexDirection: 'row'}}>
              <Col data={['上午', '下午']} style={styles.head} heightArr={[60, 60]} textStyle={styles.text} />
              
            </TableWrapper>
          </TableWrapper>

          {/* 右边模块 */}
          <TableWrapper style={{flex:1}}>
            <Cols data={state.tableData} heightArr={[40, 30, 30, 30, 30]} textStyle={styles.text}/>
          </TableWrapper>
        </Table>

          <View>
          <View><Text>最近的里程碑:</Text></View>
          <View>
          {

            milesArr.map(
              (v,i)=>{
                return (<View
                >
                  <Text
                   onPress={
                    ()=>{
                      this.props.navigation.navigate('MileDetail', {id:v.id })
                    }
                  }
                  >{ (i+1) +" . " + v.name}</Text>
                  <Text
                  >{v.uptime}</Text>
                  </View>
                )
              }
            )
          
          }


          </View>

          </View>

      </View>

        );
    }
}

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  singleHead: { width: 40, height: 40, backgroundColor: '#c8e1ff' },
  head: { flex: 1, backgroundColor: '#c8e1ff' },
  title: { flex: 2, backgroundColor: '#f6f8fa' },
  titleText: { marginRight: 6, textAlign:'right' },
  text: { textAlign: 'center' },
  btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' }
});