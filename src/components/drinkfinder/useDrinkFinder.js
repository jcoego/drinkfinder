import { useEffect, useState } from "react"


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

    return {categories, glasses, ingredients, alcoholic}
}

const defaultSearchFields = {
    category:'',
    glass:'',
    ingredient:'', 
    alcoholic:'Alcoholic',
    name:''
}

const useDrinkFinder = (combos)=>{
    let {categories, glasses, ingredients, alcoholic} = transformComboData(combos);
    let [searchFields, setSearchFields]= useState(defaultSearchFields);

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


    return [{categories, glasses, ingredients, alcoholic}, searchFields, {onChangeSearchFields} ]

}

export default useDrinkFinder;