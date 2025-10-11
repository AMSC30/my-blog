# 触发器

触发器是与表有关的数据库对象，指在insert/update/delete之前(BEFORE)或之后(AFTER)，触发并执行触发器中定义的SQL语句集合。触发器的这种特性可以协助应用在数据库端确保数据的完整性 , 日志记录 , 数据校验等操作

使用别名OLD和NEW来引用触发器中发生变化的记录内容，这与其他的数据库是相似的。现在触发器还只支持行级触发，不支持语句级触发

|触发器类型|NEW和OLD|
|----|----|
|INSERT 型触发器 |NEW 表示将要或者已经新增的数据|
|UPDATE 型触发器 |OLD 表示修改之前的数据 , NEW 表示将要或已经修改后的数据|
|DELETE 型触发器 |OLD 表示将要或者已经删除的数据|

创建触发器

```sql
CREATE TRIGGER trigger_name 
BEFORE/AFTER INSERT/UPDATE/DELETE
ON tbl_name FOR EACH ROW -- 行级触发器
BEGIN
 trigger_stmt ;
END;
```

查看触发器

```sql
SHOW TRIGGERS
```

删除触发器

```sql
DROP TRIGGER [schema_name.]trigger_name ; -- 如果没有指定 schema_name，默认为当前数据库
```
