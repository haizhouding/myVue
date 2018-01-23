# JS高级Day 02 ![](http://www.yztcedu.com/images/logo.png)

# JavaScript对象02

## 对象浅拷贝

浅拷贝：不会考虑对象的层次结构，不会考虑任何引用类型， 换句话说，浅拷贝可以把内容全部拷贝过来，但不保证内部的引用类型 和拷贝后的对象没有脱离关系。

```javascript
var obj1 = {
  name: '小黑',
  age: 18,
  girlFriend: {
    name: '小红'
  }
}

 var obj2 = {};
        
for (var prop in obj1) {
  obj2[prop] = obj1[prop];
}

obj2.girlFriend.name = '小丽';

console.log(obj1);
console.log(obj2);
console.log(obj1.girlFriend === obj2.girlFriend);
```



## 对象深拷贝

深拷贝也是能完全把内容拷贝过来，不管层次结构有多深，完全和之前的对象脱离关系。

```javascript
var obj1 = {
  name: '小黑',
  age: 18,
  girlFriend: {
    name: '小红'
  }
}

// 实现深拷贝的递归函数，需要两个参数，分别是源对象和拷贝后的对象
function deepCopy (originalObj, copyObj) {
  for (var prop in originalObj) {
    if (typeof originalObj[prop] == 'object'){
      // 指向一个新的对象
      copyObj[prop] = {};
      deepCopy(originalObj[prop], copyObj[prop]);
    } else {
      copyObj[prop] = originalObj[prop];
    }
  }
}

var obj3 = {};
deepCopy(obj1, obj3);

obj3.girlFriend.name = "小雪";

console.log(obj1, obj3);
console.log(obj1.girlFriend === obj3.girlFriend);

```



## JS对象的使用场景

### 数据解析

解析数据，级联菜单。

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>01_下拉框作业</title>
</head>
<body>
    <select id="left_sel">
        <option>请选择省份</option>
    </select>
            
    <select id="right_sel">
        <option>请选择城市</option>
    </select>

    <script>
        var rootObj = {
            // 省份数组 存储的 很多省份对象
            provinceArr: [
                {
                    provinceName: '黑龙江省',
                    cityArr: [
                        {
                            cityName: '哈尔滨市'
                        },
                        {
                            cityName: '大庆市'
                        }
                    ]
                },
                {
                    provinceName: '辽宁省',
                    cityArr: [
                        {
                            cityName: '沈阳市'
                        },
                        {
                            cityName: '大连市'
                        }
                    ]
                },
                {
                    provinceName: '吉林省',
                    cityArr: [
                        {
                            cityName: '长春市'
                        },
                        {
                            cityName: '四平市'
                        }
                    ]
                },
                {
                    provinceName: '河北省',
                    cityArr: [
                        {
                            cityName: '石家庄市'
                        },
                        {
                            cityName: '廊坊市'
                        }
                    ]
                }
            ]
        }
    
        // 获取左右两边的sel
        var left_sel = document.querySelector('#left_sel');
        var right_sel = document.querySelector('#right_sel');

        // 初始化数据（左边的sel数据--省份）
        loadData();


        // 初始化数据
        function loadData () {
            // 遍历省份数组得到每个省份对象
            for (var provinceObj of rootObj.provinceArr) {
                // 创建option，添加到左边的sel中
                left_sel.appendChild(createOptoin(provinceObj.provinceName));
            }
        }

        console.log(left_sel);

        // 以后select要使用change事件！！
        left_sel.onchange = function () {
            // 每次都需要清除所有option（除了第一个默认的option）
            right_sel.options.length = 1;
            // while (right_sel.options.length > 1) {
            //     right_sel.removeChild(right_sel.options[right_sel.options.length - 1]);
            // }

            // 遍历省份数组得到每个省份对象
            for (var provinceObj of rootObj.provinceArr) {
                // 判断选择的省份名字和当前的省份对象里的名字是否对应上
                if (this.value == provinceObj.provinceName) {
                    // 遍历找到的省份对象中的城市数组，得到这个省份下的每一个城市对象
                    for (var cityObj of provinceObj.cityArr) {
                        // 创建option，添加到右边的sel
                        right_sel.appendChild(createOptoin(cityObj.cityName));
                    }
                    // 因为已经找到该省份了，所以没必要继续在找了。跳出循环即可。
                    break;
                }
            }
        }


        // 创建option
        function createOptoin (optionText) {
            var option = document.createElement('option');
            option.innerText = optionText;
            return option;
        }
    </script>
</body>
</html>
```



### 封装功能

可以对某些功能进行封装，比如cookie、事件等。

```javascript
var Cookie = {
	/*
	 * cookieObj: 是批量增加、修改的cookie键值对对象
	 * expiresDate: 是过期时间（咱们这里暂时定义为毫秒）
	 */
	//新增、修改
	setCookie : function (cookieObj, expiresDate) {
		var date = new Date();
		date.setTime(date.getTime() + expiresDate);
		
		for (var tempProp in cookieObj) {
			document.cookie = tempProp + "=" + escape(cookieObj[tempProp])
							+ ";expires=" + date.toGMTString();
		}
	},
	
	//查询cookie中的某个键值对
	getCookie : function (key) {
		var cookieStr = document.cookie;
		var cookieArr = cookieStr.split('; ');
		for (var tempCookie of cookieArr) {
			var tempKey = tempCookie.split('=')[0];
			var tempValue = tempCookie.split('=')[1];
			if (key == tempKey) {
				return unescape(tempValue);
			}
		}
	},
	
	//删除cookie中的某组
	delCookie : function (key) {
		this.setCookie({
			[key] : ''
		}, -10);
	}
}

```



# 面向对象编程

![](http://o7cqr8cfk.bkt.clouddn.com/public/16-11-9/25927086.jpg)

## 面向过程编程思想

解决某个问题，看的是“如何”解决这个问题，是一种数学逻辑的映射，按步骤执行。

### 优点

- 流程化使得编程任务明确，在开发之前基本考虑了实现方式和最终结果；
- 效率高,面向过程强调代码的短小精悍，善于结合数据结构来开发高效率的程序。。
- 流程明确，具体步骤清楚，便于节点分析。

### 缺点

需要深入的思考，耗费精力，代码重用性低，扩展能力差，维护起来难度比较高，对复杂业务来说，面向过程的模块难度较高，耦合度也比较高。

## 面向对象编程思想

解决某个问题，看的是“谁”能解决这个问题，把问题拆解成各个“类或对象(谁)”，“对象”作为接收消息的单位（编程单位），“对象”处理相应的功能逻辑，“对象”之间协同完成工作，是一种生活逻辑的映射。

### 优点

- 结构清晰，程序便于模块化，结构化，抽象化，更加符合人类的思维方式；
- 封装性，将事务高度抽象，从而便于流程中的行为分析，也便于操作和自省； 
- 容易扩展，代码重用率高，可继承，可覆盖；
- 实现简单，可有效地减少程序的维护工作量，软件开发效率高。

### 缺点

效率低，面向对象在面向过程的基础上高度抽象，从而和代码底层的直接交互非常少机会，



## 面向对象相关术语

### 类

是某种事物的抽象，是创建对象的模板，是一个泛指的概念。

### 对象

是某种事物的具体实例（真实的，唯一的）。是面向对象编程的基本单位。

### 属性

是对象的特征。

### 方法

是对象的行为。



## 对比类和对象

### 生活角度

类：人            对象：这个人、你、我、川普

类：电脑        对象：你的电脑、我的电脑

类：动漫人物    对象：超人、蝙蝠侠、喜羊羊



### 封装角度

结构体(C语言中的)：是对变量的封装

函数：是对功能逻辑的封装。

类：是对属性（特征）和方法（行为）的封装。



### 编码角度

面向对象编程是以对象为基本编程单位，对象是通过某个类去创建出来的，类是我们设计出来的，但是JS中没有类的概念（ES6后就有class类的概念了..不过也不是真正的类，以后接触多了就会理解），所以我们需要去模拟类的概念。



## 创建对象的方式

### 对象字面量创建

我们昨天学习的方式，但有明显的缺点，每次都需要写一个结构出来。

```javascript
var person = {
  name: '小雪',
  age: 18
}
```



### 工厂函数创建

工厂函数创建对象：所谓工厂就是一个函数，我们通过给这个函数传递参数，根据参数来生成对象，这种操作就像一个工厂车间一样。

```javascript
function makePerson (name, age) {
  return {
    name : name,
    age : age,
    sayHello : function () {
      console.log("大家好，我叫：" + this.name + "，年龄：" + this.age);
    }	
  }
}

var person1 = makePerson('大娃', 20);
var person2 = makePerson('三娃', 18);

console.log(person1);
console.log(person2);

console.log(typeof person1);
console.log(typeof person2);

console.log(person1 === person2);

person1.sayHello();

person1.name = "六娃";

person1.sayHello();

person2.sayHello();

console.log(person1 instanceof makePerson);
console.log(person2 instanceof makePerson);
```

工厂方式创建有一个缺点，就是没有我们所谓的"类型"区分。



### 构造函数创建

通过构造函数方式创建对象，构造函数其实就是一个普通的函数，只不过我们习惯性把构造函数名字的首字母大写（这是程序猿、程序媛之间的一种约定）。

```javascript
//一般首字母要大写
function Person (name, age, friend) {
  //属性
  this.name = name;
  this.age = age;
  // this.friend = {
  // 	name : friend.name,
  // 	age : friend.age
  // }
  this.friend = friend;
  //方法
  this.sayHello = function () {
    console.log("大家好，我叫：" + this.name + "，年龄：" + this.age);
  }
  //通过构造函数方式创建对象，构造函数没有显性的返回值，如果是通过new关键字配合构造函数使用的话，就相当于创建了一个当前类型的实例对象，程序会默认给我们加上一个 return this
  //如果使用new来调用，this就是指向当前对象
}

//创建一个人的对象
var person1 = new Person('小雪', 18);

var person2 = new Person('小黑', 20);

//我们利用instanceof这个运算符来判断某个对象是否是某个构造函数函数创建出来的
console.log(person1 instanceof Person);
console.log(person2 instanceof Person);
console.log(new Person() instanceof Object);
console.log(new String() instanceof Object);
console.log(new Array() instanceof Object);
console.log(new Object() instanceof Object)
```