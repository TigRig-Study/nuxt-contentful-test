/* eslint-disable import/no-mutable-exports */

import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Samples from '~/store/samples'
import BlogModule from '~/store/blogModule'

let samplesStore: Samples
let blogModule: BlogModule

function initializeStores(store: Store<any>): void {
  samplesStore = getModule(Samples, store)
  blogModule = getModule(BlogModule, store)
}

export { initializeStores, samplesStore, blogModule }
