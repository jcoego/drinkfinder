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
    alocholic:''
}

const useDrinkFinder = (combos)=>{
    let {categories, glasses, ingredients, alcoholic} = transformComboData(combos);
    let [searchFields, setSearchFields]= useState(defaultSearchFields);

    const onChangeSearchFields = (data)=>{
       setSearchFields({...searchFields, [data.type]:data.value})
    }


    return [{categories, glasses, ingredients, alcoholic}, searchFields, {onChangeSearchFields} ]

}

export default useDrinkFinder;