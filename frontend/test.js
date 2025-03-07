function primenumber(n){
    if(n%2===0) return false;
    for(let i=3;i<n;i+=2){
        if(n%i===0) return false;
    }
    return true;
}

function prime(n){
    let count=0;
    for(let i=2;i<=n;i++){
        if(primenumber(i)) count++;
    }
    return count;
 }


function findSumPairs(arr,value){
    const existing={}
    const output={}

    for(let i=0;i<arr.length;i++){
        const targetValue=arr[i]-value;
        if(existing[targetValue]){
            output.push(arr[i],targetValue)
        }
        existing[arr[i]]=true
    }

    return output;

}

findSumPairs([2,4,5,1,0,6,-1],5)