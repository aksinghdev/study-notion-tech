import { useState } from "react";
import { useSelector } from "react-redux";


export default function Upload({name, lable, register, setValue, errors, video = false, viewData = null, editData = null}){

    const {course} = useSelector((state) => state.course);
    const [selectFile, setSelectFile] = useState(null)
    const [previewSourse, setPreviewSourse] = useState(
        viewData ? viewData : editData ? editData : ""
    )

    return(
        <div>

        </div>
    );
}