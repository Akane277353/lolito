import {ItemService} from "@/stores/items-store/items.service";
import { defineStore } from "pinia";


export const useItemsStore = defineStore('useItemsStore',{
    state: ()  => ({
        items: [], 
        categories: [],
    }),
    getters: {
        getItems: (state) => state.items,
        getCategories: (state) => state.categories,
    },
    actions: {
        async getAllItems(){
            this.items = await ItemService.getAllItems()
        },

        async searchItem(search, category){
            this.items = await ItemService.searchItem(search, category)
        },

        async getAllCategories(){
            this.categories = await ItemService.getCategories()
        }
    }
})