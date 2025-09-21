# Redis

Redis是一个基于`内存`的`key-value`数据库

## 操作命令

### 字符串操作命令

```bash
# 增
SET key value            设置key和value
SETEX key seconds value  设置key和value，在seconds秒后过期
SETNX key value          当key不存在时，设置key的值为value

# 查
GET key                  根据key获取value

```

### Hash操作命令

```bash
# 增
HSET KEY FIELD VALUE    将哈希表key中的field设置为value

# 删
HDEL KEY FIELD          删除哈希表key中的field，当删除完以后，key也就不存在了

# 查
HGET KEY FIELD          查询哈希表key中的field
HKEYS KEY               查询哈希表key中的所有key
HVALS KEY               查询哈希表key中所有的value

```

### 列表操作命令

```bash
# 增
LPUSH KEY VALUE1 VALUE2 ... VALUEN   向key中按顺序插入到列表头部

# 删
RPOP KEY                            删除并获取key的最后一个值

# 查
LRANGE KEY START STOP               获取指定范围的值
LLEN KEY                            获取key中值的个数

```

#### 集合操作命令

集合是string类型的无序集合，在集合中元素不能重复

```bash
# 增
SADD key value1 value2 [...valueN]    向集合中插入元素

# 删
SREM KEY VALUE1 [...VALUEN]           删除集合中一个或多个成员

# 查
SMENBERS KEY                          返回集合中的所有元素
SCARD KEY                             获取集合中的成员数量
SINTER KEY1 [KEY2]                    返回所有给定集合的交集
SUNION KEY1 [KEY2]                    返回给定集合的并集
```

#### 有序集合操作命令

有序集合是string类型的集合，不允许有重复成员，每个元素通过指定一个分数作为排序依据

```bash
# 增
ZADD KEY SCORE1 VALUE1 [...SCOREN VALUEN]    向key中添加元素
ARANGE KEY START STOP                        通过索引返回集合中的成员
ZINCRBY KEY INCREMENT VALUE                  有序集合中对指定成员的分数加上增量increment
ZREM KEY VALUE1 [...VALUEN]                  移除集合中的成员
```

#### 通用命令

```bash
KEYS PATTERN        查找符合给定格式的所有key
EXISTS KEY          检查给定key是否存在
TYPE KEY            返回key所存储的值的类型
DEL KEY             如果key存在，则删除key
```
