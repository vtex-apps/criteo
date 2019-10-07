import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'
import { fetchEmail, getSiteType } from './helpers'

async function dispatchEvent(event: CriteoQ) {
  const { criteo_q = [], criteo_id: account } = window
  const setAccount: CriteoAccountEvent = { event: 'setAccount', account }
  const setEmail: CriteoEmailEvent = {
    event: 'setEmail',
    email: [await fetchEmail()],
  }
  const setSiteType: CriteoSiteTypeEvent = {
    event: 'setSiteType',
    type: getSiteType(),
  }
  criteo_q.push(setAccount, setEmail, setSiteType, event)
}

function handleMessages(event: PixelMessage) {
  const { criteo_q = [], criteo_id: account } = window
  if (!account) return

  switch (event.data.eventName) {
    case 'vtex:pageInfo': {
      if (event.data.eventType === 'homeView') {
        const setHomeView: CriteoViewHomeEvent = {
          event: 'viewHome',
          tms: 'gtm-vtex',
        }
        dispatchEvent(setHomeView)
      }
      break
    }
    case 'vtex:departmentView':
    case 'vtex:internalSiteSearchView':
    case 'vtex:categoryView': {
      const {
        data: { products },
      } = event
      const item: string[] = products
        .slice(0, 3)
        .map<string>(({ productId }) => productId)
      const setViewList: CriteoViewListEvent = {
        event: 'viewList',
        tms: 'gtm-vtex',
        item,
      }
      dispatchEvent(setViewList)
      break
    }
    case 'vtex:productView': {
      const {
        data: {
          product: { productId },
        },
      } = event
      const setViewItem: CriteoViewItemEvent = {
        event: 'viewItem',
        tms: 'gtm-vtex',
        item: productId,
      }
      dispatchEvent(setViewItem)
      break
    }
    case 'vtex:orderPlaced': {
      const {
        data: { transactionId, transactionProducts },
      } = event

      const item: CriteoTrackTransactionItem[] = transactionProducts.map<
        CriteoTrackTransactionItem
      >(({ id, sellingPrice, quantity }) => ({
        id,
        price: sellingPrice,
        quantity,
      }))

      const setTrackTransaction: CriteoTrackTransactionEvent = {
        event: 'trackTransaction',
        id: transactionId,
        tms: 'gtm-vtex',
        item,
      }

      dispatchEvent(setTrackTransaction)
      break
    }
    default:
      break
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleMessages)
}
