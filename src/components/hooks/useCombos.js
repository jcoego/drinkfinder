import axios from 'axios';
import { getUrl } from '../../assets/config';

const useCombos = async (actionsCombosProvider)=>{
 let categories =[];
 let glasses = [];
 let ingredients=[];
 let alcoholic = [];
 try{
    categories = await axios.get(`${getUrl()}/list.php?c=list`);
    glasses = await axios.get(`${getUrl()}/list.php?g=list`);
    ingredients = await axios.get(`${getUrl()}/list.php?i=list`);
    alcoholic = await axios.get(`${getUrl()}/list.php?a=list`);
    if(categories){
        actionsCombosProvider.setCategories(categories)
    }
    if(glasses){
        actionsCombosProvider.setGlasses()
    }

 }catch(err){
    throw err;
 }

}