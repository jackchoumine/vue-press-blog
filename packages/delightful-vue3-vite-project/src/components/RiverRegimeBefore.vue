<!--河道水情-->
<script lang="ts" setup>
  import {inject, onBeforeMount, reactive, ref} from "vue";
  import {onBeforeUnmount, onMounted,} from 'vue';
  import AreaCascader from '@/modules/query/components/AreaCascader.vue';
  import { SiteFilter } from '.'
  import { useSiteFilter } from '../hooks'
  import useGraphicFactory from "#gis/services/useGraphicFactory";
  import useGraphicManager from "#gis/services/useGraphicManager";
  import useFlayTo from "#gis/services/useFlayTo";
  import {Table} from "@ec/basal/index"
  import Lookup from '@/core/Lookup';
  import moment from 'moment';
  import columns, {pointEditorColumns} from "../config/columns"
  import {riverAllColumns, riverWarningColumns} from "../config/columns"
  import {GraphicConfig} from "#gis/types";
  import website from "@/config/website";
  import stations from '../../renderer/config/stations';
  import useMarkerClear from "#gis/services/useMarkerClear";
  const loading=ref(false);
  let around;
  const wktConfig = <GraphicConfig>{
    coordinate: v => v.cgeom,
    projection: {from: "EPSG:4326", to: website.DEFAULT_PROJECTION},
    polygon: {
      zIndex: 0,
      color: "#00000000",
      outlineWidth: 2,
      outlineColor: website.BIEJIE_COLOR,
    },
  };
  const props = defineProps({
    menu: {
      type: Object
    }
  });

  interface navData {
    value: string,
    showNoDataContent: string,
    superAlarmRiverOne: string,
    superAlarmRiverTwo: string,
    superAlarmRiverThree: string,
    superAlarmRiverFour: string,
    superAlarmRiverFive: string,
    superAlarmRiverOneNumber: string,
    superAlarmRiverTwoNumber: string,
    superAlarmRiverThreeNumber: string,
    superAlarmRiverFourNumber: string,
    superAlarmRiverFiveNumber: string,
    param: object,
    checkboxItems: any,
    checkbox: any,
    searchKey: string,
    adcd: string,
    startTime: string,
    endTime: string,
    motype: string,
    defineArea: string,
    tab: any,
    wlevel: string,
  }

  const store: any = inject("store");
  const page = {page: 1, size: 50, display: "simple", total: 0, length: 3};
  const divRiverRef = ref(null);
  const sourceAll = ref(null);
  const selectedArea = ref([store.user.adcd])
  const navData: navData = reactive({
    value: "",
    // NOTE 
    showNoDataContent: "无告警站点",
    superAlarmRiverOne: "告警站点总数",
    superAlarmRiverTwo: "超历史最高站点",
    superAlarmRiverThree: "超保证水位站点",
    superAlarmRiverFour: "超警戒水位站点",
    superAlarmRiverFive: "超起淹水位站点",
    superAlarmRiverOneNumber: "",
    superAlarmRiverTwoNumber: "",
    superAlarmRiverThreeNumber: "",
    superAlarmRiverFourNumber: "",
    superAlarmRiverFiveNumber: "",
    // NOTE
    areaApi: "area.cascader",
    param: {
      parentAdcd: store.user.adcd,
      level: 6
    },
    checkboxItems: [
      {
        label: "山洪站点",
        value: 1,
      },
      {
        label: "水文站点",
        value: 2,
      },
    ],
    checkbox: [1, 2],
    tab: '1',
    searchKey: "",
    adcd: store.user.adcd,
    startTime: "",
    endTime: "",
    motype: "15",
    defineArea: "",
    wlevel: "",
  })

  const checkAllTopDetail=()=>{
    store.window.open({
          id: "point-detail",
          title: "",
          props: {
            "params": {
              "propsItem": navData.checkboxItems,
              "propsCheck": navData.checkbox,
              motype: navData.motype,
              adcd: navData.adcd,
              level: '',
              startTime: navData.startTime,
              endTime: navData.endTime,
              defineArea: navData.defineArea,
              columns: riverAllColumns,
              treeApi: "water.all.tree.data",
              tableApi: "water.river.all.table.data",
            }
          },
          sizes: ["70vw", "65vh"],
          footer: false,
          content: () => import("../view/EditorPoint.vue"),
        }
    );
  }
  const checkAllDetail = () => {
    if (navData.tab == 1) {
      store.window.open({
            id: "point-detail",
            title: "",
            props: {
              "params": {
                "propsItem": navData.checkboxItems,
                "propsCheck": navData.checkbox,
                motype: navData.motype,
                adcd: navData.adcd,
                level: navData.wlevel,
                startTime: navData.startTime,
                endTime: navData.endTime,
                defineArea: navData.defineArea,
                columns: riverAllColumns,
                treeApi: "water.all.tree.data",
                tableApi: "water.river.all.table.data",
              }
            },
            sizes: ["70vw", "65vh"],
            footer: false,
            content: () => import("../view/EditorPoint.vue"),
          }
      );
    } else if (navData.tab == 2) {
      store.window.open({
            id: "point-warning-detail",
            title: "",
            props: {
              "params": {
                "propsItem": navData.checkboxItems,
                "propsCheck": navData.checkbox,
                motype: navData.motype,
                adcd: navData.adcd,
                level: navData.wlevel,
                startTime: navData.startTime,
                endTime: navData.endTime,
                defineArea: navData.defineArea,
                columns: riverWarningColumns,
                treeApi: "water.warning.tree.data",
                tableApi: "water.river.warning.table.data",
              }
            },
            sizes: ["70vw", "65vh"],
            footer: false,
            content: () => import("../view/EditorPoint.vue"),
          }
      );
    } else {
      store.window.open({
            id: "point-warning-detail",
            title: "",
            props: {
              "params": {
                "propsItem": navData.checkboxItems,
                "propsCheck": navData.checkbox,
                motype: navData.motype,
                adcd: navData.adcd,
                level: navData.wlevel,
                startTime: navData.startTime,
                endTime: navData.endTime,
                defineArea: navData.defineArea,
                columns: riverWarningColumns,
                treeApi: "water.warning.tree.data",
                tableApi: "water.river.warning.table.data",
              }
            },
            sizes: ["70vw", "65vh"],
            footer: false,
            content: () => import("../view/EditorPoint.vue"),
          }
      );
    }
  };

  const onCkeckBox = () => {
    if (navData.tab == 1) {//全部列表
      getTopContentData(navData.adcd, navData.startTime, navData.checkbox);
      onLoadAllRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea);
    } else if (navData.tab == 2) {//超警河道站列表
      onLoadWarningRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea, navData.wlevel)
    } else {
      onLoadInitiationRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea, navData.wlevel)
    }
    store.note.emit("visual.playable.filter",{sttypes:navData.checkbox})
  };

  const onChangeTab = (tab) => {
    page.page = 1;
    navData.tab = tab;
    navData.wlevel = "";
    if (tab == 1) {//全部列表
      onLoadAllRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea);
    } else if (tab == 2) {//超警河道列表
      navData.wlevel = "-1";
      onLoadWarningRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea, navData.wlevel)
    } else {//超起淹没列表
      navData.wlevel = "6";
      onLoadInitiationRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea, navData.wlevel)
    }
  };
  const onAreaChange = (value) => {
    if (value) {
      navData.adcd = value;
    } else {
      navData.adcd = store.user.adcd;
    }
    if (navData.tab == 1) {//全部列表
      getTopContentData(navData.adcd, navData.startTime, navData.checkbox);
      onLoadAllRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea);
    } else if (navData.tab == 2) {//超警河道站列表
      onLoadWarningRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea, navData.wlevel)
    } else {//超起淹没列表
      onLoadInitiationRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea, navData.wlevel)
    }
    onAreaClear();
    if (value != null && value != store.user.adcd) {
      Promise.all([
        useGraphicManager(),
        useGraphicFactory(),
        store.api.from("area.wkt", {adcd: value}),
      ]).then(([manager, factory, data]) => {
        manager.addition(around = factory.read("wkt", data, wktConfig));
        useFlayTo(data.bbox);
      });
    } else {
      useFlayTo(store.user.bbox);
    }
  };
  const onAreaClear = () => {
    if (around != null) {
      useGraphicManager()
          .then(manager => manager.remove(around))
          .then(() => around = null);
    }
  }
  const { currentFilter, isSy, formValueChange } = useSiteFilter(navData, onAreaChange)
  //搜索
  const getOnLoadTable = () => {
    if (navData.tab == 1) {//全部列表
      onLoadAllRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea);
    } else if (navData.tab == 2) {//超警河道站列表
      onLoadWarningRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea, navData.wlevel)
    } else {//超起淹没列表
      onLoadInitiationRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea, navData.wlevel)
    }
  };
  //全部河道站点列表
  const onLoadAllRiverTable = (page, adcd, motype, sttypes, searchKey, defineArea) => {
    let param = {
      page: page,
      start: navData.startTime,
      end: navData.endTime,
      area: adcd,
      type: {motype: motype, sttypes: sttypes},
      key: searchKey,
      defineArea: defineArea
    };
    loading.value=true;
    sourceAll.value = [];
    const apiParam = {...currentFilter, ...param}
    store.api.from("water.river.all.table.data", apiParam).then((res: any) => {
      if (res) {
        page.page = res.pageNow;
        page.size = res.pageSize;
        page.total = res.total;
        sourceAll.value = res.rows;
      }
    }).catch((error: any) => {
      Lookup.store.notify({message: error.message});
    }).finally(()=>{
      loading.value=false;
    });
  };
  //超警河道站列表
  const onLoadWarningRiverTable = (page, adcd, motype, sttypes, searchKey, defineArea, wlevel) => {
    let param = {
      page: page,
      start: navData.startTime,
      end: navData.endTime,
      area: adcd,
      type: {motype: motype, sttypes: sttypes},
      key: searchKey,
      defineArea: defineArea,
      wlevel: wlevel
    }
    loading.value=true;
    sourceAll.value = [];
    const apiParam = {...currentFilter, ...param}
    store.api.from("water.river.warning.table.data", apiParam).then((res: any) => {
      if (res) {
        page.page = res.pageNow;
        page.size = res.pageSize;
        page.total = res.total;
        sourceAll.value = res.rows;
      }
    }).catch((error: any) => {
      Lookup.store.notify({message: error.message});
    }).finally(()=>{
      loading.value=false;
    });
  };
  //超起淹没列表
  const onLoadInitiationRiverTable = (page, adcd, motype, sttypes, searchKey, defineArea, wlevel) => {
    let param = {
      page: page,
      start: navData.startTime,
      end: navData.endTime,
      area: adcd,
      type: {motype: motype, sttypes: sttypes},
      key: searchKey,
      defineArea: defineArea,
      wlevel: wlevel
    }
    sourceAll.value = [];
    const apiParam = {...currentFilter, ...param}
    store.api.from("water.river.warning.table.data", apiParam).then((res: any) => {
      if (res) {
        page.page = res.pageNow;
        page.size = res.pageSize;
        page.total = res.total;
        sourceAll.value = res.rows;
      }
    }).catch((error: any) => {
      Lookup.store.notify({message: error.message});
    });
  };
  //头部统计数据接口
  const getTopContentData = (adcd, startTime, sttypes) => {
    navData.superAlarmRiverOneNumber = "0";
    navData.superAlarmRiverTwoNumber = "0";
    navData.superAlarmRiverThreeNumber = "0";
    navData.superAlarmRiverFourNumber = "0";
    navData.superAlarmRiverFiveNumber = "0";
    loading.value=true;
    let param = {adcd: adcd, start: startTime, end: navData.endTime, sttypes: sttypes}
    const apiParam = { ...currentFilter, ...param }
    store.api.from("water.river.data", apiParam).then((res: any) => {
      if (res) {
        navData.superAlarmRiverOneNumber = res.total;
        navData.superAlarmRiverTwoNumber = res.overHistoryMax;
        navData.superAlarmRiverThreeNumber = res.overGraz;
        navData.superAlarmRiverFourNumber = res.overWarnz;
        navData.superAlarmRiverFiveNumber = res.overInundate;
      }
    }).catch((error: any) => {
      Lookup.store.notify({message: error});
    }).finally(()=>{
      loading.value=false;
    });
  };

  function onAction(model) {
    page.page = model.page;
    if (navData.tab == 1) {//全部列表
      onLoadAllRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea);
    } else if (navData.tab == 2) {//超警河道站列表
      onLoadWarningRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea, navData.wlevel)
    } else {//超起淹没列表
      onLoadInitiationRiverTable(page, navData.adcd, navData.motype, navData.checkbox, navData.searchKey, navData.defineArea, navData.wlevel)
    }
  }

  //播放触发事件，获取播放轴数据
  const onAddMapLayer = (index, provider, current) => {
    if (current == 'daily') {//日
      navData.startTime = provider.fields.start;
      navData.endTime = provider.fields.end;
    } else {
      navData.startTime = provider.fields.start;
      navData.endTime = provider.fields.end;
    }
    getTopContentData(navData.adcd, navData.startTime, navData.checkbox);
    getOnLoadTable();
  };
  const rowClick = ((e, target) => {
    const coords = [target.lgtd, target.lttd];
    useFlayTo(coords, {
      data: target,
      zoom:13,
      marker: {
        scale: 0.6,
        label: {text: target.stnm},
        image: `/images/layer-2d/${target.motype}/${target.wlevel || target.level || 0}.png`
      },
    })
  })
  onBeforeMount(() => {
    store.note.on("visual.playable.frame", onAddMapLayer);
  })
  onMounted(() => {
    navData.value = props.menu.label;
  });

  onBeforeUnmount(() => {
    store.note.un("visual.playable.frame", onAddMapLayer);
    onAreaClear();
    useMarkerClear();
  });
</script>

<template>
  <div class="module module-river super-alarm-river">
    <div class="title">
      <div class="fill-x-50 fill-y left">
        <span>{{navData.value}}</span>
      </div>
      <div class="fill-x-40 fill right">
        <div class="right-icon-color" @click="checkAllTopDetail">列表>></div>
      </div>
    </div>
    <!-- NOTE -->
    <div class="super-alarm-river-one">
      <div>
        <div class="top-content">
          <div class="message">
            <span class="message-span">{{navData.superAlarmRiverOne}}:<span
                class="content-color-font">{{navData.superAlarmRiverOneNumber}}</span></span>
            <span class="message-span">{{navData.superAlarmRiverTwo}}:<span
                class="content-color-font">{{navData.superAlarmRiverTwoNumber}}</span></span>
          </div>
          <div class="message">
            <span class="message-span">{{navData.superAlarmRiverThree}}:<span class="content-color-font">{{navData.superAlarmRiverThreeNumber}}</span></span>
            <span class="message-span">{{navData.superAlarmRiverFour}}:<span
                class="content-color-font">{{navData.superAlarmRiverFourNumber}}</span></span>
          </div>
        </div>
        <div class="top-content-bottom">
          <span class="message-span">{{navData.superAlarmRiverFive}}:<span
              class="content-color-font">{{navData.superAlarmRiverFiveNumber}}</span></span>
        </div>
      </div>
    </div>
    <!-- NOTE -->
    <div class="point-background-color"></div>
    <div class="super-alarm-center overflow-hidden">
      <template v-if="isSy">
        <SiteFilter @change="formValueChange" />
      </template>
      <template v-else>
        <div class="super-alarm-two-content h-box north fill-x one">
          <span class="title two">区域选择:</span>
          <div class="right-content">
            <AreaCascader style="width: 100%" v-model="selectedArea" @select="onAreaChange"></AreaCascader>
          </div>
        </div>
        <div class="super-alarm-two-content item h-box-vc fill-x">
          <span class="title">站点类型:</span>
          <div class="right-content">
            <q-option-group style="display: flex;justify-content: flex-start" type="checkbox"
              :options="navData.checkboxItems" v-model="navData.checkbox" @update:model-value="onCkeckBox" size="sm">
            </q-option-group>
          </div>
        </div>
      </template>
    </div>
    <div class="super-alarm-bottom">
      <q-tabs
          @update:model-value="onChangeTab"
          v-model="navData.tab"
          active-class="car-active-class"
      >
        <q-tab name="1" label="全部列表"/>
        <q-tab name="2" label="超警河道站列表"/>
        <q-tab name="3" label="超起淹水位列表"/>
      </q-tabs>
      <q-separator/>
      <q-tab-panels v-model="navData.tab" animated class="fill-90">
        <q-tab-panel name="1">
          <div style="display: flex;justify-content: space-between">
            <div class=" search-content">
              <span><q-input
                  placeholder="请输入搜索内容"
                  filled
                  v-model="navData.searchKey"
                  @update:model-value="getOnLoadTable"
                  dense
              >
                <template v-slot:append>
            <i class="icon iconfont icon-chazhao" @click="getOnLoadTable"></i>
          </template>
            </q-input></span>
            </div>
            <div class="right-icon-color" @click="checkAllDetail">
              <q-btn class="module-editor-btn dow-btn-bg" size="sm">查看详情</q-btn>
            </div>
          </div>
          <ec-table v-loading="loading" class="header-table table-height" :dimensions="riverAllColumns" :pagination="page" :source="sourceAll"
                    @update:page="onAction" @table:click="rowClick"></ec-table>
        </q-tab-panel>
        <q-tab-panel name="2">
          <div style="display: flex;justify-content: space-between">
            <div class=" search-content">
              <span><q-input
                  placeholder="请输入搜索内容"
                  filled
                  v-model="navData.searchKey"
                  @update:model-value="getOnLoadTable"
                  dense
              >
                <template v-slot:append>
            <i class="icon iconfont icon-chazhao" @click="getOnLoadTable"></i>
          </template>
            </q-input></span>
            </div>
            <div class="right-icon-color" @click="checkAllDetail">
              <q-btn class="module-editor-btn dow-btn-bg" size="sm">查看详情</q-btn>
            </div>
          </div>
          <ec-table v-loading="loading" class="header-table table-height" :dimensions="riverWarningColumns" :pagination="page" :source="sourceAll"
                    @update:page="onAction" @table:click="rowClick"></ec-table>
        </q-tab-panel>
        <q-tab-panel name="3">
          <div style="display: flex;justify-content: space-between">
            <div class=" search-content">
              <span><q-input
                  placeholder="请输入搜索内容"
                  filled
                  v-model="navData.searchKey"
                  @update:model-value="getOnLoadTable"
                  dense
              >
                <template v-slot:append>
            <i class="icon iconfont icon-chazhao" @click="getOnLoadTable"></i>
            </template>
            </q-input></span>
            </div>
            <div class="right-icon-color" @click="checkAllDetail">
              <q-btn class="module-editor-btn dow-btn-bg" size="sm">查看详情</q-btn>
            </div>
          </div>
          <ec-table v-loading="loading" ref="divRiverRef" class="header-table table-height" :dimensions="riverWarningColumns" :pagination="page" :source="sourceAll"
                    @update:page="onAction" @table:click="rowClick"></ec-table>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<style lang="scss">
  .module.module-river.super-alarm-river {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f0f2f5;

    .module-editor-btn {
      height: 35px;
      font-size: 16px;
      color: $menus-list-bg;
      width: 80px;
      min-width: 112px;
    }

    .q-tab {
      min-height: 42px !important;
    }
    .dow-btn-bg{
      background:$Secondary11;
      color: #fff;
    }
    .q-btn.disabled {
      margin: 0px 5px 0px 5px !important;

      &:before {
        box-shadow: none !important;
      }
    }

    .point-background-color {
      width: 100%;
      height: 12px;
    }

    .q-btn {
      min-width: 25px !important;
      padding: 1px !important;
    }

    .fill-90 {
      width: 100%;
      height: 100%;
    }

    .q-tab-panel {
      padding: 10px 0px !important;
    }

    .table-height {
      height: calc(100% - 110px) !important;
    }

    .h-box {
      display: flex;
    }

    .q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
      height: 35px !important;
    }

    .q-select--without-input .q-field__control {
      max-height: 40px !important;
      min-height: 40px !important;
    }

    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px !important;
      background: #fff;

      .left {
        display: flex;
        align-items: center;
        color: #1266ac;
        font-family: Source Han Sans CN;
        font-weight: bold;
        font-size: 20px;
      }

      .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;

        .right-icon-color {
          border-radius: 15px;
          height: 28px;
          display: flex;
          cursor: pointer;
          color: #82899C;
          font-size: 14px;
        }
      }
    }

    .super-alarm-river-one {
      width: 100%;
      height: 140px;
      color: #3B4252;
      background: #FFFFFF;
      font-size: 16px;

      .top-content {
        width: 100%;
        height: 100%;
        display: flex;

        .message {
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;

          .message-span {
            padding: 5px 0px 5px 0px;
            background: $neutral2;
            border-radius: 2px;
            margin: 5px 5px 5px 0px;
            font-size: 16px;
            text-indent: 10px;
          }
        }
      }

      .content {
        padding: 5px;
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
    }

    .top-content-bottom {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .message-span {
        padding: 5px 0px 5px 0px;
        background: $neutral2;
        border-radius: 2px;
        margin: 5px 5px 5px 0px;
        font-size: 16px;
        text-indent: 10px;
      }
    }

    .super-alarm-center {
      height: fit-content;
      overflow: auto;
      width: 100%;
      background: #FFFFFF;

      .super-alarm-two-content {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 40px;
        font-size: 16px;

        .v-input--selection-controls.v-input {
          flex: 1 !important;
        }

        .theme--light.v-label {
          color: #82899C !important;
          font-size: 16px !important;
          font-family: Source Han Sans CN !important;
          text-indent: 0px;
          white-space: nowrap;
        }

        .title {
          width: 95px;
          font-size: 16px !important;
          font-family: Source Han Sans CN !important;
        }

        .right-content {
          width: calc(100% - 100px);
          font-family: Source Han Sans CN !important;
          font-size: 16px !important;

          .q-gutter-x-sm {
            margin-left: -16px !important;
          }
        }

        .theme--light.v-input, .theme--light.v-input input, .theme--light.v-input textarea {
          color: #82899c !important;
        }

        .theme--light.v-icon {
          color: #D9D9D9;
        }
      }

      .show-no-data-content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100% - 70px);
        width: 100%;
        font-size: 20px;
        font-weight: 600;
      }

      .impact-content-button {
        align-items: center;
        flex-direction: column;
        padding: 5px;
      }

      .message-color {
        color: #ffffff;
      }

      .content-title {
        color: #FF811B
      }

      .content-button {
        padding: 2px 15px
      }

      .content-top-button {
        display: flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }

    .super-alarm-bottom {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      height: calc(100% - 265px);
      margin-top: 1px;
      cursor: pointer;

      .content-message {
        display: flex;
        justify-content: flex-end;
        position: absolute;
        right: 10px;
        margin-top: 8px;
        height: 24px;
        width: 120px;
        z-index: 999;
      }

      .click-jump-font {
        cursor: pointer;
        color: #2e81e5;
      }

      .super-alarm-bottom-table {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        height: calc(100%);
      }

      .content-add-message-data {
        right: 10px;
        color: #7E7E7E;
        z-index: 9;
      }
    }

    .search-content {
      padding-bottom: 5px;
      width: calc(100% - 90px);
    }
  }
</style>