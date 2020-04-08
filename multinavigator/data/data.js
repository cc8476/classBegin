import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

//Storage 使用说明：https://github.com/sunnylqm/react-native-storage/blob/master/README.zh-CN.md

class Proxy {
  constructor() {
    this.storage;
  }

  static Instance() {
    if (!Proxy.ins) {
      Proxy.ins = new Proxy();
    }
    return Proxy.ins;
  }

  init() {
    this.storage = new Storage({
      // 最大容量，默认值1000条数据循环存储
      size: 1000,

      // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
      // 如果不指定则数据只会保存在内存中，重启后即丢失
      storageBackend: AsyncStorage,

      // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
      defaultExpires: null,

      // 读写时在内存中缓存数据。默认启用。
      enableCache: true, // 你可以在构造函数这里就写好sync的方法 // 或是在任何时候，直接对storage.sync进行赋值修改 // 或是写到另一个文件里，这里require引入

      // 如果storage中没有相应数据，或数据已过期，
      // 则会调用相应的sync方法，无缝返回最新数据。
      // sync方法的具体说明会在后文提到
    });

    // 获取某个key下的所有数据(仅key-id数据)
    this.storage.getAllDataForKey('class').then(users => {
      console.log('所有class信息');
      console.log(users);
    });

    this.storage.getAllDataForKey('record').then(users => {
      console.log('所有record信息:');
      console.log(users);
    });

    // 获取某个key下的所有数据(仅key-id数据)
    this.storage.getAllDataForKey('mile').then(users => {
      console.log('所有mile信息:');
      console.log(users);
    });
  }

  //初始化数据
  createData() {
    this.storage.save({
      key: 'user', // 注意:请不要在key中使用_下划线符号!
      data: {
        name: '陈诺',
        classNum: 0, //课程数
        mileNum: 0, //里程碑数量
        coin: 0, //金币数量
        date: new Date().getTime(), //初始日期
        time: 0, //打卡次数
      },
    });
  }

  //清除缓存
  clearData() {
    this.storage.remove({
      key: 'user',
    });

    this.storage.clearMap();
  }
  //获取用户信息
  getUser() {
    return this.storage.load({
      key: 'user',
      autoSync: true,
    });
  }

  //增加金币数
  addCoin(num) {
    return this.getUser().then(data => {
      let newData = data;
      newData.coin = data.coin + num;

      return this.storage.save({
        key: 'user',
        data: newData,
      });
    });
  }

  //获取课程列表
  getClasses() {
    return this.storage.getAllDataForKey('class');
  }
  //获取课程列表,根据星期x
  getClassesByWeek(weekOrder) {
    return this.storage.getAllDataForKey('class').then(ret => {
      let weekClasses = [];
      ret.map((v, i) => {
        if (v.dayArray[weekOrder]) {
          weekClasses.push(v);
          console.log('vvvvv', v);
        }
      });
      return weekClasses;
    });
  }

  //根据课程id获取课程信息
  getClassById(id) {
    return this.storage.load({
      key: 'class',
      id: id,
    });
  }

  //添加课程
  addClass(obj) {
    //更新用户的课程信息
    console.log('添加课程addCLass');
    return this.getUser().then(data => {
      let newData = data;
      newData.classNum = data.classNum + 1;

      this.storage.save({
        key: 'user',
        data: newData,
      });

      //更新课程表信息
      //obj.classTimeArr:Array(3)
      // 0:"周一 - 6点 - 10分钟"
      // 1:"周二 - 9点 10分钟"
      // 2:"周三 - 19点 50分钟"

      /* 要转成dayArray [true,true,true,false,false,false]
      time:[6,9,19,,,,],//8点
      duration:[10,10,50,,,,]//50分钟 */

      this.modifyClass(obj, newData.classNum);
    });
  }
  //修改课程
  modifyClass(obj, id) {
    function addWeek(str) {
      switch (str) {
        case '周一':
          return 0;
        case '周二':
          return 1;
        case '周三':
          return 2;
        case '周四':
          return 3;
        case '周五':
          return 4;
        case '周六':
          return 5;
        case '周日':
          return 6;
      }
    }

    function addTime(str) {
      return Number(str.replace('点', ''));
    }

    function addDuration(str) {
      return Number(str.replace('分钟', ''));
    }

    let week = Array(7).fill(false);
    let time = Array(7).fill(0);
    let duration = Array(7).fill(0);

    obj.classTimeArr.map(v => {
      let arr = v.split(' - ');
      let index = addWeek(arr[0]);
      week[index] = true;

      time[index] = addTime(arr[1]);
      duration[index] = addDuration(arr[2]);
    });

    this.storage.save({
      key: 'class',
      id: id,
      data: {
        name: obj.name,
        coin: obj.coin,
        starttime: new Date().getTime(),
        time: 0, //打卡次数,
        relatemile: -1,
        dayArray: week,
        time: time,
        duration: duration,
        id: id,
        color: obj.color,
      },
    });
  }

  //删除课程
  delClass(id) {
    this.getUser().then(data => {
      let newData = data;
      newData.classNum = data.classNum - 1;

      this.storage.save({
        key: 'user',
        data: newData,
      });
    });

    return this.storage.remove({
      key: 'class',
      id: id,
    });
  }

  //更新课程
  updateClassById(id, data) {
    this.storage.save({
      key: 'class',
      id: id,
      data: data,
    });
  }

  //添加里程碑
  addMile(obj) {
    //更新用户的里程碑
    return this.getUser().then(data => {
      let newData = data;
      let mileId = data.mileNum + 1;
      newData.mileNum = mileId;

      this.storage.save({
        key: 'user',
        data: newData,
      });

      //更新课程表信息

      this.storage.save({
        key: 'mile',
        id: mileId,
        data: {
          name: obj.mileName,
          coin: obj.coin,
          starttime: new Date().getTime(),
          time: 0, //打卡次数,
          relateclass: obj.relateclass,
          uptime: new Date(String(obj.uptime)).getTime(),
          id: mileId,
        },
      });

      //更新关联的class信息

      if (obj.relateclass >= 0) {
        this.getClassById(obj.relateclass).then(ret => {
          const result = ret;
          result.relatemile = mileId;
          this.storage.save({
            key: 'class',
            id: obj.relateclass,
            data: result,
          });
        });
      }
    });
  }
  
  //获取里程碑列表
  getMiles() {
    return this.storage.getAllDataForKey('mile');
  }
  //根据id获取里程碑
  getMileById(id) {
    return this.storage.load({
      key: 'mile',
      id: id,
    });
  }

  //删除里程碑
  delMile(id) {
    this.getUser().then(data => {
      let newData = data;
      newData.mileNum = data.mileNum - 1;

      this.storage.save({
        key: 'user',
        data: newData,
      });
    });

    return this.storage.remove({
      key: 'mile',
      id: id,
    });
  }

  addRecord(coin) {
    this.getUser().then(user => {
      //user.date  //用户注册日期为第一天，也就是id=1
      // 当前时间-注册当天 / 86400*1000 ，0=当天
      let firstDayTime = new Date(
        new Date(user.date).toLocaleDateString(),
      ).getTime();
      let days = Math.floor((new Date().getTime() - firstDayTime) / 86400000); //days,就是它的id

      console.log('addRecord', days, coin);

      this.storage.save({
        key: 'record',
        id: days,
        data: {
          id: days,
          coin: coin,
          date: new Date().getTime(),
        },
      });
    });
  }

  //检查今天是否已经打卡
  getTodayClassCoin() {
    console.log('checkScore');
    return this.getUser()
      .then(user => {
        //user.date  //用户注册日期为第一天，也就是id=1
        // 当前时间-注册当天 / 86400*1000 ，0=当天
        let firstDayTime = new Date(
          new Date(user.date).toLocaleDateString(),
        ).getTime();
        let days = Math.floor((new Date().getTime() - firstDayTime) / 86400000); //days,就是它的id
        return this.storage.load({
          key: 'record',
          id: days,
        });
      })
      .then(ret => {
        console.log('ret', ret);
        return ret.coin;
      })
      .catch(err => {
        console.log('err', err);
        return -1;
      });
  }

  //更新里程碑
  updateMileById(id, score) {
    return this.getMileById(id).then(data => {
      let newData = data;
      newData.coinGot = score;

      this.addCoin(score);

      this.storage.save({
        key: 'mile',
        id: id,
        data: newData,
      });
    });
  }
}
Proxy.ins = null;

Proxy.colorArray = ['green', 'red', 'blue', '#fcaf17', 'purple', 'pink'];
Proxy.scoreArray = ['还需努力', '正常发挥', '非常出色'];

export default Proxy;
