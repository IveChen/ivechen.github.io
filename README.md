# 项目命令

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

# 名词解释
比赛 match 表示一次比赛
对局 game 表示一次比赛内的一个对局
位置 location 表示队伍在地图的位置 (天辉/夜魇)
人员 player 参赛人员

# 无后端实现设计思路
- 通过比赛编辑器 获得 比赛配置文件 后，放入到数据源 src/dataSource
- 文件的名字按照比赛日期命名
- 打包的时候会将 /src/dataSource 下的所有 json 文件自动引入,同时使用文件名的md5作为比赛id
- 预留了 比赛数据 的过滤，方便后续添加指定时间/指定比赛类型的数据分析
- 预留了 banpick数据的处理