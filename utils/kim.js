const kim={
    fName:'Kim',
    lName:'Kardashian',
    age:40,
    children:['North','Saint','Chicago','Psalm'],
    address:{
        street:'123 Main St',
        city:'Los Angeles',
        state:'CA'
    },
    fullName:function(){
        return `${this.fName} ${this.lName}`
    }
}


module.exports=kim