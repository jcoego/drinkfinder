import axios from "axios"
import { useEffect, useState } from "react";
import { getUrl } from "../../utils/config";
import { arrayIntersection } from "../../utils/utils";


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

const defaultDrinkDetails = {
  openDrinkDetails: false,
  drinkDetails: {}
}

const useDrinkFinder = (combos)=>{
    let {categories, glasses, ingredients, alcoholic} = transformComboData(combos);
    let [searchFields, setSearchFields]= useState(defaultSearchFields);
    let [result, setResult] = useState([]);
    let [loading, setLoading] = useState(null);
    let [error, setError] = useState(null);
    let [drinkDetails, setDrinkDetails] = useState(defaultDrinkDetails);

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
        
        //initialize variables
        setLoading(true);
        setError(null);
        setResult(null);
        let filteredByName = null;
        let filteredByAlcoholic = null;
        let filteredByCategory = null;
        let filteredByGlass = null;
        let filteredByIngredient = null;
        if(!searchFields.name && searchFields.alcoholic !=='Alcoholic' && 
          !searchFields.category && !searchFields.glass && !searchFields.ingredient){
            throw new Error('No filters Found. At least one filter is mandatory');
        }
        //filter in database
        if(searchFields.name){
          filteredByName = await axios.get(`${getUrl()}/search.php?s=${searchFields.name}`);
          filteredByName = filteredByName && filteredByName.data ? filteredByName.data : [];
        }
        if(searchFields.alcoholic==='Alcoholic'){
          filteredByAlcoholic = await axios.get(`${getUrl()}/filter.php?a=Alcoholic`);
          filteredByAlcoholic = filteredByAlcoholic && filteredByAlcoholic.data ? filteredByAlcoholic.data : [];
        }
        if(searchFields.category){
        
          filteredByCategory = await axios.get(`${getUrl()}/filter.php?c=${searchFields.category}`);
          filteredByCategory = filteredByCategory && filteredByCategory.data ? filteredByCategory.data : [];
          
        }
        if(searchFields.glass){
          filteredByGlass = await axios.get(`${getUrl()}/filter.php?g=${searchFields.glass}`);
          filteredByGlass = filteredByGlass && filteredByGlass.data ? filteredByGlass.data : [];
        }
        if(searchFields.ingredient){
          filteredByIngredient = await axios.get(`${getUrl()}/search.php?i=${searchFields.ingredient}`);
          filteredByIngredient = filteredByIngredient && filteredByIngredient.data ? filteredByIngredient.data : [];
        }

        //transform arrays in array of ids.
        if (filteredByName) filteredByName =  filteredByName.drinks ? filteredByName.drinks.map(f => f.idDrink) : []
        if (filteredByAlcoholic) filteredByAlcoholic =  filteredByAlcoholic.drinks ? filteredByAlcoholic.drinks.map(f => f.idDrink) : []
        if (filteredByCategory) filteredByCategory = filteredByCategory.drinks ? filteredByCategory.drinks.map(f => f.idDrink) : []
        if (filteredByGlass) filteredByGlass =  filteredByGlass.drinks ? filteredByGlass.drinks.map(f => f.idDrink) : []
        if (filteredByIngredient) filteredByIngredient = filteredByIngredient.drinks ? filteredByIngredient.drinks.map(f => f.idDrink) : []
        
        //proccess received data to get common registers.
        let filteredResult = []
        filteredResult = arrayIntersection(filteredByName,filteredByAlcoholic);
        filteredResult = arrayIntersection(filteredResult,filteredByCategory);
        filteredResult = arrayIntersection(filteredResult,filteredByGlass);
        filteredResult = arrayIntersection(filteredResult,filteredByIngredient);
        filteredResult= filteredResult===null ? [] : filteredResult;

        //get drinks for id.
        let drinks = []
        for(let filteredResultId of filteredResult){
          let drink = await axios.get(`${getUrl()}/lookup.php?i=${filteredResultId}`);
          drink = drink && drink.data && drink.data.drinks && drink.data.drinks[0] ? drink.data.drinks[0] :  null;
          if(drink) drinks.push(drink);
        }
      
        setResult(drinks);
        setError(null)

      }catch(err){
        setError(err)
        setResult(null)

      } finally {
        setLoading(false)
      }
    }

    const onClickDetails = (drink)=>{
      setDrinkDetails({...drinkDetails, openDrinkDetails: true, drinkDetails: drink})
    }

    const onCloseDetails = ()=>{
      setDrinkDetails({...drinkDetails, openDrinkDetails: false, drinkDetails: {}})
    }

    return [{categories, glasses, ingredients, alcoholic}, 
      searchFields, {onChangeSearchFields, onClickSearchFields, onClickDetails, onCloseDetails},
      {loading, error, result}, 
      {openDetails: drinkDetails.openDrinkDetails, drinkDetails: drinkDetails.drinkDetails}
    ]

}

export default useDrinkFinder;