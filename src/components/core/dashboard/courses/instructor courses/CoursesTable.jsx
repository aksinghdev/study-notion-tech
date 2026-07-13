
import { useDispatch, useSelector } from "react-redux"

import { setCourse, setEditCourse, } from "../../../../../slices/courseSlice"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../../services/formateDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../../utils/constants"
import ConfirmationModal from "../../../../common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  const getDescription = (course) =>
    course.courseDescription.split(" ").length > TRUNCATE_LENGTH
      ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
      : course.courseDescription

  const handleEditClick = (course) => {
    dispatch(setEditCourse(true))
    dispatch(setCourse(course))
    navigate(`/dashboard/edit-course/${course._id}`)
  }

  const handleDeleteClick = (course) => {
    setConfirmationModal({
      text1: "Do you want to delete this course?",
      text2: "All the data related to this course will be deleted",
      btn1text: !loading ? "Delete" : "Loading...  ",
      btn2text: "Cancel",
      btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
      btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
    })
  }

  const StatusBadge = ({ course }) =>
    course.status === COURSE_STATUS.DRAFT ? (
      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
        <HiClock size={14} />
        Drafted
      </p>
    ) : (
      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
          <FaCheck size={8} />
        </div>
        Published
      </p>
    )

  if (courses?.length === 0) {
    return (
      <div className="rounded-xl border border-richblack-700 py-16 text-center text-lg sm:text-2xl font-medium text-richblack-100">
        No courses found
        {/* TODO: Need to change this state */}
      </div>
    )
  }

  return (
    <>
      {/* ===================== DESKTOP: original table-style layout (lg and up) ===================== */}
      <div className="hidden lg:block rounded-xl border border-richblack-800">
        {/* Header row */}
        <div className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
          <p className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
            Courses
          </p>
          <p className="text-left text-sm font-medium uppercase text-richblack-100">
            Duration
          </p>
          <p className="text-left text-sm font-medium uppercase text-richblack-100">
            Price
          </p>
          <p className="text-left text-sm font-medium uppercase text-richblack-100">
            Actions
          </p>
        </div>

        {courses?.map((course) => (
          <div
            key={course._id}
            className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
          >
            <div className="flex flex-1 gap-x-4">
              <img
                src={course?.thumbnailImg}
                alt={course?.courseName}
                className="h-[148px] w-[220px] rounded-lg object-cover"
              />
              <div className="flex flex-col justify-between">
                <p className="text-lg font-semibold text-richblack-5">
                  {course.courseName}
                </p>
                <p className="text-xs text-richblack-300">
                  {getDescription(course)}
                </p>
                <p className="text-[12px] text-white">
                  Created: {formatDate(course.createdAt)}
                </p>
                <StatusBadge course={course} />
              </div>
            </div>
            <div className="text-sm font-medium text-richblack-100">
              <p>{course.courseContent[0]?.subsection[0]?.timeDuration}</p>
            </div>
            <div className="text-sm font-medium text-richblack-100">
              ₹{course.price}
            </div>
            <div className="text-sm font-medium text-richblack-100 flex items-start gap-2">
              <button
                disabled={loading}
                onClick={() => handleEditClick(course)}
                title="Edit"
                className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
              >
                <FiEdit2 size={20} />
              </button>
              <button
                disabled={loading}
                onClick={() => handleDeleteClick(course)}
                title="Delete"
                className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===================== MOBILE/TABLET: card layout (below lg) ===================== */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses?.map((course) => (
          <div
            key={course._id}
            className="flex flex-col rounded-xl border border-richblack-700 bg-richblack-800 overflow-hidden"
          >
            {/* Top: Thumbnail */}
            <img
              src={course?.thumbnailImg}
              alt={course?.courseName}
              className="h-[180px] w-full object-cover flex-shrink-0"
            />

            {/* Middle: Meta data and details */}
            <div className="flex flex-col gap-2 p-4 flex-1">
              <p className="text-lg font-semibold text-richblack-5 truncate">
                {course.courseName}
              </p>
              <p className="text-xs text-richblack-300">
                {getDescription(course)}
              </p>
              <p className="text-[12px] text-richblack-200">
                Created: {formatDate(course.createdAt)}
              </p>

              <div className="flex items-center justify-between mt-1 flex-wrap gap-2">
                <StatusBadge course={course} />
                <p className="text-sm font-semibold text-richblack-5">
                  ₹{course.price}
                </p>
              </div>

              <p className="text-xs text-richblack-300 mt-1">
                Duration: {course.courseContent?.[0]?.subsection?.[0]?.timeDuration || "N/A"}
              </p>
            </div>

            {/* Bottom: Edit/Delete actions in separate colored bar */}
            <div className="flex items-center justify-end gap-4 bg-richblack-700 px-4 py-3">
              <button
                disabled={loading}
                onClick={() => handleEditClick(course)}
                title="Edit"
                className="flex items-center gap-1 text-sm text-richblack-100 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
              >
                <FiEdit2 size={18} />
                <span>Edit</span>
              </button>
              <button
                disabled={loading}
                onClick={() => handleDeleteClick(course)}
                title="Delete"
                className="flex items-center gap-1 text-sm text-pink-200 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
              >
                <RiDeleteBin6Line size={18} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmationModal && <ConfirmationModal modaldata={confirmationModal} />}
    </>
  )
}