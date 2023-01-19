How to use customValidator 

 install fetch-ts 
 working with npm 
 npm i node-fetch 
 if you are  using typescript you also need to install types
 npm i  @types/node-fetch

1) custom params will analyse each given field,if it is not in the list of ./reducer will return status 401,
if you want to costumize validations , you can go to actions.ts rewrite it or create another function and add it ./reducer function 

 CustomValidato:

2 ) by passing customValidator without params it will take any params and validate them (check-1)

 customValidator ()
 * no field are mandatory
 * but since they are passed they  will follow the common workflow
 
3) by passing params
 customValidator (true,"custom",["id","name"])
 * the first param must be a boolean = it will determine if fields will exist before validate it
 *the second param must be : "all" or "custom"
 all => will make all fields passed in the request to be exactly the ones passed in third param ,which is an array of field
 custom => will  make sure that the fields passed exist and allow more fields to be passed
 *third param must an array of string contenting the mandatory fields name
 

 using all
  ex:
    route.get( customValidator (true,"all",["id","firstName"])  (req,res)=>{
         res.json({msg:"okay)

    })


 request json 
  wrong
{
   "id":"1", 
   "name":"Brian", 
   "lastName":"Jones"
}

 response will be status 401, because "lastName" was not in param array, this "all" param makes sure that all fields passed are the 
 ones required.

correct 
{
   "id":"1", 
   "firstName":"Brian", 
}
 after checking the input's key it will validate each one of them individually

 Using "custom"
    ex:
    route.get( customValidator (true,"custom",["id","firstName"])  (req,res)=>{
         res.json({msg:"okay)
    })


 wrong 
 {

   "name":"Brian", 
   "isActive":true
}
  all  fields passed by the array param must be passed 

 correct 
{
   "id":"1", 
   "name":"Brian", 
   "isActive":true
}

by using "custom" only passed arrays fields are mandatory and it is allowed to add more fields, but remember 1)
only field treated created in actions.ts/js and passed to reducer.ts/js
 * it is also possible to use actions function in  the controller 


4) customCheckField middlewares works just like  customValidator,but it only validate existing fields rather than indiviual validations
 it receives two params

customCheckField("custom",["id"])
first param :"custom" or "all"  (check 3 )
second array of inputs to be check 