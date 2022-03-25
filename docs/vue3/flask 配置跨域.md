# flask 配置跨域

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
# CORS(app) # 允许所有域名跨域, 这种情形较少

# 允许某些域名跨域
# cors = CORS(app, resources={r"/*": {"origins":["http://example.com:8888"]},"supports_credentials": True})

# NOTE supports_credentials 属性指定是否接受 cookie 和认证信息，前端使用 axios，这个值必须和 withCredentials 配置保持一致 否则无法跨域
@app.route("/")
def helloWorld():
    return "<h1>Flask App</h1>"

@app.route("/test")
def testJson():
    return {"name":"Jack"}
```

参考：

[附带身份凭证的请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#%E9%99%84%E5%B8%A6%E8%BA%AB%E4%BB%BD%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82)

[前端跨域问题排查](http://dingxx.im/2021/05/20/2021-05-20-cors/)
