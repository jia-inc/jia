(function(w){
/**
 * 枸杞友情提示:源码中包含大量剧透，若没有体验过20多种结局，建议不要直接看。
 */
console.warn( '枸杞友情提示:源码中包含大量剧透，若没有体验过20多种结局，建议不要直接看。' )

var Time = new Date();
var LOG = "";
var TimeLOG = "";
var LOG_last = "";
w.__log = [];

function log(content){
  // log something on screen
  LOG+="\n"+content;
  LOG_last = content;
  TimeLOG+="\n"+content;
  w.__log.push(content);
  // console.log(content);
}

const Utils = {
  randomNum : function(min,max){
    return Math.round( min+Math.random()*(max-min) )
  },
  randomOne : function(arr){
    return arr[Math.floor( Math.random()*arr.length )]
  },
};

class Hero {
  constructor(name,age) {
    age = parseInt(age);
    name = name.toLowerCase();
    // config
    this.name = name;
    this.age = age;
    // property
    // 生命 99
    this.heart = 99;
    // 知识 10
    this.knowlege = 10;
    // 人际 10;
    this.social = 1;
    // 金钱 24
    this.money = 24;
    // 玫瑰 104;
    this.rose = 0;
    // property about done
    // 付出玫瑰
    this.done_sendingRose = 0;
    // 总花钱
    this.done_paidMoney = 0;
    // 总赚钱
    this.done_income = 0;
    // 未送玫瑰天数
    this.done_havent = 1;
    // days log
    // 总游戏天数
    this.days_all = 0;
    // 赚钱天数
    this.days_working = 0;
    // 学习天数
    this.days_learning = 0;
    // 买花天数
    this.days_bought = 0;
    // 送花天数
    this.days_given = 0;
    // 社交天数
    this.days_socail = 0;
    // 休养天数
    this.days_sleep = 0;
    // property of Gaa
    // 好感度
    this.gaa_feeling = 0;
    // 对外好感度
    this.gaa_withOthers = 0;

    // 存活状态
    this.alive = true;
    // 最后一次行动
    this.last_behavior = "sleep"

    log("对她一见钟情之后的第一天，你会怎么做呢？")

    if(name===""){
      log("你都不配拥有姓名？")
      this.heart = -99;
    }else if(name==="geekplux"){
      log("G哥的能力是博学多识");
      this.knowlege = 20;
    }else if(name==="randy"){
      log("软哥的能力是音乐健身");
      this.social = 20;
    }else if(name==="yetone"){
      log("有时爱情竟如此艰难");
      this.gaa_withOthers = 119;
    }else if(name==="yufan"||name==="alvin"){
      log("该赚钱就赚钱去，到这里闹什么。");
      this.money = 9999;
    }else if(name==="test"){
      log("你在抱着试试看的态度？那我给你嘉几个肝？");
      this.heart = 9999;
    }else if(name==="amor"){
      log("有女朋友的人建议观望别人攻略。");
      this.gaa_withOthers = 999;
    }else if(name==="gaa"||name==="jia"){
      log("嘉儿永远爱自己，攻略难度0");
      this.gaa_feeling = 999;
    }else if(name==="egoist"||name==="koyuki"){
      log("群主还是写开源吧，别玩游戏了");
      this.heart = 1;
    }
    
    // 成就
    this.gain_tree = 
      [
        // 游戏开始
        {
          test : (hero)=>{ hero.days_all>0 },
          is_over : false,
          msg : "表达爱之前要多准备哦"
        },
        // 总赚钱>2800 
        {
          test : (hero)=>hero.done_income>=2800,
          is_over : false,
          msg : "转眼之前已经赚了2800块了，话说你真的是来攻略她的吗……"
        },
        // 总赚钱>1500 竟然已经赚了1500块了，话说你真的是来攻略她的吗……
        {
          test : (hero)=>hero.done_income>=1500,
          is_over : false,
          msg : "转眼之前已经赚了1500块了，赚钱有那么好玩吗……"
        },
        // 总赚钱>1000 都赚够1000块了，再加把劲……
        {
          test : (hero)=>hero.done_income>=900,
          is_over : false,
          msg : "转眼之前已经赚了900块了，赚钱一时爽，一直赚一直爽"
        },
        // 总赚钱>100 转眼之间，打工都赚够100块了……
        {
          test : (hero)=>hero.done_income>=100,
          is_over : false,
          msg : "转眼之前已经赚了100块了，嘉油"
        },
        // 剩余金钱>300 
        {
          test : (hero)=>hero.money>=300,
          is_over : false,
          msg : "攒钱是没有用的，你这边打着工，她可能就被人攻略了。"
        },
        // 玫瑰>99
        {
          test : (hero)=>hero.rose>=99,
          is_over : false,
          msg : "凑够999朵玫瑰，就给她个惊喜吧。"
        },
        // 玫瑰>80 
        {
          test : (hero)=>hero.rose>=80,
          is_over : false,
          msg : "搞那么多花不去送，你要好好感谢作者没给你嘉新鲜度系统。"
        },
        // 玫瑰>60 你想连着送俩月？仓鼠精吗？
        {
          test : (hero)=>hero.rose>=60,
          is_over : false,
          msg : "搞那么多花不去送，你要好好感谢作者没给你嘉新鲜度系统。"
        },
        // 知识>60
        {
          test : (hero)=>hero.knowlege>=60,
          is_over : false,
          msg : "知识方面又突破了一个瓶颈，后面可能在学习方面要付出相当的努力才行呢"
        },
        // 知识>50 
        {
          test : (hero)=>hero.knowlege>=50,
          is_over : false,
          msg : "知识方面突破了一个瓶颈，以后可以做大项目了，不过对应的也伴随了一些风险。"
        },
        // 知识>30 
        {
          test : (hero)=>hero.knowlege>=30,
          is_over : false,
          msg : "知识在事业上的提升，可能也会有一些瓶颈吧，至少这个阶段学习应该起不到什么作用了。"
        },
        // 知识>16 
        {
          test : (hero)=>hero.knowlege>=16,
          is_over : false,
          msg : "你有预感，学习能让你拥有更多的财富。"
        },
        // 知识>10
        {
          test : (hero)=>hero.knowlege>10,
          is_over : false,
          msg : "还好住处旁边有图书馆，学习不需要增加额外成本。"
        },
        // 社交>90 
        {
          test : (hero)=>hero.social>=90,
          is_over : false,
          msg : "突然觉得，比她优秀的女生还是有很多的……"
        },
        // 社交>80 
        {
          test : (hero)=>hero.social>=80,
          is_over : false,
          msg : "人际关系过广的危害就是，你很难发展真实靠谱的社会羁绊了。"
        },
        // 社交>60 
        {
          test : (hero)=>hero.social>=60,
          is_over : false,
          msg : "好像身边的人都很熟了……下次该试试出去认识认识别人了。"
        },
        // 社交>48 ……
        {
          test : (hero)=>hero.social>=48,
          is_over : false,
          msg : "花店老板：“我也要恰饭的呀，这是最低价了哈。”"
        },
        // 社交>12 
        {
          test : (hero)=>hero.social>=48,
          is_over : false,
          msg : "认真的爱情值得被肯定，有些卖花的朋友表示可以给你友情价，这样的朋友要好好相处啊。"
        },
        // 社交>1
        {
          test : (hero)=>hero.social>1,
          is_over : false,
          msg : "社交全凭一张嘴，看起来你很有这方面不花钱的经验。"
        },
        // 送的玫瑰>50
        {
          test : (hero)=>hero.days_given>=50,
          is_over : false,
          msg : "你已经第50天送花了，现在恋情进展如何？"
        },
        // 打工>50
        {
          test : (hero)=>hero.days_working>=50,
          is_over : false,
          msg : "你已经第50天工作了，现在事业进展如何？"
        },
        // 学习>50
        {
          test : (hero)=>hero.days_learning>=50,
          is_over : false,
          msg : "你已经第50天学习了，现在学业进展如何？"
        },
        // 休息>50
        {
          test : (hero)=>hero.days_sleep>=50,
          is_over : false,
          msg : "你已经第50天休息了，你是猪吗？"
        },
        // 社交 >50
        {
          test : (hero)=>hero.days_socail>=50,
          is_over : false,
          msg : "你已经第50天社交了，你有这工夫怎么不多去撩妹？"
        },
        // 好感度>90 
        {
          test : (hero)=>hero.gaa_feeling>=90,
          is_over : false,
          msg : "你看到她偷偷把你设置成了自己的手机壁纸。"
        },
        // 好感度>60 
        {
          test : (hero)=>hero.gaa_feeling>=60,
          is_over : false,
          msg : "可能光靠送花，是没办法让她永远和你在一起的，你要提升自己的综合实力了。"
        },
        // 好感度>30 
        {
          test : (hero)=>hero.gaa_feeling>=30,
          is_over : false,
          msg : "功夫不负有心人，她在你回头时，微微地笑了一下。"
        },
        // 好感度>1 
        {
          test : (hero)=>hero.gaa_feeling>=30,
          is_over : false,
          msg : "你不会忘了那一天收到你玫瑰时她的样子。那是你们故事开始的画面。"
        },
        // 100-生命>10 
        {
          test : (hero)=>(100-hero.heart)>=10,
          is_over : false,
          msg : "适度休息吧，作者可不会关心你的生死。"
        },
        // 100-生命>40 
        {
          test : (hero)=>(100-hero.heart)>=40,
          is_over : false,
          msg : "这么肝，真的令人感动。你会成功的。"
        },
        // 100-生命>70 
        {
          test : (hero)=>(100-hero.heart)>=70,
          is_over : false,
          msg : "你要小心别肝死自己…这个作者的坑爹设定可是说不准的。"
        },
        // 对外好感>114 
        {
          test : (hero)=>hero.gaa_withOthers>=114,
          is_over : false,
          msg : "听说她要结婚了，但是……应该不是你。"
        },
        // 对外好感>90 
        {
          test : (hero)=>hero.gaa_withOthers>=90,
          is_over : false,
          msg : "她和你的交集突然少了很多，但听她身边的朋友说，她好像恋爱了一样每天都很开心。"
        },
        // 对外好感>60 没有好好经营感情，她的常用联系人列表里多出来一个你不认识的名字。
        {
          test : (hero)=>hero.gaa_withOthers>=60,
          is_over : false,
          msg : "没有好好经营感情，她的常用联系人列表里多出来一个你不认识的名字。"
        },
      ]
  }

  behave(behavior){
    if(!this.alive){ return }
    this.do_something(behavior);
    if(!this.alive){ return }
    this.gain_test();
    this.day_random();
    if(!this.alive){ return }
    this.gain_test();
    this.game_over();
  }

  // 每日的随机事件
  day_random(){
    var rdm = Utils.randomNum(0,1002);
    var happened = false;
    if(rdm>800 && ~['work','buy','social','learn','sleep'].indexOf(this.last_behavior )){
      this.gaa_withOthers += Utils.randomNum(-3,5);
    }
    // 0 好感度<10时，她突然向你表白了 触发结局0。
    if(rdm<1){
      if(this.gaa_feeling<=10){
        happened = true;
        log("她突然向你表白了……")
        this.game_over(2)
      }
    }
    // 1 - 3 嘉发现，你是十二年前那场车祸中为了救她险些丧命的小哥哥，往事如泉水般翻涌。好感度在小于90时直接变成90，所有状态清除到 单身（上限1）；
    //     但是90以上-10：她要冷静审视和你这段感情，不想辜负于你
    else if(rdm<4){
      if(this.age>21){

        happened = true;
        log("嘉想起来了，你是十二年前那场车祸中为了救她险些丧命的小哥哥，往事如泉水般翻涌。")
        if(this.gaa_feeling<90){
          this.gaa_feeling = 90;
        }else{
          log("她要冷静审视和你这段感情，不想辜负于你。")
          this.change_prop('gaa_feeling',-10);
        }
      }
    }
    // 4 - 60 且当然行动为送花，好感度翻倍。
    else if(rdm<60){
      if(LOG_last!=="(｀・ω・´)空手过来的你，略显尴尬，想了想还是回去了。一天白跑。"  && this.last_behavior==='give' ){
        happened = true;
        log("当你离开的时候，感觉到有人在温柔地注视你。");
        this.gaa_feeling += 5;
      }
    }
    // 61-100
    else if(rdm<100){
      if( this.gaa_feeling<10 ){
        happened = true;
        log("命运还是强行让你们邂逅了。");
        this.gaa_feeling += 10;
      }
    }
    // 101 - 200 且当日行动为社交时，好感度>40时 发生误解 好感度-10%
    else if(rdm<200){
      if( this.gaa_feeling>40 && this.last_behavior==='social' ){
        happened = true;
        log("只知道出去交朋好友，却没好好陪伴她，她对你表示了一下意见。");
        this.change_prop('gaa_feeling',0-this.gaa_feeling/10);
      }
    }
    // 201 - 300 且当日行动为学习时，好感度>20时 不去陪伴 好感度-10%
    else if(rdm<300){
      if( this.gaa_feeling>20 && this.last_behavior==='learn' ){
        happened = true;
        log("沉迷学习的时候，你连她急事找你的消息都没看到，有点伤了人家的心。");
        this.change_prop('gaa_feeling',0-this.gaa_feeling/10);
      }
    }
    // 301 - 400 且当日行动为打工时，好感度>20时 不去陪伴 好感度-10%
    else if(rdm<400){
      if( this.gaa_feeling>20 && this.last_behavior==='work' ){
        happened = true;
        log("工作的时候，你连她急事找你的消息都没看到，有点伤了人家的心。");
        this.change_prop('gaa_feeling',0-this.gaa_feeling/10);
      }
    }
    // 401 - 500 且当日行动为买花时，好感度>20时 不去陪伴 好感度-10%
    else if(rdm<500){
      if( this.gaa_feeling>20 && this.last_behavior==='sleep' ){
        happened = true;
        log("睡得像猪一样的时候，你连她急事找你的消息都没看到，有点伤了人家的心。");
        this.change_prop('gaa_feeling',0-this.gaa_feeling/10);
      }
    }
    // 501 - 700 社交、学习、打工、买花、休养 好感度-不送花天数 不送花3天+ 好感度>5时触发，至少扣到1
    else if(rdm<700){
      if( this.gaa_feeling>10 && ~['work','buy','social','learn','sleep'].indexOf(this.last_behavior ) ){
        happened = true;
        log("她看见窗台已经枯了的玫瑰花，都快忘记这是谁送的了。");
        this.change_prop('gaa_feeling',0-this.gaa_feeling/10);
      }
    }
    // 701 - 800 且当日行动为买花时，额外+1 | 今天卖得只剩下一朵玫瑰，老板送给你了
    else if(rdm<800){
      if( this.social>20 && this.last_behavior==='buy' ){
        happened = true;
        log("还剩下一朵玫瑰，老板就直接送给你了。");
        this.change_prop('rose',1);
      }
    }
    // 801 - 900 且当日行动为学习时，额外+1 | 状态不错，感觉解决了几个大问题。
    else if(rdm<900){
      if( this.social>20 && this.last_behavior==='study' ){
        happened = true;
        log("状态不错，多解决了几个大问题。");
        this.change_prop('knowlege',1);
      }
    }
    // 901 - 1000 且当日行动为打工时，额外现有+20% | 这次多赚了一些。
    else if(rdm<1000){
      if( this.social>40 && this.last_behavior==='study' ){
        happened = true;
        log("已经和你很熟悉了的客户，这次多给了你一些钱。");
        this.change_prop('money',this.money/5);
      }
    }
    // 1001 回家路上，当场死亡，触发结局1
    else if(rdm<1002){
      happened = true;
      log("人生苦短，世事无常，谁能想到那个喝醉了的男司机，最终还是碾过了你的胸膛……")
      this.game_over(3)
    }
  }

  render(){
    var data = {
      heart: this.heart,
      knowlege: this.knowlege,
      social: this.social,
      money: this.money,
      rose: this.rose,
      alive: this.alive,
      gaa_feeling: this.gaa_feeling,
      gaa_withOthers: this.gaa_withOthers
    };
    if(this.name==="egoist"||this.name==="koyuki"){
      data.is_egoist = true;
    }
    console.log(this.gaa_withOthers)
    return data
  }

  // 行动触发
  do_something(method){
    this.days_all += 1;
    var success,diff;
    switch(method){
      // 打工 生命-1 金钱+= 5 知识16-30变为 知识/2 50+变成（15-知识/1.5)随机（大项目是要伴随一些风险的。）
      case 'work':
        this.last_behavior = 'work';
        this.heart -= 1;
        this.days_working += 1;
        this.done_havent +=1;
        if(this.knowlege>=50){
          diff = Utils.randomNum(15,this.knowlege/1.5)
          this.change_prop('money',diff);
          log(diff < this.knowlege/2 ? "项目不是特别成功，但还可以。" : "项目很成功，赚了不少。")
        }else if(this.knowlege>=16){
          this.change_prop('money',Math.ceil(this.knowlege/2));
          log("还好有知识，现在攒了 "+this.money+" 块了。")
        }else{
          this.change_prop('money',5);
          log("辛苦一天，小赚 5 块。")
        }
        break;
      // 送花 生命+1 玫瑰-1 好感+=当前好感度/10+1 60以后有成功率且每次只+好感度/20 每天1次，
      case 'give':
        this.last_behavior = 'give';
        if(this.rose<1){
          log("(｀・ω・´)空手过来的你，略显尴尬，想了想还是回去了。一天就这样过去了。")
          this.done_havent +=1;
          break;
        }
        this.done_havent = 0;
        this.heart += 1;
        this.days_given += 1;
        this.rose -= 1;
        if(this.gaa_feeling>=60){
          if(Math.random()>this.gaa_feeling/100){
            this.change_prop('gaa_feeling',this.gaa_feeling/15+1);
            log("今天她很开心。")
          }else{
            log("送花并不总是有效的，有时也要看玄学。")
          }
        }else{
          this.change_prop('gaa_feeling',this.gaa_feeling/10+1)
          log("献花一支，对你的好感度又上升了。")
        }
        break;
      // 送999朵花  生命+1 玫瑰-99 好感度+99
      case 'give999':
        this.last_behavior = 'give';
        this.heart += 1;
        if(this.rose<999){
          log("(｀・ω・´)你。在。想。屁。吃。")
          this.done_havent +=1;
          break;
        }
        this.days_given += 999;
        this.done_havent =0;
        this.rose -= 999;
        this.change_prop('gaa_feeling',99)
        log("她超级开心。早知世间有如此方法，何苦煎熬。")
        break;
      // 买花 生命+1 金钱-（24）（人际>12时 24-人际/4）至少12 玫瑰+1
      case 'buy':
        this.last_behavior = 'buy';
        this.done_havent +=1;
        if(this.social>12){
          let bill = Math.ceil(24-this.social/4);
          if(this.money<bill){
            log("(｀・ω・´)关系再好也不能赊账啊……下次过来可要带够钱啊。")
            break;
          }
          this.money-=bill
        }else{
          if(this.money<24){
            log("(｀・ω・´)明明没有钱，为什么还是走到了商店门口，望着橱窗发呆呢。就这样又过了一天。")
            break;
          }
          this.money-=24
        }
        log("看着手中的花，心里想着远方的她。")
        this.heart += 1;
        this.days_bought += 1;
        this.rose += 1;
        break;
      // 求神 金钱-88 好感度+（1~12 *（1-随机*(100-好感度/100)*1 : 随机决定正负 1/-1））
      case 'god':
        this.last_behavior = 'god';
        this.done_havent +=1;
        if(this.money<88){
          log("(｀・ω・´)没有钱，神都会不鸟你的。不但不鸟你，还劈了你一个雷 。")
          this.heart -= 5;
          break;
        }
        let result = Utils.randomNum( 6,13 );
        if(this.gaa_feeling>50){
          log("你们的关系和以前可不太一样……到了这个程度神明也不一定会总是帮助你的。")
          if( Math.random() > this.gaa_feeling/100 ){
            log("不过这次算你走运……");
          }else{
            log("不是每次都能得到好的结果……");
            result*=-1;
          }
        }
        log("神明这次给出的数字是 "+result)
        this.change_prop("gaa_feeling",result)
        this.money-=88
        this.heart += 1;
        this.days_bought += 1;
        break;
      // 社交 生命-1 人际+1 人际大于60时+0.5概率1 60-0.6 80-0.4 好感度（好感度%）概率降低
      case 'social':
        this.last_behavior = 'social';
        this.done_havent +=1;
        success = 1;
        if(this.social>=80){
          success = 0.4
        }else if(this.social>=60){
          success = 0.6
        }
        if(Math.random()<=success){
          this.change_prop("social",1)
          log("成功认识了一个新朋友。")
        }else{
          log("可惜这次无功而返，没有遇到什么值得发展的人际关系。")
        }
        this.heart -= 1;
        this.days_socail += 1;
        break;
      // 学习 生命-1 知识+1 知识大于30时+0.9概率1 60-0.6 80-0.4 好感度（好感度%）概率降低
      case 'learn':
        this.last_behavior = 'learn';
        this.done_havent +=1;
        success = 1;
        if(this.knowlege>=80){
          success = 0.4
        }else if(this.knowlege>=60){
          success = 0.6
        }else if(this.knowlege>=30){
          success = 0.9
        }
        if(Math.random()<=success){
          this.change_prop("knowlege",1)
          if(success>0.9){
            log("成功突破一个知识点！")
          }else if(success>0.6){
            log("又搞懂了一个知识，你居然还挺有天赋。")
          }else if(success>0.4){
            log("虽然有点难但是问题不大！")
          }else{
            log("攻克超级难关！")
          }
        }else{
          log("太难了…这太难了…为什么要有数学的存在…你看起来都自闭了。")
        }
        this.heart -= 1;
        this.days_learning += 1;
        break;
      // 休养 生命+10
      case 'sleep':
        this.last_behavior = 'sleep';
        this.done_havent +=1;
        this.days_sleep += 1;
        if(this.name==='egoist'||this.name==="koyuki"){
          this.heart -= 10;
          break;
        }
        success = 1;
        if(Math.random()>=(this.gaa_feeling/100)){
          log("٩( 'ω' )و休息一天，恢复一点。")
          this.heart += 10;
        }else{
          log("Σ(⊙▽⊙''' 做噩梦吓醒了，没有休息好。最近压力确实太大了。")
          this.heart += Utils.randomNum(2,6);
        }
        break;
      // 就这样吧 让她一个人好好生活。 触发游戏结束
      case 'abandon':
        this.game_over(1);
        break;
    }
  }

  // 成就判定
  gain_test(){
    let _this = this;
    this.gain_tree.forEach((g,i)=>{
      if(g.test(_this) && !g.is_over){
        _this.gain_tree[i].is_over = true;
        log(g.msg);
      }
    })
  }

  close(){
    // 
  }
  
  // 结束判定
  game_over(force){
    if(this.heart>100){this.heart=100}
    var is_dead = false;
    var dead_msg = "";
    var extra_msg = [];
    switch(force){
      case 1:
        // 弃坑
        is_dead = true;
        if( this.gaa_feeling <= 0){ dead_msg = ("希望你在生活中不会这样半途而废。") }
        else if( this.gaa_feeling < 20){ dead_msg = ("爱情上不努力的人，其他的事情再努力，也不会有真爱的。") }
        else if( this.gaa_feeling < 40){ dead_msg = ("总感动自己是不行的，你还要感动她。") }
        else if( this.gaa_feeling < 60){ dead_msg = ("唉，你只有这点战斗力吗……作者果然还是高看你了。") }
        else if( this.gaa_feeling < 90){ dead_msg = ("世界上最可怕的事情不是你不行，而是你差一点就行了，你居然就这样放弃了。") }
        break;
      case 2:
        // 欧皇
        is_dead = true;
        dead_msg = ("相信你在现实世界也是一个人生赢家。毕竟，运气好，是可以不用努力的。");
        break;
      case 3:
        // 非酋
        is_dead = true;
        dead_msg = ("人生如戏，谁能保证没个万一呢，更何况死亡率是千分之一。");
        break;
      case 4:
        break;
      default:
    }

    // 跟别人在一起了
    if( !is_dead && this.gaa_withOthers>=120 ){
      is_dead = true;
      dead_msg = "可惜，她还是跟别人在一起了。";
      if(this.days_given>99){
        extra_msg.push("你还送了那么多玫瑰……舔狗舔到最后一无所有。")
      }
      if(this.money>100){
        extra_msg.push("世界上最可怕的事情是，一切结束了，你钱没花完。")
      }
      if(this.knowlege>80){
        extra_msg.push("你发现，学习真的是鸟用木有。")
      }
      if(this.social>90){
        extra_msg.push("不过，你社交圈子里美女如云——放弃一枝独秀，坐拥天下鲜花。")
      }
    }
    
    if( !is_dead && this.heart<=0 ){
      is_dead = true;
      dead_msg = ("叫你不看生命值一顿肝，肝死了吧。");
    }
    
    if( !is_dead && this.social>=100 ){
      is_dead = true;
      extra_msg.push("在江湖人海中，你看遍了人间，发现，你不过是沧海一粟。")
      extra_msg.push("适合她的人那么多，你只是当中，最没有实力让她幸福的一个。")
      dead_msg = ("最终，你还是选择了放手，并把嘉介绍给了富商之子，如你所愿，她过上了幸福的生活。");
    }
    
    if( !is_dead && this.days_given>0 && this.money>=1500 ){
      is_dead = true;
      dead_msg = ("你不会真想靠打工变成大款吧？她发现你只知道赚钱之后，觉得你太拜金了。很遗憾，你没有第二次机会了。");
    }
    
    if( !is_dead && this.done_income>=3000 ){
      is_dead = true;
      dead_msg = ("打工久了……就真的会爱上打工呢。每当想起她，你总会心怀感恩，她让你找到了你最喜欢的事情。");
    }
    
    if( !is_dead && this.knowlege>=100 ){
      is_dead = true;
      dead_msg = ("不是你不爱了，而是你发现，知识才是你最大的爱情。");
    }
    
    if( !is_dead && this.last_behavior==="give" && this.age>=34 ){
      is_dead = true;
      dead_msg = ("她拒绝了年迈的你……爱情是不会等你准备好的，有时错过就是错过了。");
    }
    if( !is_dead && this.last_behavior==="give" && this.age<=21 ){
      is_dead = true;
      dead_msg = ("她觉得你这个小孩很无聊……小小年纪不要学坏，学也学不明白。");
    }

    // 好结局
    if( !is_dead && this.gaa_feeling>=100){
      is_dead = true;
      log("她说……她也好喜欢你呀。");
      extra_msg.push("不过你很清楚，要感激作者没有把达标好感度设置到1000。");
      if(this.knowlege<20){
        extra_msg.push("好姑娘怎么都喜欢没文化的傻逼？");
      }else if(this.knowlege<40){
        if(this.done_income<200){
          extra_msg.push("完全是赢在了运气啊……居然还可以这么赢");
        }else{
          extra_msg.push("学点习还是有用哒。");
        }
      }else if(this.knowlege<80){
        extra_msg.push("知识改变命运啊……下次学得更多一点，可能就有更好的结果了。");
      }else{
        extra_msg.push("这个文化水平真的顶，但还可以更好，不要骄傲。");
      }
      if(this.money>500){
        extra_msg.push("剩那么多钱舍不得花……这么抠门还会有女朋友的吗？")
      }else if(this.money>100){
        extra_msg.push("爱存钱的男生，更招女生喜欢。")
      }else{
        extra_msg.push("理财能力也真的顶。");
      }
    }


    // 死亡确认
    if(is_dead){
      this.alive = false;
      log("[游戏结束]");
      log(dead_msg);
      extra_msg.forEach(content=>log(content));
      this.close();
    }
  }
  change_prop(prop_type,difference,is_percent){
    if(
      !~['heart','knowlege','social','money','rose','gaa_feeling']
        .indexOf(prop_type)
    ){
      return false
    }
    if(is_percent){
      this[prop_type] += Math.floor(this[prop_type]*(difference))
    }else{
      this[prop_type] += difference
    }
    this[prop_type] = Math.round(this[prop_type]<0 ? 0 : this[prop_type])
  }

}

w.HERO = function(name,age){
  console.log(3,name,age)
  var hero = new Hero(name,age);
  return {
    render : function(){
      return hero.render()
    },
    do : function(behavior){
      hero.behave(behavior)
    }
  }
}
})(window)