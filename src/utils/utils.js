export const arrayIntersection = (arr1, arr2)=>{
    if(arr1===null) return arr2;
    if(arr2===null) return arr1;
    let commonItems = arr1.filter(function(arr1Item) {
        return arr2.indexOf(arr1Item) !== -1;
    });

    return commonItems;
}