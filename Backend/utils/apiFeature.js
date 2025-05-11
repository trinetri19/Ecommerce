class ApiFeature {
    constructor(query,queryStr){
        this.query = query,
        this.queryStr = queryStr
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                // i form insensitive 
                $options:"i"
            }
        } : {}
        console.log(keyword)
        this.query = this.query.find({...keyword})
        return this;
    }

    filter(){
        // queryCopy take the obj of queryStr
        const queryCopy = {...this.queryStr}
   
        // it romeve thes fields from the queryCopy 
        const removeFields = ["keyword","page","limit"]
        removeFields.forEach = (key)=>{
            delete queryCopy[key]
        }
       
        let queryStr = JSON.stringify(queryCopy);
        // querycopy is a obj it first convert into string then replace gt to $gt to apply filters and convert into json obj.
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)
       this.query = this.query.find(JSON.parse(queryStr));


       return this;
      
    }
    pagination(resultPerPage){
        
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
       }
}
module.exports = ApiFeature