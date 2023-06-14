/*
 * @Description: 按需引入element-ui
 * @Date: 2021-06-01 15:10:03 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-02 02:16:31 +0800
 * @LastEditors: JackChou
 */
import 'element-ui/lib/theme-chalk/index.css'
// import { Button } from 'element-ui'
import {
  // 表单
  Form,
  FormItem,
  DatePicker,
  TimeSelect,
  TimePicker,
  Input,
  Autocomplete,
  InputNumber,
  Button,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  ButtonGroup,
  Upload,
  Image,
  Rate,
  // Slider,
  // ColorPicker,
  // 侧边栏
  // Menu,
  // Submenu,
  // MenuItem,
  // MenuItemGroup,

  // 表格相关
  // Table,
  // Row,
  // Col,
  // TableColumn,
  // Pagination,
  // Progress,
  // Badge,
  // Tooltip,
  // Tag,
  // layout
  Container,
  Footer,
  Main,
  Header,
  Aside,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  Card,
  TabPane,
  Tree,
  // Notice
  // Dialog,
  // MessageBox,
  // Message,
  // Alert,
  // Loading,
  // Notification,

  // 其他
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  // Popover,
  // Icon,
  // Spinner,
  // Steps,
  // Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  // Cascader,
  // Transfer,
  // Timeline,
  // TimelineItem,
  // Link,
  // Divider,
  // Calendar,
  // Backtop,
  // PageHeader,
  // CascaderPanel,
} from 'element-ui'
const formComponents = [
  Form,
  FormItem,
  Upload,
  Image,
  Rate,
  Button,
  Input,
  InputNumber,
  Autocomplete,
  Button,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  ButtonGroup,
  DatePicker,
  TimeSelect,
  TimePicker,
]
// const dataComponents = [
//   Table,
//   Row,
//   Col,
//   TableColumn,
//   Tabs,
//   TabPane,
//   Pagination,
//   Card,
//   Progress,
//   Badge,
//   Tooltip,
//   Tree,
//   Tag,
// ]
const layoutComponents = [Container, Footer, Main, Header, Breadcrumb, BreadcrumbItem, Card, Tree, Tabs, TabPane, Aside]
// const noticeComponents = [Dialog, MessageBox, Message, Alert, Loading, Notification]

// const menuComponents = [Menu, Submenu, MenuItem, MenuItemGroup]

const allComponents = [
  ...formComponents,
  // ...dataComponents,
  ...layoutComponents,
  // ...menuComponents,
  // ...noticeComponents,
]

const elComponents = {
  install(Vue, elementOptions = { size: 'small', zIndex: 3000 }) {
    Vue.prototype.$ELEMENT = { ...elementOptions, size: 'small', zIndex: 3000 }
    try {
      allComponents.forEach(component => {
        Vue.use(component)
        // if (!component.name) {
        //   // 跳出 forEach 的技巧
        //   throw new Error('组件必须提供名字，并且使用大驼峰式命名')
        // } else {
        //   Vue.component(component.name, component)
        // }
      })
    } catch (error) {
      console.error(error)
    }
  },
}

export default elComponents
