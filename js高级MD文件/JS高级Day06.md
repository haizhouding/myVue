# JS高级Day 06![](http://www.yztcedu.com/images/logo.png)

# 闭包的应用（继续昨天）

## for..of循环的底层实现 - 迭代器（Iterator）

​	某个对象或者该对象的原型链上有`Symbol.iterator`属性，我们认为这个对象是可以进行迭代的。能够使用for..of遍历的对象，都实现了`Symbol.iterator`对应的这个迭代接口。

**什么是迭代器？（这里扩展一下迭代器，迭代器底层就是用闭包写的，而for..of循环的底层实现就是迭代器）**

1. 迭代器是一个对象
2. 迭代器提供一个方法next() 这个方法总是能够返回迭代到的对象。
3. next返回的对象中，至少有两个属性：done 是一个boolean值(表示数据是否迭代完)。  value：具体的数据(迭代到的具体数据)

 迭代器只是带有特殊接口(方法)的对象。所有迭代器对象都带有 next() 方法并返回一个包含两个属性的结果对象。这些属性分别是 value 和 done，前者代表下一个位置的值，后者在没有更多值可供迭代的时候为 true 。迭代器带有一个内部指针，来指向集合中某个值的位置。当 next() 方法调用后，指针下一位置的值会被返回。

 若你在末尾的值被返回之后继续调用 next()，那么返回的 done 属性值为 true，value 的值则由迭代器设定。该值并不属于数据集，而是专门为数据关联的附加信息，如若该信息并未指定则返回 undefined 。迭代器返回的值和函数返回值有些类似，因为两者都是返回给调用者信息的最终手段。

> 具有迭代器接口的结构有哪些：

```javascript
var str = new String("abcd");
var obj = {name : "小雪", age : 18};
var arr = ["aa", "bb", "cc"];
var set = new Set(arr);
var map = new Map([['name', "小黑"], ['age', 18]]);

/*** 字符串 ***/
console.log(str[Symbol.iterator]); //是一个函数

var iteratorStr = str[Symbol.iterator]();
console.log(iteratorStr.next());
console.log(iteratorStr.next());
console.log(iteratorStr.next());
console.log(iteratorStr.next());
console.log(iteratorStr.next());
console.log(iteratorStr.next());

var iteratorStr2 = str[Symbol.iterator]();
console.log(iteratorStr2.next());
console.log(iteratorStr2.next());
console.log(iteratorStr2.next());
console.log(iteratorStr.next());
console.log(iteratorStr2.next());
console.log(iteratorStr2.next());
console.log(iteratorStr2.next());

/*** 自定义对象不具备迭代器接口 ***/

/** 数组 **/
var iteratorArr = arr[Symbol.iterator]();
console.log(iteratorArr.next());
console.log(iteratorArr.next());
console.log(iteratorArr.next());
console.log(iteratorArr.next());

/** set **/
var iteratorSet = set[Symbol.iterator]();
console.log(iteratorSet.next());
console.log(iteratorSet.next());
console.log(iteratorSet.next());
console.log(iteratorSet.next());

/** map **/
var iteratorMap = map[Symbol.iterator]();
console.log(iteratorMap.next());
console.log(iteratorMap.next());
console.log(iteratorMap.next());
console.log(iteratorMap.next());
```

**迭代器和for..of有什么关系呢？**

```javascript
//重写一下字符串Symbol.iterator 接口
String.prototype[Symbol.iterator] = function () {
  console.log("===========");
  //索引
  var idx = 0;
  var _this = this;
  return {
    next : function () {
      return {
        value : _this[idx++],
        done : idx - 1 < _this.length ? false : true
      }
    }
  }
}

//使用重写后的接口    
var iteratorStr3 = str[Symbol.iterator]();
console.log(iteratorStr3.next());
console.log(iteratorStr3.next().value);
console.log(iteratorStr3.next().value);
console.log(iteratorStr3.next());
console.log(iteratorStr3.next());

var iteratorStr4 = str[Symbol.iterator]();
console.log(iteratorStr4.next());
console.log(iteratorStr4.next());
console.log(iteratorStr4.next());

//编写的同时使用for..of来遍历 字符串   
for (var chr of str) {
  console.log(chr);
}
```

经过以上观察，迭代器的实现直接影响for..of的使用。所以for..of循环的底层实现就是迭代器的实现。



# 属性访问器

## 引言

​	在Java或某些语言中，属性的访问权限是可以通过某些关键字进行设置。例如java中可以使用**public（公有的：任何位置都能访问到这个属性）、protected（受保护的：只能在当前类和当前子类以及后代类中能访问到该属性）、private（私有的：只能在本类中访问这个属性）、以及默认不用任何修饰符（在本类以及本包中可以访问）这4个权限控制**

​	一般来说一个类是以**“私有属性，公开方法，不用默认“**为设计原则。

考虑到某些属性的**安全性**，我们一般会把属性设置为**私有的（private）**，这样的好处是不让外界直接来操作这个属性，我们如果想给外界访问，我们可以通过编写set、get公有方法**（就是一会儿要说的JS属性访问器）**来间接的设置、访问该私有属性。而且这样设计还具有一定的**灵活性**。比如我们有一个Person类，我们给它设置一个属性name，但是我们希望在取名字的时候，不是只显示名字，而是把名字按我们的要求输出，比如”我的名字叫XXX”

```java
public class Person {  
  //私有属性：外界无法直接访问到
    private String name;  
  
  	//公有方法获取很灵活，可以加入我们想要加入的内容
    public String getName() {  
        return "我的名字叫" + name;  
    }  
  
    //公有方法设值
    public void setName(String name) {
        this.name = name;  
    }  
}  
```



## 言归正传

​	在JS中也有类似的概念，我们叫做访问器，先看个代码。

```javascript
var data = {
    name: "小雪",
    getName: function() {
        return this.name;
    },
    setName: function(name) {
        this.name = name;
    }
};
```

​	其实，针对上述的代码，更加严格一点的话，不允许直接访问 `data.name` 属性，所有对 `data.name` 的读写都必须通过 `data.getName()` 和 `data.setName()` 方法。所以，想象一下，一旦某个属性不允许对其进行直接读写，而必须是通过访问器进行读写时，那么我当然通过重写属性的访问器方法来做一些额外的情，比如属性值变更监控。使用属性访问器来做数据双向绑定的原理就是在此。这种方法当然也有弊端，最突出的就是每添加一个属性监控，都必须为这个属性添加对应访问器方法，否则这个属性的变更就无法捕获。

## 隆重登场

​	ES5中提供了一种叫做属性访问器    ` Object.defineProperty`的方法，供了一种直接的方式来定义对象属性或者修改已有对象属性。其方法原型如下

```javascript
Object.defineProperty(obj, prop, descriptor);
```

- `obj` ，待修改的对象
- `prop` ，带修改的属性名称
- `descriptor` ，待修改属性的相关描述

 其中descriptor要求传入一个对象，其默认值如下

```javascript
/**
 * @{param} descriptor
 */
{
    configurable: false,
    enumerable: false,
    writable: false,
    value: undefined,
    set: undefined,
    get: undefined
}
```

1. `configurable` ，属性是否可配置。可配置的含义包括：是否可以删除属性（ `delete` ），是否可以修改属性的 `writable` 、 `enumerable` 、 `configurable` 属性。
2. `enumerable` ，属性是否可枚举。可枚举的含义包括：是否可以通过 `for...in` 遍历到，是否可以通过 `Object.keys()` 方法获取属性名称。
3. `writable` ，属性是否可重写。可重写的含义包括：是否可以对属性进行重新赋值。
4. `value` ，属性的默认值。
5. `set` ，属性的重写器（暂且这么叫）。一旦属性被重新赋值，此方法被自动调用。
6. `get` ，属性的读取器（暂且这么叫）。一旦属性被访问读取，此方法被自动调用。

```javascript
var obj = {
  name : '小雪'
};

//使用属性访问器来定义对象的属性
Object.defineProperty(obj, 'userName', {
  value : '小雨', //设定初始值，默认undefined
  writable : true, //属性是否是读写，默认false只读
  enumerable : true, //属性是否可以遍历，默认false不可以
});

//修改正常定义的属性值
obj.name = '小小雪';
//修改通过属性访问器来定义的属性
obj.userName = '小小雨';

//通过打印看到默认情况下userName是不能被修改的（也就是我们说的只读）
console.log(obj);

for (var prop in obj) {
  //默认情况下这里只能遍历出来正常的属性，通过属性访问器设定的属性在默认情况下是不会被遍历出来的，如果把enumerable设置为true，就可以遍历出来
  console.log(prop);
}
```

​	正常情况下 `Object.defineProperty()` 的使用都是比较简单的。

​	不过还是有一点需要额外注意一下， `Object.defineProperty()` 方法设置属性时，属性不能同时声明访问器属性（ `set` 和 `get` ）和 `writable` 或者 `value` 属性。 意思就是，某个属性设置了 `writable` 或者 `value` 属性，那么这个属性就不能声明 `get` 和 `set` 了，反之亦然。

因为 `Object.defineProperty()` 在声明一个属性时，不允许同一个属性出现两种以上存取访问控制。

```javascript
var obj = {};
Object.defineProperty(obj, 'name', {
  value : '小雪',
  set : function (newName) {
    
  },
  get : function () {
    
  }
});
```

​	上面的代码看起来貌似是没有什么问题，但是真正执行时会报错，因为这里的 `name` 属性同时声明了 `value` 特性和 `set` 及 `get` 特性，这两者提供了两种对 `name` 属性的读写控制。这里如果不声明 `value` 特性，而是声明 `writable` 特性，结果也是一样的，同样会报错。

​	接下来我们详细的看下`set`和`get`的使用。

```javascript
var obj2 = {
  name : '小雪'
}


Object.defineProperty(obj2, 'userName', {
  // value : '小鱼人',  和set、get一起设置会报错
  set : function (newUserName) {
    // obj2.name = newUserName;
    //注意这里不要写obj2.userName = xxx，否则会死循环，因为每次调用obj2.userName赋值的时候都会调到这个方法里
    console.log("==== set ====");
  },
  get : function () {
    //注意这里不要写obj2.userName, 否则会死循环，因为每次调用obj2.userName获取值的时候都会调到这个方法里
    console.log("==== get ====");
  }
});

obj2.userName = '小雨'; //会调用到set方法中

obj2.userName; //会调用到get方法中

console.log(obj2);
```

​	好，我们来看下属性访问器的几个使用场景。

## 属性访问器使用场景

### 场景1

​	**咱们课上讲过ES6的一个集合叫做Map，现在让你自定义一个Map的构造函数，来实现和Map一样的功能**

```javascript
function MyMap () {
  //因为我们知道Map的原型方法有set、get、has、delete等方法，以及一个查看Map中键值对个数的size属性(这个属性是只读的)，那我们想实现这个功能，我们需要设定一个size属性，但我们知道这样设置size属性后，size的值是可以被修改的，而且我们需要每次在set新增、delete删除等操作中去更新size。不仅不合理，而且代码量大
  //this.size = 0; 
  //这时候我们就可以使用属性访问器来搞定这个问题
  var self = this;
  Object.defineProperty(self, 'size', {
    //当调用当前对象的size属性的时候会调用到这里
    get : function () {
      //计数
      var num = 0;
      for (var tempProp in self) {
        //当只有是自己的属性的时候才记录个数，为了排除set、get、has、delete等原型属性
        if (self.hasOwnProperty(tempProp)) {
          num++;	
        }
        // console.log(tempProp);
      }
      return num;
    }
  });
}

//增、修
MyMap.prototype.set = function (key, value) {
  this[key] = value;
}

//获取
MyMap.prototype.get = function (key) {
  return this[key];
}

//判断
MyMap.prototype.has = function (key) {
  return this[key] ? true : false;
}

//删除
MyMap.prototype.delete = function (key) {
  delete this[key];
}

var map = new MyMap();

map.set('name', '小雪');
map.set('age', 18);

map.set('name', '小雨'); // 相当于修改
map.set('sex', '男');

map.size = 100; //这里修改是不生效的，也不会报错。
console.log(map.size); //成功获取键值对的个数
```

### 场景2

​	**利用属性访问器可以解决一些兼容问题，例如我们在学习CSS3的时候，变形、动画等需要写兼容模式**

```javascript
var myDiv = document.querySelector('div');
//这样就可以解决兼容性的问题
Object.defineProperty(myDiv, 'transform', {
  set : function (transformValue) {
    console.log("-----");
    myDiv.style.transform = transformValue;
    myDiv.style.webkitTransform = transformValue;
    myDiv.style.MozTransform = transformValue;
    myDiv.style.msTransform = transformValue;
  }
});

myDiv.onclick = function () {
  //正常我们想要做兼容，需要这么写，例如修改CSS3变形相关属性
  // this.style.transform = 'translateX(100px)';
  // this.style.webkitTransform = 'translateX(100px)';
  // this.style.MozTransform = 'translateX(100px)';
  // this.style.msTransform = 'translateX(100px)';
  //现在只需要这样一句话就可以解决兼容性问题，这里暂时只能设置这个div，将来我们可以在利用一个函数把属性访问器封装一下就通用啦
  this.transform = 'translateX(100px)';
}
```

### 场景3

​	**利用属性访问器可以进行数据的一些列的批量设置**

```javascript
function Person () {
  this.dog = { dogName : ''};
  this.cat = { catName : ''};
  this.mouse = { mouseName : '' };

  var self = this;
  //统一设置宠物的名字
  Object.defineProperty(self, 'petName', {
    //参数是要设置的宠物名字
    set : function (newPetName) {
      self.dog.dogName = "🐶🐶：" + newPetName;
      self.cat.catName = "🐱🐱：" + newPetName;
      self.mouse.mouseName = "🐭🐭：" + newPetName;
    },
    get : function () {
      //还可以批量返回
      return [self.dog.dogName, self.cat.catName, self.mouse.mouseName];
    }
  });
}

//需求统一设置人的宠物的名字格式为 动物类型 + 名字，例如 狗：妞妞、猫：妞妞、老鼠：妞妞
var person = new Person();
//之前我们只能这样设置，很麻烦
// person.dog.dogName = '🐶🐶：' + '妞妞';
// person.cat.catName = '🐱🐱：' + '妞妞';
// person.mouse.mouseName = '🐭🐭：' + '妞妞';

//只需要设置petName就可以达到批量设置的效果
person.petName = '妞妞';
//批量获取
console.log(person.petName);
console.log(person);
```

### 终极场景

​	最屌的场景，**双向数据绑定**。前端的 **双向数据绑定** 。简单的来说，就是框架的控制器层（这里的控制器层是一个泛指，可以理解为控制view行为和联系model层的中间件）和UI展示层（view层）建立一个双向的数据通道。当这两层中的任何一方发生变化时，另一层将会立即（或者看起来是 **立即**）自动作出相应的变化。

一般来说要实现这种双向数据绑定关系（控制器层与展示层的关联过程），在前端目前会有三种方式，

1. **脏检查， AngularJS等重量级框架：缺点是如果达到一定数据量级遍历轮询watcher是非常消耗性能的**
2. **观察机制， ES7的Object.observe()：这种方式很完美，但支持度不够**
3. **封装属性访问器，很多轻量级框架都采用这种方式实现的双向数据绑定，例如我们学习的vue.js**

接下里看下实现代码，p.s. 使用到监听者设计模式来做最好，不过咱们为了简单演示下原理，就不用设计模式来做了。

```javascript
var myInput = document.querySelector('#name_input');
var myInput2 = document.querySelector('#name_input2');
//数据模型
var userInfo = {};
//实现改变name_input2
Object.defineProperty(userInfo, 'userName', {
  set : function (val) {
    //设值userName属性，改变myInput2的value
    myInput2.value = val;
  },
  get : function () {
    return myInput2.value;
  }
});

//实现改变name_input
Object.defineProperty(userInfo, 'userName2', {
  set : function (val) {
    //设值userName2属性，改变myInput的value
    myInput.value = val;
  },
  get : function () {
    return myInput.value;
  }
});

myInput.oninput = function () {
  userInfo.userName = this.value;
}

myInput2.oninput = function () {
  userInfo.userName2 = this.value;
}
```

