<template>
  <div class="module main super-alarm-river">
    <div class="title">
      <div class="fill-x-50 fill-y left">
        <span>{{value}}</span>
      </div>
      <div class="fill-x-40 fill right">
        <div class="right-icon-color" @click="checkAllDetail">列表>></div>
      </div>
    </div>
    <div class="super-alarm-river-one">
      <div class="top-content">
        <div class="message">
          <span class="message-span">{{superAlarmRiverOne}}:<span class="content-color-font">{{superAlarmRiverOneNumber}}</span></span>
          <span class="message-span">{{superAlarmRiverTwo}}:<span class="content-color-font">{{superAlarmRiverTwoNumber}}</span></span>
        </div>
        <div class="message">
          <span class="message-span">{{superAlarmRiverThree}}:<span class="content-color-font">{{superAlarmRiverThreeNumber}}</span></span>
          <span class="message-span">{{superAlarmRiverFour}}:<span class="content-color-font">{{superAlarmRiverFourNumber}}</span></span>
        </div>
      </div>
    </div>
    <div class="super-alarm-center overflow-hidden" >
      <div class="super-alarm-two-content h-box north fill-x one">
        <span class="title two">区域选择:</span>
        <div  class="right-content">
          <AreaNoLine @choose="onAreaChange"></AreaNoLine>
        </div>
      </div>
      <div class="super-alarm-two-content item h-box-vc fill-x">
        <span class="title">站点类型:</span>
        <div class="right-content h-box north">
          <div class="d-flex" v-for="(item,i) in submenuLayerItem" :key="i">
            <v-checkbox
              v-model="menuItemSelected"
              :label="item.name"
              :value="item.sttype"
              @change="checked=>changeClickCheck(checked,item)"
              hide-details
              class="mt-0 fill-x-60 fill-y left"
            >
            </v-checkbox>
          </div>
        </div>
      </div>
      <template v-if="!showNoData">
        <div class="impact-top-division-content auto-scroll" >
          <div v-for="(item,index) in riverItems" class="flex impact-content-button fill-x" :key="index">
            <span class="content-title">{{item.warning}}</span>
            <div class="fill-x content-top-button">
                    <span v-for="(sub,index) in item.lists" class="content-button" :key="index">
                     <el-button type="primary" class="button-width"
                                @click="getRiverMessage(sub.adcd,item.motype,item.wlevel,checkLayerStartTime,checkLayerEndTime,sub),getRiverImpactButtonData(sub.adcd,item.motype,checkLayerStartTime,checkLayerEndTime,wlevel)">{{sub.adnm+"("+sub.num+")"}}</el-button>
                    </span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="impact-content-bottom">
      <div class="fill-x content-message" >
        <div class="right-icon-color" @click="checkAllDetail">查看详情>></div>
      </div>
      <el-tabs v-model="activeName"  class="fill" @tab-click="onTabChangeClick">
        <el-tab-pane label="全部列表" name="three" class="fill">
          <div class="impact-content-bottom-table fill">
            <div class="fill-x-60 search-content"><el-input
                placeholder="请输入搜索内容"
                suffix-icon="el-icon-search"
                size="small"
                v-model="searchKey"
                @input="getOnLoadTable"
            >
            </el-input></div>
            <el-table v-loading="allRiverLoading" @row-click="onClickFlytoTab" :data="allRiverTableData" height="100%" style="width: 100%">
<!--              <el-table-column-->
<!--                prop="num"-->
<!--                label="序号"-->
<!--                width="60">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                prop="stcd"-->
<!--                label="站码"-->
<!--                width="110">-->
<!--              </el-table-column>-->
              <el-table-column
                  prop="adnm"
                  label="区域"
                  width="130">
              </el-table-column>
              <el-table-column
                prop="monm"
                label="站名"
               min-width="130">
              </el-table-column>
              <el-table-column label="水位(m)" prop="z" >
                <template slot-scope="{row}">
                           <span type="text" size="small">
                             <span class="wColor " :class="_levelColor(row.wptn)"></span>{{row.z}}
                            </span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="time"
                  label="时间"
                  width="140">
              </el-table-column>
              <el-table-column
                  prop="warnz"
                  label="警戒水位(m)"
                  width="110">
              </el-table-column>
              <el-table-column
                  prop="dangerz"
                  label="保证水位(m)"
                  width="110">
              </el-table-column>
              <el-table-column
                  prop="q"
                  label="流量"
                  width="100">
              </el-table-column>
              <el-table-column
                  prop="position"
                  label="站址"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="position"
                  label="管理单位"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="rsnm"
                  label="水系"
                  width="100">
              </el-table-column>
              <el-table-column
                prop="wsnm"
                label="流域"
                width="100">
              </el-table-column>
              <el-table-column width="120" align="left" label="告警信息" >
                <template slot-scope="scope">
                    <span :class="_levelRiverColor(scope.row.wlevel)">
                      <span >{{ scope.row.wlevelName }}</span>
                    </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="wlevel"
                label="告警信息"
                width="120">
              </el-table-column>
              <el-table-column
                prop="grade"
                label="类别"
                width="140">
              </el-table-column>
              <el-table-column
                prop="source"
                label="来源"
                width="180">
              </el-table-column>
            </el-table>
            <el-pagination small layout="prev, pager, next"
                           :page-count="Math.ceil(pageAll.total / pageAll.pageSize)" :pager-count="pagerCount"
                           style="float:right;"
                           :current-page="pageAll.pageNow" class="page-text-content"
                           @current-change="changeRiverALLPage">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="超警河道站列表" name="first" class="fill">
          <div class="impact-content-bottom-table fill">
            <div class="fill-x-60 search-content"><el-input
                placeholder="请输入搜索内容"
                suffix-icon="el-icon-search"
                size="small"
                v-model="searchKey"
                @input="getOnLoadTable"
            >
            </el-input></div>
            <el-table v-loading="superRiverOnLoading" @row-click="onClickFlytoTab" :data="riverTableData" height="100%" style="width: 100%">
              <el-table-column
                prop="adnm"
                label="区域"
                min-width="110">
              </el-table-column>
              <el-table-column
                prop="monm"
                label="站点"
              >
              </el-table-column>
              <el-table-column
                prop="time"
                label="时间"
                width="140">
              </el-table-column>
              <el-table-column label="水位(m)" prop="z" >
                <template slot-scope="{row}">
                           <span type="text" size="small">
                             <span class="wColor " :class="_levelColor(row.wptn)"></span>{{row.z}}
                            </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="warnz"
                label="警戒水位(m)"
                width="110">
              </el-table-column>
              <el-table-column
                prop="dangerz"
                label="保证水位(m)"
                width="110">
              </el-table-column>
              <el-table-column
                prop="q"
                label="流量"
                width="100">
              </el-table-column>
              <el-table-column prop="warning" label="告警说明" min-width="140">
              </el-table-column>
            </el-table>
            <el-pagination small layout="prev, pager, next"
                           :page-count="Math.ceil(riverListTotal / riverPageSize)" :pager-count="pagerCount"
                           style="float:right;"
                           :current-page="riverListPageNow" class="page-text-content"
                           @current-change="changeRiverWarnPage">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="24小时水位最大变幅" name="second" class="fill">
          <el-radio-group @change="onRadioChange" v-model="radio" class="mb-1">
            <el-radio :label="0">大于等于0m({{radioObj.level0?radioObj.level0:0}})</el-radio>
            <el-radio :label="1">大于等于1m({{radioObj.level1?radioObj.level1:0}})</el-radio>
            <el-radio :label="2">大于等于2m({{radioObj.level2?radioObj.level2:0}})</el-radio>
            <el-radio :label="3">大于等于3m({{radioObj.level3?radioObj.level3:0}})</el-radio>
          </el-radio-group>
          <div class="impact-content-bottom-table fill">
            <div class="fill-x-60 search-content"><el-input
                placeholder="请输入搜索内容"
                suffix-icon="el-icon-search"
                size="small"
                v-model="searchKey"
                @input="getOnLoadTable"
            >
            </el-input></div>
            <el-table v-loading="superRiverOnLoadingTwo" @row-click="onClickFlytoTab" :data="riverTableDataTwo" height="89.8%" style="width: 100%">
              <el-table-column
                  prop="adnm"
                  label="区域"
                  min-width="110">
              </el-table-column>
              <el-table-column
                  prop="stnm"
                  label="站点"
                  min-width="120"
              >
              </el-table-column>
              <el-table-column
                  prop="flag"
                  label="水位变幅(m)"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="maxz"
                  label="最高水位(m)"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="minz"
                  label="最低水位(m)"
                  width="120">
              </el-table-column>
            </el-table>
            <el-pagination small layout="prev, pager, next"
                           :page-count="Math.ceil(pageObj.total / pageObj.pageSize)" :pager-count="pagerCount"
                           style="float:right;"
                           :current-page="pageObj.pageNow" class="page-text-content"
                           @current-change="changeRiverWarnPageTwo">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import {Table, Dialog} from "@ec/commons";
  import {mapState} from "vuex";
  import  mapdynamic  from "./../../../config/map.wkt.commons";
  import flyToMap                from "@/web/modules/main/infrastructure/tool.flyto.map";
  import AreaNoLine from "../header/components/AreaNoLine";
  export default {
    name: "SuperAlarmRiver",
    components: {AreaNoLine, Table, Dialog,},
    props:["value"],
    data() {
      return {
        searchKey:"",
        allRiverTableData:[],
        allRiverLoading:false,
        activeName:"three",
        showNoAnalysis: false,
        showAnalysisBottom: false,
        areaName:'',
        warnCount:{},
        detailType:1,
        riverContentTableDataOut:[],
        downCustomizeValue:null,
        superRiverOnLoading:false,
        superRiverOnLoadingTwo:false,
        input: "",
        selected: [],
        menuItemSelected: [],
        riverContentTableData: [],
        submenuLayerItem: [
          {
            name: "山洪站点",
            sttype: "1",
            checked: true,
          }, {
            name: "水文站点",
            sttype: "2",
            checked: true,
          },
        ],
        windowItems: [],
        sttype: [1,2],
        tab: null,
        page: {
          total: 0,
          page: 1,
          size: 50,
        },
        pageAll: {
          total: 0,
          pageNow: 1,
          pageSize: 50,
        },
        paramMap:{
          motype: 15,
          key: "",
          end: null,
          area: "",
          sttype: null
        },
        showNoData: false,
        showNoDataContent: "无告警站点",
        superAlarmRiverOne: "告警站点总数",
        superAlarmRiverTwo: "超历史最高站点",
        superAlarmRiverThree: "超保证水位站点",
        superAlarmRiverFour: "超警戒水位站点",
        superAlarmRiverOneNumber: "",
        superAlarmRiverTwoNumber: "",
        superAlarmRiverThreeNumber: "",
        superAlarmRiverFourNumber: "",
        apiServiceData: {
          getTableObjectInfo:
            "/api/rpc/com.ec.fp.service.monitor.MonitorObjectService.getTableObjectInfo", //查询具体对象属性表数据信息
        },
        tableData: {
          //属性表数据
          info: null,
          dimensions: [],
          source: [],
          // size: [windowWidth, windowHeight], //dialog大小
          isDialogShow: false,
          dialogName: null,
          pagenation: {
            page: 1,
            size: 20, //page: 1, size: 10, total: 1
            total: 1
          },
          isLoading: false,
          loadingText: "数据加载中..."
        },
        windowHeight: window.innerHeight / 1.5,
        windowWidth: window.innerWidth / 1.5,
        riverDivisionItems: [],
        riverItems: [],
        riverTableData: [],
        riverTableDataTwo:[],
        riverTitle: "超警河道站影响范围",
        riverTableTitle: "超警河道站列表",
        wktLayer: null,
        adcd: "",
        adnm: "",
        dateType: "",
        activeLayerTime: "",
        activeLayerDataType: "",
        sourceData: "",
        conditionData: "",
        kind: 1,
        dialogSuperRiverVisible: false,
        superRiverLoading: false,
        riverListTotal: 0,
        riverListPageNow: 1,
        riverPageSize: 50,
        pagerCount: 5,
        superRiverTotal: 0,
        superRiverPageNow: 1,
        superRiverPageSize: 50,
        mapRiverLayerData: {
          pointRiverLayer: null, //当前地图点图层数据
          pointReservoirLayer: null,
        },
        startTime: "",
        endTime: "",
        wktBufferGraphic: mapdynamic,
        wktBufferPolygonGraphic: mapdynamic,
        pubtsTime: "",
        distance: 5,
        motype: "",
        checkLayerStartTime: "",
        checkLayerEndTime: "",
        wlevel: "",
        wktBufferLayer:"",
        wktBufferLineLayer:"",
        wktBufferPostData:null,
        radio:0,
        radioObj:'',
        pageObj:{
          pageNow:1,
          pageSize:50,
        },
        waterChangeDate:''
      }
    },
    created() {
      this.$note.on("visual.playable.frame", this.onAddLayerTimeData);
      this.$note.on("scene.remove.layer.Wkt", this.removeAdcdWktData);
      this.adcd = this.$store.state.user.adcd[0];
      this.adnm = this.$store.state.user.adnm;
      this.$note.on("map.effect-analysis.reach", this.findReachByDistance);
      this.startTime = moment(getServerTime()).format("YYYY-MM-DD 00:00:00");
      this.endTime = moment(getServerTime()).format("YYYY-MM-DD HH:mm:ss");
      this.onLoadAllRiverTable(this.pageAll,this.adcd,this.sttype);
    },
    beforeDestroy() {
      this.$note.un("visual.playable.frame", this.onAddLayerTimeData);
      this.$note.un("map.effect-analysis.reach", this.findReachByDistance);
    },
    methods: {
      onTabChangeClick(){
        this.searchKey="";
      },
      getOnLoadTable(){
        if(this.activeName=="three"){
          this.onLoadAllRiverTable(this.pageAll,this.adcd,this.sttype);
        }else if(this.activeName=="first"){
          this.getRiverMessage(this.adcd, this.motype, this.wlevel, this.checkLayerStartTime, this.checkLayerEndTime, undefined, true, true,this.sttype);
        }else if(this.activeName=="second"){
          this.findRiverZChangeByLevel(this.adcd,this.waterChangeDate,this.sttype)
        }
      },
      async onLoadAllRiverTable(page,adcd,sttypes){
        this.allRiverTableData=[];
        let paramArr = {page:page,area: adcd,type:{motype:15,sttypes:sttypes},key:this.searchKey};
        let url = "/api/station-service/monitorObject/findObjectDataByPage";
        let rpc = {
          url: url,
          data: paramArr
        };
        let data = await this.$store.dispatch("post", rpc);
        if(data){
          this.pageAll.total = data.total;
          this.pageAll.pageSize = data.pageSize;
          this.pageAll.pageNow = data.pageNow;
          for (let i = 0; i < data.rows.length; i++) {
            data.rows[i].num = i + 1;
            if (data.rows[i].tm) {
              data.rows[i].time = moment(data.rows[i].tm).format("YYYY/MM/DD HH:mm");
            }
            data.rows[i].wlevelName = this._alarmRiverLevel(data.rows[i].wlevel);
            data.rows[i].position = `${data.rows[i].province ? data.rows[i].province : ''}${data.rows[i].city ? data.rows[i].city : ''}${data.rows[i].county ? data.rows[i].county : ''}${data.rows[i].mName ? data.rows[i].mName : ''}`;
          }
          this.allRiverTableData=data.rows;
        }else{
          this.allRiverTableData=[];
        }
      },
      onAreaChange(value){
        if(value){
          this.adcd=value;
        }else{
          this.adcd=this.$store.state.user.adcd[0];
        }
        flyToMap(this.adcd);
        this.getRiverMessage(this.adcd, this.motype, this.wlevel, this.checkLayerStartTime, this.checkLayerEndTime, undefined, true, false,this.sttype);
        this.findZChangeCount(this.adcd,this.waterChangeDate,this.sttype);
        this.onLoadAllRiverTable(this.pageAll,this.adcd,this.sttype);
      },
      checkWarnDetail(id){
        this.$store.dispatch("window.opens",{
          id: "super-alarm-river-depots",
          attrs: {detailType:2,obj:{index: "0"},sttype:this.sttype,motype:15,playTimeBegin:this.checkLayerStartTime,playTimeEnd:this.checkLayerEndTime},
          maximize:true,
          sizes: ['60vw', '65vh'],
          title:'',
          content: () => import("@/web/modules/meteorological/WarnTable")
        });
       },
      checkAllDetail(id){
        this.$store.dispatch("window.opens",{
          id: "super-alarm-river-depots",
          attrs: {detailType:1,obj:{index: "0"},sttype:this.sttype,motype:15,playTimeBegin:this.checkLayerStartTime,playTimeEnd:this.checkLayerEndTime},
          maximize:true,
          sizes: ['60vw', '65vh'],
          title:'',
          content: () => import("@/web/modules/meteorological/WarnTable")
        });
      },
      removeAdcdWktData() {
        let that = this;
        if (that.wktLayer) that.platform.removeGraphic(that.wktLayer);
        if (that.wktBufferLayer) that.platform.removeGraphic(that.wktBufferLayer);
        if (that.wktBufferLineLayer) that.platform.removeGraphic(that.wktBufferLineLayer);
        if (that.wktBufferPostData) that.wktBufferPostData.abort();
      },
      _levelColor: function (level) {
        //水势 4落 5涨 6平
        let classname = "";
        if (level == 4) {
          classname = "el-icon-bottom el-icon-green";
        } else if (level == 5) {
          classname = "el-icon-top el-icon-red";
        } else if (level == 6) {
          // classname = "el-icon-minus";
        }
        return classname;
      },
      clickOnRightContent(data) {
        this.page.total = 0;
        this.page.page = 1;
        this.page.size = 50;
        this.paramMap.area = data.adcd;
        this.areaName = data.adnm;
        this.findObjectDataByPage(this.page, this.paramMap);
      },
      changeRiverContentPage(page) {
        this.page.page = page;
        this.findObjectDataByPage(this.page, this.paramMap);
      },
      changeClickCheck: function (checked, data) {
        this.sttype = [];
        for (let i = 0; i < this.menuItemSelected.length; i++) {
          this.sttype.push(this.menuItemSelected[i])
        }
        if (this.menuItemSelected.length > 0) {
          this.$note.notify("scene.layer.check.typeChange", this.checkLayerStartTime,this.sttype);
          this.getRiverMessage(this.adcd, this.motype, this.wlevel, this.checkLayerStartTime, this.checkLayerEndTime, undefined, true, true,this.sttype);
          this.findZChangeCount(this.adcd,this.waterChangeDate,this.sttype);
          this.onLoadAllRiverTable(this.pageAll,this.adcd,this.sttype);
        }
      },
      onTabClick(tab, sttype) {
        this.tab = tab;
        sttype = this.sttype;
        let type;
        let userId = this.$store.state.user.userid;
        if (tab.index == "0") {
          type = 1;
        }
        if (tab.index == "1") {
          type = 2;
        }
        let typeParam = {
          motype: 15,
          sttypes: sttype,
        };
        let sttypeData = "";
        for (let i = 0; i < this.selected.length; i++) {
          if (i == 0) {
            sttypeData += this.selected[i].sttype
          } else {
            sttypeData += "," + this.selected[i].sttype
          }
        }
        let paramMap = {
          motype: 15,
          key: "",
          end: this.startTime,
          area: "",
          sttype: sttypeData
        };
        this.paramMap = paramMap;
        if(this.detailType==1){
          this.countObjectByType(typeParam, userId, type);
          this.findObjectDataByPage(this.page, paramMap);
        } else {
          this.countWarnObjectByType(typeParam, userId, type);
          this.findObjectDataByPage(this.page, paramMap,type);
        }

      },
      //根据用户ID，统计各行政区/流域站点数目
      async countObjectByType(typeParam, userId, type) {
        this.windowItems = [];
        let rpc = {
          url: "/api/rpc/com.ec.fp.service.monitor.MonitorObjectService.countObjectByType",
          data: [typeParam, userId, type]
        };
        let data = await this.$store.dispatch("post", rpc);
        if (data) {
          this.windowItems = data;
        }
      },
      //根据类型，分页查询站点实时数据
      async findObjectDataByPage(page, paramMap,type) {
        let paramArr=[]
        let url = '';
        if(this.detailType==1){
          paramArr = [page, paramMap];
          url = "/api/rpc/com.ec.fp.service.monitor.MonitorObjectService.findObjectDataByPage";
        } else {
          paramArr = [page, paramMap.motype, type, paramMap.area, null, paramMap.sttype, '', ''];
          url = "/api/rpc/com.ec.fp.service.rwdb.RealRecordService.getWarningByDate";
          this.getWarningCount(paramMap);
        }
        this.riverContentTableData = [];
        let rpc = {
          url: url,
          data: paramArr
        };
        let data = await this.$store.dispatch("post", rpc);
        if (data) {
          this.page.total = data.pagination.total;
          this.page.size = data.pagination.size;
          this.page.page = data.pagination.page;
          for (let i = 0; i < data.source.length; i++) {
            data.source[i].num = i + 1;
            if (data.source[i].tm) {
              data.source[i].time = moment(data.source[i].tm).format("YYYY/MM/DD HH:mm");
            }
            data.source[i].wlevelName = this._alarmRiverLevel(data.source[i].wlevel);
            data.source[i].position = `${data.source[i].province ? data.source[i].province : ''}${data.source[i].city ? data.source[i].city : ''}${data.source[i].county ? data.source[i].county : ''}${data.source[i].mName ? data.source[i].mName : ''}`;
          }
          this.riverContentTableData = data.source
        }
      },
      _levelRiverColor: function (level) {
        var classname = "";
        if (level == 1) {
          classname = "riverColorOne";
        } else if (level == 2) {
          classname = "riverColorTwo";
        } else if (level == 3) {
          classname = "riverColorThree";
        } else if (level == 4) {
          classname = " riverColorFour";
        }
        return classname;
      },
      _alarmRiverLevel: function (levelNumber) {
        // 告警级别计算
        var txt = "";
        if (levelNumber == 1) {
          txt = "超保证水位";
        } else if (levelNumber == 2) {
          txt = "超警戒水位"
        } else if (levelNumber == 3) {
          txt = "接近警戒水位"
        } else if (levelNumber == 4) {
          txt = "超常规水位"
        } else {
          txt = "-"
        }
        return txt;
      },
      onSingleClick(dataset) {
        let target = dataset ;
        if (target) {
          this.findReachByDistance(undefined,target.mocd,0,target.monm);
        }
      },
      //获取站点周边河道边界
      findReachByDistance(e,mocd, radius,monm) {
        let that=this;
        if(!mocd){
          return
        }
        if (that.wktBufferLayer) that.platform.removeGraphic(that.wktBufferLayer);
        if (that.wktBufferLineLayer) that.platform.removeGraphic(that.wktBufferLineLayer);
        let rpc = {
          url: "/api/station-service/monitorObject/findReachByDistance",
          data: {mocd:mocd,radius:radius}
        };
        this.wktBufferPostData = that.$store.state.agent.post("/api/station-service/monitorObject/findReachByDistance", {mocd:mocd,radius:radius}).then(data=>{
          if (data) {
            let geoList = [data];
            let condition = {
              title: monm,
              scope: {
                type: "wkt",
                mocd:mocd,
                radius:data.radius,
                data:data.buffergeom,
              }
            };
            this.$store.commit("main/board.show", {
              id: "main.around.analysis",
              position: "west",
              title: "周边分析",
              attrs: {condition},
              content: () => import("@/web/modules/main/components/AroundAnalysis")
            });
            that.wktBufferLayer = that.platform.addGraphic(geoList, that.wktBufferPolygonGraphic);
            that.wktBufferLineLayer = that.platform.addGraphic(geoList, that.wktBufferGraphic);
          }
        });
      },
      onAddLayerTimeData(e, index, provider, current) {
        this.dateType = current.mode;
        this.riverListPageNow=1;
        let motype = current.original.motype;
        this.motype = motype;
        let startTime = "";
        let endTime = "";
        if (this.dateType === "range") {
          startTime = provider.getTimeRange(index)[0];
          endTime = provider.getTimeRange(index)[1];
        } else {
          startTime = provider.get(index).custom.start;
          endTime = provider.get(index).custom.end;
        }
        this.checkLayerStartTime = startTime;
        this.checkLayerEndTime = endTime;
        let pubts = moment(provider.getTime(index)).format("YYYY-MM-DD");
        this.pubtsTime = moment(pubts).valueOf() / 1000;
        this.wlevel=0;
        if (current.attachment.injection.filter.legend) {
          this.wlevel = current.attachment.injection.filter.legend;
        }
        this.removeAdcdWktData();
        this.getRiverMessage(this.adcd, motype, this.wlevel, startTime, endTime, undefined, true, true);
        this.getRiverImpactButtonData(this.adcd, motype, startTime, endTime,this.wlevel,);
        this.getTopContentData(this.adcd, startTime, endTime);
        if(index>=(provider.ranger[1]-1)){
          this.waterChangeDate='';
          this.findZChangeCount(this.adcd,'')
        }else{
          this.waterChangeDate=startTime;
          this.findZChangeCount(this.adcd,this.waterChangeDate)
        }
      },

      onClickRiverBread(data) {
        this.getRiverMessage(data.adcd, data.motype, data.wlevel, this.checkLayerStartTime, this.checkLayerEndTime, data.res, true);
        this.getRiverImpactButtonData(data.adcd, data.motype, this.checkLayerStartTime, this.checkLayerEndTime,data.wlevel,);
      },
      //江河水情统计显示
      async getRiverImpactButtonData(adcd, motype, startTime, endTime,wlevel) {
        this.riverItems = [];
        let rpc = {
          url: "/api/station-service/alarm/countAlarmRiverByDistrict",
          data: {sttypes: this.sttype,adcd:adcd,date:startTime,wlevel:wlevel}
        };
        let data = await this.$store.dispatch("post", rpc);
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data[i].motype = 15
          }
          this.showNoData = false;
          this.riverItems = data;
        } else {
          this.showNoData = true;
          this.$note.notify("map.effect-analysis.hide");
          this.$note.notify("map.effect-analysis.clear");

        }
        this.showNoAnalysis=this.showNoData;
        this.showAnalysisBottom=this.showNoData;
      },

      //统计水位变幅情况
      async findZChangeCount(adcd, date,sttypes) {
        let rpc = {
          url: "/api/station-service/alarm/findZChangeCount",
          data: {adcd:adcd,date:date,sttypes:sttypes||[1,2]}
        };
        let data = await this.$store.dispatch("post", rpc);
        if (data) {
          this.radioObj=data;
          this.findRiverZChangeByLevel(adcd,date,sttypes)
        }
      },
      //统计水位变幅情况
      async findRiverZChangeByLevel(adcd, date,sttypes) {
        this.superRiverOnLoadingTwo=true;
        let rpc = {
          url: "/api/station-service/alarm/findRiverZChangeByLevel",
          data: {page:this.pageObj,adcd:adcd,date:date,level:this.radio,sttypes:sttypes||[1,2],key:this.searchKey}
        };
        let data = await this.$store.dispatch("post", rpc);
        if (data) {
          this.superRiverOnLoadingTwo=false;
          this.pageObj.pageNow=data.pageNow;
          this.pageObj.pageSize=data.pageSize;
          for (let i=0;i<data.rows.length;i++){
            data.rows[i].flag=data.rows[i].flag.replace("m","");
          }
          this.riverTableDataTwo=data.rows;
        }else{
          this.superRiverOnLoadingTwo=false;
        }
      },

      //获取江河水情站点
      async getRiverMessage(adcd, motype, wlevel, startTime, endTime, res, isPlay, isFirst,sttype) {
        let that = this;
        that.superRiverOnLoading=true;
        // if (!isFirst) {
        //   flyToMap(adcd);
        // }
        if (!isPlay) {
          if (that.riverDivisionItems.length === 4) {
            return;
          }
        }
        if (that.riverDivisionItems.length > 0 && res) {
          for (let i = 0; i < that.riverDivisionItems.length; i++) {
            if (that.riverDivisionItems[i].adcd === res.adcd) {
              that.riverDivisionItems.splice(i);
            }
          }
        }
        if (res) {
          that.riverDivisionItems.push({adcd: adcd, adnm: res.adnm, res: res, motype: motype, wlevel: wlevel});
        } else {
          that.riverDivisionItems = [];
          that.riverDivisionItems.push({
            adcd: this.$store.state.user.adcd[0],
            adnm: this.adnm,
            motype: motype,
            wlevel: wlevel
          });
        }
        that.riverTableData = [];
        let rpc = {
          url: "/api/station-service/alarm/findAlarmRiverByPage",
          data: {page:{pageNow: this.riverListPageNow,pageSize: this.riverPageSize},area:adcd,date:startTime,sttypes:sttype||[1,2],key:this.searchKey}
        };
        let data = await this.$store.dispatch("post", rpc);
        if (data) {
          that.superRiverOnLoading=false;
          that.riverListPageNow = data.pageNow;
          that.riverPageSize = data.pageSize;
          that.riverListTotal = data.total;
          for (let i = 0; i < data.rows.length; i++) {
            data.rows[i].time = moment(data.rows[i].tm).format("YYYY/MM/DD HH:mm")
          }
          that.riverTableData = data.rows;
        }else{
          that.superRiverOnLoading=false;
        }
      },

      async getTopContentData(adcd, startTime, endTime) {
        const rpc = {
          url: "/api/station-service/alarm/countAlarmRiverByLevel",
          data: {adcd:adcd,date:startTime}
        };
        const data = await this.$store.dispatch("post", rpc);
        if (data) {
          this.superAlarmRiverOneNumber = data.total;
          this.superAlarmRiverTwoNumber = data.overHistoryMax;
          this.superAlarmRiverThreeNumber = data.overGraz;
          this.superAlarmRiverFourNumber = data.overWarnz;
        }
      },
      onClickFlytoTab(row) {
        this.onSingleClick(row);
        let target = this.platform.findGraphic(row.mocd);
        this.platform.flyTo(target || [row.lgtd, row.lttd], {
          zoom: 12,
          marker: {
            scale: 0.8,
            label: "",
            image: `/images/layer/${row.motype}/${row.wlevel || 0}.png`
          },
          data: row
        });
      },
      clickAddImpactContent(type) {
        this.tableData.isDialogShow = true;
        this.onTabClick({index: "0"}, this.sttype);
      },
      async attrTable(info) {
        let that = this;
        that.tableData.source = [];
        //属性表
        that.tableData.info = info;
        that.tableData.isLoading = true;
        const rpc = {
          url: that.apiServiceData.getTableObjectInfo,
          data: [
            info.motype,
            "",
            that.tableData.pagenation.page,
            that.tableData.pagenation.size
          ] //(String motype, String searchKey, Integer page, Integer size)
        };
        const data = await that.$store.dispatch("post", rpc);
        if (data) {
          that.tableData.isDialogShow = true;
          that.tableData.dialogName = info.name + "属性表";
          that.tableData.dimensions = data.dimensions;
          that.tableData.dimensions = data.dimensions;
          that.tableData.source = data.source;
          that.tableData.pagenation = data.pagination;
        } else {
          that.tableData.isDialogShow = false;
          that.tableData.dialogName = "";
          that.tableData.pagenation.total = 0;
        }
        that.tableData.isLoading = false;
      },
      async rowDoubleClick(row, index) {
        let target = this.platform.findGraphic(row.mocd);
        this.platform.flyTo(target||[row[7], row[8]], {
          zoom: 12, marker: {
            scale: 0.8,
            label: row.monm,
            image: `/images/layer/${row.motype}/0.png`
          },
          data: {motype: row.motype, mocd: row.mocd, stcd: row.stcd, label: row.monm,lgtd: row.lgtd, lttd: row.lttd,}
        });
      },
      pageSwitch(page) {
        this.tableData.pagenation.page = page;
        this.attrTable(this.tableData.info);
      },
      onSuperRiverClose() {
        this.dialogSuperRiverVisible = false;
      },
      onSuperRiverConfirm() {
        this.dialogSuperRiverVisible = false;
      },
      changeRiverWarnPage(page) {
        this.riverListPageNow = page;
        this.getRiverMessage(this.adcd, this.motype, this.wlevel, this.checkLayerStartTime, this.checkLayerEndTime,);
      },
      changeRiverWarnPageTwo(page){
        this.pageObj.pageNow=page;
        this.findRiverZChangeByLevel(this.adcd,this.waterChangeDate,this.sttype)
      },
      changeRiverALLPage(page){
        this.pageAll.pageNow=page;
        this.onLoadAllRiverTable(this.pageAll,this.adcd,this.sttype);
      },
      onRadioChange(radio){
        this.radio=radio;
        this.findRiverZChangeByLevel(this.adcd,this.waterChangeDate,this.sttype)
      },
      openRiverAlarmFly(row) {
        if (this.mapRiverLayerData.pointRiverLayer) {
          this.platform.removeGraphic(this.mapRiverLayerData.pointRiverLayer);
          this.mapRiverLayerData.pointRiverLayer = null;
        }
        if (row.level === 1) {
          row.level = 0
        } else if (row.level === 2) {
          row.level = 1
        } else if (row.level === 3) {
          row.level = 2
        } else if (row.level === 4) {
          row.level = 3
        }
        // let pointRiverLayer = this.platform.addGraphic(row, this.graphic);
        this.platform.flyTo([row.lgtd, row.lttd], {
          zoom: 10,
          marker: false
        });
        this.dialogSuperRiverVisible = false;
        // this.mapRiverLayerData.pointRiverLayer = pointRiverLayer;
      },
      closeDialog(val) {
        this.tableData.isDialogShow = val;
      },
    },
    computed: mapState({
      platform: state => state.platform,
      user: state => state.user,
    })
  }
</script>

<style scoped>

</style>
