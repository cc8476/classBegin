import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

//Storage 使用说明：https://github.com/sunnylqm/react-native-storage/blob/master/README.zh-CN.md

class Proxy {
  constructor() {
    this.speed = 100; //播放速度
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
      console.log("所有class信息:")
      console.log(users);
    });

    // 获取某个key下的所有数据(仅key-id数据)
    this.storage.getAllDataForKey('mile').then(users => {
      console.log("所有mile信息:")
      console.log(users);
    });
  }

  //初始化数据
  createData() {
    this.storage.save({
      key: 'user', // 注意:请不要在key中使用_下划线符号!
      data: {
        name: '陈大诺',
        classNum: 10, //课程数
        mileNum: 20, //里程碑数量
        coin: 100, //金币数量
        date: new Date().getTime(), //初始日期
        time: 10, //打卡次数
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

  getUser() {
    return this.storage.load({
      key: 'user',
      autoSync: true,
    });
  }

  //增加金币数
  addCoin(num) {
    this.getUser().then(data => {
      let newData = data;
      newData.coin = data.coin + num;

      this.storage.save({
        key: 'user',
        data: newData,
      });
    });
  }

  //获取课程列表
  getClasses() {
    return this.storage.getAllDataForKey('class');
  }

  //根据课程id获取课程信息
  getClassById(id) {
    return this.storage
    .load({
      key: 'class',
      id: id
    })
  }

    //获取里程碑列表
    getMiles() {
      return this.storage.getAllDataForKey('mile');
    }

  getMileById(id) {
    return this.storage
    .load({
      key: 'mile',
      id: id
    })
  }

  //添加课程
  addClass(obj) {
    //更新用户的课程信息
    this.getUser().then(data => {
      let newData = data;
      newData.classNum = data.classNum + 1;

      this.storage.save({
        key: 'user',
        data: newData,
      });

      //更新课程表信息

      //[false,true,true,false,true,true,true]
      //转换成
      //[2,3,5,6,7]
      let dayArrayTransfer =[];
      obj.dayArray.map(
        (v,i)=>{
          if(v) {
            dayArrayTransfer.push(i+1);
          }
        }
      )


      this.storage.save({
        key: 'class',
        id: newData.classNum,
        data: {
          name: obj.className,
          coin: obj.coin,
          starttime: new Date().getTime(),
          time: 0, //打卡次数,
          relatemile: -1,
          dayArray: dayArrayTransfer,
          id: newData.classNum,
        },
      });
    });
  }

    //删除课程
    delClass(id) {

      this.storage.remove({
        key: 'class',
        id: id
      });
    }

  //添加里程碑
  addMile(obj) {
    //更新用户的里程碑
    this.getUser().then(data => {
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

      console.log("obj.relateclass",obj.relateclass);

      if(obj.relateclass>=0) {
        this.getClassById(obj.relateclass).then(
          (ret)=>{
            const result =ret;
            console.log("obj.relateclass result",obj.relateclass,result);
            result.relatemile = mileId;
            console.log("obj.relateclass result2",obj.relateclass,result);
            this.storage.save({
              key: 'class', 
              id: obj.relateclass, 
              data: result
            });
          }
        )
      }

    });
  }

  //删除里程碑
  delMile(id) {
    this.storage.remove({
      key: 'mile',
      id: id
    });
  }


  //更新里程碑
  updateMileById(id,score) {


    this.getMileById(id).then(data => {
      let newData = data;
      newData.coinGot =  score;

      this.addCoin(score);

      this.storage.save({
        key: 'mile',
        id:id,
        data: newData
      });
    });

  }
}
Proxy.ins = null;

export default Proxy;
//How to use:
//MyClass.Instance().getSpeed();
