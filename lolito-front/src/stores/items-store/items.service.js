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
    
}