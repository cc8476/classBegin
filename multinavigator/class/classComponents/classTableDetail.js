/*
 * Created by joechen  2020-04-06 22:15
 */
import React from 'react';
import {StyleSheet,Text} from 'react-native';
import data from '../../data/data';

import {
  Table,
  TableWrapper,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };
  }

  componentWillReceiveProps() {
    this.initData();
  }

  componentDidMount() {

    this.initData()
  
  }

  initData()    {
    let week = [['周①'], ['周②'], ['周③'], ['周④'], ['周⑤'], ['周⑥'], ['周⑦']];


    data
      .Instance()
      .getClasses()
      .then((classes) => {
        const currentInit = this.state.init;

        this.setState({
          init: currentInit + 1,
        });

        classes.map((v, i) => {
          v.dayArray.map((vv, ii) => {
            let color = data.colorArray[v.color || 0];

            /* const elementButton = () => (
              <Text
                style={{backgroundColor: color, color: '#ffffff'}}
                onPress={() => {
                  this.props.navigation.navigate('ClassDetail', {id: v.id});
                }}>
                {v.name +"\r\n"+v.time[ii]+"点 \r\n"+v.duration[ii]+"mins"} 
              </Text>
            ); */
            if (vv) {
              //week[ii].push(elementButton());
              week[ii].push(v)
            }
          });
        });


        //根据时间time排序
        week.map(
            (v,i)=>{
                v.sort(
                    (a,b)=>{
                        if(a.time && b.time) {
                            return a.time[i]-b.time[i]
                        }
                        
                        
                    }
                )
            }
        )

        //填充空数据
        week.map((v, i) => {
          while (v.length <= 7) {
            v.push(
                null
/*               <Text
                onPress={() => {
                  this.props.navigation.navigate('Add');
                }}>
                {'   '}
              </Text>, */
            );
          }
        });

        this.setState({
          tableData: week,
        });
      });

  }

  render() {

        if(this.state.tableData.length==0) {
            return null;
        }

            //根据数据，生成组件
            let cols= [['周①'], ['周②'], ['周③'], ['周④'], ['周⑤'], ['周⑥'], ['周⑦']];
            console.log("this.state.tableData",this.state.tableData);
            console.log("this.state  cols",cols);
            this.state.tableData.map(
                (v,i)=>{
                    v.map(
                        (vv,ii)=>{

                            if(typeof vv =='string') {
                                console.log("vv",vv)
                            }
                            else if( vv !=null) {
                                console.log("vvv",vv)
                                 let color = data.colorArray[vv.color || 0];

                                 const elementButton =  (
                                <Text
                                     style={{backgroundColor: color, color: '#ffffff'}}
                                    onPress={() => {
                                    this.props.navigation.navigate('ClassDetail', {id: vv.id});
                                    }}>
                                    {vv.name +"\r\n"+vv.time[i]+"点 \r\n"+vv.duration[i]+"mins"}  
                                </Text>
                                ); 

                                cols[i].push(elementButton); 
                            }
                            else if( vv ==null) {

                               let text= (
                                <Text
                                onPress={() => {
                                  this.props.navigation.navigate('Add');
                                }}>
                                {'   '}
                              </Text>

                               )

                               cols[i].push(text); 

                            }
                            

                        }
                    )

                }
            )

    return (
      <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
        {/* 左边�模块 */}
        <TableWrapper style={{width: 40}}>
          <Cell data="" style={styles.singleHead} />
          <TableWrapper style={{flexDirection: 'row'}}>
            <Col
              data={['上午', '下午', '晚上']}
              style={styles.head}
              heightArr={[60, 60, 60]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </TableWrapper>

        {/* 右边模块 */}
        <TableWrapper style={{flex: 1}}>
          <Cols
              data={cols}  
            heightArr={[40, 60, 60, 60, 60, 60, 60]}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  singleHead: {width: 40, height: 40, backgroundColor: '#ffffff'},
  head: {flex: 1, backgroundColor: '#7fb80e'},
  title: {flex: 2, backgroundColor: '#7fb80e'},
  titleText: {marginRight: 6, textAlign: 'right'},
  text: {textAlign: 'center'},
  btn: {
    width: 58,
    height: 18,
    marginLeft: 15,
    backgroundColor: '#c8e1ff',
    borderRadius: 2,
  },
  btnText: {textAlign: 'center'},
});
