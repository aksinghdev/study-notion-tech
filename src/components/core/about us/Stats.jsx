
const Stats = ()=>{

    const StatsData = [
        {count: "5K", lable: "Active Students"},
        {count: "10+", lable: "Mentors"},
        {count: "200+", lable: "Courses"},
        {count: "50+", lable: "Awards"},
    ];




    return(
        <div className=" w-full bg-richblack-800 p-5 border-[1px] border-richblack-700 mt-10 flex ">
            <div className="w-11/12 flex flex-row mx-auto items-center justify-evenly gap-0 ">
                {
                    StatsData.map((data,index)=>{
                        return(
                            <div key={index} className=" flex flex-col gap-1  max-w-fit w-full items-center justify-center">
                                <h1 className=" text-richblack-5 text-xl font-semibold">
                                    {data.count}
                                </h1>
                                <h2 className=" text-richblack-500 font-medium">
                                    {data.lable}
                                </h2>

                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default Stats;