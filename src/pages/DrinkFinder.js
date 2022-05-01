import { useContext } from "react";
import DrinkFinderSearchView from "../components/drinkfinder/DrinkFinderSearchView";
import { CombosContext } from "../components/providers/CombosProviders";
import useDrinkFinder  from '../components/drinkfinder/useDrinkFinder';
import QueryWrapper from "../components/common/QueryWrapper";
import DrinkFinderResultsView from "../components/drinkfinder/DrinkFinderResultsView";
import DrinkFinderModalDetails from "../components/drinkfinder/DrinkFinderModalDetails";
import DrinkFinderAppBar from "../components/drinkfinder/DrinkFinderAppBar";

const DrinkFinder = ()=>{

  const [combosState] = useContext(CombosContext);
  const [combos, searchFields,{onChangeSearchFields,onClickSearchFields, onClickDetails, onCloseDetails},
    {loading, error, result},
    {openDetails, drinkDetails}
  ] = useDrinkFinder(combosState);

  return <div>
    <DrinkFinderModalDetails 
      open={openDetails}
      drink={drinkDetails}
      handleClose={e => onCloseDetails()}
    />
     <DrinkFinderAppBar title={'DRINK FINDER'} />
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
       <DrinkFinderResultsView drinks={result} onClick={drink => onClickDetails(drink)} />
    </QueryWrapper>
  </div>


}

export default DrinkFinder;