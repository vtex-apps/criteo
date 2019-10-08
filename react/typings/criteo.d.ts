type CriteoQ =
  | CriteoAccountEvent
  | CriteoSiteTypeEvent
  | CriteoEmailEvent
  | CriteoTrackTransactionEvent
  | CriteoViewHomeEvent
  | CriteoViewItemEvent
  | CriteoViewListEvent

interface CriteoEvent {
  event: string
}

interface CriteoAccountEvent extends CriteoEvent {
  event: 'setAccount'
  account: string
}

interface CriteoSiteTypeEvent extends CriteoEvent {
  event: 'setSiteType'
  type: 'm' | 't' | 'd'
}

interface CriteoEmailEvent extends CriteoEvent {
  event: 'setEmail'
  email: string[]
}

interface CriteoPixelEvent {
  tms: 'gtm-vtex'
}

interface CriteoViewHomeEvent extends CriteoEvent, CriteoPixelEvent {
  event: 'viewHome'
}

interface CriteoViewListEvent extends CriteoEvent, CriteoPixelEvent {
  event: 'viewList'
  item: string[]
}

interface CriteoViewItemEvent extends CriteoEvent, CriteoPixelEvent {
  event: 'viewItem'
  item: string
}

interface CriteoTrackTransactionEvent extends CriteoEvent, CriteoPixelEvent {
  event: 'trackTransaction'
  id: string
  item: CriteoTrackTransactionItem[]
}

interface CriteoTrackTransactionItem {
  id: string
  price: number
  quantity: number
}
