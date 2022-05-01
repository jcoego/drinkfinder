import Loading from "./Loading"


const QueryWrapper = ({loading=false, error=null, result=null, children})=>{
    if(loading){
        return <Loading />
    }
    if(error){
        return <h1>An error has occurred. 
                <strong>{error.message ? error.message : 'Try again later!'}</strong>
            </h1>
    }
    if(result){
        return children;
    }
    return children;

}

export default QueryWrapper;