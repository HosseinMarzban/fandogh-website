import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import wizard from './wizard'
const createStore = () => {
  return new Vuex.Store({
    state: () => {
      return {
        sidebar: 0,
        modals: {
          login: false,
          register: false,
          forgot_password: false,
          message: false,
          recovery:false
        },
        message: '',
        progress: 0,
        services: null,
        user:{
          token: null
        },
        images: null,
        versions: null,
        builds: null,
        domains: null,
        manifest: {},
        plan: null
      }
    },
    actions: actions,
    mutations: mutations,
    modules:{
      wizard
    }
  })
}

export default createStore