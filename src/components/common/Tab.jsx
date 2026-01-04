

export default function Tab({tabdata, accountType, setAccountType}){
    // console.log("print field as account Type inside Tab",accountType);
    // console.log();
    return(

        <div className="bg-richblack-800 rounded-full border-b-[1px] border-richblack-600 flex flex-row gap-x-4 py-1 px-2"
            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
        >
            {
                tabdata.map( (tab)=>(
                    <button
                        key={tabdata.id}
                        onClick={()=> setAccountType(tab.type)}
                        className={`${
                            accountType ===tab.type ?
                            "bg-richblack-900 rounded-full px-2 py-1 text-pure-greys-200 transition-all duration-300":
                            "bg-richblack-800 rounded-full px-2 py-1 text-pure-greys-200"
                            
                        } bg-richblack`}
                    >
                        {tab?.tabName}
                        
                    </button>
                ) )
            }
        </div>
        
    );

}