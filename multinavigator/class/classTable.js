/*
* Created by joechen  2020-03-22 18:28
*/
import React from 'react';
import {
    View,Text,Button,Image,StyleSheet
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          tableHead: ['', '周一', '周二', '周三','周四', '周五', '周六','周日'],
          tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
          tableData: [
            ['语文', '数学', '英语','语文', '数学', '英语', '围棋'],
            ['语文', '数学', '英语','语文', '数学', '英语', '围棋'],
            ['语文', '数学', '英语','语文', '数学', '英语', '围棋'],
            ['语文', '数学', '英语','语文', '数学', '英语', '围棋'],
            ['语文', '数学', '英语','语文', '数学', '英语', '围棋'],
            ['语文', '数学', '英语','语文', '数学', '英语', '围棋'],
          ]
        }

    }

/*      static navigationOptions ={
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
          this.props.navigation.navigate('Table');
        }}
        ></Button>
      }
      

    }  */

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
        return (
          <View style={styles.container}>
           <Table borderStyle={{borderWidth: 1}}>
            <Row data={this.state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
            <TableWrapper style={styles.wrapper}>
              <Col data={this.state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
              <Rows 
              onPress={() => {
                this.props.navigation.navigate('ClassDetail');
              }}
               data={this.state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
            </TableWrapper>
          </Table> 
        </View>
        );
    }
}

export default App;


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
});