

exports.FormateDuration = (data)=>{
    const hrs = Math.floor(data / 3600);
    const mins = Math.floor((data % 3600) / 60 );
    const secs = Math.floor(data % 60);

    if(hrs > 0){
        return `${hrs}hrs ${mins.toString().padStart(2,"0")}min ${secs.toString().padStart(2, "0")}sec`
    }
    return `${mins.toString().padStart(2,"0")}min ${secs.toString().padStart(2, "0")}sec`
}