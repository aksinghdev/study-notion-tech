
import { useDropzone } from "react-dropzone"
import { useEffect, useRef, useState } from "react"
import { Player } from "video-react"
import { FaFileUpload } from "react-icons/fa";

export default function Upload({
    name,
    label,
    register,
    setValue,
    errors,
    video = false,
    viewData = null,
    editData = null
}){
    const [selectedFile, setSelectedFile] = useState(null)
    const[previewSource , setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
    )
    const inputRef = useRef(null)

    // to select a file from computer
    const onDrop = (acceptedFiles) =>{
        const file = acceptedFiles[0]
        if(file){
            previewFile(file)
            setSelectedFile(file)
        }
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept : !video ? {"image/*" : [".jpeg", ".jpg", ".png"]} : {"video/*" : [".mp4"]},
        onDrop
    })

    // file ko base64 me convert karna
    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () =>{
            setPreviewSource(reader.result);
        }
    }

    const handleBrowseClick = () =>{
        inputRef.current.click();
    }

    // for register the file in form
    useEffect( () => {
        register(name, {required : true})
    }, [register])

    // for update UI
    useEffect( ()=>{
        setValue(name,selectedFile)
    },[selectedFile, setValue]);

    return(
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor={name}>
                {label} {!viewData && <sup className="text-pink-200">*</sup>}
            </label>
            {previewSource ?
            (
                <div>
                    {!video ? (
                    <img
                        src={previewSource}
                        alt="Preview"
                        className="h-full w-full rounded-md object-cover"
                    />
                ) : (<Player aspectRatio="16:9" playsInline src={previewSource}/>)}
                {!viewData && (
                    <button
                        type="button" 
                        onClick={()=>{
                            setPreviewSource("")
                            setSelectedFile(null)
                            setValue(name,null)
                        }}
                        className="mt-3 text-richblack-400 underline"
                    >
                        Cancel
                    </button>
                )}
                </div>
            ) : (
                <div className="flex w-full flex-col items-center p-6"
                    {...getRootProps()}
                >
                    <input {...getInputProps()} ref={inputRef} />
                    <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                        <FaFileUpload  className="text-2xl text-yellow-50" />
                    </div>
                    <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                        Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                        <span onClick={handleBrowseClick}
                        
                        className="font-semibold cursor-pointer hover:text-yellow-100 text-yellow-50">Browse</span> a
                        file
                    </p>
                    <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                        <li>Aspect ratio 16:9</li>
                        <li>Recommended size 1024x576</li>
                    </ul>
                </div>
            )}
        </div>
    )


}