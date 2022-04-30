import { useContext } from "react";
import DrinkFinderSearchView from "../components/drinkfinder/DrinkFinderSearchView";
import { CombosContext } from "../components/providers/CombosProviders";
import useDrinkFinder  from '../components/drinkfinder/useDrinkFinder'

const DrinkFinder = ()=>{

  const [combosState] = useContext(CombosContext);
  const [combos, searchFields,{onChangeSearchFields}] = useDrinkFinder(combosState);

  
  return <div>
    <DrinkFinderSearchView
      comboCategories={combos.categories}
      comboGlasses={combos.glasses}
      comboIngredients={combos.ingredients}
      comboAlcoholic={combos.alcoholic}
      category={searchFields.category}
      glass={searchFields.glass}
      ingredient={searchFields.ingredient} 
      alcoholic={searchFields.alcoholic}
      name= {searchFields.name}
      onChange = {onChangeSearchFields}
    />
  </div>


}

export default DrinkFinder;