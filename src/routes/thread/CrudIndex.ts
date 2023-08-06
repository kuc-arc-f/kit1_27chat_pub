import LibPagenate from '$lib/LibPagenate';
import LibAuth from '$lib/LibAuth';
import HttpCommon from '$lib/HttpCommon';
//
const CrudIndex = {
  /**
   *
   * @param page: page number
   * @param perPage: 1 page count
   *
   * @return
   */      
  getPageList : async function(itemsAll: any, page: number, perPage: number) : Promise<any>
  {
    try{
      let items: any = [];
//console.log("page=", page);
//console.log("offset=", offset);
      const pinfo = LibPagenate.getPageStart(page, perPage);
console.log(pinfo);
      items = itemsAll.slice(pinfo.start, pinfo.end);
      return items;
    } catch (e) {
      console.error(e);
    }
  },
   
}
export default CrudIndex;
