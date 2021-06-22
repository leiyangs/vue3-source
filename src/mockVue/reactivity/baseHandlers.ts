// 使用工厂函数，传递参数可以做不同事情
function createGetter() {
  return function get() {

  }
}

function createSetter() {
  return function set() {
    
  }
}

const get = createGetter();
const set = createSetter();
// 拦截
const mutableHandlers = {
  // get() {}, // 拦截器
  // set() {}, // 拦截器
  get,
  set
};
