
3.29
bugFix:
初始化数据：应该都是从0开始；-----ok
课程详细：可以新增或删除课程安排   ---ok
里程碑列表：点击任意区域都可以跳转  ---ok
添加里程碑，添加课程：如果名字不写，要提示；  ---ok

操作后的提示框都需要补充上  --- ok

课程表:滚动后，会弹回的bug --- ok
课程表: 获得金币，调整一下，改成已获得金币  --- ok
添加课程：增加颜色  --- ok
课程表：class的颜色加上  ---ok


课程表有时候会换：
Could not locate shadow view with tag #9499, this is probably caused by a temporary inconsistency between native views and shadow views.




每日打分：每天只能打一次；这个要在页面上提示出来 --- ok







添加里程碑：初始关联classId，不正确的问题  --- ok
添加里程碑：可以正确填入日期了  --- ok
修复非常卡的问题：---- 50%
    1.课程表：添加shouldComponentUpdate()，渲染从5次减少到2次
    1.课程表：给map(...)循环的数据，添加了key属性

课程表：初步完成里程碑切换显示   ----ok
课程表：初步完成里程碑列表   ----ok


找到新的调试方法，使用浏览器调试  ---- ok

里程碑：添加了获得金币的字段，并增加对应的逻辑  ---  ok


添加课程表：正确添加dayArray了     ----  ok

学习下整体布局，完成各个页面的布局
添加课程表 ----ok
添加里程碑 ----ok
课程表详细：----ok
里程碑详细：----ok
统计：
打分：----ok
修改navigation默认样式：---ok


=================================
3.28

完成初步的数据逻辑   ---ok
完成初步的业务流程   ---ok


整体样式：
1.找一个类似的app，参考一下色调  ---ok
2.底部边框：icon找一下   --ok
3.顶部边框的样式   ---ok



课程表：
1.空的格子，也要有边框   ---ok




====================================================
1.整体导航
哪几个tab: 课程，统计，打分
每个tab里面的层级关系
课程
-->添加课程
-->课程详情
-->添加里程碑
-->里程碑详情


结构相关的页面写出来

每个页面开始写样式，加功能


****


watchman watch-del-all
rm -rf node_modules
yarn config set registry https://registry.npm.taobao.org

yarn install
rm -rf /tmp/metro-*
pod install

