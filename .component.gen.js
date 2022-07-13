import Vue from 'vue'
import AutoCompleteSearch from '@/components/AutoCompleteSearch.vue'
import DropZone from '@/components/DropZone.vue'
import FileViewer from '@/components/FileViewer.vue'
import Geosearch from '@/components/Geosearch.vue'
import Header from '@/components/Header.vue'
import Icon from '@/components/Icon.vue'
import ImagesUnliScroll from '@/components/ImagesUnliScroll.vue'
import Map from '@/components/Map.vue'
import Modal from '@/components/Modal.vue'
import ModalActions from '@/components/ModalActions.vue'
import Offline from '@/components/Offline.vue'
import OverlayLoader from '@/components/OverlayLoader.vue'
import ProfileEdit from '@/components/ProfileEdit.vue'
import SearchAddress from '@/components/SearchAddress.vue'
import SetupPermission from '@/components/SetupPermission.vue'
import Sidebar from '@/components/Sidebar.vue'
import Stepper from '@/components/Stepper.vue'
import ClientCompany from '@/components/client/ClientCompany.vue'
import ClientPerson from '@/components/client/ClientPerson.vue'
import ChartBase from '@/components/chart/Base.vue'
import Chart from '@/components/chart/Index.vue'
import ChartToggleButton from '@/components/chart/ToggleButton.vue'
import CoreCard from '@/components/core/CoreCard.vue'
import InventoriesAudit from '@/components/inventories/InventoriesAudit.vue'
import InventoriesAuditDialog from '@/components/inventories/InventoriesAuditDialog.vue'
import InventoriesAuditReport from '@/components/inventories/InventoriesAuditReport.vue'
import InventoriesGroupRack from '@/components/inventories/InventoriesGroupRack.vue'
import InventoriesIssue from '@/components/inventories/InventoriesIssue.vue'
import InventoriesRack from '@/components/inventories/InventoriesRack.vue'
import InventoriesTable from '@/components/inventories/InventoriesTable.vue'
import DashboardHeadCharts from '@/components/dashboard/DashboardHeadCharts.vue'
import DashboardHeadChartsExpenses from '@/components/dashboard/DashboardHeadChartsExpenses.vue'
import DashboardHeadChartsFirst from '@/components/dashboard/DashboardHeadChartsFirst.vue'
import DashboardHeadChartsOrders from '@/components/dashboard/DashboardHeadChartsOrders.vue'
import DashboardHeadChartsQuota from '@/components/dashboard/DashboardHeadChartsQuota.vue'
import DashboardHeadChartsSales from '@/components/dashboard/DashboardHeadChartsSales.vue'
import DashboardInventoryChart from '@/components/dashboard/DashboardInventoryChart.vue'
import DashboardInventoryTopRank from '@/components/dashboard/DashboardInventoryTopRank.vue'
import DashboardLinks from '@/components/dashboard/DashboardLinks.vue'
import DashboardSalesTopRankChart from '@/components/dashboard/DashboardSalesTopRankChart.vue'
import NavCardActionLink from '@/components/nav/CardActionLink.vue'
import NavTabLink from '@/components/nav/TabLink.vue'
import UsersGroupPermission from '@/components/users/UsersGroupPermission.vue'
import UsersPermission from '@/components/users/UsersPermission.vue'
import TableCRUD from '@/components/table/CRUD.vue'
import TableConfirmation from '@/components/table/Confirmation.vue'
import TableDataInput from '@/components/table/DataInput.vue'
import TableDataPagination from '@/components/table/DataPagination.vue'
import TableDataView from '@/components/table/DataView.vue'
import TableDrawer from '@/components/table/Drawer.vue'
import TableField from '@/components/table/Field.vue'
import TableForm from '@/components/table/Form.vue'
import TableGridView from '@/components/table/GridView.vue'
import TableHeader from '@/components/table/Header.vue'
import TableInput from '@/components/table/Input.vue'
import TableNestedMenu from '@/components/table/NestedMenu.vue'
import TableRefreshButton from '@/components/table/RefreshButton.vue'
import TableSimple from '@/components/table/Simple.vue'
import TableTreeView from '@/components/table/TreeView.vue'
import TimekeeperFaceRegistration from '@/components/timekeeper/FaceRegistration.vue'
import TimekeeperIconCards from '@/components/timekeeper/IconCards.vue'
import TimekeeperSettings from '@/components/timekeeper/Settings.vue'
import TimekeeperStepper from '@/components/timekeeper/Stepper.vue'
import TimekeeperTable from '@/components/timekeeper/Table.vue'
import TimekeeperWebcam from '@/components/timekeeper/Webcam.vue'
import BranchTerminalSetup from '@/components/branch/terminal/BranchTerminalSetup.vue'
import ChartCollectionDashboard from '@/components/chart/collection/Dashboard.vue'
import ChartCollectionProduct from '@/components/chart/collection/Product.vue'
import InventoriesAuditAmend from '@/components/inventories/Audit/InventoriesAuditAmend.vue'
import InventoriesAuditInvestigation from '@/components/inventories/Audit/InventoriesAuditInvestigation.vue'
import InventoriesAuditRackCard from '@/components/inventories/Audit/InventoriesAuditRackCard.vue'
import InventoriesAuditRackGroupCard from '@/components/inventories/Audit/InventoriesAuditRackGroupCard.vue'
import ProductCharacteristic from '@/components/product/characteristic/ProductCharacteristic.vue'
import ProductCharacteristicGroup from '@/components/product/characteristic/ProductCharacteristicGroup.vue'
import ProductPriceList from '@/components/product/pricelist/ProductPriceList.vue'
import ProductPriceListAdjusment from '@/components/product/pricelist/ProductPriceListAdjusment.vue'
import ProductPriceListPriceGroup from '@/components/product/pricelist/ProductPriceListPriceGroup.vue'
import ProductPriceListPriceGroupDetails from '@/components/product/pricelist/ProductPriceListPriceGroupDetails.vue'
import ProductPriceListSetup from '@/components/product/pricelist/ProductPriceListSetup.vue'

Vue.component('AutoCompleteSearch', AutoCompleteSearch)
Vue.component('LazyAutoCompleteSearch', AutoCompleteSearch)
Vue.component('DropZone', DropZone)
Vue.component('LazyDropZone', DropZone)
Vue.component('FileViewer', FileViewer)
Vue.component('LazyFileViewer', FileViewer)
Vue.component('Geosearch', Geosearch)
Vue.component('LazyGeosearch', Geosearch)
Vue.component('Header', Header)
Vue.component('LazyHeader', Header)
Vue.component('Icon', Icon)
Vue.component('LazyIcon', Icon)
Vue.component('ImagesUnliScroll', ImagesUnliScroll)
Vue.component('LazyImagesUnliScroll', ImagesUnliScroll)
Vue.component('Map', Map)
Vue.component('LazyMap', Map)
Vue.component('Modal', Modal)
Vue.component('LazyModal', Modal)
Vue.component('ModalActions', ModalActions)
Vue.component('LazyModalActions', ModalActions)
Vue.component('Offline', Offline)
Vue.component('LazyOffline', Offline)
Vue.component('OverlayLoader', OverlayLoader)
Vue.component('LazyOverlayLoader', OverlayLoader)
Vue.component('ProfileEdit', ProfileEdit)
Vue.component('LazyProfileEdit', ProfileEdit)
Vue.component('SearchAddress', SearchAddress)
Vue.component('LazySearchAddress', SearchAddress)
Vue.component('SetupPermission', SetupPermission)
Vue.component('LazySetupPermission', SetupPermission)
Vue.component('Sidebar', Sidebar)
Vue.component('LazySidebar', Sidebar)
Vue.component('Stepper', Stepper)
Vue.component('LazyStepper', Stepper)
Vue.component('ClientCompany', ClientCompany)
Vue.component('LazyClientCompany', ClientCompany)
Vue.component('ClientPerson', ClientPerson)
Vue.component('LazyClientPerson', ClientPerson)
Vue.component('ChartBase', ChartBase)
Vue.component('LazyChartBase', ChartBase)
Vue.component('Chart', Chart)
Vue.component('LazyChart', Chart)
Vue.component('ChartToggleButton', ChartToggleButton)
Vue.component('LazyChartToggleButton', ChartToggleButton)
Vue.component('CoreCard', CoreCard)
Vue.component('LazyCoreCard', CoreCard)
Vue.component('InventoriesAudit', InventoriesAudit)
Vue.component('LazyInventoriesAudit', InventoriesAudit)
Vue.component('InventoriesAuditDialog', InventoriesAuditDialog)
Vue.component('LazyInventoriesAuditDialog', InventoriesAuditDialog)
Vue.component('InventoriesAuditReport', InventoriesAuditReport)
Vue.component('LazyInventoriesAuditReport', InventoriesAuditReport)
Vue.component('InventoriesGroupRack', InventoriesGroupRack)
Vue.component('LazyInventoriesGroupRack', InventoriesGroupRack)
Vue.component('InventoriesIssue', InventoriesIssue)
Vue.component('LazyInventoriesIssue', InventoriesIssue)
Vue.component('InventoriesRack', InventoriesRack)
Vue.component('LazyInventoriesRack', InventoriesRack)
Vue.component('InventoriesTable', InventoriesTable)
Vue.component('LazyInventoriesTable', InventoriesTable)
Vue.component('DashboardHeadCharts', DashboardHeadCharts)
Vue.component('LazyDashboardHeadCharts', DashboardHeadCharts)
Vue.component('DashboardHeadChartsExpenses', DashboardHeadChartsExpenses)
Vue.component('LazyDashboardHeadChartsExpenses', DashboardHeadChartsExpenses)
Vue.component('DashboardHeadChartsFirst', DashboardHeadChartsFirst)
Vue.component('LazyDashboardHeadChartsFirst', DashboardHeadChartsFirst)
Vue.component('DashboardHeadChartsOrders', DashboardHeadChartsOrders)
Vue.component('LazyDashboardHeadChartsOrders', DashboardHeadChartsOrders)
Vue.component('DashboardHeadChartsQuota', DashboardHeadChartsQuota)
Vue.component('LazyDashboardHeadChartsQuota', DashboardHeadChartsQuota)
Vue.component('DashboardHeadChartsSales', DashboardHeadChartsSales)
Vue.component('LazyDashboardHeadChartsSales', DashboardHeadChartsSales)
Vue.component('DashboardInventoryChart', DashboardInventoryChart)
Vue.component('LazyDashboardInventoryChart', DashboardInventoryChart)
Vue.component('DashboardInventoryTopRank', DashboardInventoryTopRank)
Vue.component('LazyDashboardInventoryTopRank', DashboardInventoryTopRank)
Vue.component('DashboardLinks', DashboardLinks)
Vue.component('LazyDashboardLinks', DashboardLinks)
Vue.component('DashboardSalesTopRankChart', DashboardSalesTopRankChart)
Vue.component('LazyDashboardSalesTopRankChart', DashboardSalesTopRankChart)
Vue.component('NavCardActionLink', NavCardActionLink)
Vue.component('LazyNavCardActionLink', NavCardActionLink)
Vue.component('NavTabLink', NavTabLink)
Vue.component('LazyNavTabLink', NavTabLink)
Vue.component('UsersGroupPermission', UsersGroupPermission)
Vue.component('LazyUsersGroupPermission', UsersGroupPermission)
Vue.component('UsersPermission', UsersPermission)
Vue.component('LazyUsersPermission', UsersPermission)
Vue.component('TableCRUD', TableCRUD)
Vue.component('LazyTableCRUD', TableCRUD)
Vue.component('TableConfirmation', TableConfirmation)
Vue.component('LazyTableConfirmation', TableConfirmation)
Vue.component('TableDataInput', TableDataInput)
Vue.component('LazyTableDataInput', TableDataInput)
Vue.component('TableDataPagination', TableDataPagination)
Vue.component('LazyTableDataPagination', TableDataPagination)
Vue.component('TableDataView', TableDataView)
Vue.component('LazyTableDataView', TableDataView)
Vue.component('TableDrawer', TableDrawer)
Vue.component('LazyTableDrawer', TableDrawer)
Vue.component('TableField', TableField)
Vue.component('LazyTableField', TableField)
Vue.component('TableForm', TableForm)
Vue.component('LazyTableForm', TableForm)
Vue.component('TableGridView', TableGridView)
Vue.component('LazyTableGridView', TableGridView)
Vue.component('TableHeader', TableHeader)
Vue.component('LazyTableHeader', TableHeader)
Vue.component('TableInput', TableInput)
Vue.component('LazyTableInput', TableInput)
Vue.component('TableNestedMenu', TableNestedMenu)
Vue.component('LazyTableNestedMenu', TableNestedMenu)
Vue.component('TableRefreshButton', TableRefreshButton)
Vue.component('LazyTableRefreshButton', TableRefreshButton)
Vue.component('TableSimple', TableSimple)
Vue.component('LazyTableSimple', TableSimple)
Vue.component('TableTreeView', TableTreeView)
Vue.component('LazyTableTreeView', TableTreeView)
Vue.component('TimekeeperFaceRegistration', TimekeeperFaceRegistration)
Vue.component('LazyTimekeeperFaceRegistration', TimekeeperFaceRegistration)
Vue.component('TimekeeperIconCards', TimekeeperIconCards)
Vue.component('LazyTimekeeperIconCards', TimekeeperIconCards)
Vue.component('TimekeeperSettings', TimekeeperSettings)
Vue.component('LazyTimekeeperSettings', TimekeeperSettings)
Vue.component('TimekeeperStepper', TimekeeperStepper)
Vue.component('LazyTimekeeperStepper', TimekeeperStepper)
Vue.component('TimekeeperTable', TimekeeperTable)
Vue.component('LazyTimekeeperTable', TimekeeperTable)
Vue.component('TimekeeperWebcam', TimekeeperWebcam)
Vue.component('LazyTimekeeperWebcam', TimekeeperWebcam)
Vue.component('BranchTerminalSetup', BranchTerminalSetup)
Vue.component('LazyBranchTerminalSetup', BranchTerminalSetup)
Vue.component('ChartCollectionDashboard', ChartCollectionDashboard)
Vue.component('LazyChartCollectionDashboard', ChartCollectionDashboard)
Vue.component('ChartCollectionProduct', ChartCollectionProduct)
Vue.component('LazyChartCollectionProduct', ChartCollectionProduct)
Vue.component('InventoriesAuditAmend', InventoriesAuditAmend)
Vue.component('LazyInventoriesAuditAmend', InventoriesAuditAmend)
Vue.component('InventoriesAuditInvestigation', InventoriesAuditInvestigation)
Vue.component('LazyInventoriesAuditInvestigation', InventoriesAuditInvestigation)
Vue.component('InventoriesAuditRackCard', InventoriesAuditRackCard)
Vue.component('LazyInventoriesAuditRackCard', InventoriesAuditRackCard)
Vue.component('InventoriesAuditRackGroupCard', InventoriesAuditRackGroupCard)
Vue.component('LazyInventoriesAuditRackGroupCard', InventoriesAuditRackGroupCard)
Vue.component('ProductCharacteristic', ProductCharacteristic)
Vue.component('LazyProductCharacteristic', ProductCharacteristic)
Vue.component('ProductCharacteristicGroup', ProductCharacteristicGroup)
Vue.component('LazyProductCharacteristicGroup', ProductCharacteristicGroup)
Vue.component('ProductPriceList', ProductPriceList)
Vue.component('LazyProductPriceList', ProductPriceList)
Vue.component('ProductPriceListAdjusment', ProductPriceListAdjusment)
Vue.component('LazyProductPriceListAdjusment', ProductPriceListAdjusment)
Vue.component('ProductPriceListPriceGroup', ProductPriceListPriceGroup)
Vue.component('LazyProductPriceListPriceGroup', ProductPriceListPriceGroup)
Vue.component('ProductPriceListPriceGroupDetails', ProductPriceListPriceGroupDetails)
Vue.component('LazyProductPriceListPriceGroupDetails', ProductPriceListPriceGroupDetails)
Vue.component('ProductPriceListSetup', ProductPriceListSetup)
Vue.component('LazyProductPriceListSetup', ProductPriceListSetup)
