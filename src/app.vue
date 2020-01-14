<template>
    <div class="cInst_calMain">
        <div class="cInst_calTopMain">选择日期</div>
        <div class="cInst_caltop">
            <div class="top_calitem" v-if="!!instObj.fstAreaName">
                <div><span>{{instObj.fstAreaName}}</span></div>
                <i class="cInst_caldown"></i>
            </div>
            <div class="top_calitem" v-if="!!instObj.secAreaName">
                <div><span>{{instObj.secAreaName}}</span></div>
                <i class="cInst_caldown"></i>
            </div>
            <div class="top_calitem" v-if="!!instObj.instName">
                <div><span>{{instObj.instName}}</span></div>
                <i class="cInst_caldown"></i>
            </div>
        </div>
        <div class="cInst_calCon">
            <calendar :propNowSelectDate="nowSelectDate" :instlist="instlist" :nowCalYear="calendarItem.year" :nowCalMonth="calendarItem.month" v-for="(calendarItem,index) in mapCalendar" :key="index" @acceptDate="selectDate"></calendar>
        </div>
        <div class="cInst_calBtoMain" v-if="!!nowSelectDate.strRegdate">
            <div class="cInst_calBtoCon"
              :class="{'cInst_cal_yuemanbg':nowSelectDate.regColour===2,'cInst_cal_yongjibg':nowSelectDate.regColour===1,'cInst_cal_keyuebg':nowSelectDate.regColour===0}"
              @click="readyDate()">
                <div class="cInst_calBtoPart1" :class="{'cInst_cal_tiptop':nowSelectDate.regColour===0}">确定</div>
                <div class="cInst_calBtoPart2">{{nowSelectDate.regColour|userTip}}</div>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * 
 * 组建使用入参
 * instlist：填充日历状态的日期列表
 * instObj：当前选择的机构
 */
import calendar from './components/calendar.vue'
export default{
    data(){
        return{
            mapCalendar:[],
            nowSelectDate:{
                "strRegdate":"",
                "regColour":''
            }
        }
    },
    components:{
        calendar
    },
    computed:{

    },
    props:{
        instlist:{
            type:Array,
            default:[]
        },
        instObj:{
            type:Object,
            default:function(){
                return {
                    "fstAreaName":"",
                    "secAreaName":'',
                    "instName":''
                }
            }
        }
    },
    filters:{
        confirmTip(input){
            if(input==0){
                return ''
            }
        },
        userTip(input){
            if(input===0){
                return ''
            }else if(input===1){
                return '（当前日较为拥挤，请尽快预约）'
            }else if(input===2){
                return '（当前日已约满，请更换其他日期）'
            }
        }
    },
    methods: {
        // 获取当前日期的往后4个月
        getAboutNowDate(){
            let nowDate = new Date();
            let nowYear = nowDate.getFullYear();
            let nowMonth = nowDate.getMonth()+1;
            let nowcal={
                year:nowYear,
                month:nowMonth
            }
            this.mapCalendar.push(nowcal)
            for(let i=0;i<3;i++){
                if(nowMonth==12){
                    nowYear = nowYear+1;
                    nowMonth=1
                }else{
                    nowMonth=nowMonth+1;
                }
                let nowcal={
                    year:nowYear,
                    month:nowMonth
                }
                this.mapCalendar.push(nowcal)
            }
        },
        selectDate(payload){
            this.nowSelectDate.strRegdate=payload.strRegdate;
            this.nowSelectDate.regColour=payload.regColour;
        },
        // 点击底部按钮通知父组件
        readyDate(){
            if(this.nowSelectDate.regColour==2){
                return
            }
            this.$emit('noticeDate',this.nowSelectDate)
        }
    },
    created(){
        
    },
    mounted(){
        this.getAboutNowDate();
    }
}
</script>
<style type="text/css" lang="stylus" scoped>
// @import '../../../assets/css/_common.styl';
// 日历父容器
.cInst_calMain{
	padding-top 16px
	padding-bottom 64px
	position relative
	.cInst_calTopMain{
		width 100%
		text-align center
		font-size 18px
		color #2B3642
	}
	.cInst_caltop{
		padding-top:12px;
		padding-bottom:12px;
		position relative
		z-index 2
		background #fff
		.top_calitem{
			display inline-block;
			color #2B3642
			font-size 14px
			font-weight 500
			margin-left:12px;
            vertical-align:top;
			div{
				display inline-block;
				span{
					max-width 154px
					display -webkit-box
					overflow hidden
					text-overflow ellipsis
					-webkit-line-clamp 1
					-webkit-box-orient vertical
				}
			}
			.cInst_caldown{
				vertical-align top
				display inline-block
				width 0
				height 0
				margin-left 7px
				border-width 6px 0px 6px 10px;
				border-style solid
				border-color transparent transparent transparent #2AD5D5;
				position: relative;
				top: 4px;
			}
		}
	}
	.cInst_calCon{
		width 100%
		height 303px
		overflow auto
	}
	.cInst_calBtoMain{
		position absolute
		width 100%
		height 64px
		bottom 0px
		left 0px
        box-shadow 0px -4px 6px 0px rgba(0,0,0,0.03)
    }
}		
.cInst_calBtoCon{
    width 358px
    height 48px
    // line-height 48px
    margin-left auto 
    margin-right auto
    margin-top 8px
    border-radius 8px
    padding-top 5px
    box-sizing border-box 
}
.cInst_cal_tiptop{
    padding-top 10px
}
//约满
.cInst_cal_yuemanbg{
    background #F5F5F5
    color #000
}
//可约
.cInst_cal_keyuebg{
    background:#2AD5D5;
    color:#fff;
}
//拥挤
.cInst_cal_yongjibg{
    background:#FFA121;
    color:#fff;
}
.cInst_calBtoPart1{
    width 100%;
    text-align center;
    font-size 16px;
}
.cInst_calBtoPart2{
    width 100%;
    text-align center;
    font-size 12px;
}
</style>