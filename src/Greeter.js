

import React, {Component} from 'react'
import config from './config.json';

// 引入单独的css
import styles from './styles/Greeter.css';//导入
// debugger
class Greeter extends Component{
  render() {
    return (
      //添加类名
      <div className={styles.root}>
        {config.greetText}
      </div>
    );
  }
}
export default Greeter
