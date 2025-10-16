# 日期类

## Date类

1. new Date()：创建一个Date对象，该对象表示当前时间
2. new Date(long millis)：创建一个Date对象，该对象表示1970年1月1日0时0分0秒到当前时间之间所经过的毫秒数
3. Date.parse(String s)：将字符串s转换成Date对象，字符串s必须遵循"yyyy-MM-dd HH:mm:ss"的格式，否则将返回-1
4. Date.getTime()：返回1970年1月1日0时0分0秒到当前时间之间所经过的毫秒数
5. Date.toString()：返回当前时间对应的字符串，格式为"EEE MMM dd HH:mm:ss zzz yyyy"
6. Date.getYear()/Date.getFullYear()：返回当前时间对应的年份，从1900年开始计算
7. Date.getMonth()：返回当前时间对应的月份，从0开始计算
8. Date.getDate()：返回当前时间对应的日期，从1开始计算
9. Date.getHours()：返回当前时间对应的小时，从0开始计算
10. Date.getMinutes()：返回当前时间对应的分钟，从0开始计算
11. Date.getSeconds()：返回当前时间对应的秒钟，从0开始计算
12. Date.getMilliseconds()：返回当前时间对应的毫秒，从0开始计算
13. Date.getDay()：返回当前时间对应的星期，从0开始计算，0表示星期天，1表示星期一，以此类推
14. Date.setTime(long time)：设置当前时间，参数为毫秒数

## Calendar类

Calendar 类是一个抽象类，它提供了在特定时刻和一组 calendar fields 之间转换的方法，例如 YEAR 、 MONTH 、 DAY_OF_MONTH 、 HOUR 等，以及用于操作日历字段的方法，例如获取日期下个星期

时间可以用毫秒值表示，该值是从Epoch开始的偏移量，1970 年 1 月 1 日 00:00:00.000 GMT（公历）。

该类还提供了额外的字段和方法，用于在包外实现具体的日历系统。这些字段和方法定义为 protected 。

与其他locale敏感的类一样，Calendar提供了一个类方法getInstance ，用于获取此类型的普遍有用的对象。 Calendar的getInstance方法返回一个Calendar对象，其日历字段已用当前日期和时间初始化

### 常用静态值

1. YEAR：get 和 set 的字段编号表示年份
2. MONTH：get 和 set 的字段编号表示月份
3. DAY_OF_MONTH：get 和 set 的字段编号指示月份中的日期
4. HOUR_OF_DAY：get 和 set 的字段编号指示一天中的小时数
5. MINUTE：get 和 set 的字段编号表示小时内的分钟
6. SECOND：get 和 set 的字段编号表示分钟内的秒数
7. MILLISECOND：get 和 set 的字段编号表示秒内的毫秒数
8. WEEK_OF_MONTH：get 和 set 的字段编号表示当月的周数
9. WEEK_OF_YEAR：get 和 set 的字段编号表示年的周数
10. DAY_OF_WEEK：get 和 set 的字段编号表示星期几

### 静态方法

1. static Calendar getInstance()：使用默认时区和locale获取日历
2. static Calendar getInstance(Locale aLocale)：获取使用默认时区和指定locale的日历
3. static Calendar getInstance(TimeZone zone)：获取使用指定时区和默认locale的日历
4. static Calendar getInstance(TimeZone zone, Locale aLocale)：获取具有指定时区和locale的日历

### 判断方法

1. int compareTo(Calendar anotherCalendar)：比较两个日历对象的大小，返回一个整数，如果当前日历对象早于 anotherCalendar，则返回一个负数；如果当前日历对象晚于 anotherCalendar，则返回一个正数；如果两个日历对象相等，则返回 0
2. boolean after(Object when)：返回此 Calendar 是否表示指定 Object 表示的时间之后的时间。
3. boolean before(Object when)： 返回此 Calendar 是否表示指定 Object 表示的时间之前的时间。
4. boolean equals(Object obj)： 将此 Calendar 与指定的 Object 进行比较。

### 获取日历对象相关信息

1. int get(int field)：返回给定日历字段的值。
2. String getCalendarType()：返回此 Calendar 的日历类型
3. int getFirstDayOfWeek()：获取一周的第一天是什么；例如，SUNDAY 在美国，MONDAY 在法国
4. Date getTime()：返回表示此 Calendar 的时间值的Date对象
5. long getTimeInMillis():以毫秒为单位返回此日历的时间
6. boolean isSet(int field)：确定给定的日历字段是否设置了值，包括值已由 get 方法调用触发的内部字段计算设置的情况
7. TimeZone getTimeZone()：获取时区
8. String getDisplayName(int field, int style, Locale locale)：返回给定 style 和 locale 中日历 field 值的字符串表示形式。
9. Map<String,Integer> getDisplayNames(int field, int style, Locale locale)：返回一个 Map，其中包含给定 style 和 locale 中日历 field 的所有名称及其对应的字段值

### 设置日历对象相关信息

1. void set(int field, int value)：将给定的日历字段设置为给定的值
2. final void set(int year, int month, int date)：设置日历字段 YEAR 、 MONTH 和 DAY_OF_MONTH 的值
3. final void set(int year, int month, int date, int hourOfDay, int minute)：设置日历字段 YEAR、MONTH、DAY_OF_MONTH、HOUR_OF_DAY 和 MINUTE 的值
4. final void set(int year, int month, int date, int hourOfDay, int minute, int second)：设置字段 YEAR、MONTH、DAY_OF_MONTH、HOUR_OF_DAY、MINUTE 和 SECOND 的值。
5. void setFirstDayOfWeek(int value)：设置一周的第一天是什么；例如，SUNDAY 在美国，MONDAY 在法国
6. abstract void add(int field, int amount)：根据日历的规则向给定的日历字段添加或减去指定的时间量。

## LocalDate类

LocalDate 是一个不可变且线程安全的日期时间对象，表示日期，通常被视为年月日。还可以访问其他日期字段，例如一年中的某一天、星期几和一年中的一周，没有偏移量或时区等附加信息，它不能代表时间线上的一个瞬间

### 静态变量

1. static final LocalDate EPOCH：纪元年 LocalDate，'1970-01-01'。
2. static final LocalDate MAX：最大支持 LocalDate，'+999999999-12-31'。
3. static final LocalDate MIN：支持的最小值 LocalDate，'-999999999-01-01'

### 静态方法

1. static LocalDate now()：从默认时区的系统时钟获取当前日期。
2. static LocalDate now(Clock clock)：从指定时钟获取当前日期。
3. static LocalDate now(ZoneId zone)：从指定时区的系统时钟获取当前日期
4. static LocalDate of(int year, int month, int dayOfMonth)：从年、月和日中获取 LocalDate 的实例。
5. static LocalDate of(int year, Month month, int dayOfMonth)：从年、月和日中获取 LocalDate 的实例
6. static LocalDate parse(CharSequence text)：从 2007-12-03 等文本字符串中获取 LocalDate 的实例

### 实例方法

1. LocalDateTime atTime(int hour, int minute)：将此日期与时间结合起来创建一个 LocalDateTime 。
2. LocalDateTime atTime(int hour, int minute, int second)：将此日期与时间结合起来创建一个 LocalDateTime
3. LocalDateTime atTime(LocalTime time)：将此日期与时间结合起来创建一个 LocalDateTime
4. boolean isLeapYear()：根据 ISO proleptic 日历系统规则，检查年份是否为闰年
5. Period until(ChronoLocalDate endDateExclusive)：计算此日期和另一个日期之间的时间为 Period

### 查询方法

1. int get(TemporalField field)：从此日期获取指定字段的值
2. int getYear()：获取年份字段
3. int DayOfWeek getDayOfWeek()：获取星期字段，它是一个枚举DayOfWeek
4. Month getMonth() 使用 Month 枚举获取月份字段
5. int getMonthValue()：获取从1到12的月份字段
6. int getDayOfMonth()：获取日期字段

### 操作方法

1. LocalDate minus(long amountToSubtract, TemporalUnit unit)：返回此日期的副本，并减去指定的日期
2. LocalDate minus(TemporalAmount amountToSubtract) ：回此日期的副本，并减去指定的日期
3. LocalDate minusDays(long daysToSubtract)：返回此 LocalDate 的副本，并减去指定的天数
4. LocalDate minusMonths(long monthsToSubtract)：返回此 LocalDate 的副本，并减去指定的月数
5. LocalDate minusWeeks(long weeksToSubtract)：返回此 LocalDate 的副本，并减去指定的周数
6. LocalDate minusYears(long yearsToSubtract)：返回此 LocalDate 的副本，并减去指定的年数
7. LocalDate plus(long amountToAdd, TemporalUnit unit)：返回添加了指定数量的此日期的副本
8. LocalDate plus(TemporalAmount amountToAdd)：返回添加了指定数量的此日期的副本
9. LocalDate plusDays(long daysToAdd)：返回此 LocalDate 的副本，并添加了指定的天数
10. LocalDate plusMonths(long monthsToAdd)：返回此 LocalDate 的副本，并添加了指定的月数
11. LocalDate plusWeeks(long weeksToAdd)：返回此 LocalDate 的副本，并添加了指定的周数
12. LocalDate plusYears(long yearsToAdd)：返回此 LocalDate 的副本，并添加了指定的年数

### 比较方法

1. int compareTo(ChronoLocalDate other)：将此日期与另一个日期进行比较
2. boolean equals(Object obj)：检查此日期是否等于另一个日期
3. boolean isAfter(ChronoLocalDate other)：检查此日期是否在指定日期之后。
4. boolean isBefore(ChronoLocalDate other)：检查此日期是否早于指定日期。
5. boolean isEqual(ChronoLocalDate other)：检查此日期是否等于指定日期

> LocalTime、LocalDateTime的用法和LocalDate基本类似

## SimpleDateFormat

SimpleDateFormat是以locale敏感的方式格式化和解析日期的具体类，用于格式化日期。它允许格式化（日期→文本）、解析（文本→日期）和规范化

创建sdf对象，SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

1. StringBuffer format(Date date, StringBuffer toAppendTo, FieldPosition pos)：将给定的Date格式化为日期/时间字符串并将结果附加到给定的StringBuffer
2. String format(Date date)：将给定的Date格式化为日期/时间字符串
3. Date parse(String text, ParsePosition pos)：从字符串解析文本以生成一个Date

## DateTimeFormatter

1. static DateTimeFormatter ofPattern(String pattern)：使用指定的模式创建格式化程序
2. String format(TemporalAccessor temporal)：使用此格式化程序格式化日期时间对象
3. TemporalAccessor parse(CharSequence text)：完全解析文本，生成一个时间对象
