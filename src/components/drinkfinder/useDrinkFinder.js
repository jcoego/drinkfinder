import axios from "axios"
import { useEffect, useState } from "react";
import { getUrl } from "../../utils/config";


const transformComboData = (combos) =>{
    let {categories, glasses, ingredients, alcoholic} = combos ? combos : {}
    //sort combos and prepare them to be rendered
    categories = categories ? categories.sort((a,b)=>{
        return a.localeCompare(b)
      }).map(cat => {
        return {
          value: cat,
          name: cat
        }
      }) : []
    
      glasses = glasses ? glasses.sort((a,b)=>{
        return a.localeCompare(b)
      }).map(gl => {
        return {
          value: gl,
          name: gl
        }
      }) : []
    
      ingredients = ingredients ? ingredients.sort((a,b)=>{
        return a.localeCompare(b)
      }).map(ing => {
        return {
          value: ing,
          name: ing
        }
      }) : []
    
      alcoholic = alcoholic ? alcoholic.sort((a,b)=>{
        return a.localeCompare(b)
      }).map(alc => {
        return {
          value: alc,
          name: alc
        }
      }) : []

      //Add no selection: TODO
     /*  categories = [{value:'',name:'None'}, ...categories] */


    return {categories, glasses, ingredients, alcoholic}
}

const defaultSearchFields = {
    category:'',
    glass:'',
    ingredient:'', 
    alcoholic:'Non alcoholic',
    name:''
}

const useDrinkFinder = (combos)=>{
    let {categories, glasses, ingredients, alcoholic} = transformComboData(combos);
    let [searchFields, setSearchFields]= useState(defaultSearchFields);
    let [result, setResult] = useState([]);
    let [loading, setLoading] = useState(null);
    let [error, setError] = useState(null)

    const onChangeSearchFields = (data)=>{
      if(data.type==='alcoholic'){
        if(data.value==='Alcoholic'){
          setSearchFields({...searchFields,alcoholic:"Non alcoholic"})
        }else {
          setSearchFields({...searchFields,alcoholic:"Alcoholic"})
        }
        return
      }

      setSearchFields({...searchFields, [data.type]:data.value})
    }

    const onClickSearchFields = async ()=>{
      try{
        debugger
        setLoading(true);
        setError(null);
        setResult(null);
        let isQueryFromDb = false;
        let dataFromDatabase = []
        if(!searchFields.name && searchFields.alcoholic !=='Alcoholic' && 
          !searchFields.category && !searchFields.glass && !searchFields.ingredient){
            throw new Error('No filters Found. At least one filter is mandatory');
        }
        if(searchFields.name){
          dataFromDatabase = await axios.get(`${getUrl()}/search.php?s=${searchFields.name}`);
          dataFromDatabase = dataFromDatabase.data;
          isQueryFromDb = true;
        }
        if(searchFields.alcoholic==='Alcoholic'){
          if(isQueryFromDb){
            dataFromDatabase = dataFromDatabase.filter(data => data.strAlcoholic ==='Alcoholic')
          }else{
            dataFromDatabase = await axios.get(`${getUrl()}/filter.php?a=Alcoholic`);
            dataFromDatabase = dataFromDatabase.data;
            isQueryFromDb = true;
          }
        }
        if(searchFields.category){
          if(isQueryFromDb){
            dataFromDatabase = dataFromDatabase.filter(data => data.strCategory ===searchFields.category)
          }else{
            dataFromDatabase = await axios.get(`${getUrl()}/filter.php?c=${searchFields.category}`);
            dataFromDatabase = dataFromDatabase.data;
            isQueryFromDb = true;
          }
        }
        if(searchFields.glass){
          if(isQueryFromDb){
            dataFromDatabase = dataFromDatabase.filter(data => data.strCategory ===searchFields.glass)
          }else{
            dataFromDatabase = await axios.get(`${getUrl()}/filter.php?g=${searchFields.glass}`);
            dataFromDatabase = dataFromDatabase.data;
            isQueryFromDb = true;
          }
        }
        if(searchFields.ingredient){
          if(isQueryFromDb){
            dataFromDatabase = dataFromDatabase.filter(data => {
              for(let key in data){
                if(key.indexOf('strIngredient')!==-1 && data[key]===searchFields.ingredient){
                  return true;
                }
              }
              return false
            })
          }else{
            dataFromDatabase = await axios.get(`${getUrl()}/search.php?i=${searchFields.ingredient}`);
            dataFromDatabase = dataFromDatabase.data;
            isQueryFromDb = true;
          }
        }
        setResult(dataFromDatabase);
        setError(null)

      }catch(err){
        setError(err)
        setResult(null)

      } finally {
        setLoading(false)
      }
    }


    return [{categories, glasses, ingredients, alcoholic}, 
      searchFields, {onChangeSearchFields, onClickSearchFields},
      {loading, error, result}
    ]

}

export default useDrinkFinder;