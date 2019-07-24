import { routeList } from '~/router/index.js'

const state={
    isPad: document.documentElement.clientWidth<=992,
    isSidebarFold: document.documentElement.clientWidth<=992,
    routeList: routeList,
    tagsCacheList: [],
}
const mutations={
    changeSidebarFold(state) {
        state.isSidebarFold=!state.isSidebarFold;
    },
    hideSidebar(state) {
        state.isSidebarFold=true;
    },
    changePadStatus(state) {
        state.isPad=document.documentElement.clientWidth<=992;
        state.isSidebarFold=state.isPad ? true : false;
    },
    pushTagsCacheList(state, route) {
        if(!state.tagsCacheList.some(v=>route.path===v.path)){
            state.tagsCacheList.push(route);
        }
    },
    removeTags(state, path) {
        let len=state.tagsCacheList.length;
        for(let i=0;i<len;i++){
            if(state.tagsCacheList[i].path===path){
                state.tagsCacheList.splice(i,1);
                i--;
                break;
            }
        }
    },
    removeOtherTags(state, tagsMenuPath) {
        state.tagsCacheList=[state.tagsCacheList[tagsMenuPath.index]];
    },
    removeAllTags(state) {
        state.tagsCacheList=[];
    }
}
const actions={
    
}

export default {
    state,
    mutations,
    actions
}