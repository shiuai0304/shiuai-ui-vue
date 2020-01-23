<template>
    <div>
        <div class="tj_calendar">
            <span @click="preMonth()">上一个月</span><div>{{nowCalYear}}-{{nowCalMonth}}</div><span @click="nextMonth()">下一个月</span>
            <div class="tj_calendar_header">
                <div class="tj_calendar_headItem">星期日</div>
                <div class="tj_calendar_headItem">星期一</div>
                <div class="tj_calendar_headItem">星期二</div>
                <div class="tj_calendar_headItem">星期三</div>
                <div class="tj_calendar_headItem">星期四</div>
                <div class="tj_calendar_headItem">星期五</div>
                <div class="tj_calendar_headItem">星期六</div>
            </div>
            <div class="tj_calendar_content">
                <div class="tj_calendar_main" v-for="(cItem,index) in calendarShowList" :key="index">
                    <span class="tj_calendar_day"
                      :class="{
                        'tj_calendat_grayday':cItem.month!=nowCalMonth,
                        'tj_calendat_nowday':cItem.year==nowYear&&cItem.month==nowMonth&&cItem.day==nowDay}">
                        {{cItem.day}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'shiuai-calendar',
    data(){
        return{
            calendarShowList:[],
            nowYear:'',//当前的年
            nowMonth:'',//当前的月
            nowDay:'',//当前的日
            nowCalYear:'',//日历当前的年
            nowCalMonth:'',//日历当前的月
            sumDays:0,
            firstDayWeek:'',
            calendarShowItem: {
                value:'',
                year:'',//年
                month:'',//月
                day:'',//日
                status:''//状态
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
            this.nowCalYear = nowDate.getFullYear();
            this.nowCalMonth = nowDate.getMonth()+1;
            this.getDayNum(this.nowCalYear,this.nowCalMonth)
        },
        // 计算已选月份天数和已选月份第一天的星期
        getDayNum(year,month){
            this.sumDays = new Date(year, month, 0).getDate();
            this.firstDayWeek = new Date(year, month-1, 1).getDay();
            this.fillCalendar();
        },
        // 计算上个月份的天数
        getPreDayNum(){
            let days=0;
            if(this.nowCalMonth==1){
                days=new Date(this.nowCalYear-1, 12, 0).getDate();
            }else{
                days=new Date(this.nowCalYear, this.nowCalMonth-1, 0).getDate();
            }
            return days
        },
        // 开始填充日历
        fillCalendar(){
            // 填充当前选择月前一个月
            let preDayNum = this.getPreDayNum();
            for(let i=0;i<this.firstDayWeek;i++){
                if(this.nowCalMonth==1){
                    this.calendarShowList[i].year=this.nowCalYear-1;
                    this.calendarShowList[i].month=12;
                }
                if(this.nowCalMonth!=1){
                    this.calendarShowList[i].year=this.nowCalYear;
                    this.calendarShowList[i].month=this.nowCalMonth-1;
                }
                this.calendarShowList[i].day=preDayNum-(this.firstDayWeek-i)+1;
            }
            // 填充当前选择月的
            for(let i=0;i<this.sumDays;i++){
                this.calendarShowList[i+this.firstDayWeek].year=this.nowCalYear;
                this.calendarShowList[i+this.firstDayWeek].month=this.nowCalMonth;
                this.calendarShowList[i+this.firstDayWeek].day=i+1
            }
            // 先计算日历剩余可填充的数量
            let restNum = 42- this.sumDays - this.firstDayWeek;
            for(let i=0;i<restNum;i++){
                if(this.nowCalMonth==12){
                    this.calendarShowList[i+this.sumDays+this.firstDayWeek].year=this.nowCalYear+1;
                    this.calendarShowList[i+this.sumDays+this.firstDayWeek].month=1;
                }
                if(this.nowCalMonth!=12){
                    this.calendarShowList[i+this.sumDays+this.firstDayWeek].year=this.nowCalYear;
                    this.calendarShowList[i+this.sumDays+this.firstDayWeek].month=this.nowCalMonth+1;
                }
                this.calendarShowList[i+this.sumDays+this.firstDayWeek].day=i+1
            }
        },
        // 更改月份
        changeMonth(direction){
            this.calendarShowList=[];
            for(let i=0;i<42;i++){
                let calendarShowItem =Object.assign({},this.calendarShowItem)
                this.calendarShowList.push(calendarShowItem)
            }
            if(direction=='pre'){
                this.preMonth();
            }else{
                this.nextMonth();
            }
        },
        // 上一个月
        preMonth(){
            if(this.nowCalMonth==1){
                this.nowCalYear = this.nowCalYear-1;
                this.nowCalMonth=12
            }else{
                this.nowCalMonth=this.nowCalMonth-1;
            }
            this.getDayNum(this.nowCalYear,this.nowCalMonth)
        },
        // 下一个月
        nextMonth(){
            if(this.nowCalMonth==12){
                this.nowCalYear = this.nowCalYear+1;
                this.nowCalMonth=1
            }else{
                this.nowCalMonth=this.nowCalMonth+1;
            }
            this.getDayNum(this.nowCalYear,this.nowCalMonth)
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
<style >
.tj_calendar_header,.tj_calendar_content{
    width:420px;
}
.tj_calendar_headItem,.tj_calendar_main{
    width:60px;
    height: 60px;
    display: inline-block;
    vertical-align: top;
}
.tj_calendar_main{

}
.tj_calendar_day{
    display: inline-block;
    width:30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    /* padding-bottom: 10px; */
}
.tj_calendat_nowday{background: green;color:#fff}
.tj_calendat_grayday{color:#ccc3c3;cursor: not-allowed}
</style>