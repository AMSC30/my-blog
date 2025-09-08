## 过滤器

过滤器是javaWeb三大组件之一，过滤器可以把请求拦截下来，做一些特殊处理，比如权限验证，日志记录，数据过滤、统一编码处理、敏感字符处理等

### 定义过滤器

1. 创建一个过滤器类，继承Filter接口，并实现init、doFilter、destroy方法
2. 添加@WebFilter注解，通过patterns属性配置拦截的请求路径
3. 在启动类中通过@ServletComponentScan注解来扫描过滤器类

```java

@WebFilter(urlPatterns = "/*")
public class MyFilter implements Filter { 
    @Override
    void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        // 放行处理
        filterChain.doFilter(servletRequest,servletResponse);
    }

    @Override
    void destroy() {}
}
```

### doFilter执行流程

doFilter方法执行以调用放行逻辑chain.doFilter()方法为界限，执行前会执行放行前的逻辑，放行逻辑chain.doFilter()会访问web资源，即controller方法，然后执行放行后的逻辑。

如果要阻止放行操作，可以调用servletResponse.getWriter().write(data)方法写入响应数据，并结束响应。需要注意的是，data为序列化后的字符串，不能是对象，然后return

### 拦截路径配置

拦截路径配置通过@WebFilter注解的patterns属性来配置，通常有三种模式：

1. /url：匹配指定url，如@WebFilter(urlPatterns = "/user")
2. /url/*：匹配指定url下的所有子路径，如@WebFilter(urlPatterns = "/user/*")
3. /*： 匹配所有路径，如@WebFilter(urlPatterns = "/*")

### 过滤器链

在web应用中，可以配置多个过滤器，多个过滤器就形成了过滤器链，过滤器链的执行顺序是按照过滤器类名顺序执行的，即先执行第一个过滤器，然后执行第二个过滤器，依次类推直到访问web资源。

web应用的方法执行完成后，会执行过滤器的放行后逻辑，放行后的逻辑为放行顺序的反向执行。

## 拦截器

拦截器类似于过滤器，是spring框架提供的用于动态拦截控制器方法的执行

### 定义拦截器

1. 创建一个拦截器类，实现HandlerInterceptor接口，并实现preHandle、postHandle、afterCompletion方法
2. 在拦截器类中通过@Component注解来将拦截器交给IOC容器管理
3. 创建一个配置类，实现WebMvcConfigurer接口，并实现addInterceptors方法
4. 在配置类中通过@Configuration注解来标识配置类
5. 注入拦截器对象，在addInterceptors方法中通过registry参数的addInterceptor方法添加创建的拦截器对象
6. 调用addPathPatterns方法指定拦截的请求路径

## 全局异常处理器

全局异常处理器是springMVC提供的一种处理全局异常的机制，它可以处理项目中所有未处理的异常，并返回错误信息给前端。

### 创建全局异常处理器

1. 创建一个全局处理器类，并在类上添加@RestControllerAdvice注解，表名是全局异常处理器
2. 在全局处理器类中通过@ExceptionHandler注解来标识处理异常的方法，并指定异常类型，如@ExceptionHandler(Exception.class)
3. 在处理异常的方法中，可以通过参数获取异常信息，并返回错误信息给前端

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Result handleException(Exception e) {
        return Result.error(e.getMessage());
    }
}
```
