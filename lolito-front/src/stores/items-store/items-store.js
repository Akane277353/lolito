import {ItemService} from "@/stores/items-store/items.service";
import { defineStore } from "pinia";


export const useItemsStore = defineStore('useItemsStore',{
    state: ()  => ({
        items: [], 
    }),
    getters: {
        getItems: (state) => state.items,
    },
    actions: {
        async getAllItems(){
            this.items = await ItemService.getAllItems()
        }
    }
})