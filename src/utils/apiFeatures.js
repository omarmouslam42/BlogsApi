

export class ApiFeatures{
    constructor(mongooseQuery,queryData){
        this.mongooseQuery=mongooseQuery;
        this.queryData=queryData;
    }
    pagination=(model)=>{
        let page = Number(this.queryData.page)
        let size = Number(this.queryData.size)
        if(page <= 0 || !page) page= 1
        if(size <= 0 || !size) size= 6
         const skip = size * (page - 1 )
         this.mongooseQuery.skip(skip).limit(size)
         model.countDocuments().then(value=>{
            this.queryData.productsCount= value;
            this.queryData.pages= Math.ceil(value / size);
            if (this.queryData.pages > page) {
                this.queryData.next= Number(page+1)
            }
            if (page > 1) {
                this.queryData.previous= Number(page-1)
            }

         } )
       
         return this
    }

    filter=()=>{
        const exluded= ["sort","page","size","fields","searhKey"]
        let newQuey= {...this.queryData}
        exluded.forEach(ele=>{
            delete newQuey[ele]
        })
        newQuey= JSON.stringify(newQuey).replace( /lte|lt|gte|gt/g , match=> `$${match}`)
        newQuey= JSON.parse(newQuey)
        this.mongooseQuery.find(newQuey)
        return this
    }

    sort=()=>{
        if (this.queryData.sort) {
            this.mongooseQuery.sort(this.queryData.sort.replace(/,/g,' '))
        }
        return this
    } 

    search=()=>{
        if (this.queryData.searchKey) {
            this.mongooseQuery.find({
                $or:[
                    {name:{ $regex: this.queryData.searchKey}},
                    {description: { $regex: this.queryData.searchKey}}
                ]
            })
        }
       
        return this
    }

    select =()=>{
        if (this.queryData.fields) {
        this.mongooseQuery.select(this.queryData.fields.replace(/,/g,' '))
        }
        return this
    }

}