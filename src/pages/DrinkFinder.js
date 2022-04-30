import { useContext } from "react";
import DrinkFinderSearchView from "../components/drinkfinder/DrinkFinderSearchView";
import { CombosContext } from "../components/providers/CombosProviders";
import useDrinkFinder  from '../components/drinkfinder/useDrinkFinder';
import QueryWrapper from "../components/common/QueryWrapper";

const DrinkFinder = ()=>{

  const [combosState] = useContext(CombosContext);
  const [combos, searchFields,{onChangeSearchFields,onClickSearchFields},
    {loading, error, result}] = useDrinkFinder(combosState);

  console.log('res', error, result)
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
      onClick= {onClickSearchFields}
    />

    <QueryWrapper loading={loading} error = {error} result={result}>

    </QueryWrapper>

  </div>


}

export default DrinkFinder;