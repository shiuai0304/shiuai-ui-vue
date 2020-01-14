<template>
    <div class="tj_calendar">
        <div class="tj_cal_top">
            {{`${nowCalYear}年${nowCalMonth<10?'0'+nowCalMonth:nowCalMonth}月`}}
        </div>
        <div class="tj_cal_header">
            <div class="tj_cal_headItem">日</div>
            <div class="tj_cal_headItem">一</div>
            <div class="tj_cal_headItem">二</div>
            <div class="tj_cal_headItem">三</div>
            <div class="tj_cal_headItem">四</div>
            <div class="tj_cal_headItem">五</div>
            <div class="tj_cal_headItem">六</div>
        </div>
        <div class="tj_cal_content">
            <div class="tj_cal_main" v-for="(cItem,index) in calendarShowList" :key="index" @click="goSelectData(cItem)">
                <span class="tj_cal_day" 
                    :class="{
                        'tj_cal_grayday':(cItem.month==nowMonth&&cItem.day<nowDay)||cItem.strRegdate==='',
                        'tj_cal_now':(cItem.strRegdate==propNowSelectDate.strRegdate&&!!propNowSelectDate.strRegdate),
                    }">
                    {{cItem.day}}
                </span>
                <div v-if="cItem.year==nowYear&&cItem.month==nowMonth&&cItem.day==nowDay" class="tj_cal_nowday">今天</div>
                <div class="tj_cal_circle" v-if="(!!cItem.strRegdate&&cItem.regColour!=='')" :class="{'tj_cal_yuemanbg':cItem.regColour==2,'tj_cal_yongjibg':cItem.regColour==1,'tj_cal_keyuebg':cItem.regColour==0}"></div>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * 日期置灰的条件：1、今天以前的日期 2、没有排期的日期
 * 小点显示（不管什么颜色）：1、日历上有日期 2、有排期的日期
 * 
 * 组建使用入参
 * nowCalYear：该日历要显示的年份
 * nowCalMonth：该日历要显示的月份
 * instlist：填充日历状态的日期列表
 * propNowSelectDate：当前选择的日期
 */
export default {
    data(){
        return{
            calendarShowList:[],
            nowYear:'',//当前的年
            nowMonth:'',//当前的月
            nowDay:'',//当前的日
            sumDays:0,
            firstDayWeek:'',
            calendarShowItem: {
                strRegdate:'',
                year:'',//年
                month:'',//月
                day:'',//日
                regColour:''//状态 0:可约 1:拥挤，2:约满
            },
        }
    },
    props:{
        nowCalYear:{
            type:Number,
            default:1970
        },
        nowCalMonth:{
            type:Number,
            default:1
        },
        instlist:{
            type:Array,
            default:[]
        },
        propNowSelectDate:{
            type:Object,
            default:function(){
                return {
                    "strRegdate":"",
                    "regColour":'',
                }
            }
        }
    },
    filters:{
        
    },
    methods:{
        // 获取当前日期的年、月
        getAboutNowDate(){
            let nowDate = new Date();
            this.nowYear = nowDate.getFullYear();
            this.nowMonth = nowDate.getMonth()+1;
            this.nowDay = nowDate.getDate();
            this.getDayNum(this.nowCalYear,this.nowCalMonth)
        },
        // 计算已选月份天数和已选月份第一天的星期
        getDayNum(year,month){
            this.sumDays = new Date(year, month, 0).getDate();
            this.firstDayWeek = new Date(year, month-1, 1).getDay();
            this.fillCalendar();
        },
        // 开始填充日历
        fillCalendar(){
            // 填充当前选择月的
            for(let i=0;i<this.sumDays;i++){
                this.calendarShowList[i+this.firstDayWeek].year=this.nowCalYear;
                this.calendarShowList[i+this.firstDayWeek].month=this.nowCalMonth;
                this.calendarShowList[i+this.firstDayWeek].day=i+1
            }
            this.fillStatus();
        },
        // 遍历日期数据给日历填充状态
        fillStatus(){
            let step=0;
            for(let i=0;i<this.calendarShowList.length;i++){
                let year= this.calendarShowList[i].year;
                let month= this.calendarShowList[i].month;
                let day= this.calendarShowList[i].day;
                let onetimes = new Date(year,month-1,day).getTime();
                for(let j=step;j<this.instlist.length;j++){
                    let twotimes = new Date(this.instlist[j].strRegdate.replace(/-/g, '/')).getTime();
                    if(onetimes<twotimes){
                        break;
                    }else if(onetimes == twotimes){
                        this.calendarShowList[i].strRegdate=this.instlist[j].strRegdate;
                        this.calendarShowList[i].regColour=this.instlist[j].regColour;
                        step=step+1;
                        break;
                    }
                }
                if(step==this.instlist.length){
                    break
                }
            }
        },
        goSelectData(cal){
            console.log('son')
            if(!cal.strRegdate) return;
            this.$emit('acceptDate',cal)
        }
    },
    created(){

    },
    mounted(){
        for(let i=0;i<42;i++){
            let calendarShowItem =Object.assign({},this.calendarShowItem)
            this.calendarShowList.push(calendarShowItem)
        }
        this.getAboutNowDate();
    }
}
</script>
<style type="text/css" lang="stylus" scoped>
// @import '../assets/css/_common.styl';
.tj_calendar{
    width:100%;
    text-align:center;
}
.tj_cal_top{
    width:100%;
    height:40px;
    line-height:40px;
    box-sizing:border-box;
    padding-left:24px;
    font-size:20px;
    font-weight:500;
    color:#2B3642;
    text-align:left;
    background:#F8F8F8;
}
.tj_cal_header{
    width:100%;
    margin-top:16px;
}
.tj_cal_content{
    display:inline-block;
}
.tj_cal_headItem{
    width:50px;
    // height: 50px;
    display: inline-block;
    vertical-align: top;
}
.tj_cal_main{
    width:50px;
    height:50px;
    display: inline-block;
    vertical-align: top;
}

.tj_cal_day{
    display: inline-block;
    width:25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    /* padding-bottom: 10px; */
}
.tj_cal_now{background: #2AD5D5;color:#fff!important}
.tj_cal_grayday{color:#B9BFCC;cursor: not-allowed}
.tj_cal_circle{
    width:5px; 
    height:5px;
    border-radius:3px;
    margin-left:auto;
    margin-right:auto;
    margin-top:5px;
}
//约满
.tj_cal_yuemanbg{
    background:#F15353;
}
//可约
.tj_cal_keyuebg{
    background:#008DF5;
}
//拥挤
.tj_cal_yongjibg{
    background:#FFA121;
}
.tj_cal_nowday{
    font-size:10px;
    color:#2AD5D5;
    font-weight:500;
}
</style>