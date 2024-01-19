import instance from "@/axios/axios";


export class ItemService {
    
    static async getAllItems(){
        try {
            
            const response = await instance.get("/api/items");
            return response.data
        }catch (e) {
            return Promise.reject(e)
        }
    }

    static async searchItem(search, category){
        try {
            if(search == ""){
                search = " "
            }
            const response = await instance.get("/api/recherche/" + search + "/" + category);
            return response.data
        }catch (e) {
            return Promise.reject(e)
        }
    }

    static async getCategories(){
        try {
            const response = await instance.get("/api/categorieliste");
            return response.data
        }catch (e) {
            return Promise.reject(e)
        }
    }
    
}