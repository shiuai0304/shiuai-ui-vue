// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-vars": [2, { 
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none" 
    }],
    // 关闭语句强制分号结尾
    "semi": [0],
    //空行最多不能超过100行
    "no-multiple-empty-lines": [0, {"max": 100}],
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    "no-trailing-spaces": 1,//一行结束后面不要有空格
    "no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
    "space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
    "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
    "space-infix-ops": 0,//中缀操作符周围要不要有空格
    "keyword-spacing": 0,//return throw case后面要不要加空格
    "indent": [2, 4],//缩进风格
    "key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
    "comma-spacing": 0,//逗号前后的空格
    "comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
    "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
    "eqeqeq": 0,//必须使用全等
    "eol-last": 0,//文件以单一的换行符结束
    "spaced-comment": 0,//注释风格要不要有空格什么的
  }
}
